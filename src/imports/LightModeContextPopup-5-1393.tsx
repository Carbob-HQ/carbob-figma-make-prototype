import svgPaths from "./svg-wfav1bxa5s";

function LeftIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Left Icon">
          <path d={svgPaths.p19f95600} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis w-[284px] whitespace-nowrap">917898413|</p>
    </div>
  );
}

function X() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p5d91500} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LightModeButton() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] right-[4px] rounded-[6px] size-[32px] top-1/2" data-name="Light Mode / Button">
      <X />
    </div>
  );
}

function SearchFrame() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Search Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <LeftIcon />
          <Text />
          <LightModeButton />
        </div>
      </div>
    </div>
  );
}

function Submenu() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center min-w-[192px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Submenu 1">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px]" />
      <SearchFrame />
    </div>
  );
}

function LeftIcon1() {
  return (
    <div className="bg-white relative rounded-[9999px] shrink-0 size-[32px]" data-name="Left Icon">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[12px]">RF</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Name() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Name">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Raúl Fernandes</p>
    </div>
  );
}

function Description() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Description">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis">917 898 413 | rfernandes84@gmail.com</p>
    </div>
  );
}

function ContentFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
      <Name />
      <Description />
    </div>
  );
}

function ClientFrame() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center justify-center min-w-[180px] px-[8px] py-[6px] relative rounded-[6px] shrink-0 w-[350px]" data-name="Client Frame">
      <LeftIcon1 />
      <ContentFrame />
    </div>
  );
}

function Submenu1() {
  return (
    <div className="bg-white min-w-[192px] relative rounded-[8px] shrink-0 w-full" data-name="Submenu 2">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[5px] relative w-full">
          <ClientFrame />
        </div>
      </div>
    </div>
  );
}

function UserRound() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="user-round">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="user-round">
          <path d={svgPaths.p112cb400} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function ContextButton1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center justify-center min-w-[180px] px-[8px] py-[6px] relative rounded-[6px] shrink-0 w-[350px]" data-name="Context Button 2.2">
      <UserRound />
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Consumidor final</p>
    </div>
  );
}

function EndConsumer() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="End Consumer">
      <ContextButton1 />
    </div>
  );
}

function LeftIcon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_6769)" id="Left Icon">
          <path d={svgPaths.p1888ca70} fill="var(--fill-0, #8270FF)" id="Vector (Stroke)" />
        </g>
        <defs>
          <clipPath id="clip0_1_6769">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ContextButton() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-[180px] relative rounded-[6px]" data-name="Context Button 2.1">
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] px-[36px] py-[6px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#8270ff] text-[14px] text-left whitespace-pre-wrap">Novo cliente</p>
          <LeftIcon2 />
        </div>
      </div>
    </div>
  );
}

function NewClient() {
  return (
    <button className="content-stretch cursor-pointer flex items-start relative shrink-0 w-full" data-name="New Client">
      <ContextButton />
    </button>
  );
}

function Submenu2() {
  return (
    <div className="bg-white min-w-[192px] relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="Submenu 3">
      <div className="flex flex-col justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[5px] relative w-full">
          <EndConsumer />
          <NewClient />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-br-[8px]" />
    </div>
  );
}

export default function LightModeContextPopup() {
  return (
    <div className="content-stretch flex flex-col items-start relative shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] size-full" data-name="Light Mode / Context Popup">
      <Submenu />
      <Submenu1 />
      <Submenu2 />
    </div>
  );
}