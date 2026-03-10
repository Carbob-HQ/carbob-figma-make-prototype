import { useState, useRef, useEffect, useCallback } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useDropdownPosition } from "./useDropdownPosition";

interface VersionEntry {
  name: string;
  startYear: number;
  endYear: number | null; // null = ongoing ("Hoje")
}

const VERSIONS_BY_MODEL: Record<string, VersionEntry[]> = {
  // Renault
  Clio: [
    { name: "Clio I", startYear: 1990, endYear: 1998 },
    { name: "Clio II", startYear: 1998, endYear: 2005 },
    { name: "Clio II Phase 2", startYear: 2001, endYear: 2012 },
    { name: "Clio III", startYear: 2005, endYear: 2012 },
    { name: "Clio III Sport Tourer", startYear: 2008, endYear: 2012 },
    { name: "Clio IV", startYear: 2012, endYear: 2021 },
    { name: "Clio IV Sport Tourer", startYear: 2012, endYear: 2021 },
    { name: "Clio V", startYear: 2019, endYear: null },
  ],
  Captur: [
    { name: "Captur I", startYear: 2013, endYear: 2019 },
    { name: "Captur II", startYear: 2020, endYear: null },
  ],
  Megane: [
    { name: "Megane I", startYear: 1996, endYear: 2002 },
    { name: "Megane II", startYear: 2002, endYear: 2009 },
    { name: "Megane III", startYear: 2008, endYear: 2016 },
    { name: "Megane IV", startYear: 2016, endYear: null },
    { name: "Megane E-Tech", startYear: 2022, endYear: null },
  ],
  Kadjar: [
    { name: "Kadjar", startYear: 2015, endYear: 2022 },
  ],
  Scenic: [
    { name: "Scenic I", startYear: 1996, endYear: 2003 },
    { name: "Scenic II", startYear: 2003, endYear: 2009 },
    { name: "Scenic III", startYear: 2009, endYear: 2016 },
    { name: "Scenic IV", startYear: 2016, endYear: 2022 },
    { name: "Scenic E-Tech", startYear: 2024, endYear: null },
  ],
  Twingo: [
    { name: "Twingo I", startYear: 1993, endYear: 2007 },
    { name: "Twingo II", startYear: 2007, endYear: 2014 },
    { name: "Twingo III", startYear: 2014, endYear: null },
  ],
  // BMW
  "Série 1": [
    { name: "Série 1 (E87)", startYear: 2004, endYear: 2011 },
    { name: "Série 1 (F20)", startYear: 2011, endYear: 2019 },
    { name: "Série 1 (F40)", startYear: 2019, endYear: null },
  ],
  "Série 3": [
    { name: "Série 3 (E90)", startYear: 2005, endYear: 2012 },
    { name: "Série 3 (F30)", startYear: 2012, endYear: 2019 },
    { name: "Série 3 (G20)", startYear: 2019, endYear: null },
  ],
  "Série 5": [
    { name: "Série 5 (E60)", startYear: 2003, endYear: 2010 },
    { name: "Série 5 (F10)", startYear: 2010, endYear: 2017 },
    { name: "Série 5 (G30)", startYear: 2017, endYear: 2023 },
    { name: "Série 5 (G60)", startYear: 2023, endYear: null },
  ],
  X1: [
    { name: "X1 (E84)", startYear: 2009, endYear: 2015 },
    { name: "X1 (F48)", startYear: 2015, endYear: 2022 },
    { name: "X1 (U11)", startYear: 2022, endYear: null },
  ],
  X3: [
    { name: "X3 (E83)", startYear: 2004, endYear: 2010 },
    { name: "X3 (F25)", startYear: 2010, endYear: 2017 },
    { name: "X3 (G01)", startYear: 2017, endYear: null },
  ],
  X5: [
    { name: "X5 (E53)", startYear: 2000, endYear: 2006 },
    { name: "X5 (E70)", startYear: 2006, endYear: 2013 },
    { name: "X5 (F15)", startYear: 2013, endYear: 2018 },
    { name: "X5 (G05)", startYear: 2018, endYear: null },
  ],
  // Volkswagen
  Golf: [
    { name: "Golf V", startYear: 2003, endYear: 2008 },
    { name: "Golf VI", startYear: 2008, endYear: 2012 },
    { name: "Golf VII", startYear: 2012, endYear: 2019 },
    { name: "Golf VIII", startYear: 2019, endYear: null },
  ],
  Polo: [
    { name: "Polo IV (9N)", startYear: 2001, endYear: 2009 },
    { name: "Polo V (6R/6C)", startYear: 2009, endYear: 2017 },
    { name: "Polo VI (AW)", startYear: 2017, endYear: null },
  ],
  Tiguan: [
    { name: "Tiguan (5N)", startYear: 2007, endYear: 2016 },
    { name: "Tiguan (AD)", startYear: 2016, endYear: null },
  ],
  Passat: [
    { name: "Passat (B6)", startYear: 2005, endYear: 2010 },
    { name: "Passat (B7)", startYear: 2010, endYear: 2014 },
    { name: "Passat (B8)", startYear: 2014, endYear: 2023 },
    { name: "Passat (B9)", startYear: 2024, endYear: null },
  ],
  "T-Cross": [
    { name: "T-Cross", startYear: 2019, endYear: null },
  ],
  "T-Roc": [
    { name: "T-Roc", startYear: 2017, endYear: null },
  ],
  // Peugeot
  "208": [
    { name: "208 I", startYear: 2012, endYear: 2019 },
    { name: "208 II", startYear: 2019, endYear: null },
  ],
  "2008": [
    { name: "2008 I", startYear: 2013, endYear: 2019 },
    { name: "2008 II", startYear: 2019, endYear: null },
  ],
  "308": [
    { name: "308 I (T7)", startYear: 2007, endYear: 2013 },
    { name: "308 II (T9)", startYear: 2013, endYear: 2021 },
    { name: "308 III (P5)", startYear: 2021, endYear: null },
  ],
  "3008": [
    { name: "3008 I", startYear: 2009, endYear: 2016 },
    { name: "3008 II", startYear: 2016, endYear: null },
  ],
  "508": [
    { name: "508 I", startYear: 2010, endYear: 2018 },
    { name: "508 I SW", startYear: 2011, endYear: 2018 },
    { name: "508 II", startYear: 2018, endYear: null },
    { name: "508 II SW", startYear: 2018, endYear: null },
  ],
  "5008": [
    { name: "5008 I", startYear: 2009, endYear: 2017 },
    { name: "5008 II", startYear: 2017, endYear: null },
  ],
  // Audi
  A3: [
    { name: "A3 (8P)", startYear: 2003, endYear: 2012 },
    { name: "A3 (8V)", startYear: 2012, endYear: 2020 },
    { name: "A3 (8Y)", startYear: 2020, endYear: null },
  ],
  A4: [
    { name: "A4 (B7)", startYear: 2004, endYear: 2008 },
    { name: "A4 (B8)", startYear: 2008, endYear: 2015 },
    { name: "A4 (B9)", startYear: 2015, endYear: null },
  ],
  A6: [
    { name: "A6 (C6)", startYear: 2004, endYear: 2011 },
    { name: "A6 (C7)", startYear: 2011, endYear: 2018 },
    { name: "A6 (C8)", startYear: 2018, endYear: null },
  ],
  Q3: [
    { name: "Q3 (8U)", startYear: 2011, endYear: 2018 },
    { name: "Q3 (F3)", startYear: 2018, endYear: null },
  ],
  Q5: [
    { name: "Q5 (8R)", startYear: 2008, endYear: 2017 },
    { name: "Q5 (FY)", startYear: 2017, endYear: null },
  ],
  Q7: [
    { name: "Q7 (4L)", startYear: 2006, endYear: 2015 },
    { name: "Q7 (4M)", startYear: 2015, endYear: null },
  ],
  // Ford
  Focus: [
    { name: "Focus II", startYear: 2004, endYear: 2011 },
    { name: "Focus III", startYear: 2011, endYear: 2018 },
    { name: "Focus IV", startYear: 2018, endYear: null },
  ],
  Fiesta: [
    { name: "Fiesta VI", startYear: 2008, endYear: 2017 },
    { name: "Fiesta VII", startYear: 2017, endYear: 2023 },
  ],
  Kuga: [
    { name: "Kuga I", startYear: 2008, endYear: 2012 },
    { name: "Kuga II", startYear: 2012, endYear: 2020 },
    { name: "Kuga III", startYear: 2020, endYear: null },
  ],
  Puma: [
    { name: "Puma", startYear: 2019, endYear: null },
  ],
  Ranger: [
    { name: "Ranger (T6)", startYear: 2011, endYear: 2022 },
    { name: "Ranger (T6.2)", startYear: 2022, endYear: null },
  ],
  // Toyota
  Corolla: [
    { name: "Corolla (E150)", startYear: 2007, endYear: 2013 },
    { name: "Corolla (E170)", startYear: 2013, endYear: 2019 },
    { name: "Corolla (E210)", startYear: 2019, endYear: null },
    { name: "Corolla Touring Sports", startYear: 2019, endYear: null },
  ],
  Yaris: [
    { name: "Yaris II", startYear: 2005, endYear: 2011 },
    { name: "Yaris III", startYear: 2011, endYear: 2020 },
    { name: "Yaris IV", startYear: 2020, endYear: null },
  ],
  RAV4: [
    { name: "RAV4 III", startYear: 2006, endYear: 2012 },
    { name: "RAV4 IV", startYear: 2013, endYear: 2019 },
    { name: "RAV4 V", startYear: 2019, endYear: null },
  ],
  "Yaris Cross": [
    { name: "Yaris Cross", startYear: 2021, endYear: null },
  ],
  "C-HR": [
    { name: "C-HR", startYear: 2016, endYear: 2023 },
    { name: "C-HR (2ª gen.)", startYear: 2023, endYear: null },
  ],
  // Hyundai
  Tucson: [
    { name: "Tucson (JM)", startYear: 2004, endYear: 2010 },
    { name: "Tucson (TL)", startYear: 2015, endYear: 2020 },
    { name: "Tucson (NX4)", startYear: 2021, endYear: null },
  ],
  i30: [
    { name: "i30 (FD)", startYear: 2007, endYear: 2011 },
    { name: "i30 (GD)", startYear: 2012, endYear: 2017 },
    { name: "i30 (PD)", startYear: 2017, endYear: null },
  ],
  i20: [
    { name: "i20 (PB)", startYear: 2008, endYear: 2014 },
    { name: "i20 (GB)", startYear: 2014, endYear: 2020 },
    { name: "i20 (BC3)", startYear: 2020, endYear: null },
  ],
  Kona: [
    { name: "Kona (OS)", startYear: 2017, endYear: 2023 },
    { name: "Kona (SX2)", startYear: 2023, endYear: null },
  ],
  // Kia
  Sportage: [
    { name: "Sportage III", startYear: 2010, endYear: 2015 },
    { name: "Sportage IV (QL)", startYear: 2015, endYear: 2021 },
    { name: "Sportage V (NQ5)", startYear: 2021, endYear: null },
  ],
  Ceed: [
    { name: "Ceed (ED)", startYear: 2006, endYear: 2012 },
    { name: "Ceed (JD)", startYear: 2012, endYear: 2018 },
    { name: "Ceed (CD)", startYear: 2018, endYear: null },
  ],
  Picanto: [
    { name: "Picanto (SA)", startYear: 2004, endYear: 2011 },
    { name: "Picanto (TA)", startYear: 2011, endYear: 2017 },
    { name: "Picanto (JA)", startYear: 2017, endYear: null },
  ],
  // Honda
  Civic: [
    { name: "Civic VIII", startYear: 2006, endYear: 2011 },
    { name: "Civic IX", startYear: 2012, endYear: 2017 },
    { name: "Civic X", startYear: 2017, endYear: 2021 },
    { name: "Civic XI", startYear: 2021, endYear: null },
  ],
  "CR-V": [
    { name: "CR-V III", startYear: 2006, endYear: 2012 },
    { name: "CR-V IV", startYear: 2012, endYear: 2018 },
    { name: "CR-V V", startYear: 2018, endYear: null },
  ],
  // Fiat
  "500": [
    { name: "500 (312)", startYear: 2007, endYear: null },
    { name: "500e", startYear: 2021, endYear: null },
  ],
  Panda: [
    { name: "Panda II (169)", startYear: 2003, endYear: 2011 },
    { name: "Panda III (312/319)", startYear: 2012, endYear: null },
  ],
  Tipo: [
    { name: "Tipo (356)", startYear: 2016, endYear: null },
  ],
  // Mercedes-Benz
  "Classe A": [
    { name: "Classe A (W169)", startYear: 2004, endYear: 2012 },
    { name: "Classe A (W176)", startYear: 2012, endYear: 2018 },
    { name: "Classe A (W177)", startYear: 2018, endYear: null },
  ],
  "Classe C": [
    { name: "Classe C (W204)", startYear: 2007, endYear: 2014 },
    { name: "Classe C (W205)", startYear: 2014, endYear: 2021 },
    { name: "Classe C (W206)", startYear: 2021, endYear: null },
  ],
  "Classe E": [
    { name: "Classe E (W211)", startYear: 2002, endYear: 2009 },
    { name: "Classe E (W212)", startYear: 2009, endYear: 2016 },
    { name: "Classe E (W213)", startYear: 2016, endYear: 2023 },
    { name: "Classe E (W214)", startYear: 2023, endYear: null },
  ],
  GLA: [
    { name: "GLA (X156)", startYear: 2013, endYear: 2020 },
    { name: "GLA (H247)", startYear: 2020, endYear: null },
  ],
  GLC: [
    { name: "GLC (X253)", startYear: 2015, endYear: 2022 },
    { name: "GLC (X254)", startYear: 2022, endYear: null },
  ],
  GLE: [
    { name: "GLE (W166)", startYear: 2015, endYear: 2019 },
    { name: "GLE (V167)", startYear: 2019, endYear: null },
  ],
  // Tesla
  "Model 3": [
    { name: "Model 3", startYear: 2017, endYear: 2023 },
    { name: "Model 3 Highland", startYear: 2023, endYear: null },
  ],
  "Model Y": [
    { name: "Model Y", startYear: 2020, endYear: 2025 },
    { name: "Model Y Juniper", startYear: 2025, endYear: null },
  ],
  "Model S": [
    { name: "Model S", startYear: 2012, endYear: null },
  ],
  "Model X": [
    { name: "Model X", startYear: 2015, endYear: null },
  ],
  // Nissan
  Qashqai: [
    { name: "Qashqai (J10)", startYear: 2007, endYear: 2013 },
    { name: "Qashqai (J11)", startYear: 2014, endYear: 2021 },
    { name: "Qashqai (J12)", startYear: 2021, endYear: null },
  ],
  Juke: [
    { name: "Juke (F15)", startYear: 2010, endYear: 2019 },
    { name: "Juke (F16)", startYear: 2019, endYear: null },
  ],
  // Opel
  Corsa: [
    { name: "Corsa D", startYear: 2006, endYear: 2014 },
    { name: "Corsa E", startYear: 2014, endYear: 2019 },
    { name: "Corsa F", startYear: 2019, endYear: null },
  ],
  Astra: [
    { name: "Astra H", startYear: 2004, endYear: 2010 },
    { name: "Astra J", startYear: 2009, endYear: 2015 },
    { name: "Astra K", startYear: 2015, endYear: 2021 },
    { name: "Astra L", startYear: 2021, endYear: null },
  ],
  Mokka: [
    { name: "Mokka A", startYear: 2012, endYear: 2020 },
    { name: "Mokka B", startYear: 2020, endYear: null },
  ],
  // Dacia
  Duster: [
    { name: "Duster I", startYear: 2010, endYear: 2017 },
    { name: "Duster II", startYear: 2018, endYear: null },
  ],
  Sandero: [
    { name: "Sandero I", startYear: 2008, endYear: 2012 },
    { name: "Sandero II", startYear: 2012, endYear: 2020 },
    { name: "Sandero III", startYear: 2021, endYear: null },
  ],
  Logan: [
    { name: "Logan I", startYear: 2004, endYear: 2012 },
    { name: "Logan II", startYear: 2012, endYear: 2020 },
    { name: "Logan III", startYear: 2021, endYear: null },
  ],
  Jogger: [
    { name: "Jogger", startYear: 2022, endYear: null },
  ],
  Spring: [
    { name: "Spring", startYear: 2021, endYear: null },
  ],
  // Seat
  Ibiza: [
    { name: "Ibiza IV (6J)", startYear: 2008, endYear: 2017 },
    { name: "Ibiza V (6F)", startYear: 2017, endYear: null },
  ],
  Leon: [
    { name: "Leon II (1P)", startYear: 2005, endYear: 2012 },
    { name: "Leon III (5F)", startYear: 2012, endYear: 2020 },
    { name: "Leon IV (KL)", startYear: 2020, endYear: null },
  ],
  Arona: [
    { name: "Arona", startYear: 2017, endYear: null },
  ],
  Ateca: [
    { name: "Ateca", startYear: 2016, endYear: null },
  ],
  // Skoda
  Octavia: [
    { name: "Octavia II (1Z)", startYear: 2004, endYear: 2013 },
    { name: "Octavia III (5E)", startYear: 2013, endYear: 2020 },
    { name: "Octavia IV (NX)", startYear: 2020, endYear: null },
  ],
  Fabia: [
    { name: "Fabia II (5J)", startYear: 2007, endYear: 2014 },
    { name: "Fabia III (NJ)", startYear: 2014, endYear: 2021 },
    { name: "Fabia IV (PJ)", startYear: 2021, endYear: null },
  ],
  // Volvo
  XC40: [
    { name: "XC40", startYear: 2018, endYear: null },
  ],
  XC60: [
    { name: "XC60 I", startYear: 2008, endYear: 2017 },
    { name: "XC60 II", startYear: 2017, endYear: null },
  ],
  XC90: [
    { name: "XC90 I", startYear: 2002, endYear: 2014 },
    { name: "XC90 II", startYear: 2015, endYear: null },
  ],
  // Mazda
  "CX-5": [
    { name: "CX-5 (KE)", startYear: 2012, endYear: 2017 },
    { name: "CX-5 (KF)", startYear: 2017, endYear: null },
  ],
  Mazda3: [
    { name: "Mazda3 (BL)", startYear: 2009, endYear: 2013 },
    { name: "Mazda3 (BM/BN)", startYear: 2013, endYear: 2019 },
    { name: "Mazda3 (BP)", startYear: 2019, endYear: null },
  ],
  // Citroen
  C3: [
    { name: "C3 II", startYear: 2009, endYear: 2016 },
    { name: "C3 III", startYear: 2016, endYear: null },
  ],
  C4: [
    { name: "C4 I", startYear: 2004, endYear: 2010 },
    { name: "C4 II", startYear: 2010, endYear: 2018 },
    { name: "C4 III / ë-C4", startYear: 2020, endYear: null },
  ],
  "C5 Aircross": [
    { name: "C5 Aircross", startYear: 2019, endYear: null },
  ],
};

