import svgPaths from "./svg-00rxkriulf";
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
        <g id="panel-right-open" opacity="0.5">
          <path d={svgPaths.p17cb89f0} fill="var(--fill-0, white)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function RightFrame() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative shrink-0" data-name="Right Frame">
      <PanelRightOpen />
    </div>
  );
}

function Logo() {
  return (
    <div className="bg-[#262124] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[8px]" data-name="Logo">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <LeftFrame />
          <RightFrame />
        </div>
      </div>
    </div>
  );
}

function LogoFrame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Logo Frame">
      <Logo />
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Left Icon">
          <path d={svgPaths.p3f271800} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function DarkModeButton() {
  return (
    <div className="bg-[rgba(130,112,255,0.5)] max-h-[40px] min-h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Dark Mode / Button">
      <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-h-[inherit] min-h-[inherit] px-[12px] relative w-full">
          <LeftIcon />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Criar</p>
        </div>
      </div>
    </div>
  );
}

function AddButton() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[8px] relative shrink-0 w-[200px]" data-name="Add Button">
      <DarkModeButton />
    </div>
  );
}

function LeftIcon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Left Icon">
          <path d={svgPaths.p57d0e00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function DarkModeButton1() {
  return (
    <div className="max-h-[40px] min-h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Dark Mode / Button">
      <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-h-[inherit] min-h-[inherit] px-[12px] relative w-full">
          <LeftIcon1 />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Início</p>
        </div>
      </div>
    </div>
  );
}

function HomeButton() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[8px] relative shrink-0 w-[200px]" data-name="Home Button">
      <DarkModeButton1 />
    </div>
  );
}

function LeftIcon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Left Icon">
          <path d={svgPaths.p26f35500} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function DarkModeButton2() {
  return (
    <div className="flex-[1_0_0] max-h-[40px] min-h-[40px] min-w-px relative rounded-[8px]" data-name="Dark Mode / Button">
      <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-h-[inherit] min-h-[inherit] px-[12px] relative w-full">
          <LeftIcon2 />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Agendamentos</p>
        </div>
      </div>
    </div>
  );
}

function SchedulingButton() {
  return (
    <div className="relative shrink-0 w-full" data-name="Scheduling Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] relative w-full">
          <DarkModeButton2 />
        </div>
      </div>
    </div>
  );
}

function LeftIcon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Left Icon">
          <path d={svgPaths.p10750f80} fill="var(--fill-0, white)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function DarkModeButton3() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] flex-[1_0_0] max-h-[40px] min-h-[40px] min-w-px relative rounded-[8px]" data-name="Dark Mode / Button">
      <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-h-[inherit] min-h-[inherit] px-[12px] relative w-full">
          <LeftIcon3 />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-left text-white">Quadro de trabalho</p>
        </div>
      </div>
    </div>
  );
}

function SelectedFrame() {
  return <div className="absolute bg-[#8270ff] h-[24px] left-0 rounded-br-[8px] rounded-tr-[8px] top-[8px] w-[4px]" data-name="Selected Frame" />;
}

function JobBoardButton() {
  return (
    <button className="cursor-pointer relative shrink-0 w-full" data-name="Job Board Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[8px] relative w-full">
          <DarkModeButton3 />
          <SelectedFrame />
        </div>
      </div>
    </button>
  );
}

function MainButtons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="Main Buttons">
      <HomeButton />
      <SchedulingButton />
      <JobBoardButton />
    </div>
  );
}

function LeftIcon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_8055)" id="Left Icon">
          <path d={svgPaths.p3cb1db00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
        <defs>
          <clipPath id="clip0_2_8055">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DarkModeButton4() {
  return (
    <div className="flex-[1_0_0] max-h-[40px] min-h-[40px] min-w-px relative rounded-[8px]" data-name="Dark Mode / Button">
      <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-h-[inherit] min-h-[inherit] px-[12px] relative w-full">
          <LeftIcon4 />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Ajuda</p>
        </div>
      </div>
    </div>
  );
}

function HelpButton() {
  return (
    <div className="relative shrink-0 w-full" data-name="Help Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] relative w-full">
          <DarkModeButton4 />
        </div>
      </div>
    </div>
  );
}

function LeftIcon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Left Icon">
          <path d={svgPaths.p1c433e80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function DarkModeButton5() {
  return (
    <div className="flex-[1_0_0] max-h-[40px] min-h-[40px] min-w-px relative rounded-[8px]" data-name="Dark Mode / Button">
      <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-h-[inherit] min-h-[inherit] px-[12px] relative w-full">
          <LeftIcon5 />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Definições</p>
        </div>
      </div>
    </div>
  );
}

function SettingsButton() {
  return (
    <div className="relative shrink-0 w-full" data-name="Settings Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] relative w-full">
          <DarkModeButton5 />
        </div>
      </div>
    </div>
  );
}

function BottomButtons() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Bottom Buttons">
      <HelpButton />
      <SettingsButton />
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="bg-[#262124] content-stretch flex flex-col gap-[24px] items-start py-[12px] relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] size-full" data-name="Sidebar">
      <LogoFrame />
      <AddButton />
      <MainButtons />
      <BottomButtons />
    </div>
  );
}