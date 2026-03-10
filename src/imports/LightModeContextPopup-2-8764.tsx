import svgPaths from "./svg-dcpioqp5i6";
import { CirclePlus } from "lucide-react";

interface LightModeContextPopupProps {
  onConsumidorFinalClick?: () => void;
}

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
    <input
      type="text"
      placeholder="Pesquisar por nome, telefone ou email"
      className="flex-[1_0_0] min-h-px min-w-px font-normal leading-[1.5] not-italic text-[14px] bg-transparent border-none outline-none text-[#27272a] placeholder:text-[#d4d4d8] pr-[5px]"
    />
  );
}

function SearchFrame() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="Search Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <LeftIcon />
          <Text />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px]" />
    </div>
  );
}

function Submenu() {
  return (
    <div className="bg-white min-w-[192px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Submenu 1">
      <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] overflow-clip relative rounded-[inherit] w-full">
        <SearchFrame />
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
    <div 
      className="bg-white content-stretch flex gap-[8px] items-center justify-center min-w-[180px] px-[8px] py-[8px] relative rounded-[6px] shrink-0 w-full transition-colors hover:bg-[#f4f4f5] cursor-pointer" 
      data-name="Context Button 2.2"
    >
      <UserRound />
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Consumidor final</p>
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

function ContextButton() {
  return (
    <button className="bg-white content-stretch flex gap-[8px] items-center justify-center min-w-[180px] relative rounded-[6px] transition-all hover:bg-[#f4f4f5] hover:scale-[1.02] cursor-pointer border-none w-full px-[8px] py-[8px]" data-name="Context Button 2.1">
      <CirclePlus className="w-5 h-5 text-[#8270ff] shrink-0" />
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#8270ff] text-[14px] text-left whitespace-pre-wrap">Novo cliente</p>
    </button>
  );
}

function NewClient() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="New Client">
      <ContextButton />
    </div>
  );
}

function Submenu1() {
  return (
    <div className="bg-white min-w-[192px] relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="Submenu 3">
      <div className="flex flex-col justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[4px] relative w-full border border-zinc-300 rounded-bl-[8px] rounded-br-[8px] overflow-clip">
          <EndConsumer />
          <NewClient />
        </div>
      </div>
      
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