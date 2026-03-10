import svgPaths from "./svg-qo9hft7llg";

export default function SideMenuEstPending() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start relative size-full" data-name="Side Menu / EST (Pending)">
      <div className="bg-[rgba(39,39,42,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Tab Groups">
        <div className="content-stretch flex items-start p-[3px] relative w-full">
          <button className="cursor-pointer flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Tab 1">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Orçamento</p>
              </div>
            </div>
          </button>
          <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Tab 2">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Cliente</p>
              </div>
            </div>
          </div>
          <button className="cursor-pointer flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Tab 3">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Veículo</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-h-px min-w-px overflow-clip relative w-full" data-name="Main Frame">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="user-round">
          <div className="absolute inset-[8.33%_12.5%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p13bae6c0} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Light Mode / Text">
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-center text-ellipsis whitespace-pre-wrap">Sem cliente selecionado</p>
        </div>
      </div>
    </div>
  );
}