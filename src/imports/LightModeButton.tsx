import svgPaths from "./svg-p940czdq9j";

export default function LightModeButton() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center relative rounded-[8px] size-full" data-name="Light Mode / Button">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p2dc0b580} fill="var(--fill-0, #FB2C36)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}