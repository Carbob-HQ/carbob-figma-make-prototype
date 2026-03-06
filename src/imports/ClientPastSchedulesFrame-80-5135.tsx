import svgPaths from "./svg-twmk3zb7gk";

function TopFrame() {
  return (
    <button className="content-stretch cursor-pointer flex gap-[8px] items-center relative shrink-0 w-full" data-name="Top Frame">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="history">
        <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
            <path d={svgPaths.p1bfca8a0} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Histórico de serviços</p>
      </div>
      <div className="bg-[rgba(161,161,170,0.15)] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Light Mode / Badge">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#3f3f46] text-[12px] text-left">5</p>
      </div>
      <div className="content-stretch flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative rounded-[6px] shrink-0 size-[24px]" data-name="Light Mode / Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
          <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
              <path d={svgPaths.p2063d280} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function ClientPastSchedulesFrame() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start relative size-full" data-name="Client Past Schedules Frame">
      <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
      <TopFrame />
    </div>
  );
}