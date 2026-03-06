import svgPaths from "./svg-abxushdxtr";

function ServiceSummaryFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Service Summary Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Mão de obra: 50,00€ (01h00 * 50,00€/h)</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Peças: 93,11€</p>
      </div>
    </div>
  );
}

function RepairDetailsFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative" data-name="Repair Details Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Radiador</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[12px] text-ellipsis">Substituir</p>
      </div>
      <ServiceSummaryFrame />
    </div>
  );
}

function PriceFrame() {
  return (
    <div className="content-stretch flex flex-col items-end justify-between relative self-stretch shrink-0" data-name="Price Frame">
      <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">157,08€</p>
      </div>
      <div className="content-stretch flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Light Mode / Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
          <div className="absolute inset-[4.17%_8.33%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6667">
              <path d={svgPaths.p26330800} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function LightModeBadge() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Badge">
      <RepairDetailsFrame />
      <PriceFrame />
    </div>
  );
}

export default function Services() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Services">
      <LightModeBadge />
    </div>
  );
}