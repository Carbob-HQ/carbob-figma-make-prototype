import svgPaths from "./svg-xjj9dt6j93";

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
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal items-center leading-[1.5] min-h-px min-w-px not-italic pr-[5px] relative text-[14px] text-ellipsis text-left" data-name="Text">
      <p className="flex-[1_0_0] min-h-px min-w-px mr-[-5px] overflow-hidden relative text-[#d4d4d8] whitespace-nowrap">Pesquisar por nome, telefone ou email</p>
      <p className="absolute left-0 overflow-hidden text-[#27272a] top-0">|</p>
    </div>
  );
}

function SearchFrame() {
  return (
    <button className="bg-white cursor-pointer h-[40px] relative shrink-0 w-full" data-name="Search Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <LeftIcon />
          <Text />
        </div>
      </div>
    </button>
  );
}

function Submenu() {
  return (
    <div className="bg-white min-w-[192px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Submenu 1">
      <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] overflow-clip relative rounded-[inherit] w-full">
        <SearchFrame />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px]" />
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

function LeftIcon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_6726)" id="Left Icon">
          <path d={svgPaths.p1888ca70} fill="var(--fill-0, #8270FF)" id="Vector (Stroke)" />
        </g>
        <defs>
          <clipPath id="clip0_1_6726">
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
          <LeftIcon1 />
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

function Submenu1() {
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
    </div>
  );
}