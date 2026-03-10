import { useState, useRef, useEffect, useCallback } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { useDropdownPosition } from "./useDropdownPosition";

// Mock model data per brand — popular + all
const MODELS_BY_BRAND: Record<string, { popular: string[]; all: string[] }> = {
  Renault: {
    popular: ["Captur", "Clio", "Kadjar", "Megane", "Scenic", "Twingo"],
    all: ["Alaskan", "Arkana", "Captur", "Clio", "Espace", "Grand Scenic", "Kadjar", "Kangoo", "Koleos", "Megane", "Scenic", "Talisman", "Twingo", "Twizy", "Zoe"],
  },
  BMW: {
    popular: ["Série 1", "Série 3", "Série 5", "X1", "X3", "X5"],
    all: ["i3", "i4", "iX", "iX3", "Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 6", "Série 7", "Série 8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4"],
  },
  "Mercedes-Benz": {
    popular: ["Classe A", "Classe C", "Classe E", "GLA", "GLC", "GLE"],
    all: ["AMG GT", "Citan", "Classe A", "Classe B", "Classe C", "Classe E", "Classe G", "Classe S", "Classe V", "CLA", "CLS", "EQA", "EQB", "EQC", "EQE", "EQS", "GLA", "GLB", "GLC", "GLE", "GLS", "Sprinter", "Vito"],
  },
  Volkswagen: {
    popular: ["Golf", "Polo", "T-Cross", "T-Roc", "Tiguan", "Passat"],
    all: ["Arteon", "Caddy", "Golf", "ID.3", "ID.4", "ID.5", "ID.Buzz", "Multivan", "Passat", "Polo", "T-Cross", "T-Roc", "Taigo", "Tiguan", "Touareg", "Touran", "Transporter", "Up!"],
  },
  Peugeot: {
    popular: ["208", "2008", "308", "3008", "508", "5008"],
    all: ["108", "208", "2008", "301", "308", "3008", "508", "5008", "Boxer", "e-208", "e-2008", "e-308", "Expert", "Partner", "Rifter", "Traveller"],
  },
  Audi: {
    popular: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
    all: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "e-tron", "e-tron GT", "Q2", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "R8", "RS3", "RS4", "RS5", "RS6", "RS7", "TT"],
  },
  Ford: {
    popular: ["Fiesta", "Focus", "Kuga", "Puma", "Ranger", "Transit"],
    all: ["Bronco", "EcoSport", "Edge", "Explorer", "Fiesta", "Focus", "Galaxy", "Kuga", "Maverick", "Mondeo", "Mustang", "Mustang Mach-E", "Puma", "Ranger", "S-Max", "Tourneo", "Transit", "Transit Connect"],
  },
  Citroen: {
    popular: ["Berlingo", "C3", "C4", "C5 Aircross", "C3 Aircross", "C-Elysée"],
    all: ["Ami", "Berlingo", "C1", "C3", "C3 Aircross", "C4", "C4 Cactus", "C4 X", "C5 Aircross", "C5 X", "C-Elysée", "DS3", "Jumper", "Jumpy", "SpaceTourer"],
  },
  Fiat: {
    popular: ["500", "500X", "Panda", "Punto", "Tipo", "Ducato"],
    all: ["124 Spider", "500", "500C", "500e", "500L", "500X", "Doblo", "Ducato", "Fiorino", "Panda", "Punto", "Talento", "Tipo"],
  },
  Honda: {
    popular: ["Civic", "CR-V", "HR-V", "Jazz", "e:Ny1", "ZR-V"],
    all: ["Accord", "Civic", "CR-V", "e", "e:Ny1", "HR-V", "Jazz", "NSX", "ZR-V"],
  },
  Hyundai: {
    popular: ["i20", "i30", "Kona", "Tucson", "Santa Fe", "Ioniq 5"],
    all: ["Bayon", "i10", "i20", "i30", "Ioniq", "Ioniq 5", "Ioniq 6", "Kona", "Nexo", "Santa Fe", "Staria", "Tucson"],
  },
  Kia: {
    popular: ["Ceed", "Niro", "Picanto", "Sportage", "Stonic", "EV6"],
    all: ["Ceed", "EV6", "EV9", "Niro", "Optima", "Picanto", "ProCeed", "Rio", "Sorento", "Soul", "Sportage", "Stinger", "Stonic", "Venga", "XCeed"],
  },
  Toyota: {
    popular: ["Corolla", "RAV4", "Yaris", "Yaris Cross", "C-HR", "Aygo X"],
    all: ["Aygo X", "bZ4X", "C-HR", "Camry", "Corolla", "GR86", "GR Supra", "Highlander", "Hilux", "Land Cruiser", "Mirai", "Proace", "RAV4", "Yaris", "Yaris Cross"],
  },
  Nissan: {
    popular: ["Juke", "Qashqai", "Micra", "Leaf", "X-Trail", "Ariya"],
    all: ["Ariya", "e-NV200", "Juke", "Leaf", "Micra", "Navara", "NV300", "Pathfinder", "Qashqai", "Townstar", "X-Trail"],
  },
  Opel: {
    popular: ["Corsa", "Astra", "Mokka", "Crossland", "Grandland", "Combo"],
    all: ["Astra", "Combo", "Corsa", "Crossland", "Grandland", "Insignia", "Karl", "Meriva", "Mokka", "Movano", "Vivaro", "Zafira"],
  },
  Seat: {
    popular: ["Arona", "Ateca", "Ibiza", "Leon", "Tarraco", "Mii"],
    all: ["Alhambra", "Arona", "Ateca", "Ibiza", "Leon", "Mii", "Tarraco", "Toledo"],
  },
  Skoda: {
    popular: ["Fabia", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Scala"],
    all: ["Citigo", "Enyaq", "Fabia", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Rapid", "Scala", "Superb"],
  },
  Tesla: {
    popular: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck", "Roadster"],
    all: ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y", "Roadster"],
  },
  Volvo: {
    popular: ["XC40", "XC60", "XC90", "V40", "V60", "S60"],
    all: ["C40", "S60", "S90", "V40", "V60", "V90", "XC40", "XC60", "XC90"],
  },
  Mitsubishi: {
    popular: ["ASX", "Eclipse Cross", "L200", "Outlander", "Space Star", "Colt"],
    all: ["ASX", "Colt", "Eclipse Cross", "i-MiEV", "L200", "Outlander", "Pajero", "Space Star"],
  },
  Dacia: {
    popular: ["Duster", "Sandero", "Logan", "Spring", "Jogger", "Dokker"],
    all: ["Dokker", "Duster", "Jogger", "Lodgy", "Logan", "Sandero", "Spring"],
  },
  Cupra: {
    popular: ["Ateca", "Born", "Formentor", "Leon", "Tavascan", "Terramar"],
    all: ["Ateca", "Born", "Formentor", "Leon", "Tavascan", "Terramar"],
  },
  Jeep: {
    popular: ["Avenger", "Compass", "Renegade", "Wrangler", "Cherokee", "Grand Cherokee"],
    all: ["Avenger", "Cherokee", "Commander", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler"],
  },
  "Alfa Romeo": {
    popular: ["Giulia", "Giulietta", "Stelvio", "Tonale", "MiTo", "4C"],
    all: ["4C", "Giulia", "Giulietta", "MiTo", "Stelvio", "Tonale"],
  },
  "Land Rover": {
    popular: ["Defender", "Discovery", "Discovery Sport", "Evoque", "Range Rover", "Velar"],
    all: ["Defender", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  },
  Porsche: {
    popular: ["911", "Cayenne", "Macan", "Panamera", "Taycan", "718"],
    all: ["718 Boxster", "718 Cayman", "911", "Cayenne", "Macan", "Panamera", "Taycan"],
  },
  Jaguar: {
    popular: ["E-Pace", "F-Pace", "F-Type", "I-Pace", "XE", "XF"],
    all: ["E-Pace", "F-Pace", "F-Type", "I-Pace", "XE", "XF", "XJ"],
  },
  Mini: {
    popular: ["Clubman", "Countryman", "Cooper", "Cooper S", "John Cooper Works", "One"],
    all: ["Clubman", "Cooper", "Cooper S", "Countryman", "John Cooper Works", "One", "Paceman"],
  },
  Mazda: {
    popular: ["CX-3", "CX-5", "CX-30", "Mazda2", "Mazda3", "MX-5"],
    all: ["CX-3", "CX-5", "CX-30", "CX-60", "Mazda2", "Mazda3", "Mazda6", "MX-5", "MX-30"],
  },
  Suzuki: {
    popular: ["Ignis", "Jimny", "Swift", "S-Cross", "Vitara", "Across"],
    all: ["Across", "Alto", "Baleno", "Celerio", "Ignis", "Jimny", "S-Cross", "Swace", "Swift", "Vitara"],
  },
  Subaru: {
    popular: ["Forester", "Impreza", "Outback", "XV", "BRZ", "Levorg"],
    all: ["BRZ", "Forester", "Impreza", "Levorg", "Outback", "Solterra", "WRX", "XV"],
  },
};

const DEFAULT_MODELS = {
  popular: ["Modelo A", "Modelo B", "Modelo C", "Modelo D", "Modelo E", "Modelo F"],
  all: ["Modelo A", "Modelo B", "Modelo C", "Modelo D", "Modelo E", "Modelo F", "Modelo G", "Modelo H", "Modelo I", "Modelo J"],
};

function normalize(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

interface ModelComboboxProps {
  value: string;
  onChange: (value: string) => void;
  brand: string;
  disabled?: boolean;
  label?: string;
  error?: boolean;
}

export function ModelCombobox({ brand, value, onChange, disabled, label, error }: ModelComboboxProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { flipUp, maxHeight } = useDropdownPosition(triggerRef, open, 41);

  const modelsData = MODELS_BY_BRAND[brand] || DEFAULT_MODELS;

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

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const handleSelect = useCallback(
    (model: string) => {
      onChange(model === value ? "" : model);
      setOpen(false);
    },
    [onChange, value]
  );

  const handleToggle = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const filteredPopular = search
    ? modelsData.popular.filter((m) => normalize(m).includes(normalize(search)))
    : modelsData.popular;

  const filteredAll = search
    ? modelsData.all.filter((m) => normalize(m).includes(normalize(search)))
    : modelsData.all;

  const hasResults = filteredPopular.length > 0 || filteredAll.length > 0;

  return (
    <div className="flex flex-col gap-[6px] items-start relative shrink-0" ref={containerRef}>
      <p className="font-medium leading-[1.5] not-italic text-[#27272a] text-[14px]">{label ?? "Modelo"}</p>

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
          {value || "Modelo do veículo"}
        </span>
        <ChevronDown className="size-4 text-[#a1a1aa] shrink-0" />
      </button>

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
          {/* Search */}
          <div className="flex items-center gap-[8px] px-[12px] py-[8px] border-b border-[#e4e4e7]">
            <Search className="size-4 text-[#a1a1aa] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar modelo..."
              className="flex-1 text-[14px] text-[#3f3f46] placeholder:text-[#a1a1aa] outline-none bg-transparent"
            />
          </div>

          {/* List */}
          <div className="overflow-y-auto" style={{ maxHeight }}>
            {!hasResults && (
              <div className="py-[16px] text-center text-[14px] text-[#71717a]">
                Nenhum modelo encontrado
              </div>
            )}

            {/* Popular models */}
            {filteredPopular.length > 0 && (
              <div>
                <div className="px-[12px] py-[8px] text-[12px] font-medium text-[#71717a]">
                  Modelos populares
                </div>
                {filteredPopular.map((model) => (
                  <button
                    key={`popular-${model}`}
                    type="button"
                    onClick={() => handleSelect(model)}
                    className="flex items-center gap-[8px] w-full px-[12px] py-[8px] text-[14px] text-[#3f3f46] hover:bg-[#f4f4f5] cursor-pointer transition-colors duration-200 ease-out"
                  >
                    <Check
                      className={`size-4 shrink-0 transition-opacity duration-200 ease-out ${
                        value === model ? "opacity-100 text-[#3f3f46]" : "opacity-0"
                      }`}
                    />
                    {model}
                  </button>
                ))}
              </div>
            )}

            {/* Separator */}
            {filteredPopular.length > 0 && filteredAll.length > 0 && (
              <div className="h-px bg-[#e4e4e7] mx-[12px]" />
            )}

            {/* All models */}
            {filteredAll.length > 0 && (
              <div>
                <div className="px-[12px] py-[8px] text-[12px] font-medium text-[#71717a]">
                  Todos os modelos
                </div>
                {filteredAll.map((model) => (
                  <button
                    key={`all-${model}`}
                    type="button"
                    onClick={() => handleSelect(model)}
                    className="flex items-center gap-[8px] w-full px-[12px] py-[8px] text-[14px] text-[#3f3f46] hover:bg-[#f4f4f5] cursor-pointer transition-colors duration-200 ease-out"
                  >
                    <Check
                      className={`size-4 shrink-0 transition-opacity duration-200 ease-out ${
                        value === model ? "opacity-100 text-[#3f3f46]" : "opacity-0"
                      }`}
                    />
                    {model}
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