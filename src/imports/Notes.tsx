import svgPaths from "./svg-3t20tc1fen";

export default function Notes() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-name="Notes">
      <button className="content-stretch cursor-pointer flex items-start relative shrink-0" data-name="Notes Button">
        <div className="bg-white content-stretch flex gap-[8px] items-center justify-center max-h-[32px] min-h-[32px] px-[12px] relative rounded-[8px] shrink-0" data-name="Light Mode / Button">
          <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
            <div className="absolute inset-[4.17%_12.5%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.6667">
                <path d={svgPaths.p1fd3c000} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
          <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Notas</p>
        </div>
      </button>
    </div>
  );
}