import svgPaths from "./svg-ovauhm8hvr";

function LaborFrame() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Labor Frame" style={{ backgroundImage: "linear-gradient(90deg, rgba(232, 168, 56, 0.15) 0%, rgba(232, 168, 56, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="wrench">
        <div className="absolute inset-[4.15%_4.15%_8.33%_8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0034 14.0032">
            <path d={svgPaths.p1a2e8200} fill="var(--fill-0, #E8A838)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame">
      <LaborFrame />
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">0,00€</p>
      </div>
    </div>
  );
}

function PartFrame() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Part Frame" style={{ backgroundImage: "linear-gradient(90deg, rgba(206, 105, 224, 0.15) 0%, rgba(206, 105, 224, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="bolt">
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6641">
            <path d={svgPaths.p475cc00} fill="var(--fill-0, #CE69E0)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame">
      <PartFrame />
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">0,00€</p>
      </div>
    </div>
  );
}

function SupplyFrame() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Supply Frame" style={{ backgroundImage: "linear-gradient(90deg, rgba(38, 33, 36, 0.15) 0%, rgba(38, 33, 36, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="droplet">
        <div className="absolute inset-[8.33%_16.67%_4.17%_16.67%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 14">
            <path d={svgPaths.p218d4700} fill="var(--fill-0, #262124)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame">
      <SupplyFrame />
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">0,00€</p>
      </div>
    </div>
  );
}

function FeeFrame() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Fee Frame" style={{ backgroundImage: "linear-gradient(90deg, rgba(12, 173, 134, 0.15) 0%, rgba(12, 173, 134, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="euro">
        <div className="absolute inset-[12.5%_16.67%_12.5%_12.5%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.3336 12">
            <path d={svgPaths.p4401480} fill="var(--fill-0, #0CAD86)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Frame">
      <FeeFrame />
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">0,00€</p>
      </div>
    </div>
  );
}

function BreakdownByTypeFrame() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Breakdown By Type Frame">
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function BottomFrame() {
  return (
    <div className="relative shrink-0 w-full" data-name="Bottom Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[20px] relative w-full">
          <div className="bg-[rgba(39,39,42,0.05)] content-stretch flex h-[34px] items-start p-[3px] relative rounded-[8px] shrink-0" data-name="Light Mode / Tab Groups">
            <div className="bg-white content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Tab 1">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left icon">
                <div className="absolute inset-[20.83%_8.33%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 11.6667">
                    <path d={svgPaths.p12a16200} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
            </div>
            <button className="content-stretch cursor-pointer flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0" data-name="Tab 2">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left icon">
                <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                    <path d={svgPaths.p1cda870} fill="var(--fill-0, #71717A)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
          <BreakdownByTypeFrame />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[20px] pr-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">ITEM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="min-h-[48px] relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] pl-[20px] pr-[8px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Sem itens</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative rounded-bl-[16px] rounded-tl-[16px]" data-name="Column">
      <Header />
      <Row />
    </div>
  );
}

function Header1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">REF. OEM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start max-w-[200px] min-h-px min-w-px relative" data-name="Column">
      <Header1 />
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex items-center px-[8px] py-[6px] relative shrink-0" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">QTD. / HORAS</p>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Column">
      <Header2 />
    </div>
  );
}

function Header3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">CUSTO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[96px]" data-name="Column">
      <Header3 />
    </div>
  );
}

function Header4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">PREÇO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[96px]" data-name="Column">
      <Header4 />
    </div>
  );
}

function Header5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">Desc.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[57px]" data-name="Column">
      <Header5 />
    </div>
  );
}

function Header6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">Subtotal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[82px]" data-name="Column">
      <Header6 />
    </div>
  );
}

function Header7() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Column7() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative rounded-br-[16px] rounded-tr-[16px] shrink-0 w-[32px]" data-name="Column">
      <Header7 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white content-stretch flex items-center relative shrink-0 w-full" data-name="Table">
      <Column />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Column1 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column2 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column3 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column4 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column5 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column6 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column7 />
      </div>
    </div>
  );
}

function ServicePriceFrame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0" data-name="Service Price Frame">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[16px]">0,00€</p>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 size-[16px]" data-name="Tooltip / Service Price Breakdown">
        <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="info">
          <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <path d={svgPaths.p169dfe80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomFrame1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Bottom Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[20px] relative w-full">
          <div className="content-stretch flex items-start relative shrink-0" data-name="New Item Button">
            <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[32px] min-h-[32px] px-[12px] relative rounded-[6px] shrink-0" data-name="Light Mode / Button">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
                <div className="absolute inset-[16.67%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                    <path d={svgPaths.p15e4fc00} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Novo item</p>
            </div>
          </div>
          <ServicePriceFrame />
        </div>
      </div>
    </div>
  );
}

export default function ServiceFrameBreakdown() {
  return (
    <div className="content-stretch flex flex-col items-start p-[16px] relative size-full" data-name="Service Frame Breakdown">
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full" data-name="Service Table">
        <BottomFrame />
        <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item Table">
          <Table />
        </div>
        <BottomFrame1 />
      </div>
    </div>
  );
}