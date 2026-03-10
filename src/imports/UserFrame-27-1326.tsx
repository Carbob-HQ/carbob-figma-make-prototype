import svgPaths from "./svg-y9vz7hho67";

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
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic relative" data-name="Content Frame">
      <p className="font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">Raúl Fernandes</p>
      <p className="font-normal leading-[1.5] overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis w-full whitespace-nowrap">917 898 413 | rfernandes84@gmail.com</p>
    </div>
  );
}

export default function UserFrame() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center p-[12px] relative rounded-[12px] size-full" data-name="User Frame">
      <div aria-hidden="true" className="absolute border border-[#71717a] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <IconFrame />
      <ContentFrame />
      <div className="content-stretch flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Light Mode / Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
          <div className="absolute inset-[20.83%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33323 9.33323">
              <path d={svgPaths.p2bd57f80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}