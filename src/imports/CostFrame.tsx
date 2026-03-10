import svgPaths from "./svg-admxl5vdag";

export default function CostFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-name="Cost Frame">
      <div className="content-stretch flex flex-col gap-[12px] h-auto items-start relative shrink-0 w-full" data-name="Light Mode / Field">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Custo unitário</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Button, State=Filled, Size=sm">
          <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
                <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">0,00€</p>
                <button className="-translate-y-1/2 absolute bg-[rgba(130,112,255,0.15)] content-stretch cursor-pointer flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] right-[4px] rounded-[6px] size-[32px] top-1/2" data-name="Light Mode / Button">
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
        </div>
      </div>
      <div className="bg-[rgba(39,39,42,0.05)] h-auto relative rounded-[8px] shrink-0 w-full" data-name="Cost Calculator Frame">
        <div className="content-stretch flex flex-col items-start p-[8px] relative size-full">
          <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Top Frame">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Light Mode / Input">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
                <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Preço de retalho</p>
              </div>
              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Input">
                <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
                  <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
                      <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">0,00€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-center py-[12px] relative shrink-0" data-name="Icon Frame">
              <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
                <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">x</p>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Light Mode / Field">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
                <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Desconto</p>
              </div>
              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Input">
                <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
                  <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
                      <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">0%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
