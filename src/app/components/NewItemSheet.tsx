import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { X, Wrench, Droplet, Euro, Check, Info } from "lucide-react";
import { showToast } from "./Toast";

function FieldError({ show }: { show: boolean }) {
  if (!show) return null;
  return <p className="text-[12px] text-[#ef4444] leading-[1.5]">Campo obrigatório</p>;
}

import svgPaths from "../../imports/svg-0sy48dm4o2";
import svgCalc from "../../imports/svg-xonq35r5ws";
import {
  type LaborItem,
  type PartItem,
  type ConsumableItem,
  type AdditionalChargeItem,
  type ServiceItem,
  calcLaborSubtotal,
  calcLaborTotal,
  calcPartSubtotal,
  calcPartTotal,
  calcConsumableSubtotal,
  calcConsumableTotal,
  calcAdditionalSubtotal,
  calcAdditionalTotal,
  calcItemSubtotal,
  generateItemId,
} from "./QuoteServicesData";

type ItemType = "labor" | "part" | "consumable" | "fee";

const EDIT_TITLE_MAP: Record<ItemType, string> = {
  labor: "Editar Mão de obra",
  part: "Editar Peça",
  consumable: "Editar Consumível",
  fee: "Editar Encargo",
};

/** Map QuoteServicesData item types to local ItemType */
function toLocalType(dataType: string): ItemType | null {
  switch (dataType) {
    case "labor": return "labor";
    case "parts": return "part";
    case "consumables": return "consumable";
    case "additional": return "fee";
    default: return null;
  }
}

interface NewItemSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (item: ServiceItem) => void;
  preselectedType?: ItemType | null;
  /** When provided, the sheet enters edit mode for this item */
  editItem?: ServiceItem | null;
  /** Service items for populating the "Incidir sobre" dropdown (labor + parts) */
  serviceItems?: ServiceItem[];
}

const PART_ICON = (
  <svg className="size-[14px]" fill="none" viewBox="0 0 13.3333 14.6641">
    <path d={svgPaths.p475cc00} fill="currentColor" />
  </svg>
);

const ITEM_TYPES: { type: ItemType; label: string; icon: React.ReactNode }[] = [
  { type: "labor", label: "Mão de obra", icon: <Wrench className="size-[14px]" /> },
  { type: "part", label: "Peça", icon: PART_ICON },
  { type: "consumable", label: "Consumível", icon: <Droplet className="size-[14px]" /> },
  { type: "fee", label: "Encargo", icon: <Euro className="size-[14px]" /> },
];

const PRICE_OPTIONS = [
  { value: "50", label: "50,00 €/h", description: "Serviços gerais" },
  { value: "45", label: "45,00 €/h", description: "Veículos elétricos" },
  { value: "40", label: "40,00 €/h", description: "Frotas" },
  { value: "35", label: "35,00 €/h", description: "Chapa e pintura" },
];

const VAT_OPTIONS = [
  { value: "23", label: "23 %" },
  { value: "13", label: "13 %" },
  { value: "6", label: "6 %" },
  { value: "0", label: "0 %" },
];

type ConsumableCalcType = "fixed" | "percentItem" | "percentService";

const formatCurrency = (val: number) =>
  val.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

/** Parse "HHhMM" string into decimal hours */
function parseHoursString(s: string): number {
  const match = s.match(/^(\d{0,3})h(\d{0,2})$/);
  if (!match) return 0;
  const hh = parseInt(match[1], 10) || 0;
  const mm = parseInt(match[2], 10) || 0;
  return hh + mm / 60;
}

/** Format decimal hours back to "HHhMM" */
function formatHoursDisplay(hours: number): string {
  const hh = Math.floor(hours);
  const mm = Math.round((hours - hh) * 60);
  return `${String(hh).padStart(2, "0")}h${String(mm).padStart(2, "0")}`;
}

function TimeInput({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const hhRef = useRef<HTMLInputElement>(null);
  const mmRef = useRef<HTMLInputElement>(null);
  const hhPendingSelect = useRef(false);
  const mmPendingSelect = useRef(false);

  const match = value.match(/^(\d{0,3})h(\d{0,2})$/);
  const hhVal = match ? match[1] : "";
  const mmVal = match ? match[2] : "";

  const emit = (hh: string, mm: string) => onChange(`${hh}h${mm}`);

  const clampAndPad = (raw: string, max: number) => {
    if (raw === "") return "";
    let num = parseInt(raw, 10);
    if (isNaN(num)) return "";
    if (num > max) num = max;
    return num.toString().padStart(2, "0");
  };

  const handleHhChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    hhPendingSelect.current = false;
    const digits = e.target.value.replace(/\D/g, "").slice(0, 3);
    emit(digits, mmVal);
  };

  const handleMmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    mmPendingSelect.current = false;
    const digits = e.target.value.replace(/\D/g, "").slice(0, 2);
    emit(hhVal, digits);
  };

  const handleHhBlur = () => emit(clampAndPad(hhVal, 999), mmVal);
  const handleMmBlur = () => emit(hhVal, clampAndPad(mmVal, 59));

  const handleHhKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "h" || e.key === "H") {
      e.preventDefault();
      mmRef.current?.focus();
      mmRef.current?.select();
    }
  };

  const handleHhFocus = () => { hhPendingSelect.current = true; };
  const handleMmFocus = () => { mmPendingSelect.current = true; };

  const handleHhMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    if (hhPendingSelect.current) { e.preventDefault(); hhRef.current?.select(); hhPendingSelect.current = false; }
  };
  const handleMmMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    if (mmPendingSelect.current) { e.preventDefault(); mmRef.current?.select(); mmPendingSelect.current = false; }
  };

  const segmentClass = "bg-transparent border-none outline-none text-center p-0 m-0 text-[14px] min-w-0 transition-none";

  return (
    <div className={`flex items-center border rounded-[8px] bg-white transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/20 focus-within:ring-[3px] ${className ?? ""}`}>
      <input ref={hhRef} inputMode="numeric" value={hhVal} placeholder="00" onChange={handleHhChange} onBlur={handleHhBlur} onKeyDown={handleHhKeyDown} onFocus={handleHhFocus} onMouseUp={handleHhMouseUp} style={{ width: `${Math.max(2, hhVal.length)}ch` }} className={`${segmentClass} text-[#3f3f46] placeholder:text-[#3f3f46]`} />
      <span className="text-[14px] select-none text-[#3f3f46]">h</span>
      <input ref={mmRef} inputMode="numeric" value={mmVal} placeholder="00" onChange={handleMmChange} onBlur={handleMmBlur} onFocus={handleMmFocus} onMouseUp={handleMmMouseUp} style={{ width: `${Math.max(2, mmVal.length)}ch` }} className={`${segmentClass} text-[#3f3f46] placeholder:text-[#3f3f46]`} />
    </div>
  );
}

/** Reusable discount input (percentage, max 100) */
function DiscountInput({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: boolean }) {
  return (
    <div className={`flex items-center h-[40px] rounded-[8px] border ${error ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white px-[12px] transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/20 focus-within:ring-[3px]`}>
      <input
        inputMode="numeric"
        value={value}
        placeholder="0"
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "");
          if (raw === "") { onChange(""); return; }
          const num = Math.min(parseInt(raw, 10), 100);
          onChange(String(num));
        }}
        className="bg-transparent border-none outline-none text-[14px] text-[#3f3f46] placeholder:text-[#3f3f46] p-0 m-0 w-full min-w-0 transition-none"
      />
      <span className="text-[14px] text-[#3f3f46] select-none shrink-0">%</span>
    </div>
  );
}

/** Reusable VAT select */
function VatSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-[40px] rounded-[8px] border-[#e5e5e5] bg-white text-[14px] text-[#27272a] font-normal px-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {VAT_OPTIONS.map((opt) => (
          <SelectPrimitive.Item
            key={opt.value}
            value={opt.value}
            className="relative flex w-full cursor-default items-center gap-[8px] rounded-sm py-[8px] pr-[8px] pl-[8px] text-sm outline-hidden select-none focus:bg-[#f4f4f5] transition-colors duration-200 ease-out"
          >
            <span className="flex size-4 shrink-0 items-center justify-center">
              <SelectPrimitive.ItemIndicator>
                <Check className="size-4 text-[#3f3f46]" />
              </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>
              <span className="text-[14px] text-[#3f3f46]">{opt.label}</span>
            </SelectPrimitive.ItemText>
          </SelectPrimitive.Item>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Readonly currency input */
function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      <Label className="text-[14px] text-[#27272a]">{label}</Label>
      <Input
        readOnly
        value={value}
        className="h-[40px] rounded-[8px] border-[#e5e5e5] bg-[rgba(39,39,42,0.05)] text-[14px] text-[#3f3f46] px-[12px] cursor-default"
      />
    </div>
  );
}

// ─── Labor Fields ─────────────────────────────────────────────────────────────

