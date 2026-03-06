import svgPaths from "./svg-n3ewoiuyfl";

function IconFrame() {
  return (
    <div className="bg-[rgba(130,112,255,0.15)] content-stretch flex items-center p-[6px] relative rounded-[9999px] shrink-0" data-name="Icon Frame">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="user-round">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.6667">
            <path d={svgPaths.p7670500} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ContentFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Content Frame">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Placeholder">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Selecionar cliente</p>
      </div>
    </div>
  );
}

export default function UserFrame() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center p-[12px] relative rounded-[12px] size-full" data-name="User Frame">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <IconFrame />
      <ContentFrame />
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