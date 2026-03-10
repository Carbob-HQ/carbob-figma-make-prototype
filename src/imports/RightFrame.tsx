import svgPaths from "./svg-ap7x7jhho2";

function TopFrame() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start pt-[12px] relative shrink-0 w-full" data-name="Top Frame">
      <div className="content-stretch flex h-[24px] items-center relative shrink-0 w-[320px]" data-name="Light Mode / Heading">
        <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[16px] whitespace-pre-wrap">Serviços selecionados</p>
      </div>
    </div>
  );
}

function ServiceSummaryFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Service Summary Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Mão de obra: 50,00€ (01h00 * 50,00€/h)</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Peças: 93,11€</p>
      </div>
    </div>
  );
}

function RepairDetailsFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative" data-name="Repair Details Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Radiador</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[12px] text-ellipsis">Substituir</p>
      </div>
      <ServiceSummaryFrame />
    </div>
  );
}

function PriceFrame() {
  return (
    <div className="content-stretch flex flex-col items-end justify-between relative self-stretch shrink-0" data-name="Price Frame">
      <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">157,08€</p>
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

function Services1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Services">
      <LightModeBadge />
    </div>
  );
}

function ServiceSummaryFrame1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Service Summary Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Mão de obra: 02h30 * 50€/h</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Peças: 51,44€</p>
      </div>
    </div>
  );
}

function RepairDetailsFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px relative" data-name="Repair Details Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Bomba de água</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[12px] text-ellipsis">Substituir</p>
      </div>
      <ServiceSummaryFrame1 />
    </div>
  );
}

function PriceFrame1() {
  return (
    <div className="content-stretch flex flex-col items-end justify-between relative self-stretch shrink-0" data-name="Price Frame">
      <div className="content-stretch flex h-[20px] items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">176,44€</p>
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

function LightModeBadge1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Badge">
      <RepairDetailsFrame1 />
      <PriceFrame1 />
    </div>
  );
}

function Services() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Services">
      <Services1 />
      <div className="bg-[#e5e5e5] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
      <LightModeBadge1 />
    </div>
  );
}

function SelectedServicesFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative w-full" data-name="Selected Services Frame">
      <TopFrame />
      <Services />
    </div>
  );
}

function TextFrame() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Text Frame">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
        <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[16px] whitespace-pre-wrap">Total c/ IVA</p>
      </div>
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Total">
        <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[16px]">333,52€</p>
      </div>
    </div>
  );
}

function SummaryFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[320px]" data-name="Summary Frame">
      <TextFrame />
      <div className="bg-[#27272a] max-h-[40px] min-h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Button">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center justify-center max-h-[inherit] min-h-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[inherit] min-h-[inherit] px-[16px] relative w-full">
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Adicionar 2 serviços</p>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]" />
      </div>
    </div>
  );
}

export default function RightFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-name="Right Frame">
      <SelectedServicesFrame />
      <SummaryFrame />
    </div>
  );
}