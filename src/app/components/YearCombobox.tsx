import { useState, useRef, useEffect, useCallback } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useDropdownPosition } from "./useDropdownPosition";

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => currentYear - i);
const DONT_KNOW = "Não sei";

interface YearComboboxProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  error?: boolean;
}

export function YearCombobox({ value, onChange, disabled, label, error }: YearComboboxProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { flipUp, maxHeight } = useDropdownPosition(triggerRef, open);

  // Mount → visible for enter animation
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);
    }
  }, [open]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = useCallback(
    (year: string) => {
      onChange(year === value ? "" : year);
      setOpen(false);
    },
    [onChange, value]
  );

  const handleToggle = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-[8px] items-start relative shrink-0" ref={containerRef}>
      <p className="font-medium leading-[1.5] not-italic text-[#27272a] text-[14px]">{label ?? "Ano"}</p>

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={`flex items-center justify-between w-full min-h-[40px] h-[40px] bg-white rounded-[8px] border px-[12px] text-[14px] font-normal transition-colors duration-200 ease-out not-disabled:hover:bg-[#e5e5e5] ${
          disabled ? "opacity-50 cursor-default border-[#e5e5e5]" : "cursor-pointer"
        } ${error && !disabled ? "border-[#ef4444]" : "border-[#e5e5e5]"}`}
      >
        <span className={value ? "text-[#27272a]" : "text-[#71717a]"}>
          {value || "Ano do veículo"}
        </span>
        <ChevronDown className="size-4 text-[#71717a] shrink-0" />
      </button>
      {error && !disabled && <span className="text-[12px] text-[#ef4444] leading-[1.5]">Campo obrigatório</span>}

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 right-0 bg-white border border-[#e5e5e5] rounded-[8px] shadow-md z-[200] overflow-hidden"
          style={{
            ...(flipUp
              ? { bottom: "100%", marginBottom: 4 }
              : { top: "100%", marginTop: 4 }),
            opacity: visible ? 1 : 0,
            transition: "opacity 200ms ease-out",
          }}
        >
          {/* List */}
          <div className="overflow-y-auto" style={{ maxHeight }}>
            {/* "Não sei" option */}
            <button
              key={DONT_KNOW}
              type="button"
              onClick={() => handleSelect(DONT_KNOW)}
              className="flex items-center gap-[8px] w-full px-[12px] py-[8px] text-[14px] text-[#27272a] hover:bg-[#f4f4f5] cursor-pointer transition-colors duration-200 ease-out"
            >
              <Check
                className={`size-4 shrink-0 transition-opacity duration-200 ease-out ${
                  value === DONT_KNOW ? "opacity-100 text-[#27272a]" : "opacity-0"
                }`}
              />
              {DONT_KNOW}
            </button>
            <div className="mx-[12px] h-px bg-[rgba(39,39,42,0.1)]" />
            {YEARS.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => handleSelect(String(year))}
                className="flex items-center gap-[8px] w-full px-[12px] py-[8px] text-[14px] text-[#27272a] hover:bg-[#f4f4f5] cursor-pointer transition-colors duration-200 ease-out"
              >
                <Check
                  className={`size-4 shrink-0 transition-opacity duration-200 ease-out ${
                    value === String(year) ? "opacity-100 text-[#27272a]" : "opacity-0"
                  }`}
                />
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}