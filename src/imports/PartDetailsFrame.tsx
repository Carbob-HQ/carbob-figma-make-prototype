import svgPaths from "./svg-xonq35r5ws";

function Text() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Peça</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#d4d4d8] text-[14px] text-ellipsis">Designação</p>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Referência OEM</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#d4d4d8] text-[14px] text-ellipsis">Referência</p>
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Qtd.</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3f3f46] text-[14px]">1</p>
        </div>
      </div>
    </div>
  );
}

function PartReferenceQuantiityFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Part Reference & Quantiity Frame">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="Light Mode / Input">
        <Text1 />
        <Input1 />
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[64px]" data-name="Light Mode / Input">
        <Text2 />
        <Input2 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Tipo de peça</p>
      </div>
    </div>
  );
}

function PartTypeFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Part Type Frame">
      <Header />
      <div className="bg-[rgba(39,39,42,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Tab Groups">
        <div className="content-stretch flex items-start p-[3px] relative w-full">
          <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Tab 1">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Peça OEM</p>
              </div>
            </div>
          </div>
          <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Tab 2">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#52525b] text-[14px]">Peça IAM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Custo unitário</p>
    </div>
  );
}

function TopBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
      <Text3 />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#3f3f46] text-[14px] whitespace-pre-wrap">0,00€</p>
          <button className="-translate-y-1/2 absolute bg-white content-stretch cursor-pointer flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] right-[4px] rounded-[6px] size-[32px] top-1/2" data-name="Light Mode / Button">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[4.17%_12.5%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.6667">
                  <path d={svgPaths.p3efb4f80} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Markup</p>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Tooltip / Markup Explanation">
        <div className="overflow-clip relative shrink-0 size-[12px]" data-name="info">
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

function Input4() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#d4d4d8] text-[14px] text-ellipsis whitespace-nowrap">%</p>
        </div>
      </div>
    </div>
  );
}

function SegmentedFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Segmented Frame">
      <div className="bg-[rgba(39,39,42,0.05)] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="Light Mode / Tab Groups">
        <div className="content-stretch flex items-start p-[3px] relative w-full">
          <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Tab 1">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">15%</p>
              </div>
            </div>
          </div>
          <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Tab 2">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#52525b] text-[14px]">25%</p>
              </div>
            </div>
          </div>
          <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Tab 3">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#52525b] text-[14px]">35%</p>
              </div>
            </div>
          </div>
          <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Tab 4">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#52525b] text-[14px]">50%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative self-stretch shrink-0 w-[64px]" data-name="Light Mode / Field">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative w-full" data-name="Type=Text, State=Idle, Size=xs">
          <Input4 />
        </div>
      </div>
    </div>
  );
}

function MarkupFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Markup Frame">
      <Header1 />
      <SegmentedFrame />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Preço unitário</p>
    </div>
  );
}

function TopBlock1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
      <Text4 />
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#3f3f46] text-[14px] whitespace-pre-wrap">0,00€</p>
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Desconto</p>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3f3f46] text-[14px]">0%</p>
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Subtotal</p>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3f3f46] text-[14px]">0,00€</p>
        </div>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Taxa de IVA</p>
    </div>
  );
}

function TopBlock2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
      <Text7 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">23%</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-[12px] size-[16px] top-1/2" data-name="Right Icon">
            <div className="absolute inset-[33.33%_20.83%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33313 5.33323">
                <path d={svgPaths.p15a75f00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Total c/ IVA</p>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[#3f3f46] text-[14px]">0,00€</p>
        </div>
      </div>
    </div>
  );
}

export default function PartDetailsFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-name="Part Details Frame">
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Input">
        <Text />
        <Input />
      </div>
      <PartReferenceQuantiityFrame />
      <PartTypeFrame />
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Cost Frame">
        <div className="content-stretch flex flex-col gap-[12px] h-[72px] items-start relative shrink-0 w-full" data-name="Light Mode / Field">
          <TopBlock />
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Button, State=Filled, Size=sm">
            <Input3 />
          </div>
        </div>
      </div>
      <MarkupFrame />
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Field">
        <TopBlock1 />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Filled, Size=sm">
          <Input5 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Input">
        <Text5 />
        <Input6 />
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Input">
        <Text6 />
        <Input7 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="VAT Dropdown">
        <div className="content-stretch flex flex-col gap-[12px] h-[72px] items-start relative shrink-0 w-full" data-name="Light Mode / Field">
          <TopBlock2 />
          <button className="content-stretch cursor-pointer flex flex-col h-[40px] items-center justify-center min-h-[40px] relative shrink-0 w-full" data-name="Variant=Listbox, Size=md, State=Filled">
            <Button />
          </button>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Input">
        <Text8 />
        <Input8 />
      </div>
    </div>
  );
}
