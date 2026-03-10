import svgPaths from "./svg-3wav40oq36";
import imgLogo from "figma:asset/335bae29933abbce2529018c6b80d0d1b6f73b66.png";

export default function Logo() {
  return (
    <div className="bg-[#27272a] content-stretch flex items-center justify-between px-[8px] relative rounded-[8px] size-full" data-name="Logo">
      <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Left Frame">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center p-[10px] relative size-full">
            <div className="absolute h-[27.25px] left-[10px] top-[3px] w-[126.766px]" data-name="Carbob (purple)">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[346.57%] left-[-15.12%] max-w-none top-[-116.91%] w-[132.24%]" src={imgLogo} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center p-[10px] relative shrink-0" data-name="Right Frame">
        <div className="opacity-50 overflow-clip relative shrink-0 size-[20px]" data-name="panel-right-open">
          <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
              <path d={svgPaths.p4ce3a80} fill="var(--fill-0, white)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}