const EMPTY_ERRORS = new Set<string>();
const NOOP_CLEAR = (_f: string) => {};

function LaborFields({
  designation, setDesignation,
  hours, setHours,
  pricePerHour, setPricePerHour,
  discount, setDiscount,
  vatRate, setVatRate,
  subtotal, total,
  errorFields = EMPTY_ERRORS, clearError = NOOP_CLEAR,
}: {
  designation: string; setDesignation: (v: string) => void;
  hours: string; setHours: (v: string) => void;
  pricePerHour: string; setPricePerHour: (v: string) => void;
  discount: string; setDiscount: (v: string) => void;
  vatRate: string; setVatRate: (v: string) => void;
  subtotal: number; total: number;
  errorFields?: Set<string>; clearError?: (f: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[16px] w-full">
      <div className="flex flex-col gap-[8px] w-full" data-field="designation">
        <Label className="text-[14px] text-[#27272a]">Mão de obra *</Label>
        <Input placeholder="Designação" value={designation} onChange={(e) => { setDesignation(e.target.value); clearError("designation"); }} autoFocus className={`h-[40px] rounded-[8px] ${errorFields.has("designation") ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white text-[14px] text-[#27272a] placeholder:text-[#d4d4d8] px-[12px]`} />
        <FieldError show={errorFields.has("designation")} />
      </div>

      <div className="flex flex-col gap-[8px] w-full" data-field="hours">
        <Label className="text-[14px] text-[#27272a]">Horas *</Label>
        <TimeInput value={hours} onChange={(v) => { setHours(v); clearError("hours"); }} className={`h-[40px] rounded-[8px] ${errorFields.has("hours") ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white text-[14px] text-[#3f3f46] placeholder:text-[#3f3f46] px-[12px]`} />
        <FieldError show={errorFields.has("hours")} />
      </div>

      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Preço unitário</Label>
        <Select value={pricePerHour} onValueChange={setPricePerHour}>
          <SelectTrigger className="h-[40px] rounded-[8px] border-[#e5e5e5] bg-white text-[14px] text-[#3f3f46] font-normal px-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRICE_OPTIONS.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className="relative flex w-full cursor-default items-start gap-[8px] rounded-sm py-[8px] pr-[8px] pl-[8px] text-sm outline-hidden select-none focus:bg-[#f4f4f5] transition-colors duration-200 ease-out"
              >
                <span className="flex size-4 shrink-0 items-center justify-center mt-[2px]">
                  <SelectPrimitive.ItemIndicator>
                    <Check className="size-4 text-[#3f3f46]" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <div className="flex flex-col items-start gap-[2px]">
                  <SelectPrimitive.ItemText>
                    <span className="text-[14px] text-[#3f3f46] leading-[1.5]">{opt.label}</span>
                  </SelectPrimitive.ItemText>
                  <span className="text-[12px] text-[#a1a1aa] leading-[1.5]">{opt.description}</span>
                </div>
              </SelectPrimitive.Item>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Desconto</Label>
        <DiscountInput value={discount} onChange={setDiscount} />
      </div>

      <ReadonlyField label="Subtotal" value={formatCurrency(subtotal)} />

      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Taxa de IVA</Label>
        <VatSelect value={vatRate} onChange={setVatRate} />
      </div>

      <ReadonlyField label="Total c/ IVA" value={formatCurrency(total)} />
    </div>
  );
}

// ─── Part Fields ──────────────────────────────────────────────────────────────

const MARKUP_PRESETS = [15, 25, 35, 50];

function PartFields({
  designation, setDesignation,
  referenceOEM, setReferenceOEM,
  quantity, setQuantity,
  partType, setPartType,
  unitCost, setUnitCost,
  markup, setMarkup,
  customMarkup, setCustomMarkup,
  discount, setDiscount,
  vatRate, setVatRate,
  unitPrice, subtotal, total,
  retailPrice, setRetailPrice,
  retailDiscount, setRetailDiscount,
  calcOpen, setCalcOpen,
  oemCost,
  oemReference,
  errorFields = EMPTY_ERRORS, clearError = NOOP_CLEAR,
}: {
  designation: string; setDesignation: (v: string) => void;
  referenceOEM: string; setReferenceOEM: (v: string) => void;
  quantity: string; setQuantity: (v: string) => void;
  partType: "OEM" | "IAM" | "generic"; setPartType: (v: "OEM" | "IAM" | "generic") => void;
  unitCost: string; setUnitCost: (v: string) => void;
  markup: number | null; setMarkup: (v: number | null) => void;
  customMarkup: string; setCustomMarkup: (v: string) => void;
  discount: string; setDiscount: (v: string) => void;
  vatRate: string; setVatRate: (v: string) => void;
  unitPrice: number; subtotal: number; total: number;
  retailPrice: string; setRetailPrice: (v: string) => void;
  retailDiscount: string; setRetailDiscount: (v: string) => void;
  calcOpen: boolean; setCalcOpen: (v: boolean) => void;
  oemCost: number;
  oemReference: string;
  errorFields?: Set<string>; clearError?: (f: string) => void;
}) {
  const activePreset = MARKUP_PRESETS.includes(markup ?? -1) ? markup : null;

  const handlePresetClick = (preset: number) => {
    if (activePreset === preset) {
      setMarkup(null);
      setCustomMarkup("");
    } else {
      setMarkup(preset);
      setCustomMarkup("");
    }
  };

  const handleCustomMarkupChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    setCustomMarkup(digits);
    if (digits === "") {
      setMarkup(null);
    } else {
      setMarkup(parseInt(digits, 10));
    }
  };

  // ── Calculator helpers ──
  const parseCurrencyStr = (s: string) => parseFloat(s.replace(/[€\s\u00a0]/g, "").replace(",", ".")) || 0;
  const fmtCurrencyStr = (n: number) => n.toFixed(2).replace(".", ",");

  // Mirror mode: when both cost and retail are empty, typing in one mirrors to the other.
  // Once a value is committed (blur) or discount is changed, mirror mode exits permanently.
  const mirrorMode = useRef(true);

  // Exit mirror mode when edit data loads with differing retail/cost values or a discount
  useEffect(() => {
    const rp = parseCurrencyStr(retailPrice);
    const uc = parseCurrencyStr(unitCost);
    const rd = parseFloat(retailDiscount) || 0;
    if (rp > 0 && (Math.abs(rp - uc) > 0.001 || rd > 0)) {
      mirrorMode.current = false;
    }
  }, [retailPrice, unitCost, retailDiscount]);

  const handleToggleCalc = () => {
    if (!calcOpen) {
      // Opening: preserve existing retail data; only initialise if empty
      const currentCost = parseCurrencyStr(unitCost);
      const existingRetail = parseCurrencyStr(retailPrice);

      if (existingRetail > 0) {
        // Retail price already persisted — keep it, exit mirror
        mirrorMode.current = false;
      } else if (currentCost > 0) {
        // Cost filled, no retail — seed retail from cost, exit mirror
        setRetailPrice(fmtCurrencyStr(currentCost));
        mirrorMode.current = false;
      } else {
        // Both empty — enter mirror mode
        mirrorMode.current = true;
      }
    }
    setCalcOpen(!calcOpen);
  };

  // ── Unit cost handlers ──
  // Works regardless of calcOpen so that retail/discount stay consistent (Cases 3 & 4)
  // Recalculation only happens on blur so sibling fields stay stable while typing.
  const handleUnitCostChangeWithCalc = (raw: string) => {
    setUnitCost(raw);
  };

  const handleUnitCostBlurWithCalc = () => {
    if (!unitCost) return;
    const normalized = unitCost.replace(/[€\s\u00a0]/g, "").replace(",", ".");
    const num = parseFloat(normalized);
    if (isNaN(num)) { setUnitCost(""); return; }
    setUnitCost(fmtCurrencyStr(num));

    if (mirrorMode.current) {
      setRetailPrice(fmtCurrencyStr(num));
      mirrorMode.current = false;
    } else {
      const rp = parseCurrencyStr(retailPrice);
      if (rp > 0) {
        if (num <= rp) {
          // Cost ≤ retail: keep retail price, recalculate discount
          const newDisc = Math.round((1 - num / rp) * 100);
          setRetailDiscount(newDisc > 0 ? String(newDisc) : "");
        } else {
          // Cost > retail: keep discount, recalculate retail price
          const rd = parseFloat(retailDiscount) || 0;
          const newRp = rd < 100 ? num / (1 - rd / 100) : num;
          setRetailPrice(fmtCurrencyStr(newRp));
        }
      }
    }
  };

  // ── Retail price handlers (only visible when calc is open) ──
  // Recalculation only happens on blur so sibling fields stay stable while typing.
  const handleRetailPriceChange = (raw: string) => {
    setRetailPrice(raw);
  };

  const handleRetailPriceBlur = () => {
    if (!retailPrice) return;
    const num = parseCurrencyStr(retailPrice);
    if (isNaN(num) || num === 0) { setRetailPrice(""); return; }
    setRetailPrice(fmtCurrencyStr(num));
    if (mirrorMode.current) {
      setUnitCost(fmtCurrencyStr(num));
      mirrorMode.current = false;
    } else {
      const rd = parseFloat(retailDiscount) || 0;
      const newCost = num * (1 - rd / 100);
      setUnitCost(newCost > 0 ? fmtCurrencyStr(newCost) : "");
    }
  };

  // ── Discount handler ──
  const handleRetailDiscountChange = (raw: string) => {
    mirrorMode.current = false;
    const digits = raw.replace(/\D/g, "");
    if (digits === "") { setRetailDiscount(""); } else {
      const num = Math.min(parseInt(digits, 10), 100);
      setRetailDiscount(String(num));
    }
    // Keep retail price, recalculate unit cost
    const rp = parseCurrencyStr(retailPrice);
    const rd = digits === "" ? 0 : Math.min(parseInt(digits, 10), 100);
    const newCost = rp * (1 - rd / 100);
    setUnitCost(newCost > 0 ? fmtCurrencyStr(newCost) : "");
  };

  return (
    <div className="flex flex-col gap-[16px] w-full">
      {/* Peça (designation) */}
      <div className="flex flex-col gap-[8px] w-full" data-field="designation">
        <Label className="text-[14px] text-[#27272a]">Peça *</Label>
        <Input
          placeholder="Designação"
          value={designation}
          onChange={(e) => { setDesignation(e.target.value); clearError("designation"); }}
          autoFocus
          className={`h-[40px] rounded-[8px] ${errorFields.has("designation") ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white text-[14px] text-[#27272a] placeholder:text-[#d4d4d8] px-[12px]`}
        />
        <FieldError show={errorFields.has("designation")} />
      </div>

      {/* Referência */}
      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Referência</Label>
        <Input
          placeholder="Referência"
          value={referenceOEM}
          onChange={(e) => setReferenceOEM(e.target.value)}
          className="h-[40px] rounded-[8px] border-[#e5e5e5] bg-white text-[14px] text-[#27272a] placeholder:text-[#d4d4d8] px-[12px]"
        />
        {oemReference && (
          <span className="text-[12px] text-[#71717a] font-normal leading-[1.5]">
            Referência OEM: {oemReference}
          </span>
        )}
      </div>

      {/* Qtd. */}
      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Quantidade *</Label>
        <input
          type="text"
          inputMode="numeric"
          value={quantity}
          onFocus={() => {
            setQuantity(quantity.replace(/\s/g, ""));
          }}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            setQuantity(raw);
          }}
          onBlur={() => {
            if (!quantity || parseInt(quantity.replace(/\s/g, ""), 10) <= 0) { setQuantity("1"); return; }
            const num = parseInt(quantity.replace(/\s/g, ""), 10);
            setQuantity(String(num).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
          }}
          className="flex h-[40px] w-full rounded-[8px] border border-[#e5e5e5] bg-white text-[14px] text-[#3f3f46] px-[12px] outline-none min-w-0 transition-none focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:ring-[3px]"
        />
      </div>

      {/* Tipo de peça */}
      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Tipo de peça *</Label>
        <Select value={partType} onValueChange={(v) => setPartType(v as "OEM" | "IAM" | "generic")}>
          <SelectTrigger className="h-[40px] rounded-[8px] border-[#e5e5e5] bg-white text-[14px] text-[#27272a] font-normal px-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            <SelectValue placeholder="Tipo de peça" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OEM">Peça OEM</SelectItem>
            <SelectItem value="IAM">Peça IAM</SelectItem>
            <SelectItem value="generic">Peça genérica</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Custo unitário */}
      <div className="flex flex-col gap-[16px] w-full">
        <div className="flex flex-col gap-[8px] w-full" data-field="partUnitCost">
          <Label className="text-[14px] text-[#27272a]">Custo unitário *</Label>
          <div className="relative">
            <div className={`flex items-center h-[40px] rounded-[8px] border ${errorFields.has("partUnitCost") ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white pl-[12px] pr-[56px] transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/20 focus-within:ring-[3px]`}>
              <input
                type="text"
                inputMode="decimal"
                value={unitCost}
                placeholder="0,00"
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9.,]/g, "");
                  handleUnitCostChangeWithCalc(raw);
                  clearError("partUnitCost");
                }}
                onBlur={handleUnitCostBlurWithCalc}
                className="bg-transparent border-none outline-none text-[14px] text-[#3f3f46] placeholder:text-[#3f3f46] p-0 m-0 w-full min-w-0 transition-none"
              />
              <span className="text-[14px] text-[#71717a] shrink-0 ml-[8px]">€</span>
            </div>
            <button
              type="button"
              onClick={handleToggleCalc}
              className={`absolute right-[4px] top-1/2 -translate-y-1/2 flex items-center justify-center size-[32px] rounded-[6px] border shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer transition-colors duration-200 ease-out ${
                calcOpen
                  ? "bg-[rgba(130,112,255,0.15)] border-[#e5e5e5]"
                  : "bg-white border-[#e5e5e5] not-disabled:hover:bg-[#e4e4e7]"
              }`}
              title="Calculadora"
            >
              <svg className="size-[16px]" fill="none" viewBox="0 0 12 14.6667">
                <path d={svgCalc.p3efb4f80} fill="#27272A" />
              </svg>
            </button>
          </div>
          {oemCost > 0 && (
            <span className="text-[12px] text-[#71717a] font-normal leading-[1.5]">
              Custo unitário OEM: {oemCost.toFixed(2).replace(".", ",")} €
            </span>
          )}
          <FieldError show={errorFields.has("partUnitCost")} />
        </div>

        {/* Cost Calculator Panel */}
        {calcOpen && (
          <div className="flex flex-col items-start p-[8px] rounded-[8px] bg-[rgba(39,39,42,0.05)] w-full animate-in fade-in duration-200">
            <div className="flex gap-[8px] items-end w-full">
              {/* Preço de retalho */}
              <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                <span className="text-[14px] text-[#27272a] font-normal leading-[1.5]">Preço de retalho</span>
                <div className="flex items-center h-[40px] rounded-[8px] border border-[#e5e5e5] bg-white px-[12px] transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/20 focus-within:ring-[3px]">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={retailPrice}
                    placeholder="0,00"
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9.,]/g, "");
                      handleRetailPriceChange(raw);
                    }}
                    onBlur={handleRetailPriceBlur}
                    className="bg-transparent border-none outline-none text-[14px] text-[#3f3f46] placeholder:text-[#3f3f46] p-0 m-0 w-full min-w-0 transition-none"
                  />
                  <span className="text-[14px] text-[#71717a] shrink-0 ml-[8px]">€</span>
                </div>
              </div>

              {/* x separator */}
              <div className="flex items-center py-[12px] shrink-0">
                <span className="text-[14px] text-[#27272a] font-normal leading-[1.5]">x</span>
              </div>

              {/* Desconto */}
              <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                <span className="text-[14px] text-[#27272a] font-normal leading-[1.5]">Desconto</span>
                <div className="flex items-center h-[40px] rounded-[8px] border border-[#e5e5e5] bg-white px-[12px] transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/20 focus-within:ring-[3px]">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={retailDiscount}
                    placeholder="0"
                    onChange={(e) => handleRetailDiscountChange(e.target.value)}
                    className="bg-transparent border-none outline-none text-[14px] text-[#3f3f46] placeholder:text-[#3f3f46] p-0 m-0 w-full min-w-0 transition-none"
                  />
                  <span className="text-[14px] text-[#3f3f46] select-none shrink-0">%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Markup */}
      <div className="flex flex-col gap-[8px] w-full">
        <div className="flex gap-[4px] items-center">
          <Label className="text-[14px] text-[#27272a]">Markup</Label>
          <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Info className="size-[12px] text-[#a1a1aa] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Markup(%): Lucro de venda / Preço de compra</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </div>
        <div className="flex gap-[8px] items-start w-full">
          <Tabs
            value={activePreset !== null ? String(activePreset) : ""}
            onValueChange={(v) => handlePresetClick(Number(v))}
            className="flex-1 min-w-0"
          >
            <TabsList className="w-full">
              {MARKUP_PRESETS.map((preset) => (
                <TabsTrigger key={preset} value={String(preset)}>
                  {preset} %
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="w-[64px] shrink-0">
            <div className="flex items-center h-[34px] rounded-[8px] border border-[#e5e5e5] bg-white px-[12px] transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/20 focus-within:ring-[3px]">
              <input
                inputMode="numeric"
                value={activePreset !== null ? "" : customMarkup}
                placeholder="0"
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9]/g, "");
                  handleCustomMarkupChange(v);
                }}
                className="bg-transparent border-none outline-none text-[14px] text-[#3f3f46] placeholder:text-[#d4d4d8] p-0 m-0 w-full min-w-0 transition-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preço unitário (readonly, calculated) */}
      <ReadonlyField label="Preço unitário" value={formatCurrency(unitPrice)} />

      {/* Desconto */}
      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Desconto</Label>
        <DiscountInput value={discount} onChange={setDiscount} />
      </div>

      <ReadonlyField label="Subtotal" value={formatCurrency(subtotal)} />

      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Taxa de IVA</Label>
        <VatSelect value={vatRate} onChange={setVatRate} />
      </div>

      <ReadonlyField label="Total c/ IVA" value={formatCurrency(total)} />
    </div>
  );
}

