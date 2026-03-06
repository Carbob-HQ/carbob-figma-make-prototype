import svgPaths from "./svg-eroi8dk879";

function PanelRightClose() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="panel-right-close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="panel-right-open" opacity="0.5">
          <path d={svgPaths.p17cb89f0} fill="var(--fill-0, white)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LeftFrame() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0" data-name="Left Frame">
      <PanelRightClose />
    </div>
  );
}

export default function Logo() {
  return (
    <div className="bg-[#262124] content-stretch flex items-center justify-center px-[8px] relative rounded-[8px] size-full" data-name="Logo">
      <LeftFrame />
    </div>
  );
}