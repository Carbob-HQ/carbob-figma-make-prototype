import { useMemo } from "react";
import svgPaths from "./svg-kngfrit1zk";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../app/components/ui/tooltip";
import type { QuoteService, ServiceItem } from "../app/components/QuoteServicesData";
import {
  calcItemSubtotal,
  calcQuoteSubtotal,
  calcQuoteVat,
  calcQuoteTotal,
} from "../app/components/QuoteServicesData";

function fmt(val: number): string {
  return val.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "€";
}

function PricingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">{label}</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">{value}</p>
      </div>
    </div>
  );
}

function Frame5({ value }: { value: string }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-ellipsis whitespace-pre-wrap">Lucro em peças</p>
      </div>
      <div className="bg-[rgba(74,222,128,0.2)] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Light Mode / Badge">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#166534] text-[12px]">{value}</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-center min-h-px min-w-px relative">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Margem do orçamento</p>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Tooltip / Margin Explanation">
        <TooltipProvider disableHoverableContent>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="overflow-clip relative shrink-0 size-[12px] cursor-default bg-transparent border-none p-0 m-0" data-name="info">
                <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                    <path d={svgPaths.p169dfe80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-[12px] z-[10000]">
              Margem: (Mão de obra + Lucro em peças) / Total
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

function Frame6({ value }: { value: string }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Frame">
      <Frame9 />
      <div className="bg-[rgba(74,222,128,0.2)] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Light Mode / Badge">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#166534] text-[12px]">{value}</p>
      </div>
    </div>
  );
}

export default function PopoverQuotePricing({ services = [] }: { services?: QuoteService[] }) {
  const allItems = useMemo(() => services.flatMap(s => s.items), [services]);

  const sumByType = (type: ServiceItem["type"]) =>
    allItems.filter(i => i.type === type).reduce((sum, i) => sum + calcItemSubtotal(i), 0);

  const laborSum = useMemo(() => sumByType("labor"), [allItems]);
  const partsSum = useMemo(() => sumByType("parts"), [allItems]);
  const consumablesSum = useMemo(() => sumByType("consumables"), [allItems]);
  const additionalSum = useMemo(() => sumByType("additional"), [allItems]);

  const subtotal = useMemo(() => calcQuoteSubtotal(services), [services]);
  const vat = useMemo(() => calcQuoteVat(services), [services]);
  const total = useMemo(() => calcQuoteTotal(services), [services]);

  // Profit on parts: unitPrice - costOEM for each part item
  const partsProfit = useMemo(() => {
    return allItems
      .filter((i): i is import("../app/components/QuoteServicesData").PartItem => i.type === "parts")
      .reduce((sum, p) => sum + (p.unitPrice - p.costOEM) * p.quantity * (1 - p.discount / 100), 0);
  }, [allItems]);

  const margin = useMemo(() => {
    if (total === 0) return 0;
    return ((laborSum + partsProfit) / total) * 100;
  }, [laborSum, partsProfit, total]);

  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start p-[16px] relative rounded-[12px] size-full" data-name="Popover / Quote Pricing">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Heading">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[16px] whitespace-pre-wrap">Resumo do orçamento</p>
      </div>
      <div className="content-stretch flex flex-col gap-[16px] items-start overflow-x-clip overflow-y-auto relative shrink-0 w-full" data-name="Years">
        {/* Typology breakdown */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <PricingRow label="Mão de obra" value={fmt(laborSum)} />
          <PricingRow label="Peças" value={fmt(partsSum)} />
          <PricingRow label="Consumíveis" value={fmt(consumablesSum)} />
          <PricingRow label="Encargos" value={fmt(additionalSum)} />
        </div>
        <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
        {/* Subtotal + IVA */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <PricingRow label="Subtotal" value={fmt(subtotal)} />
          <PricingRow label="IVA" value={fmt(vat)} />
        </div>
        <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
        {/* Total */}
        <PricingRow label="Total" value={fmt(total)} />
        {/* Margins */}
        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Quote Margins Frame">
          <Frame5 value={fmt(partsProfit)} />
          <Frame6 value={margin.toLocaleString("pt-PT", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%"} />
        </div>
      </div>
    </div>
  );
}