// ─── Consumable Fields ────────────────────────────────────────────────────────

function ConsumableFields({
  designation, setDesignation,
  calcType, setCalcType,
  quantity, setQuantity,
  unitPrice, setUnitPrice,
  percentage, setPercentage,
  targetItemId, setTargetItemId,
  discount, setDiscount,
  vatRate, setVatRate,
  subtotal, total,
  calculatedPrice,
  serviceItems,
  errorFields = EMPTY_ERRORS, clearError = NOOP_CLEAR,
}: {
  designation: string; setDesignation: (v: string) => void;
  calcType: ConsumableCalcType; setCalcType: (v: ConsumableCalcType) => void;
  quantity: string; setQuantity: (v: string) => void;
  unitPrice: string; setUnitPrice: (v: string) => void;
  percentage: string; setPercentage: (v: string) => void;
  targetItemId: string; setTargetItemId: (v: string) => void;
  discount: string; setDiscount: (v: string) => void;
  vatRate: string; setVatRate: (v: string) => void;
  subtotal: number; total: number;
  calculatedPrice: number;
  serviceItems: ServiceItem[];
  errorFields?: Set<string>; clearError?: (f: string) => void;
}) {
  // Filter items for "Incidir sobre" — only labor + parts
  const targetableItems = useMemo(
    () => serviceItems.filter((i) => i.type === "labor" || i.type === "parts"),
    [serviceItems]
  );

  return (
    <div className="flex flex-col gap-[16px] w-full">
      {/* Designação */}
      <div className="flex flex-col gap-[8px] w-full" data-field="designation">
        <Label className="text-[14px] text-[#27272a]">Consumível *</Label>
        <Input
          placeholder="Designação"
          value={designation}
          onChange={(e) => { setDesignation(e.target.value); clearError("designation"); }}
          autoFocus
          className={`h-[40px] rounded-[8px] ${errorFields.has("designation") ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white text-[14px] text-[#27272a] placeholder:text-[#d4d4d8] px-[12px]`}
        />
        <FieldError show={errorFields.has("designation")} />
      </div>

      {/* Tipo (Radio Group) */}
      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Tipo *</Label>
        <RadioGroup
          value={calcType}
          onValueChange={(v) => setCalcType(v as ConsumableCalcType)}
          className="flex flex-col gap-[8px]"
        >
          <div className="flex items-center gap-[8px]">
            <RadioGroupItem value="fixed" id="ct-fixed" className="size-[18px]" />
            <label htmlFor="ct-fixed" className="text-[14px] text-[#27272a] cursor-pointer">Valor fixo</label>
          </div>
          <div className="flex items-center gap-[8px]">
            <RadioGroupItem value="percentItem" id="ct-percentItem" className="size-[18px]" />
            <label htmlFor="ct-percentItem" className="text-[14px] text-[#27272a] cursor-pointer">% de item</label>
          </div>
          <div className="flex items-center gap-[8px]">
            <RadioGroupItem value="percentService" id="ct-percentService" className="size-[18px]" />
            <label htmlFor="ct-percentService" className="text-[14px] text-[#27272a] cursor-pointer">% do serviço</label>
          </div>
        </RadioGroup>
      </div>

      {/* Dynamic fields based on calcType with dissolve transition */}
      <div className="flex flex-col gap-[16px] w-full">
        {calcType === "fixed" && (
          <div className="flex flex-col gap-[16px] w-full animate-in fade-in duration-200">
            {/* Quantidade */}
            <div className="flex flex-col gap-[8px] w-full">
              <Label className="text-[14px] text-[#27272a]">Quantidade *</Label>
              <input
                type="text"
                inputMode="decimal"
                value={quantity}
                onFocus={() => {
                  setQuantity(quantity.replace(/\s/g, ""));
                }}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") { setQuantity(""); return; }
                  if (/^[0-9]*[,.]?[0-9]*$/.test(val)) {
                    setQuantity(val.replace(".", ","));
                  }
                }}
                onBlur={() => {
                  if (!quantity) { setQuantity("1"); return; }
                  const num = parseFloat(quantity.replace(",", "."));
                  if (isNaN(num) || num <= 0) { setQuantity("1"); return; }
                  if (num % 1 === 0) {
                    setQuantity(String(num).replace(/\B(?=(\d{3})+(?!\d))/g, " "));
                    return;
                  }
                  const fixed = num.toFixed(2).replace(".", ",").replace(/0+$/, "");
                  const [intPart, decPart] = fixed.split(",");
                  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                  setQuantity(decPart ? `${formattedInt},${decPart}` : formattedInt);
                }}
                className="flex h-[40px] w-full rounded-[8px] border border-[#e5e5e5] bg-white text-[14px] text-[#3f3f46] px-[12px] outline-none min-w-0 transition-none focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:ring-[3px]"
              />
            </div>

            {/* Preço unitário */}
            <div className="flex flex-col gap-[8px] w-full" data-field="consUnitPrice">
              <Label className="text-[14px] text-[#27272a]">Preço unitário *</Label>
              <div className={`flex items-center h-[40px] rounded-[8px] border ${errorFields.has("consUnitPrice") ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white px-[12px] transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/20 focus-within:ring-[3px]`}>
                <input
                  type="text"
                  inputMode="decimal"
                  value={unitPrice}
                  placeholder="0,00"
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.,]/g, "");
                    setUnitPrice(raw);
                    clearError("consUnitPrice");
                  }}
                  onBlur={() => {
                    if (!unitPrice) return;
                    const normalized = unitPrice.replace(",", ".");
                    const num = parseFloat(normalized);
                    if (isNaN(num)) { setUnitPrice(""); return; }
                    setUnitPrice(num.toFixed(2).replace(".", ","));
                  }}
                  className="bg-transparent border-none outline-none text-[14px] text-[#3f3f46] placeholder:text-[#3f3f46] p-0 m-0 w-full min-w-0 transition-none"
                />
                <span className="text-[14px] text-[#71717a] shrink-0 ml-[8px]">€</span>
              </div>
              <FieldError show={errorFields.has("consUnitPrice")} />
            </div>
          </div>
        )}

        {calcType === "percentItem" && (
          <div className="flex flex-col gap-[16px] w-full animate-in fade-in duration-200">
            {/* Incidir sobre */}
            <div className="flex flex-col gap-[8px] w-full" data-field="consTargetItemId">
              <Label className="text-[14px] text-[#27272a]">Incidir sobre *</Label>
              <Select value={targetItemId} onValueChange={(v) => { setTargetItemId(v); clearError("consTargetItemId"); }}>
                <SelectTrigger className={`h-[40px] rounded-[8px] ${errorFields.has("consTargetItemId") ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white text-[14px] text-[#27272a] font-normal px-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]`}>
                  <SelectValue placeholder="Item" />
                </SelectTrigger>
                <SelectContent>
                  {targetableItems.length === 0 ? (
                    <div className="px-[12px] py-[8px] text-[14px] text-[#a1a1aa]">
                      Sem itens disponíveis
                    </div>
                  ) : (
                    targetableItems.map((item) => (
                      <SelectPrimitive.Item
                        key={item.id}
                        value={item.id}
                        className="relative flex w-full cursor-default items-center gap-[8px] rounded-sm py-[8px] pr-[8px] pl-[8px] text-sm outline-hidden select-none focus:bg-[#f4f4f5] transition-colors duration-200 ease-out"
                      >
                        <span className="flex size-4 shrink-0 items-center justify-center">
                          <SelectPrimitive.ItemIndicator>
                            <Check className="size-4 text-[#3f3f46]" />
                          </SelectPrimitive.ItemIndicator>
                        </span>
                        <SelectPrimitive.ItemText>
                          <span className="text-[14px] text-[#3f3f46]">
                            {item.designation || (item.type === "labor" ? "Mão de obra" : "Peça")}
                          </span>
                        </SelectPrimitive.ItemText>
                      </SelectPrimitive.Item>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FieldError show={errorFields.has("consTargetItemId")} />
            </div>

            {/* Percentagem */}
            <div className="flex flex-col gap-[8px] w-full" data-field="consPercentage">
              <Label className="text-[14px] text-[#27272a]">Percentagem *</Label>
              <DiscountInput value={percentage} onChange={(v) => { setPercentage(v); clearError("consPercentage"); }} error={errorFields.has("consPercentage")} />
              <FieldError show={errorFields.has("consPercentage")} />
            </div>

            {/* Preço unitário (readonly, calculated) */}
            <ReadonlyField label="Preço unitário" value={formatCurrency(calculatedPrice)} />
          </div>
        )}

        {calcType === "percentService" && (
          <div className="flex flex-col gap-[16px] w-full animate-in fade-in duration-200">
            {/* Percentagem */}
            <div className="flex flex-col gap-[8px] w-full" data-field="consPercentage">
              <Label className="text-[14px] text-[#27272a]">Percentagem *</Label>
              <DiscountInput value={percentage} onChange={(v) => { setPercentage(v); clearError("consPercentage"); }} error={errorFields.has("consPercentage")} />
              <FieldError show={errorFields.has("consPercentage")} />
            </div>

            {/* Preço unitário (readonly, calculated) */}
            <ReadonlyField label="Preço unitário" value={formatCurrency(calculatedPrice)} />
          </div>
        )}
      </div>

      {/* Desconto */}
      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Desconto</Label>
        <DiscountInput value={discount} onChange={setDiscount} />
      </div>

      {/* Subtotal */}
      <ReadonlyField label="Subtotal" value={formatCurrency(subtotal)} />

      {/* Taxa de IVA */}
      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Taxa de IVA</Label>
        <VatSelect value={vatRate} onChange={setVatRate} />
      </div>

      {/* Total c/ IVA */}
      <ReadonlyField label="Total c/ IVA" value={formatCurrency(total)} />
    </div>
  );
}

// ─── Charge Fields (Encargo adicional) ────────────────────────────────────────
type ChargeCalcType = "fixed" | "percentItem" | "percentService";

function ChargeFields({
  designation, setDesignation,
  calcType, setCalcType,
  unitPrice, setUnitPrice,
  percentage, setPercentage,
  targetItemId, setTargetItemId,
  discount, setDiscount,
  vatRate, setVatRate,
  subtotal, total,
  calculatedPrice,
  serviceItems,
  errorFields = EMPTY_ERRORS, clearError = NOOP_CLEAR,
}: {
  designation: string; setDesignation: (v: string) => void;
  calcType: ChargeCalcType; setCalcType: (v: ChargeCalcType) => void;
  unitPrice: string; setUnitPrice: (v: string) => void;
  percentage: string; setPercentage: (v: string) => void;
  targetItemId: string; setTargetItemId: (v: string) => void;
  discount: string; setDiscount: (v: string) => void;
  vatRate: string; setVatRate: (v: string) => void;
  subtotal: number; total: number;
  calculatedPrice: number;
  serviceItems: ServiceItem[];
  errorFields?: Set<string>; clearError?: (f: string) => void;
}) {
  // Filter items for "Incidir sobre" — only labor + parts
  const targetableItems = useMemo(
    () => serviceItems.filter((i) => i.type === "labor" || i.type === "parts"),
    [serviceItems]
  );

  return (
    <div className="flex flex-col gap-[16px] w-full">
      {/* Designação */}
      <div className="flex flex-col gap-[8px] w-full" data-field="designation">
        <Label className="text-[14px] text-[#27272a]">Encargo *</Label>
        <Input
          placeholder="Designação"
          value={designation}
          onChange={(e) => { setDesignation(e.target.value); clearError("designation"); }}
          autoFocus
          className={`h-[40px] rounded-[8px] ${errorFields.has("designation") ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white text-[14px] text-[#27272a] placeholder:text-[#d4d4d8] px-[12px]`}
        />
        <FieldError show={errorFields.has("designation")} />
      </div>

      {/* Tipo de cálculo (Radio Group) */}
      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Tipo</Label>
        <RadioGroup
          value={calcType}
          onValueChange={(v) => setCalcType(v as ChargeCalcType)}
          className="flex flex-col gap-[8px]"
        >
          <div className="flex items-center gap-[8px]">
            <RadioGroupItem value="fixed" id="charge-fixed" className="size-[18px]" />
            <label htmlFor="charge-fixed" className="text-[14px] text-[#27272a] cursor-pointer">Valor fixo</label>
          </div>
          <div className="flex items-center gap-[8px]">
            <RadioGroupItem value="percentItem" id="charge-percentItem" className="size-[18px]" />
            <label htmlFor="charge-percentItem" className="text-[14px] text-[#27272a] cursor-pointer">% do item</label>
          </div>
          <div className="flex items-center gap-[8px]">
            <RadioGroupItem value="percentService" id="charge-percentService" className="size-[18px]" />
            <label htmlFor="charge-percentService" className="text-[14px] text-[#27272a] cursor-pointer">% do serviço</label>
          </div>
        </RadioGroup>
      </div>

      {/* Dynamic fields based on calcType with dissolve transition */}
      <div className="flex flex-col gap-[16px] w-full">
        {calcType === "fixed" && (
          <div className="flex flex-col gap-[16px] w-full animate-in fade-in duration-200">
            {/* Preço */}
            <div className="flex flex-col gap-[8px] w-full" data-field="chargeUnitPrice">
              <Label className="text-[14px] text-[#27272a]">Preço unitário *</Label>
              <div className={`flex items-center h-[40px] rounded-[8px] border ${errorFields.has("chargeUnitPrice") ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white px-[12px] transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/20 focus-within:ring-[3px]`}>
                <input
                  type="text"
                  inputMode="decimal"
                  value={unitPrice}
                  placeholder="0,00"
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.,]/g, "");
                    setUnitPrice(raw);
                    clearError("chargeUnitPrice");
                  }}
                  onBlur={() => {
                    if (!unitPrice) return;
                    const normalized = unitPrice.replace(",", ".");
                    const num = parseFloat(normalized);
                    if (isNaN(num)) { setUnitPrice(""); return; }
                    setUnitPrice(num.toFixed(2).replace(".", ","));
                  }}
                  className="bg-transparent border-none outline-none text-[14px] text-[#3f3f46] placeholder:text-[#3f3f46] p-0 m-0 w-full min-w-0 transition-none"
                />
                <span className="text-[14px] text-[#71717a] shrink-0 ml-[8px]">€</span>
              </div>
              <FieldError show={errorFields.has("chargeUnitPrice")} />
            </div>
          </div>
        )}

        {calcType === "percentItem" && (
          <div className="flex flex-col gap-[16px] w-full animate-in fade-in duration-200">
            {/* Incidir sobre */}
            <div className="flex flex-col gap-[8px] w-full" data-field="chargeTargetItemId">
              <Label className="text-[14px] text-[#27272a]">Incidir sobre *</Label>
              <Select value={targetItemId} onValueChange={(v) => { setTargetItemId(v); clearError("chargeTargetItemId"); }}>
                <SelectTrigger className={`h-[40px] rounded-[8px] ${errorFields.has("chargeTargetItemId") ? "border-[#ef4444]" : "border-[#e5e5e5]"} bg-white text-[14px] text-[#27272a] font-normal px-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]`}>
                  <SelectValue placeholder="Item" />
                </SelectTrigger>
                <SelectContent>
                  {targetableItems.length === 0 ? (
                    <div className="px-[12px] py-[8px] text-[14px] text-[#a1a1aa]">
                      Sem itens disponíveis
                    </div>
                  ) : (
                    targetableItems.map((item) => (
                      <SelectPrimitive.Item
                        key={item.id}
                        value={item.id}
                        className="relative flex w-full cursor-default items-center gap-[8px] rounded-sm py-[8px] pr-[8px] pl-[8px] text-sm outline-hidden select-none focus:bg-[#f4f4f5] transition-colors duration-200 ease-out"
                      >
                        <span className="flex size-4 shrink-0 items-center justify-center">
                          <SelectPrimitive.ItemIndicator>
                            <Check className="size-4 text-[#3f3f46]" />
                          </SelectPrimitive.ItemIndicator>
                        </span>
                        <SelectPrimitive.ItemText>
                          <span className="text-[14px] text-[#3f3f46]">
                            {item.designation || (item.type === "labor" ? "Mão de obra" : "Peça")}
                          </span>
                        </SelectPrimitive.ItemText>
                      </SelectPrimitive.Item>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FieldError show={errorFields.has("chargeTargetItemId")} />
            </div>

            {/* Percentagem */}
            <div className="flex flex-col gap-[8px] w-full" data-field="chargePercentage">
              <Label className="text-[14px] text-[#27272a]">Percentagem *</Label>
              <DiscountInput value={percentage} onChange={(v) => { setPercentage(v); clearError("chargePercentage"); }} error={errorFields.has("chargePercentage")} />
              <FieldError show={errorFields.has("chargePercentage")} />
            </div>

            {/* Preço unitário (readonly, calculated) */}
            <ReadonlyField label="Preço unitário" value={formatCurrency(calculatedPrice)} />
          </div>
        )}

        {calcType === "percentService" && (
          <div className="flex flex-col gap-[16px] w-full animate-in fade-in duration-200">
            {/* Percentagem */}
            <div className="flex flex-col gap-[8px] w-full" data-field="chargePercentage">
              <Label className="text-[14px] text-[#27272a]">Percentagem *</Label>
              <DiscountInput value={percentage} onChange={(v) => { setPercentage(v); clearError("chargePercentage"); }} error={errorFields.has("chargePercentage")} />
              <FieldError show={errorFields.has("chargePercentage")} />
            </div>

            {/* Preço unitário (readonly, calculated) */}
            <ReadonlyField label="Preço unitário" value={formatCurrency(calculatedPrice)} />
          </div>
        )}
      </div>

      {/* Desconto */}
      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Desconto</Label>
        <DiscountInput value={discount} onChange={setDiscount} />
      </div>

      {/* Subtotal */}
      <ReadonlyField label="Subtotal" value={formatCurrency(subtotal)} />

      {/* Taxa de IVA */}
      <div className="flex flex-col gap-[8px] w-full">
        <Label className="text-[14px] text-[#27272a]">Taxa de IVA</Label>
        <VatSelect value={vatRate} onChange={setVatRate} />
      </div>

      {/* Total c/ IVA */}
      <ReadonlyField label="Total c/ IVA" value={formatCurrency(total)} />
    </div>
  );
}

// ─── Main Sheet ────────────────────────────────���──────────────────────────────

export function NewItemSheet({ open, onOpenChange, onSave, preselectedType, editItem, serviceItems = [] }: NewItemSheetProps) {
  const isEditMode = !!editItem;
  const [selectedType, setSelectedType] = useState<ItemType | null>(null);

  // ── Shared form state ──
  const [designation, setDesignation] = useState("");
  const [discount, setDiscount] = useState("");
  const [vatRate, setVatRate] = useState("23");

  // ── Labor-specific ──
  const [hours, setHours] = useState("00h00");
  const [pricePerHour, setPricePerHour] = useState("50");

  // ── Consumable-specific ─��
  const [consCalcType, setConsCalcType] = useState<ConsumableCalcType>("fixed");
  const [consQuantity, setConsQuantity] = useState("1");
  const [consUnitPrice, setConsUnitPrice] = useState("");
  const [consPercentage, setConsPercentage] = useState("");
  const [consTargetItemId, setConsTargetItemId] = useState("");

  // ── Charge-specific ──
  const [chargeCalcType, setChargeCalcType] = useState<ChargeCalcType>("fixed");
  const [chargeUnitPrice, setChargeUnitPrice] = useState("");
  const [chargePercentage, setChargePercentage] = useState("");
  const [chargeTargetItemId, setChargeTargetItemId] = useState("");

  // ── Part-specific ──
  const [partReferenceOEM, setPartReferenceOEM] = useState("");
  const [partQuantity, setPartQuantity] = useState("1");
  const [partType, setPartType] = useState<"OEM" | "IAM" | "generic">("OEM");
  const [partUnitCost, setPartUnitCost] = useState("");
  const [partOemCost, setPartOemCost] = useState<number>(0);
  const [partOemReference, setPartOemReference] = useState("");
  const [partMarkup, setPartMarkup] = useState<number | null>(15);
  const [partCustomMarkup, setPartCustomMarkup] = useState("");
  const [partRetailPrice, setPartRetailPrice] = useState("");
  const [partRetailDiscount, setPartRetailDiscount] = useState("");
  const [partCalcOpen, setPartCalcOpen] = useState(false);

  // ── Scroll fade detection ──
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollTop, setCanScrollTop] = useState(false);
  const [canScrollBottom, setCanScrollBottom] = useState(false);

  const updateScrollFade = useCallback(() => {
    const el = scrollRef.current;
    if (!el) { setCanScrollTop(false); setCanScrollBottom(false); return; }
    setCanScrollTop(el.scrollTop > 0);
    setCanScrollBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollFade();
    el.addEventListener("scroll", updateScrollFade, { passive: true });
    const ro = new ResizeObserver(updateScrollFade);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", updateScrollFade); ro.disconnect(); };
  }, [updateScrollFade, selectedType]);

  const scrollMask = (() => {
    if (canScrollTop && canScrollBottom) return "linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent)";
    if (canScrollTop) return "linear-gradient(to bottom, transparent, black 24px)";
    if (canScrollBottom) return "linear-gradient(to bottom, black calc(100% - 24px), transparent)";
    return "none";
  })();

  // Populate form from editItem or preselectedType when sheet opens
  useEffect(() => {
    if (!open) return;

    if (editItem) {
      const localType = toLocalType(editItem.type);
      setSelectedType(localType);
      setDesignation(editItem.designation);
      setDiscount(editItem.discount > 0 ? String(editItem.discount) : "");
      setVatRate(String(editItem.vat));

      if (editItem.type === "labor") {
        const labor = editItem as LaborItem;
        setHours(formatHoursDisplay(labor.hours));
        setPricePerHour(String(labor.pricePerHour));
      } else if (editItem.type === "consumables") {
        const cons = editItem as ConsumableItem;
        const ct = (cons.calculationType === "percentItem" || cons.calculationType === "percentService")
          ? cons.calculationType as ConsumableCalcType
          : "fixed";
        setConsCalcType(ct);
        setConsQuantity(String(cons.quantity));
        if (ct === "fixed") {
          setConsUnitPrice(cons.unitPrice > 0 ? cons.unitPrice.toFixed(2).replace(".", ",") : "");
        } else {
          setConsPercentage(cons.percentage != null && cons.percentage > 0 ? String(cons.percentage) : "");
          setConsTargetItemId(cons.targetItemId || "");
        }
      } else if (editItem.type === "parts") {
        const part = editItem as PartItem;
        setPartReferenceOEM(part.referenceOEM || "");
        setPartQuantity(String(part.quantity));
        setPartType((part.partType === "IAM" ? "IAM" : part.partType === "generic" ? "generic" : "OEM") as "OEM" | "IAM" | "generic");
        const costVal = part.costOEM > 0 ? part.costOEM.toFixed(2).replace(".", ",") : "";
        setPartUnitCost(costVal);
        setPartOemCost(part.costOEM);
        setPartOemReference(part.referenceOEM || "");
        if (part.retailPrice > 0) {
          setPartRetailPrice(part.retailPrice.toFixed(2).replace(".", ","));
        }
        if (part.retailDiscount > 0) {
          setPartRetailDiscount(String(part.retailDiscount));
          setPartCalcOpen(true);
        }
        if (MARKUP_PRESETS.includes(part.markup)) {
          setPartMarkup(part.markup);
          setPartCustomMarkup("");
        } else if (part.markup > 0) {
          setPartMarkup(part.markup);
          setPartCustomMarkup(String(part.markup));
        } else {
          setPartMarkup(null);
          setPartCustomMarkup("");
        }
      } else if (editItem.type === "additional") {
        const charge = editItem as AdditionalChargeItem;
        const ct = (charge.calculationType === "percentItem" || charge.calculationType === "percentService")
          ? charge.calculationType as ChargeCalcType
          : "fixed";
        setChargeCalcType(ct);
        if (ct === "fixed") {
          setChargeUnitPrice(charge.unitPrice > 0 ? charge.unitPrice.toFixed(2).replace(".", ",") : "");
        } else {
          setChargePercentage(charge.percentage != null && charge.percentage > 0 ? String(charge.percentage) : "");
          setChargeTargetItemId(charge.targetItemId || "");
        }
      }
    } else if (preselectedType) {
      setSelectedType(preselectedType);
    }
  }, [open, editItem, preselectedType]);

  // ── Labor computed values ──
  const hoursNum = parseHoursString(hours);
  const discountNum = parseInt(discount, 10) || 0;
  const pricePerHourNum = parseFloat(pricePerHour) || 0;
  const vatNum = parseFloat(vatRate) || 23;

  const laborPartialItem: LaborItem = {
    id: "", type: "labor", designation,
    hours: hoursNum, pricePerHour: pricePerHourNum,
    discount: discountNum, subtotal: 0, vat: vatNum, total: 0, order: 0,
  };
  const laborSubtotal = calcLaborSubtotal(laborPartialItem);
  const laborTotal = calcLaborTotal(laborPartialItem);

  // ── Part computed values ──
  const partQuantityNum = Math.max(1, parseInt(partQuantity.replace(/\s/g, ""), 10) || 1);
  const partUnitCostNum = parseFloat(partUnitCost.replace(/[€\s\u00a0]/g, "").replace(",", ".")) || 0;
  const partMarkupNum = partMarkup ?? 0;
  const partComputedUnitPrice = partUnitCostNum * (1 + partMarkupNum / 100);
  const partRetailPriceNum = parseFloat(partRetailPrice.replace(/[€\s\u00a0]/g, "").replace(",", ".")) || 0;
  const partRetailDiscountNum = parseFloat(partRetailDiscount) || 0;

  const partPartialItem: PartItem = {
    id: "", type: "parts", designation,
    referenceOEM: partReferenceOEM,
    reference: "",
    quantity: partQuantityNum,
    partType: partType,
    costOEM: partUnitCostNum,
    unitCost: partUnitCostNum,
    retailDiscount: partRetailDiscountNum,
    markup: partMarkupNum,
    retailPrice: partRetailPriceNum,
    unitPrice: partComputedUnitPrice,
    discount: discountNum,
    subtotal: 0, vat: vatNum, total: 0, order: 0,
  };
  const partSubtotal = calcPartSubtotal(partPartialItem);
  const partTotal = calcPartTotal(partPartialItem);

  // ── Consumable computed values ──
  const consQuantityNum = Math.max(0.01, parseFloat(consQuantity.replace(/\s/g, "").replace(",", ".")) || 1);
  const consUnitPriceNum = parseFloat(consUnitPrice.replace(",", ".")) || 0;
  const consPercentageNum = parseInt(consPercentage, 10) || 0;

  // Calculate the "calculated price" for percentage modes
  const consCalculatedPrice = useMemo(() => {
    if (consCalcType === "percentItem") {
      if (!consTargetItemId) return 0;
      const target = serviceItems.find((i) => i.id === consTargetItemId);
      if (!target) return 0;
      return calcItemSubtotal(target) * (consPercentageNum / 100);
    }
    if (consCalcType === "percentService") {
      // Sum subtotals of all non-consumable items in the service (avoid circular)
      const serviceSubtotal = serviceItems
        .filter((i) => i.type !== "consumables" && i.type !== "additional")
        .reduce((sum, i) => sum + calcItemSubtotal(i), 0);
      return serviceSubtotal * (consPercentageNum / 100);
    }
    return 0;
  }, [consCalcType, consTargetItemId, consPercentageNum, serviceItems]);

  // The effective unit price for consumable
  const consEffectiveUnitPrice = consCalcType === "fixed"
    ? consUnitPriceNum
    : consCalculatedPrice;

  // For percentage modes, quantity is 1
  const consEffectiveQuantity = consCalcType === "fixed" ? consQuantityNum : 1;

  const consPartialItem: ConsumableItem = {
    id: "", type: "consumables", designation,
    calculationType: consCalcType,
    unitCost: 0, quantity: consEffectiveQuantity,
    markup: 0, retailPrice: 0, retailDiscount: 0,
    unitPrice: consEffectiveUnitPrice,
    discount: discountNum, subtotal: 0, vat: vatNum, total: 0, order: 0,
    targetItemId: consCalcType === "percentItem" ? consTargetItemId || undefined : undefined,
    percentage: consCalcType !== "fixed" ? consPercentageNum : undefined,
  };
  const consSubtotal = calcConsumableSubtotal(consPartialItem);
  const consTotal = calcConsumableTotal(consPartialItem);

  // ── Charge computed values ──
  const chargeUnitPriceNum = parseFloat(chargeUnitPrice.replace(",", ".")) || 0;
  const chargePercentageNum = parseInt(chargePercentage, 10) || 0;

  // Calculate the "calculated price" for percentage modes
  const chargeCalculatedPrice = useMemo(() => {
    if (chargeCalcType === "percentItem") {
      if (!chargeTargetItemId) return 0;
      const target = serviceItems.find((i) => i.id === chargeTargetItemId);
      if (!target) return 0;
      return calcItemSubtotal(target) * (chargePercentageNum / 100);
    }
    if (chargeCalcType === "percentService") {
      // Sum subtotals of all non-consumable items in the service (avoid circular)
      const serviceSubtotal = serviceItems
        .filter((i) => i.type !== "consumables" && i.type !== "additional")
        .reduce((sum, i) => sum + calcItemSubtotal(i), 0);
      return serviceSubtotal * (chargePercentageNum / 100);
    }
    return 0;
  }, [chargeCalcType, chargeTargetItemId, chargePercentageNum, serviceItems]);

  // The effective unit price for charge
  const chargeEffectiveUnitPrice = chargeCalcType === "fixed"
    ? chargeUnitPriceNum
    : chargeCalculatedPrice;

  const chargePartialItem: AdditionalChargeItem = {
    id: "", type: "additional", designation,
    calculationType: chargeCalcType,
    quantity: 1,
    unitPrice: chargeEffectiveUnitPrice,
    discount: discountNum,
    subtotal: 0, vat: vatNum, total: 0, order: 0,
    targetItemId: chargeCalcType === "percentItem" ? chargeTargetItemId || undefined : undefined,
    percentage: chargeCalcType !== "fixed" ? chargePercentageNum : undefined,
  };
  const chargeSubtotal = calcAdditionalSubtotal(chargePartialItem);
  const chargeTotal = calcAdditionalTotal(chargePartialItem);

  // ── Validation errors ──
  const [errorFields, setErrorFields] = useState<Set<string>>(new Set());

  const clearError = useCallback((field: string) => {
    setErrorFields((prev) => {
      if (!prev.has(field)) return prev;
      const next = new Set(prev);
      next.delete(field);
      return next;
    });
  }, []);

  const validate = useCallback((): Set<string> => {
    const errors = new Set<string>();
    if (!selectedType) return errors;
    if (!designation.trim()) errors.add("designation");

    if (selectedType === "labor") {
      if (hoursNum <= 0) errors.add("hours");
    }

    if (selectedType === "part") {
      if (partUnitCostNum <= 0) errors.add("partUnitCost");
    }

    if (selectedType === "consumable") {
      if (consCalcType === "fixed") {
        if (!consUnitPrice.trim()) errors.add("consUnitPrice");
      } else if (consCalcType === "percentItem") {
        if (!consTargetItemId) errors.add("consTargetItemId");
        if (!consPercentage.trim()) errors.add("consPercentage");
      } else if (consCalcType === "percentService") {
        if (!consPercentage.trim()) errors.add("consPercentage");
      }
    }

    if (selectedType === "fee") {
      if (chargeCalcType === "fixed") {
        if (!chargeUnitPrice.trim()) errors.add("chargeUnitPrice");
      } else if (chargeCalcType === "percentItem") {
        if (!chargeTargetItemId) errors.add("chargeTargetItemId");
        if (!chargePercentage.trim()) errors.add("chargePercentage");
      } else if (chargeCalcType === "percentService") {
        if (!chargePercentage.trim()) errors.add("chargePercentage");
      }
    }

    return errors;
  }, [selectedType, designation, hoursNum, partUnitCostNum, consCalcType, consUnitPrice, consTargetItemId, consPercentage, chargeCalcType, chargeUnitPrice, chargeTargetItemId, chargePercentage]);

  const resetForm = () => {
    setSelectedType(null);
    setDesignation("");
    setErrorFields(new Set());
    setDiscount("");
    setVatRate("23");
    // Labor
    setHours("00h00");
    setPricePerHour("50");
    // Consumable
    setConsCalcType("fixed");
    setConsQuantity("1");
    setConsUnitPrice("");
    setConsPercentage("");
    setConsTargetItemId("");
    // Part
    setPartReferenceOEM("");
    setPartQuantity("1");
    setPartType("OEM");
    setPartUnitCost("");
    setPartOemCost(0);
    setPartOemReference("");
    setPartMarkup(15);
    setPartCustomMarkup("");
    setPartRetailPrice("");
    setPartRetailDiscount("");
    setPartCalcOpen(false);
    // Charge
    setChargeCalcType("fixed");
    setChargeUnitPrice("");
    setChargePercentage("");
    setChargeTargetItemId("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) resetForm();
    onOpenChange(newOpen);
  };

  const handleSave = () => {
    if (!selectedType || !onSave) return;

    const errors = validate();
    if (errors.size > 0) {
      setErrorFields(errors);
      // Scroll to first error field
      requestAnimationFrame(() => {
        const container = scrollRef.current;
        if (!container) return;
        for (const field of errors) {
          const el = container.querySelector(`[data-field="${field}"]`) as HTMLElement | null;
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            break;
          }
        }
      });
      return;
    }

    if (selectedType === "labor") {
      const newItem: LaborItem = {
        id: isEditMode ? editItem!.id : generateItemId(),
        type: "labor", designation,
        hours: hoursNum, pricePerHour: pricePerHourNum,
        discount: discountNum,
        subtotal: calcLaborSubtotal(laborPartialItem),
        vat: vatNum,
        total: calcLaborTotal(laborPartialItem),
        order: isEditMode ? editItem!.order : 0,
      };
      onSave(newItem);
    } else if (selectedType === "part") {
      const newItem: PartItem = {
        id: isEditMode ? editItem!.id : generateItemId(),
        type: "parts", designation,
        referenceOEM: partReferenceOEM,
        reference: "",
        quantity: partQuantityNum,
        partType: partType,
        costOEM: partUnitCostNum,
        unitCost: partUnitCostNum,
        retailDiscount: partRetailDiscountNum,
        markup: partMarkupNum,
        retailPrice: partRetailPriceNum,
        unitPrice: partComputedUnitPrice,
        discount: discountNum,
        subtotal: partSubtotal,
        vat: vatNum,
        total: partTotal,
        order: isEditMode ? editItem!.order : 0,
      };
      onSave(newItem);
    } else if (selectedType === "consumable") {
      const newItem: ConsumableItem = {
        id: isEditMode ? editItem!.id : generateItemId(),
        type: "consumables", designation,
        calculationType: consCalcType,
        unitCost: 0,
        quantity: consEffectiveQuantity,
        markup: 0,
        retailPrice: 0,
        retailDiscount: 0,
        unitPrice: consEffectiveUnitPrice,
        discount: discountNum,
        subtotal: consSubtotal,
        vat: vatNum,
        total: consTotal,
        order: isEditMode ? editItem!.order : 0,
        targetItemId: consCalcType === "percentItem" ? consTargetItemId || undefined : undefined,
        percentage: consCalcType !== "fixed" ? consPercentageNum : undefined,
      };
      onSave(newItem);
    } else if (selectedType === "fee") {
      const newItem: AdditionalChargeItem = {
        id: isEditMode ? editItem!.id : generateItemId(),
        type: "additional", designation,
        calculationType: chargeCalcType,
        quantity: 1,
        unitPrice: chargeEffectiveUnitPrice,
        discount: discountNum,
        subtotal: chargeSubtotal,
        vat: vatNum,
        total: chargeTotal,
        order: isEditMode ? editItem!.order : 0,
        targetItemId: chargeCalcType === "percentItem" ? chargeTargetItemId || undefined : undefined,
        percentage: chargeCalcType !== "fixed" ? chargePercentageNum : undefined,
      };
      onSave(newItem);
    }

    showToast(isEditMode ? "Alterações guardadas com sucesso" : "Item adicionado com sucesso", "info");
    resetForm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  // ── Keyboard shortcuts: Enter to save, ESC to close ──
  const handleSaveRef = useRef(handleSave);
  handleSaveRef.current = handleSave;
  const handleCancelRef = useRef(handleCancel);
  handleCancelRef.current = handleCancel;

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      // Ignore if a Select/dropdown is open (Radix popper)
      if (document.querySelector("[data-radix-popper-content-wrapper]")) return;

      if (e.key === "Enter") {
        e.preventDefault();
        handleSaveRef.current();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleCancelRef.current();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="bg-[#f4f4f5] flex flex-col gap-[24px] px-[20px] py-[24px] w-[360px] sm:max-w-[360px] border-l border-[#e5e5e5] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] data-[state=open]:duration-200 data-[state=closed]:duration-200 data-[state=open]:ease-out data-[state=closed]:ease-out [&>button:last-of-type]:hidden"
      >
        {/* Header */}
        <div className="flex gap-[10px] items-start relative w-full shrink-0">
          <SheetTitle className="flex-1 text-[16px] text-[#27272a]">
            {isEditMode && selectedType ? EDIT_TITLE_MAP[selectedType] : "Novo item"}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {isEditMode ? "Editar os dados do item" : "Seleciona o tipo de item a adicionar ao serviço"}
          </SheetDescription>
          <Button
            variant="ghost"
            size="icon"
            className="size-[32px] cursor-pointer absolute right-[-8px] top-[-8px] !border-0 !shadow-none !bg-transparent hover:!bg-[#e4e4e7] focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleCancel}
          >
            <X className="size-[16px] text-[#27272a]" />
          </Button>
        </div>

        {/* Content */}
        <div
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto px-[4px] -mx-[4px] py-[3px] -my-[3px]"
            style={{
              maskImage: scrollMask,
              WebkitMaskImage: scrollMask,
            }}
          >
          <div className="flex flex-col gap-[24px]">
            {/* Type selector grid — hidden in edit mode */}
            {!isEditMode && (
              <RadioGroup
                value={selectedType}
                onValueChange={(v) => { setSelectedType(v as typeof selectedType); setErrorFields(new Set()); }}
                className="grid grid-cols-2 gap-[8px] w-full"
              >
                {ITEM_TYPES.map(({ type, label, icon }) => (
                  <label
                    key={type}
                    className={`relative flex gap-[8px] items-center h-[40px] rounded-[8px] cursor-pointer bg-white px-[16px] border transition-all duration-200 ease-out has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-[#8270FF]/20 ${
                      selectedType === type
                        ? "border-[#8270FF] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#e9ebef]"
                        : "border-[#e5e5e5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:border-[#a1a1aa] hover:bg-[#e9ebef]"
                    }`}
                  >
                    <RadioGroupItem
                      value={type}
                      className="absolute opacity-0 pointer-events-none"
                    />
                    <span className="shrink-0 size-[16px] flex items-center justify-center">{icon}</span>
                    <span className="text-[14px] text-[#27272a]">{label}</span>
                  </label>
                ))}
              </RadioGroup>
            )}

            {/* Labor details fields */}
            {selectedType === "labor" && (
              <>
                <LaborFields
                  designation={designation} setDesignation={setDesignation}
                  hours={hours} setHours={setHours}
                  pricePerHour={pricePerHour} setPricePerHour={setPricePerHour}
                  discount={discount} setDiscount={setDiscount}
                  vatRate={vatRate} setVatRate={setVatRate}
                  subtotal={laborSubtotal} total={laborTotal}
                  errorFields={errorFields} clearError={clearError}
                />
              </>
            )}

            {/* Part details fields */}
            {selectedType === "part" && (
              <>
                <PartFields
                  designation={designation} setDesignation={setDesignation}
                  referenceOEM={partReferenceOEM} setReferenceOEM={setPartReferenceOEM}
                  quantity={partQuantity} setQuantity={setPartQuantity}
                  partType={partType} setPartType={setPartType}
                  unitCost={partUnitCost} setUnitCost={setPartUnitCost}
                  markup={partMarkup} setMarkup={setPartMarkup}
                  customMarkup={partCustomMarkup} setCustomMarkup={setPartCustomMarkup}
                  discount={discount} setDiscount={setDiscount}
                  vatRate={vatRate} setVatRate={setVatRate}
                  unitPrice={partComputedUnitPrice} subtotal={partSubtotal} total={partTotal}
                  retailPrice={partRetailPrice} setRetailPrice={setPartRetailPrice}
                  retailDiscount={partRetailDiscount} setRetailDiscount={setPartRetailDiscount}
                  calcOpen={partCalcOpen} setCalcOpen={setPartCalcOpen}
                  oemCost={partOemCost}
                  oemReference={partOemReference}
                  errorFields={errorFields} clearError={clearError}
                />
              </>
            )}

            {/* Consumable details fields */}
            {selectedType === "consumable" && (
              <>
                <ConsumableFields
                  designation={designation} setDesignation={setDesignation}
                  calcType={consCalcType} setCalcType={setConsCalcType}
                  quantity={consQuantity} setQuantity={setConsQuantity}
                  unitPrice={consUnitPrice} setUnitPrice={setConsUnitPrice}
                  percentage={consPercentage} setPercentage={setConsPercentage}
                  targetItemId={consTargetItemId} setTargetItemId={setConsTargetItemId}
                  discount={discount} setDiscount={setDiscount}
                  vatRate={vatRate} setVatRate={setVatRate}
                  subtotal={consSubtotal} total={consTotal}
                  calculatedPrice={consCalculatedPrice}
                  serviceItems={serviceItems}
                  errorFields={errorFields} clearError={clearError}
                />
              </>
            )}

            {/* Charge details fields */}
            {selectedType === "fee" && (
              <>
                <ChargeFields
                  designation={designation} setDesignation={setDesignation}
                  calcType={chargeCalcType} setCalcType={setChargeCalcType}
                  unitPrice={chargeUnitPrice} setUnitPrice={setChargeUnitPrice}
                  percentage={chargePercentage} setPercentage={setChargePercentage}
                  targetItemId={chargeTargetItemId} setTargetItemId={setChargeTargetItemId}
                  discount={discount} setDiscount={setDiscount}
                  vatRate={vatRate} setVatRate={setVatRate}
                  subtotal={chargeSubtotal} total={chargeTotal}
                  calculatedPrice={chargeCalculatedPrice}
                  serviceItems={serviceItems}
                  errorFields={errorFields} clearError={clearError}
                />
              </>
            )}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex gap-[16px] items-center justify-end w-full shrink-0">
          <Button
            variant="ghost"
            className="cursor-pointer h-[40px] px-[16px] text-[14px] text-[#27272a] !border-0 !shadow-none !bg-transparent hover:!bg-[#e4e4e7]"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            className="cursor-pointer h-[40px] px-[16px] text-[14px] text-white bg-[#27272a] rounded-[8px] shadow-[inset_0px_1px_0px_0px_#27272a,inset_0px_2px_0px_0px_rgba(255,255,255,0.15)] transition-colors duration-200 ease-out hover:bg-[#3f3f46] disabled:opacity-50 disabled:pointer-events-none"
            disabled={!selectedType}
            onClick={handleSave}
          >
            Guardar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { formatHoursDisplay, parseHoursString, PRICE_OPTIONS };