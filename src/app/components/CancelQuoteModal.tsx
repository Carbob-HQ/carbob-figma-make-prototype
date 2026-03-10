import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import svgPaths from "../../imports/svg-cwmoklnmo0";

interface CancelQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeepDraft: () => void;
  onCancelQuote: () => void;
}

export default function CancelQuoteModal({
  isOpen,
  onClose,
  onKeepDraft,
  onCancelQuote,
}: CancelQuoteModalProps) {
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
        className="bg-[#f4f4f5] relative rounded-[12px] w-[544px] flex flex-col gap-[24px] items-start p-[24px] z-10"
        data-name="Modal / Cancel Quote"
      >
        <div
          aria-hidden="true"
          className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]"
        />

        {/* Header */}
        <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px relative">
            <p className="font-medium leading-[1.25] not-italic relative shrink-0 text-[#27272a] text-[16px] w-full">
              Cancelar orçamento
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
        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex items-center relative shrink-0 w-full">
            <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px]">
              Tens a certeza que queres cancelar este orçamento?
            </p>
          </div>
          <div className="content-stretch flex items-center relative shrink-0 w-full">
            <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px]">
              Em alternativa, podes sair e manter o rascunho para continuar mais tarde.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-full">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              onKeepDraft();
              onClose();
            }}
          >
            Sair e manter rascunho
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer bg-[#fb2c36] not-disabled:hover:bg-[#e53e3e] transition-colors duration-200 ease-out"
            onClick={() => {
              onCancelQuote();
              onClose();
            }}
          >
            Cancelar orçamento
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}