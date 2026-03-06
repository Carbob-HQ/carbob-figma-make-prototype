import svgPaths from "./svg-9pe8flfxtj";

function Input() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left Icon">
            <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6668 16.6665">
                <path d={svgPaths.p3b794500} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#d4d4d8] text-[14px] text-ellipsis whitespace-nowrap">Pesquisar por grupo funcional ou por peça</p>
        </div>
      </div>
    </div>
  );
}

export default function LightModeInput() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full" data-name="Light Mode / Input">
      <Input />
    </div>
  );
}