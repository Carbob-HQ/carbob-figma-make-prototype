import { useState, useRef, useEffect, useCallback } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { useDropdownPosition } from "./useDropdownPosition";

const POPULAR_BRANDS = [
  "Audi",
  "BMW",
  "Citroen",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Renault",
  "Seat",
  "Skoda",
  "Tesla",
  "Toyota",
  "Volvo",
  "Volkswagen",
];

const ALL_BRANDS = [
  "Abarth",
  "AC",
  "Acura",
  "Aiways",
  "Aixam",
  "Alfa Romeo",
  "Alpine",
  "Aston Martin",
  "Audi",
  "Austin",
  "Austin Healey",
  "Autobianchi",
  "Bentley",
  "BMW",
  "Brabus",
  "Bugatti",
  "Buick",
  "BYD",
  "Cadillac",
  "Caterham",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Cupra",
  "Dacia",
  "Daewoo",
  "Daihatsu",
  "Dodge",
  "DS",
  "Ferrari",
  "Fiat",
  "Fisker",
  "Ford",
  "Genesis",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Iveco",
  "Jaguar",
  "Jeep",
  "Kia",
  "Koenigsegg",
  "Lada",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Lexus",
  "Ligier",
  "Lincoln",
  "Lotus",
  "Maserati",
  "Maybach",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MG",
  "Mini",
  "Mitsubishi",
  "Morgan",
  "Nissan",
  "Opel",
  "Pagani",
  "Peugeot",
  "Polestar",
  "Pontiac",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Rover",
  "Saab",
  "Seat",
  "Skoda",
  "Smart",
  "SsangYong",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Triumph",
  "Volkswagen",
  "Volvo",
  "XPeng",
];

function normalize(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

interface BrandComboboxProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  error?: boolean;
}

export function BrandCombobox({ value, onChange, disabled, label, error }: BrandComboboxProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { flipUp, maxHeight } = useDropdownPosition(triggerRef, open, 41);

  // Manage mount → visible for enter animation, and visible → unmount for exit
  useEffect(() => {
    if (open) {
      // Mount first, then make visible on next frame for CSS transition
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

  // Focus search input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  // Reset search on close
  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const handleSelect = useCallback(
    (brand: string) => {
      onChange(brand === value ? "" : brand);
      setOpen(false);
    },
    [onChange, value]
  );

  const handleToggle = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const filteredPopular = search
    ? POPULAR_BRANDS.filter((b) => normalize(b).includes(normalize(search)))
    : POPULAR_BRANDS;

  const filteredAll = search
    ? ALL_BRANDS.filter((b) => normalize(b).includes(normalize(search)))
    : ALL_BRANDS;

  const hasResults = filteredPopular.length > 0 || filteredAll.length > 0;

  return (
    <div className="flex flex-col gap-[6px] items-start relative shrink-0" ref={containerRef}>
      <p className="font-medium leading-[1.5] not-italic text-[#27272a] text-[14px]">{label ?? "Marca"}</p>

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={`flex items-center justify-between w-full min-h-[40px] h-[40px] bg-white rounded-[8px] border px-[12px] text-[14px] font-normal transition-colors duration-200 ease-out not-disabled:hover:bg-[#e4e4e7] ${
          disabled ? "opacity-50 cursor-default border-[#e5e5e5]" : "cursor-pointer"
        } ${error && !disabled ? "border-[#ef4444]" : "border-[#e5e5e5]"}`}
      >
        <span className={value ? "text-[#3f3f46]" : "text-[#a1a1aa]"}>
          {value || "Marca do veículo"}
        </span>
        <ChevronDown className="size-4 text-[#a1a1aa] shrink-0" />
      </button>

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
          {/* Search input */}
          <div className="flex items-center gap-[8px] px-[12px] py-[8px] border-b border-[#e4e4e7]">
            <Search className="size-4 text-[#a1a1aa] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar marca..."
              className="flex-1 text-[14px] text-[#3f3f46] placeholder:text-[#a1a1aa] outline-none bg-transparent"
            />
          </div>

          {/* List */}
          <div className="overflow-y-auto" style={{ maxHeight }}>
            {!hasResults && (
              <div className="py-[16px] text-center text-[14px] text-[#71717a]">
                Nenhuma marca encontrada
              </div>
            )}

            {/* Popular brands */}
            {filteredPopular.length > 0 && (
              <div>
                <div className="px-[12px] py-[8px] text-[12px] font-medium text-[#71717a]">
                  Marcas populares
                </div>
                {filteredPopular.map((brand) => (
                  <button
                    key={`popular-${brand}`}
                    type="button"
                    onClick={() => handleSelect(brand)}
                    className="flex items-center gap-[8px] w-full px-[12px] py-[8px] text-[14px] text-[#3f3f46] hover:bg-[#f4f4f5] cursor-pointer transition-colors duration-200 ease-out"
                  >
                    <Check
                      className={`size-4 shrink-0 transition-opacity duration-200 ease-out ${
                        value === brand ? "opacity-100 text-[#3f3f46]" : "opacity-0"
                      }`}
                    />
                    {brand}
                  </button>
                ))}
              </div>
            )}

            {/* Separator */}
            {filteredPopular.length > 0 && filteredAll.length > 0 && (
              <div className="h-px bg-[#e4e4e7] mx-[12px]" />
            )}

            {/* All brands */}
            {filteredAll.length > 0 && (
              <div>
                <div className="px-[12px] py-[8px] text-[12px] font-medium text-[#71717a]">
                  Todas as marcas
                </div>
                {filteredAll.map((brand) => (
                  <button
                    key={`all-${brand}`}
                    type="button"
                    onClick={() => handleSelect(brand)}
                    className="flex items-center gap-[8px] w-full px-[12px] py-[8px] text-[14px] text-[#3f3f46] hover:bg-[#f4f4f5] cursor-pointer transition-colors duration-200 ease-out"
                  >
                    <Check
                      className={`size-4 shrink-0 transition-opacity duration-200 ease-out ${
                        value === brand ? "opacity-100 text-[#3f3f46]" : "opacity-0"
                      }`}
                    />
                    {brand}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {error && !disabled && <p className="text-[12px] text-[#ef4444] leading-[1.5]">Campo obrigatório</p>}
    </div>
  );
}