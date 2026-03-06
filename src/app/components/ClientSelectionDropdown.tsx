import { useState, useRef, useEffect, cloneElement, isValidElement } from "react";
import { createPortal } from "react-dom";
import ClientSearchPopup from "./ClientSearchPopup";
import { addClientToDatabase } from "./ClientSearchPopup";
import AddNewClientModal from "./AddNewClientModal";
import LinkClientToVehicleModal from "./LinkClientToVehicleModal";
import { showToast } from "./Toast";
import { getClientByName } from "./ClientSearchPopup";
import { updateVehicleClient } from "./VehicleSearchPopup";
import type { Vehicle } from "./VehicleSearchPopup";

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  initials: string;
  isEndConsumer?: boolean;
  nif?: string;
  preferredContact?: string;
  notes?: string;
}

interface ClientSelectionDropdownProps {
  children: React.ReactNode;
  selectedClient?: Client | null;
  onSelectedClientChange?: (client: Client | null) => void;
  associatedClient?: Client | null;
  selectedVehicle?: Vehicle | null;
  onClientAssociatedToVehicle?: (client: Client) => void;
}

export function ClientSelectionDropdown({ children, selectedClient: controlledClient, onSelectedClientChange, associatedClient, selectedVehicle, onClientAssociatedToVehicle }: ClientSelectionDropdownProps) {
  const isControlled = controlledClient !== undefined;
  const [internalClient, setInternalClient] = useState<Client | null>(null);
  const selectedClient = isControlled ? controlledClient : internalClient;

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [pendingClient, setPendingClient] = useState<Client | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const setSelectedClient = (client: Client | null) => {
    if (isControlled) {
      onSelectedClientChange?.(client);
    } else {
      setInternalClient(client);
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

  const handleSelectClient = (client: Client) => {
    // Check if there's a vehicle selected and the client differs from or is missing on the vehicle
    if (
      selectedVehicle &&
      !client.isEndConsumer
    ) {
      const vehicleHasClient = !!selectedVehicle.clientName;
      const clientDiffers = vehicleHasClient && client.name !== selectedVehicle.clientName;
      const vehicleHasNoClient = !vehicleHasClient;

      if (clientDiffers || vehicleHasNoClient) {
        // Close the search popup and show the link modal
        setIsOpen(false);
        setPendingClient(client);
        setTimeout(() => {
          setIsLinkModalOpen(true);
        }, 50);
        return;
      }
    }

    setSelectedClient(client);
    setIsOpen(false);
  };

  const handleLinkAssociate = () => {
    if (pendingClient && selectedVehicle) {
      // Update the vehicle's client in the mock database
      updateVehicleClient(selectedVehicle.id, pendingClient.name);
      // Notify parent to update vehicle state with new clientName and set the client
      onClientAssociatedToVehicle?.(pendingClient);
      showToast("Veículo associado com sucesso");
    }
    setIsLinkModalOpen(false);
    setPendingClient(null);
  };

  const handleLinkNotAssociate = () => {
    if (pendingClient) {
      // Select the client without changing the vehicle's association
      setSelectedClient(pendingClient);
    }
    setIsLinkModalOpen(false);
    setPendingClient(null);
  };

  const handleLinkClose = () => {
    setIsLinkModalOpen(false);
    setPendingClient(null);
  };

  const handleClearClient = () => {
    setSelectedClient(null);
  };

  const handleUserFrameClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNewClient = () => {
    setIsOpen(false);
    // Small delay to let popup fade out before showing modal
    setTimeout(() => {
      setShowNewClientModal(true);
    }, 220);
  };

  const handleAddNewClient = (clientData: {
    name: string;
    phone: string;
    email: string;
  }) => {
    // Generate initials from name
    const parts = clientData.name.trim().split(/\s+/);
    const initials = parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : clientData.name.slice(0, 2).toUpperCase();

    const newClient: Client = {
      id: `new-${Date.now()}`,
      name: clientData.name,
      phone: clientData.phone,
      email: clientData.email,
      initials,
    };

    // Add to the shared client database so it appears in search results
    addClientToDatabase(newClient);

    setSelectedClient(newClient);
    setShowNewClientModal(false);
    showToast("Cliente adicionado com sucesso");
  };

  // Determine what to show in submenu 2 when no search and no selected client
  // If there's an associated client (from a selected vehicle), show it
  const popupAssociatedClient = !selectedClient && associatedClient ? associatedClient : null;

  // Get the existing client info for the link modal (the vehicle's current client)
  const existingVehicleClientInfo = (() => {
    if (!selectedVehicle?.clientName) return { name: "", phone: "", email: "" };
    const client = getClientByName(selectedVehicle.clientName);
    if (client) {
      return { name: client.name, phone: client.phone, email: client.email };
    }
    return { name: selectedVehicle.clientName, phone: "", email: "" };
  })();

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={handleUserFrameClick}
        className="cursor-pointer"
      >
        {isValidElement(children)
          ? cloneElement(children, {
              isOpen,
              selectedClient,
              onClearClient: handleClearClient,
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
          <ClientSearchPopup
            onSelectClient={handleSelectClient}
            selectedClient={selectedClient}
            onNewClient={handleNewClient}
            associatedClient={popupAssociatedClient}
          />
        </div>,
        document.body
      )}

      <AddNewClientModal
        isOpen={showNewClientModal}
        onClose={() => setShowNewClientModal(false)}
        onAddClient={handleAddNewClient}
      />

      <LinkClientToVehicleModal
        isOpen={isLinkModalOpen}
        onClose={handleLinkClose}
        onAssociate={handleLinkAssociate}
        onNotAssociate={handleLinkNotAssociate}
        existingClient={existingVehicleClientInfo}
      />
    </div>
  );
}