import svgPaths from "./svg-grve98mtd2";

export default function VehicleFrame() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center p-[12px] relative rounded-[12px] size-full" data-name="Vehicle Frame">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-[rgba(130,112,255,0.15)] content-stretch flex items-center p-[6px] relative rounded-[9999px] shrink-0" data-name="Icon Frame">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="car">
          <div className="absolute bottom-[16.67%] left-[4.17%] right-[4.17%] top-1/4" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 11.6667">
              <path d={svgPaths.p39556c00} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Content Frame">
        <div className="content-stretch flex items-center relative shrink-0" data-name="Placeholder">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Selecionar veículo</p>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3334 13.3332">
            <path d={svgPaths.p10f26500} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}