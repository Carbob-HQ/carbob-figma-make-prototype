import svgPaths from "./svg-x8pf9n01qk";

function TopFrame() {
  return (
    <div className="relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Top Frame">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Heading">
          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Orçamentos anteriores</p>
        </div>
      </div>
    </div>
  );
}

function LabelFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Label Frame">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full">OS-2025/11</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#71717a] text-[12px] w-full">13/01/2025</p>
    </div>
  );
}

function ButtonFrame() {
  return (
    <div className="min-h-[60px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Button Frame">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center min-h-[inherit] px-[16px] relative w-full">
          <LabelFrame />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron-right">
            <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                <path d={svgPaths.p2063d280} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Label Frame">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full">OS-2024/43</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#71717a] text-[12px] w-full">02/03/2024</p>
    </div>
  );
}

function ButtonFrame1() {
  return (
    <div className="min-h-[60px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Button Frame">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center min-h-[inherit] px-[16px] relative w-full">
          <LabelFrame1 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron-right">
            <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                <path d={svgPaths.p2063d280} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Main1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px overflow-x-clip overflow-y-auto relative w-full" data-name="Main">
      <ButtonFrame />
      <ButtonFrame1 />
    </div>
  );
}

function BottomFrame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-bl-[16px] rounded-br-[16px] w-full" data-name="Bottom Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
          <Main1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-bl-[16px] rounded-br-[16px]" />
    </div>
  );
}

function NavigationFrame() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[320px]" data-name="Navigation Frame">
      <TopFrame />
      <BottomFrame />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-[360px] overflow-x-clip overflow-y-auto relative" data-name="Content">
      <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-center text-ellipsis whitespace-pre-wrap">Seleciona um orçamento para aceder aos serviços</p>
      </div>
    </div>
  );
}

export default function Main() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] content-stretch flex gap-[16px] items-start p-[16px] relative rounded-[16px] size-full" data-name="Main">
      <NavigationFrame />
      <Content />
    </div>
  );
}