function formatYearRange(v: VersionEntry): string {
  return `${v.startYear} → ${v.endYear ?? "Hoje"}`;
}

function filterByYear(versions: VersionEntry[], year: number): VersionEntry[] {
  return versions.filter((v) => {
    if (year < v.startYear) return false;
    if (v.endYear === null) return true;
    return year <= v.endYear;
  });
}

interface VersionComboboxProps {
  value: string;
  onChange: (value: string) => void;
  model: string;
  year: string;
  disabled?: boolean;
  label?: string;
  error?: boolean;
}

export function VersionCombobox({ value, onChange, model, year, disabled, label, error }: VersionComboboxProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { flipUp, maxHeight } = useDropdownPosition(triggerRef, open);

  const allVersions = VERSIONS_BY_MODEL[model] || [];
  const yearNum = parseInt(year, 10);
  const filteredVersions = !isNaN(yearNum) ? filterByYear(allVersions, yearNum) : allVersions;

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
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

  const handleSelect = useCallback(
    (name: string) => {
      onChange(name === value ? "" : name);
      setOpen(false);
    },
    [onChange, value]
  );

  const handleToggle = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-[6px] items-start relative shrink-0" ref={containerRef}>
      <p className="font-medium leading-[1.5] not-italic text-[#27272a] text-[14px]">{label ?? "Versão"}</p>

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
          {value || "Versão do veículo"}
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
          <div className="overflow-y-auto" style={{ maxHeight }}>
            {filteredVersions.length === 0 && (
              <div className="py-[16px] text-center text-[14px] text-[#71717a]">
                Nenhuma versão disponível
              </div>
            )}
            {filteredVersions.map((v) => (
              <button
                key={v.name}
                type="button"
                onClick={() => handleSelect(v.name)}
                className="flex items-center gap-[8px] w-full px-[12px] py-[8px] hover:bg-[#f4f4f5] cursor-pointer transition-colors duration-200 ease-out"
              >
                <Check
                  className={`size-4 shrink-0 transition-opacity duration-200 ease-out ${
                    value === v.name ? "opacity-100 text-[#3f3f46]" : "opacity-0"
                  }`}
                />
                <div className="flex flex-col items-start gap-[2px]">
                  <span className="text-[14px] text-[#3f3f46] leading-[1.5]">{v.name}</span>
                  <span className="text-[12px] text-[#a1a1aa] leading-[1.5]">{formatYearRange(v)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {error && !disabled && <p className="text-[12px] text-[#ef4444] leading-[1.5]">Campo obrigatório</p>}
    </div>
  );
}