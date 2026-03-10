import svgPaths from "./svg-kouy2suny1";

export default function SideMenuEstPending() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start relative size-full" data-name="Side Menu / EST (Pending)">
      <div className="bg-[rgba(39,39,42,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Tab Groups">
        <div className="content-stretch flex items-start p-[3px] relative w-full">
          <button className="cursor-pointer flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Tab 1">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Orçamento</p>
              </div>
            </div>
          </button>
          <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Tab 2">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Cliente</p>
              </div>
            </div>
          </div>
          <button className="cursor-pointer flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Tab 3">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Veículo</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px overflow-x-clip overflow-y-auto relative w-full" data-name="Main Frame">
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header Frame">
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px pt-[4px] relative" data-name="Left Frame">
              <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Heading">
                <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[16px] whitespace-pre-wrap">Raúl Fernandes</p>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Tags">
                <div className="content-start flex flex-[1_0_0] flex-wrap gap-y-[8px] items-start min-h-px min-w-px relative" data-name="Tags">
                  <div className="bg-[rgba(161,161,170,0.15)] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Light Mode / Badge">
                    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus">
                      <div className="absolute inset-[16.67%]" data-name="Vector (Stroke)">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                          <path d={svgPaths.p15e4fc00} fill="var(--fill-0, #3F3F46)" id="Vector (Stroke)" />
                        </svg>
                      </div>
                    </div>
                    <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[12px]">Adicionar</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-start relative shrink-0" data-name="Shortcut Button">
              <div className="content-stretch flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Light Mode / Button">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
                  <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                      <path d={svgPaths.p89baa00} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Field">
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="State=Idle, Number of rows=2">
              <div className="bg-white h-[64px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
                <div className="overflow-x-clip overflow-y-auto size-full">
                  <div className="content-stretch flex items-start p-[12px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-[40px] min-w-px relative" data-name="Text">
                      <p className="flex-[1_0_0] font-normal h-full leading-[1.5] min-h-px min-w-px not-italic relative text-[#d4d4d8] text-[14px] whitespace-pre-wrap">Notas sobre o cliente</p>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Frame">
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Frame">
            <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
              <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Telefone</p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
              <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right whitespace-pre-wrap">+351 917 898 413</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Frame">
            <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
              <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Email</p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
              <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right whitespace-pre-wrap">joao.silva@gmail.com</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Frame">
            <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
              <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Contacto preferencial</p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
              <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right whitespace-pre-wrap">Telefone</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Frame">
            <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
              <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">NIF</p>
            </div>
            <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
              <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right whitespace-pre-wrap">264 823 796</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Expandable Items">
          <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Client Vehicles Frame">
            <div className="bg-[#e5e5e5] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
            <button className="content-stretch cursor-pointer flex gap-[8px] items-center relative shrink-0 w-full" data-name="Top Frame">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="car">
                <div className="absolute bottom-[16.67%] left-[4.17%] right-[4.17%] top-1/4" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 9.33333">
                    <path d={svgPaths.p38d2ce00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
                <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Veículos</p>
              </div>
              <div className="bg-[rgba(161,161,170,0.15)] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Light Mode / Badge">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[12px] text-left">1</p>
              </div>
              <div className="content-stretch flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative rounded-[6px] shrink-0 size-[24px]" data-name="Light Mode / Button">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
                  <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                      <path d={svgPaths.p2063d280} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Client Past Schedules Frame">
            <div className="bg-[#e5e5e5] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
            <button className="content-stretch cursor-pointer flex gap-[8px] items-center relative shrink-0 w-full" data-name="Top Frame">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="calendar">
                <div className="absolute inset-[4.17%_8.33%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6667">
                    <path d={svgPaths.p4c73a80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
                <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Marcações</p>
              </div>
              <div className="bg-[rgba(161,161,170,0.15)] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Light Mode / Badge">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[12px] text-left">3</p>
              </div>
              <div className="content-stretch flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative rounded-[6px] shrink-0 size-[24px]" data-name="Light Mode / Button">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
                  <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                      <path d={svgPaths.p2063d280} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}