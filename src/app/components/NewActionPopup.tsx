import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import svgPaths from "../../imports/svg-ca11n9opp9";

interface NewActionPopupProps {
  anchorRect: DOMRect;
  onClose: () => void;
}

const actions = [
  {
    label: "Orçamento",
    svgViewBox: "0 0 12 14.6667",
    svgPath: svgPaths.p267d6e00,
  },
  {
    label: "Ordem de serviço",
    svgViewBox: "0 0 13.3333 14.6667",
    svgPath: svgPaths.p4c73a80,
  },
  {
    label: "Cliente",
    svgViewBox: "0 0 12 13.3333",
    svgPath: svgPaths.pa0c5400,
  },
  {
    label: "Veículo",
    svgViewBox: "0 0 14.6667 9.33333",
    svgPath: svgPaths.p38d2ce00,
  },
];

export function NewActionPopup({ anchorRect, onClose }: NewActionPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const top = anchorRect.top;
  const left = anchorRect.right + 12;

  return createPortal(
    <div
      ref={popupRef}
      className="fixed z-50 animate-in fade-in duration-200"
      style={{ top, left }}
    >
      <div className="bg-[#27272a] min-w-[192px] rounded-lg border border-white/10 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col p-[4px]">
          <span className="px-3 pt-1.5 pb-1 text-[12px] font-medium text-[#71717a] leading-[1.5]">Novo</span>
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="ghost"
              className="group/item w-full h-10 justify-start gap-2 px-3 cursor-pointer text-[#A1A1AA] not-disabled:hover:text-white not-disabled:hover:bg-white/10 transition-colors duration-200 ease-out"
              onClick={() => onClose()}
            >
              <svg
                className="shrink-0 size-4 text-[#8270ff] transition-colors duration-200 ease-out"
                fill="none"
                viewBox={action.svgViewBox}
              >
                <path d={action.svgPath} fill="currentColor" />
              </svg>
              <span className="font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}