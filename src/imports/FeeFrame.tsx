import svgPaths from "./svg-3x8mr9zrym";

function TopFrame() {
  return (
    <button className="content-stretch cursor-pointer flex gap-[8px] items-center relative shrink-0 w-full" data-name="Top Frame">
      <div className="flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative shrink-0 size-[32px]" style={{ "--transform-inner-width": "56", "--transform-inner-height": "16" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] size-[32px]" data-name="Light Mode / Button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                  <path d={svgPaths.p2063d280} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Encargos</p>
      </div>
    </button>
  );
}

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[20px] pr-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">ENCARGO</p>
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
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">PREÇO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[96px]" data-name="Column">
      <Header1 />
    </div>
  );
}

function Header2() {
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

function Column2() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[57px]" data-name="Column">
      <Header2 />
    </div>
  );
}

function Header3() {
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

function Column3() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[82px]" data-name="Column">
      <Header3 />
    </div>
  );
}

function Header4() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative rounded-br-[16px] rounded-tr-[16px] shrink-0 w-[32px]" data-name="Column">
      <Header4 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Table">
      <Column />
      <div className="flex flex-row items-center self-stretch">
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
    </div>
  );
}

export default function FeeFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full" data-name="Fee Frame">
      <TopFrame />
      <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Fee Table">
        <Table />
      </div>
    </div>
  );
}