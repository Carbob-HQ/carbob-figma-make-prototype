import svgPaths from "./svg-a0cif4e0n4";

function Header() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[20px] pr-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">MÃO DE OBRA</p>
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
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex items-center px-[8px] py-[6px] relative shrink-0" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">HORAS</p>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[60px]" data-name="Column">
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
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">PREÇO / HORA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[102px]" data-name="Column">
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
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">Desc.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[57px]" data-name="Column">
      <Header3 />
    </div>
  );
}

function Header4() {
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

function Column4() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[82px]" data-name="Column">
      <Header4 />
    </div>
  );
}

function Header5() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative rounded-br-[16px] rounded-tr-[16px] shrink-0 w-[32px]" data-name="Column">
      <Header5 />
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
      <div className="flex flex-row items-center self-stretch">
        <Column5 />
      </div>
    </div>
  );
}

function Header6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[20px] pr-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">PEÇA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative rounded-bl-[16px] rounded-tl-[16px]" data-name="Column">
      <Header6 />
    </div>
  );
}

function Header7() {
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

function Column7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start max-w-[200px] min-h-px min-w-px relative" data-name="Column">
      <Header7 />
    </div>
  );
}

function Header8() {
  return (
    <div className="content-stretch flex items-center px-[8px] py-[6px] relative shrink-0" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">QTD.</p>
      </div>
    </div>
  );
}

function Column8() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Column">
      <Header8 />
    </div>
  );
}

function Header9() {
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

function Column9() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[96px]" data-name="Column">
      <Header9 />
    </div>
  );
}

function Header10() {
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

function Column10() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[96px]" data-name="Column">
      <Header10 />
    </div>
  );
}

function Header11() {
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

function Column11() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[57px]" data-name="Column">
      <Header11 />
    </div>
  );
}

function Header12() {
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

function Column12() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[82px]" data-name="Column">
      <Header12 />
    </div>
  );
}

function Header13() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Column13() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative rounded-br-[16px] rounded-tr-[16px] shrink-0 w-[32px]" data-name="Column">
      <Header13 />
    </div>
  );
}

function Table1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Table">
      <Column6 />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Column7 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column8 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column9 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column10 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column11 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column12 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column13 />
      </div>
    </div>
  );
}

function Header14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[20px] pr-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">CONSUMÍVEL / ENCARGO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative rounded-bl-[16px] rounded-tl-[16px]" data-name="Column">
      <Header14 />
    </div>
  );
}

function Header15() {
  return (
    <div className="content-stretch flex items-center px-[8px] py-[6px] relative shrink-0" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase">QTD.</p>
      </div>
    </div>
  );
}

function Column15() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[60px]" data-name="Column">
      <Header15 />
    </div>
  );
}

function Header16() {
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

function Column16() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[96px]" data-name="Column">
      <Header16 />
    </div>
  );
}

function Header17() {
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

function Column17() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[57px]" data-name="Column">
      <Header17 />
    </div>
  );
}

function Header18() {
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

function Column18() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[82px]" data-name="Column">
      <Header18 />
    </div>
  );
}

function Header19() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Column19() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative rounded-br-[16px] rounded-tr-[16px] shrink-0 w-[32px]" data-name="Column">
      <Header19 />
    </div>
  );
}

function Table2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Table">
      <Column14 />
      <div className="flex flex-row items-center self-stretch">
        <Column15 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column16 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column17 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column18 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column19 />
      </div>
    </div>
  );
}

function Tables() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Tables">
      <div className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Labor Table">
        <Table />
        <div className="content-stretch flex items-start relative shrink-0" data-name="New Item Button">
          <div className="content-stretch flex gap-[4px] items-center justify-center max-h-[24px] min-h-[24px] px-[8px] relative rounded-[6px] shrink-0" data-name="Light Mode / Button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute inset-[16.67%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                  <path d={svgPaths.p15e4fc00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#a1a1aa] text-[12px]">Novo item</p>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Parts Table">
        <Table1 />
        <div className="content-stretch flex items-start relative shrink-0" data-name="New Item Button">
          <div className="content-stretch flex gap-[4px] items-center justify-center max-h-[24px] min-h-[24px] px-[8px] relative rounded-[6px] shrink-0" data-name="Light Mode / Button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute inset-[16.67%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                  <path d={svgPaths.p15e4fc00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#a1a1aa] text-[12px]">Novo item</p>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Supply Table">
        <Table2 />
        <div className="content-stretch flex items-start relative shrink-0" data-name="New Item Button">
          <div className="content-stretch flex gap-[4px] items-center justify-center max-h-[24px] min-h-[24px] px-[8px] relative rounded-[6px] shrink-0" data-name="Light Mode / Button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute inset-[16.67%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                  <path d={svgPaths.p15e4fc00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#a1a1aa] text-[12px]">Novo item</p>
          </div>
        </div>
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

function BottomFrame() {
  return (
    <div className="relative shrink-0 w-full" data-name="Bottom Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[20px] relative w-full">
          <div className="bg-[rgba(39,39,42,0.05)] content-stretch flex h-[34px] items-start p-[3px] relative rounded-[8px] shrink-0" data-name="Light Mode / Tab Groups">
            <button className="content-stretch cursor-pointer flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0" data-name="Tab 1">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left icon">
                <div className="absolute inset-[20.83%_8.33%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 11.6667">
                    <path d={svgPaths.p12a16200} fill="var(--fill-0, #71717A)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
            </button>
            <div className="bg-white content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Tab 2">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left icon">
                <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                    <path d={svgPaths.p1cda870} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <ServicePriceFrame />
        </div>
      </div>
    </div>
  );
}

export default function ServiceTable() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-end relative size-full" data-name="Service Table">
      <Tables />
      <BottomFrame />
    </div>
  );
}