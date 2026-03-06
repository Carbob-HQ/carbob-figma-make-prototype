import svgPaths from "./svg-y4n6ey30za";

function Heading() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[4px] pt-[8px] px-[8px] relative rounded-[6px] shrink-0 w-[182px]" data-name="Heading 1">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#71717a] text-[12px] whitespace-pre-wrap">Responsável</p>
    </div>
  );
}

export default function LightModeOrSelectionDropdownPopup() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center p-[5px] relative rounded-[8px] size-full" data-name="Light Mode / OR Selection Dropdown Popup">
      <div aria-hidden="true" className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.06)]" />
      <Heading />
      <button className="content-stretch cursor-pointer flex items-center justify-center min-w-[180px] px-[36px] py-[6px] relative rounded-[6px] shrink-0 w-[182px]" data-name="Context Button 1.1">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Hélder Barbosa</p>
      </button>
      <button className="content-stretch cursor-pointer flex items-center justify-center min-w-[180px] px-[36px] py-[6px] relative rounded-[6px] shrink-0 w-[182px]" data-name="Context Button 1.2">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Sónia Dias</p>
      </button>
      <button className="content-stretch cursor-pointer flex gap-[8px] items-center justify-center min-w-[180px] px-[36px] py-[6px] relative rounded-[6px] shrink-0 w-[182px]" data-name="Context Button 1.3">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Tânia Graça</p>
        <div className="-translate-y-1/2 absolute left-[8px] overflow-clip size-[20px] top-1/2" data-name="Left Icon">
          <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9997 10.8332">
              <path d={svgPaths.p321ce800} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}