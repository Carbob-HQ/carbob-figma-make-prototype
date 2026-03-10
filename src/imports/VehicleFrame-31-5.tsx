import svgPaths from "./svg-psklxsa2su";

function UserFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="User Frame">
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="user-round">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 10">
            <path d={svgPaths.p18385e00} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="User">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis">Raúl Fernandes</p>
      </div>
    </div>
  );
}

function ContentFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Vehicle">
        <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Renault Clio</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Description">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis">AV-59-ZZ | WBABT11010LN54700</p>
      </div>
      <UserFrame />
    </div>
  );
}

export default function VehicleFrame() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center justify-center px-[8px] py-[8px] relative rounded-[6px] size-full" data-name="Vehicle Frame">
      <div className="bg-white relative rounded-[9999px] shrink-0 size-[32px]" data-name="Light Mode / Avatar">
        <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
          <div className="overflow-clip relative shrink-0 size-[14px]" data-name="car">
            <div className="absolute bottom-[16.67%] left-[4.17%] right-[4.17%] top-1/4" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 8.16667">
                <path d={svgPaths.p3208e100} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      </div>
      <ContentFrame />
    </div>
  );
}