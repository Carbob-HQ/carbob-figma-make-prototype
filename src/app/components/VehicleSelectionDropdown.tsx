import { useState, useRef, useEffect, cloneElement, isValidElement } from "react";
import { createPortal } from "react-dom";
import VehicleSearchPopup from "./VehicleSearchPopup";
import type { Vehicle } from "./VehicleSearchPopup";
import { updateVehicleClient } from "./VehicleSearchPopup";
import { getClientByName } from "./ClientSearchPopup";
import AddNewVehicleModal from "./AddNewVehicleModal";
import LinkClientToVehicleModal from "./LinkClientToVehicleModal";
import { showToast } from "./Toast";

interface VehicleSelectionDropdownProps {
  children: React.ReactNode;
  selectedVehicle?: Vehicle | null;
  onSelectedVehicleChange?: (vehicle: Vehicle | null) => void;
  associatedVehicles?: Vehicle[];
  associatedClientName?: string;
  isClientEndConsumer?: boolean;
  hasServicesToConfirm?: boolean;
}

export function VehicleSelectionDropdown({ children, selectedVehicle: controlledVehicle, onSelectedVehicleChange, associatedVehicles, associatedClientName, isClientEndConsumer, hasServicesToConfirm }: VehicleSelectionDropdownProps) {
  const isControlled = controlledVehicle !== undefined;
  const [internalVehicle, setInternalVehicle] = useState<Vehicle | null>(null);
  const selectedVehicle = isControlled ? controlledVehicle : internalVehicle;

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [pendingVehicle, setPendingVehicle] = useState<Vehicle | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const setSelectedVehicle = (vehicle: Vehicle | null) => {
    if (isControlled) {
      onSelectedVehicleChange?.(vehicle);
    } else {
      setInternalVehicle(vehicle);
    }
  };

  // Calculate popup position based on trigger
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPopupPosition({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
  }, [isOpen]);

  // Handle open/close animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    // Check if there's a client selected AND the vehicle has a different client
    // Skip if the selected client is "Consumidor final" (temporary client)
    if (
      associatedClientName &&
      !isClientEndConsumer &&
      vehicle.clientName &&
      vehicle.clientName !== associatedClientName
    ) {
      // If there are services to confirm first, let the parent handle the full flow
      // (ChangeVehicleModal first, then LinkModal)
      if (hasServicesToConfirm) {
        setSelectedVehicle(vehicle);
        setIsOpen(false);
        return;
      }
      // Close the search popup and show the link modal
      setIsOpen(false);
      setPendingVehicle(vehicle);
      setTimeout(() => {
        setIsLinkModalOpen(true);
      }, 50);
      return;
    }

    setSelectedVehicle(vehicle);
    setIsOpen(false);
  };

  const handleLinkAssociate = () => {
    if (pendingVehicle && associatedClientName) {
      // Update the vehicle's client in the mock database
      updateVehicleClient(pendingVehicle.id, associatedClientName);
      // Select the vehicle with the updated client name
      setSelectedVehicle({ ...pendingVehicle, clientName: associatedClientName });
      showToast("Veículo associado com sucesso");
    }
    setIsLinkModalOpen(false);
    setPendingVehicle(null);
  };

  const handleLinkNotAssociate = () => {
    if (pendingVehicle) {
      // Select the vehicle as-is, keeping its original client
      setSelectedVehicle(pendingVehicle);
    }
    setIsLinkModalOpen(false);
    setPendingVehicle(null);
  };

  const handleLinkClose = () => {
    setIsLinkModalOpen(false);
    setPendingVehicle(null);
  };

  const handleClearVehicle = () => {
    setSelectedVehicle(null);
  };

  const handleVehicleFrameClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNewVehicle = () => {
    setIsOpen(false);
    // Small delay to let context popup close before modal opens
    setTimeout(() => {
      setIsModalOpen(true);
    }, 50);
  };

  const handleVehicleAdded = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  // Associated vehicles to show in popup submenu 2 when no search
  // Show associated vehicles regardless of whether a vehicle is selected
  const popupAssociatedVehicles = associatedVehicles && associatedVehicles.length > 0 ? associatedVehicles : undefined;

  // Get the existing client info for the link modal
  const existingClientInfo = (() => {
    if (!pendingVehicle?.clientName) return { name: "", phone: "", email: "" };
    const client = getClientByName(pendingVehicle.clientName);
    if (client) {
      return { name: client.name, phone: client.phone, email: client.email };
    }
    return { name: pendingVehicle.clientName, phone: "", email: "" };
  })();

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={handleVehicleFrameClick}
        className="cursor-pointer"
      >
        {isValidElement(children)
          ? cloneElement(children, {
              isOpen,
              selectedVehicle,
              onClearVehicle: handleClearVehicle,
            } as any)
          : children}
      </div>

      {isVisible && createPortal(
        <div
          ref={popupRef}
          className="fixed w-[360px] z-[9999] rounded-lg transition-opacity duration-200 ease-out"
          style={{
            opacity: isAnimating ? 1 : 0,
            top: popupPosition.top,
            left: popupPosition.left,
          }}
        >
          <VehicleSearchPopup
            onSelectVehicle={handleSelectVehicle}
            selectedVehicle={selectedVehicle}
            onNewVehicle={handleNewVehicle}
            associatedVehicles={popupAssociatedVehicles}
          />
        </div>,
        document.body
      )}

      <AddNewVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVehicleAdded={handleVehicleAdded}
        associatedClientName={associatedClientName || ""}
      />

      <LinkClientToVehicleModal
        isOpen={isLinkModalOpen}
        onClose={handleLinkClose}
        onAssociate={handleLinkAssociate}
        onNotAssociate={handleLinkNotAssociate}
        existingClient={existingClientInfo}
      />
    </div>
  );
}