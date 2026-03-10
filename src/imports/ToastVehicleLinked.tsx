import svgPaths from "./svg-arpwj8qwes";

export default function ToastVehicleLinked() {
  return (
    <div className="content-stretch flex flex-col items-start p-[24px] relative size-full" data-name="Toast / Vehicle Linked">
      <div className="bg-[#27272a] content-stretch flex gap-[16px] items-start p-[8px] relative rounded-[8px] shrink-0" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#52525b] border-solid inset-[-1px] pointer-events-none rounded-[8px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.05)]" />
        <div className="content-stretch flex gap-[8px] items-start min-h-[20px] px-[10px] py-[8px] relative shrink-0" data-name="Content">
          <div className="content-stretch flex items-center pt-[2px] relative shrink-0" data-name="Icon">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p1242db00} fill="var(--fill-0, #0CAD86)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
            <p className="font-medium h-[20px] leading-[1.5] not-italic relative shrink-0 text-[14px] text-white w-full whitespace-pre-wrap">Cliente adicionado com sucesso</p>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Dark Mode / Button">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[20.83%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33323 9.33323">
                <path d={svgPaths.p2bd57f80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}