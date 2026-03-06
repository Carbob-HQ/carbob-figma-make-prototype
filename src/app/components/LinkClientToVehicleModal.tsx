import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import svgPaths from "../../imports/svg-16y911wggg";

interface ClientInfo {
  name: string;
  phone: string;
  email: string;
}

interface LinkClientToVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssociate: () => void;
  onNotAssociate: () => void;
  existingClient?: ClientInfo | null;
}

export default function LinkClientToVehicleModal({
  isOpen,
  onClose,
  onAssociate,
  onNotAssociate,
  existingClient,
}: LinkClientToVehicleModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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

  if (!isVisible) return null;

  const formatPhone = (phone: string) => {
    if (!phone) return "";
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 9) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }
    return phone;
  };

  const hasExistingClient = existingClient && existingClient.name;

  const contactInfo = hasExistingClient
    ? [
        existingClient.phone ? formatPhone(existingClient.phone) : "",
        existingClient.email || "",
      ]
        .filter(Boolean)
        .join(" | ")
    : "";

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center transition-opacity duration-200 ease-out"
      style={{ opacity: isAnimating ? 1 : 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="bg-[#f4f4f5] relative rounded-[12px] w-[460px] flex flex-col gap-[24px] items-start p-[24px] z-10"
        data-name="Modal / Link Client to Vehicle"
      >
        <div
          aria-hidden="true"
          className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]"
        />

        {/* Header */}
        <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px relative">
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[16px] w-full whitespace-pre-wrap">
              Associar veículo
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute content-stretch cursor-pointer flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] right-[-8px] rounded-[6px] size-[32px] top-[-8px] transition-colors not-disabled:hover:bg-[#e4e4e7]"
          >
            <div className="overflow-clip relative shrink-0 size-[16px]">
              <div className="absolute inset-[20.83%]">
                <svg
                  className="absolute block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 9.33323 9.33323"
                >
                  <path
                    d={svgPaths.p2bd57f80}
                    fill="var(--fill-0, #27272A)"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Body */}
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          {hasExistingClient ? (
            <>
              <div className="content-stretch flex items-center relative shrink-0 w-full">
                <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">
                  Já existe um cliente associado a este veículo:
                </p>
              </div>

              {/* Client card */}
              <div className="bg-white h-[64px] relative rounded-[12px] shrink-0 w-full">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]"
                />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
                    {/* Icon */}
                    <div className="bg-[rgba(130,112,255,0.15)] content-stretch flex items-center p-[6px] relative rounded-[9999px] shrink-0">
                      <div className="overflow-clip relative shrink-0 size-[20px]">
                        <div className="absolute inset-[8.33%_12.5%]">
                          <svg
                            className="absolute block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 15 16.6667"
                          >
                            <path
                              d={svgPaths.p7670500}
                              fill="var(--fill-0, #09090B)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic relative">
                      <p className="font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">
                        {existingClient.name}
                      </p>
                      {contactInfo && (
                        <p className="font-normal leading-[1.5] overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis w-full whitespace-nowrap">
                          {contactInfo}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-stretch flex items-center relative shrink-0 w-full">
                <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Queres associar o veículo a este cliente?</p>
              </div>
            </>
          ) : (
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex items-center relative shrink-0 w-full">
                <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">
                  Não existe nenhum cliente associado a este veículo.
                </p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0 w-full">
                <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">
                  Queres associar o veículo a este cliente?
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0 w-full">
          <Button
            variant="ghost"
            size="lg"
            className="font-normal cursor-pointer"
            onClick={onNotAssociate}
          >
            Não associar
          </Button>
          <Button
            size="lg"
            className="bg-[#262124] not-disabled:hover:bg-[#262124]/90 font-normal relative cursor-pointer"
            onClick={onAssociate}
          >
            Associar
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_black,inset_0px_2px_0px_0px_rgba(255,255,255,0.2)]" />
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}