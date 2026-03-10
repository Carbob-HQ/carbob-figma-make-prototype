import svgPaths from "./svg-njet2zaail";
import imgCarbobPurple from "figma:asset/da77b88fbb65a545dcbf78e285437190486af8fa.png";

function CarbobPurple() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Carbob (purple)">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[115.28%] left-[-12.73%] max-w-none top-[-6.94%] w-[123.61%]" src={imgCarbobPurple} />
      </div>
    </div>
  );
}

function LeftFrame() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative shrink-0" data-name="Left Frame">
      <CarbobPurple />
    </div>
  );
}

function PanelRightOpen() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="panel-right-open">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="panel-right-open">
          <path d={svgPaths.p17cb89f0} fill="var(--fill-0, white)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function RightFrame() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center p-[10px] relative rounded-[8px] shrink-0" data-name="Right Frame">
      <PanelRightOpen />
    </div>
  );
}

export default function Logo() {
  return (
    <div className="bg-[#27272a] content-stretch flex items-center justify-between px-[8px] relative rounded-[8px] size-full" data-name="Logo">
      <LeftFrame />
      <RightFrame />
    </div>
  );
}