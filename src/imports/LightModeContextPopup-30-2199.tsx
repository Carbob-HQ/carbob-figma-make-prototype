import svgPaths from "./svg-g6n61e5umj";

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-normal items-center leading-[1.5] min-h-px min-w-px not-italic pr-[5px] relative text-[14px] text-ellipsis" data-name="Text">
      <p className="flex-[1_0_0] min-h-px min-w-px mr-[-5px] overflow-hidden relative text-[#d4d4d8] whitespace-nowrap">Pesquisar por matrícula ou VIN</p>
      <p className="absolute left-0 overflow-hidden text-[#27272a] top-0">|</p>
    </div>
  );
}

function SearchFrame() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="Search Frame">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left Icon">
            <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6668 16.6665">
                <path d={svgPaths.p3b794500} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
          <Text />
        </div>
      </div>
    </div>
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

function Submenu1() {
  return (
    <div className="bg-white min-w-[192px] relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="Submenu 3">
      <div className="flex flex-col justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[4px] relative w-full">
          <button className="content-stretch cursor-pointer flex items-start relative shrink-0 w-full" data-name="New Vehicle">
            <div className="bg-white flex-[1_0_0] min-h-px min-w-[180px] relative rounded-[6px]" data-name="Context Button 1.1" role="button" tabIndex="0">
              <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] px-[36px] py-[8px] relative w-full">
                  <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#8270ff] text-[14px] text-left whitespace-pre-wrap">Novo veículo</p>
                  <div className="-translate-y-1/2 absolute left-[8px] overflow-clip size-[20px] top-1/2" data-name="Left Icon">
                    <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                        <path d={svgPaths.p3143d000} fill="var(--fill-0, #8270ff)" id="Vector (Stroke)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-br-[8px]" />
    </div>
  );
}

export default function LightModeContextPopup() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] size-full" data-name="Light Mode / Context Popup">
      <Submenu />
      <Submenu1 />
    </div>
  );
}