import svgPaths from "./svg-fcv2wqhg3s";
import imgCarbobPurple from "figma:asset/335bae29933abbce2529018c6b80d0d1b6f73b66.png";

function LeftFrame() {
  return (
    <div className="h-full relative shrink-0 w-[40px]" data-name="Left Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[10px] relative size-full">
          <div className="absolute h-[27px] left-[10px] top-[3px] w-[20px]" data-name="Carbob (purple)">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[349.78%] left-[-95.84%] max-w-none top-[-117.99%] w-[838.2%]" src={imgCarbobPurple} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoFrame() {
  return (
    <button className="content-stretch cursor-pointer flex items-center justify-center relative shrink-0 w-full" data-name="Logo Frame">
      <div className="bg-[#262124] content-stretch flex h-[40px] items-center justify-center px-[8px] relative rounded-[8px] shrink-0" data-name="Logo">
        <LeftFrame />
      </div>
    </button>
  );
}

function SelectedFrame() {
  return <div className="absolute bg-[#8270ff] h-[24px] left-0 rounded-br-[8px] rounded-tr-[8px] top-[8px] w-[4px]" data-name="Selected Frame" />;
}

function MainButtons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="Main Buttons">
      <div className="content-stretch flex flex-col items-center justify-center px-[8px] relative shrink-0 w-[56px]" data-name="Home Button">
        <div className="aspect-[40/40] content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Dark Mode / Button">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[4.17%_8.33%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6668">
                <path d={svgPaths.p1501bf00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0" data-name="Scheduling Button">
        <div className="content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Dark Mode / Button">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[4.17%_8.33%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6667">
                <path d={svgPaths.p4c73a80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button className="content-stretch cursor-pointer flex gap-[4px] items-center justify-center px-[8px] relative shrink-0" data-name="Job Board Button">
        <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Dark Mode / Button">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                <path d={svgPaths.p811f500} fill="var(--fill-0, white)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
        <SelectedFrame />
      </button>
    </div>
  );
}

function BottomButtons() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Bottom Buttons">
      <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0" data-name="Help Button">
        <div className="content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Dark Mode / Button">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <path d={svgPaths.p14c2edf0} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0" data-name="Settings Button">
        <div className="content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Dark Mode / Button">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[4.17%_8.26%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.357 14.6667">
                <path d={svgPaths.pbc5f400} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabsFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-h-px min-w-px relative" data-name="Tabs Frame">
      <div className="content-stretch flex items-start relative shrink-0 w-[200px]" data-name="Search Frame">
        <div className="flex-[1_0_0] max-h-[40px] min-h-[40px] min-w-px relative rounded-[8px]" data-name="Light Mode / Button">
          <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center max-h-[inherit] min-h-[inherit] px-[16px] relative w-full">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
                <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3334 13.3332">
                    <path d={svgPaths.p10f26500} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#a1a1aa] text-[14px] whitespace-nowrap">Pesquisar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconFrame() {
  return (
    <div className="content-stretch flex h-full items-center px-[8px] relative shrink-0" data-name="Icon Frame">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
        <div className="absolute inset-[33.33%_20.83%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33313 5.33323">
            <path d={svgPaths.p15a75f00} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ButtonsFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Buttons Frame">
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Notifications Button">
        <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0 w-[40px]" data-name="Light Mode / Button">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
            <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                <path d={svgPaths.p14c2edf0} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#fb2c36] content-stretch flex gap-[4px] items-center justify-center left-[28px] px-[4px] rounded-[100px] top-[-4px]" data-name="Light Mode / Button">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">4</p>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Profile Button">
        <div className="content-stretch flex items-center px-[6px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Light Mode / Profile / Circle">
          <div className="bg-[#3b82f6] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Avatar / Light Mode / Circle">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">DA</p>
          </div>
          <div className="flex flex-row items-center self-stretch">
            <IconFrame />
          </div>
        </div>
      </div>
    </div>
  );
}

function TextFrame1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Text Frame">
      <button className="content-stretch cursor-pointer flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#27272a] text-[24px] text-left whitespace-nowrap">Radiador (substituir) mais 1 serviço</p>
      </button>
    </div>
  );
}

function TextFrame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Text Frame">
      <div className="content-stretch flex h-[32px] items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#27272a] text-[24px] whitespace-nowrap">ORC #843:</p>
      </div>
      <TextFrame1 />
    </div>
  );
}

function Tags1() {
  return (
    <div className="content-start flex flex-[1_0_0] flex-wrap gap-y-[8px] items-start min-h-px min-w-px relative" data-name="Tags">
      <div className="bg-[rgba(161,161,170,0.15)] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Light Mode / Badge">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus">
          <div className="absolute inset-[16.67%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
              <path d={svgPaths.p15e4fc00} fill="var(--fill-0, #3F3F46)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#3f3f46] text-[12px] whitespace-nowrap">Adicionar</p>
      </div>
    </div>
  );
}

function Tags() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Tags">
      <Tags1 />
    </div>
  );
}

function TitleFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Title Frame">
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Title Frame">
        <TextFrame />
      </div>
      <Tags />
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Button Group">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Edit Button">
        <div className="content-stretch flex items-start relative shrink-0" data-name="Light Mode / Dropdown">
          <div className="bg-white content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0" data-name="Size=base, Variant=Outline, Square Button=False, Loading Button=False, Color=NA">
            <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute inset-[4.16%_4.17%_4.17%_4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6664">
                  <path d={svgPaths.p2bb89200} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3f3f46] text-[14px] whitespace-nowrap">Editar</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Send Button">
        <div className="bg-white content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0" data-name="Light Mode / Button">
          <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
            <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6668 14.6668">
                <path d={svgPaths.p1de2d200} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3f3f46] text-[14px] whitespace-nowrap">Enviar</p>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Send Button">
        <div className="content-stretch flex items-start relative shrink-0" data-name="Light Mode / Dropdown">
          <div className="bg-white content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Size=base, Variant=Outline, Square Button=True, Loading Button=False, Color=NA">
            <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[41.67%_12.5%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 2.66667">
                  <path d={svgPaths.p3d953800} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex gap-[16px] items-start min-h-[40px] relative shrink-0 w-full" data-name="Header">
      <TitleFrame />
      <ButtonGroup />
    </div>
  );
}

function SubheaderFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Subheader Frame">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Notes">
        <button className="content-stretch cursor-pointer flex items-start relative shrink-0" data-name="Notes Button">
          <div className="bg-white content-stretch flex gap-[8px] items-center justify-center max-h-[32px] min-h-[32px] px-[12px] relative rounded-[16px] shrink-0" data-name="Light Mode / Button">
            <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute inset-[4.17%_12.5%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.6667">
                  <path d={svgPaths.p1fd3c000} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3f3f46] text-[14px] text-left whitespace-nowrap">Notas</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Frame">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#3f3f46] text-[16px] whitespace-nowrap">Radiador (substituir)</p>
    </div>
  );
}

function Input() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative w-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function LightModeInput() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="Light Mode / Input">
      <Input />
    </div>
  );
}

function HeaderFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative" data-name="Header Frame">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip p-[4px] relative shrink-0" data-name="Drag Button">
        <div className="h-[18px] relative shrink-0 w-[4px]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 18">
            <path d={svgPaths.p1c8d0740} fill="var(--fill-0, #D4D4D8)" id="Vector (Stroke)" />
          </svg>
        </div>
        <div className="h-[18px] relative shrink-0 w-[4px]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 18">
            <path d={svgPaths.p1c8d0740} fill="var(--fill-0, #D4D4D8)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative shrink-0 size-[32px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <button className="content-stretch cursor-pointer flex items-center justify-center relative rounded-[6px] size-[32px]" data-name="Light Mode / Button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                  <path d={svgPaths.p2063d280} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Service Frame / Title">
        <LightModeInput />
      </div>
    </div>
  );
}

function HeaderFrame() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative w-full">
          <HeaderFrame1 />
          <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[32px] min-h-[32px] px-[12px] relative rounded-[6px] shrink-0" data-name="Light Mode / Button">
            <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p5fab880} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#27272a] text-[14px] whitespace-nowrap">Pendente</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[20px] pr-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">ITEM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LaborFrame() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Labor Frame" style={{ backgroundImage: "linear-gradient(90deg, rgba(232, 168, 56, 0.15) 0%, rgba(232, 168, 56, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="wrench">
        <div className="absolute inset-[4.15%_4.15%_8.33%_8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0034 14.0032">
            <path d={svgPaths.p1a2e8200} fill="var(--fill-0, #E8A838)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="min-h-[48px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] pl-[20px] pr-[8px] py-[8px] relative w-full">
          <LaborFrame />
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis">Radiador (substituir)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartFrame() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Part Frame" style={{ backgroundImage: "linear-gradient(90deg, rgba(206, 105, 224, 0.15) 0%, rgba(206, 105, 224, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="bolt">
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6641">
            <path d={svgPaths.p475cc00} fill="var(--fill-0, #CE69E0)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="min-h-[48px] relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] pl-[20px] pr-[8px] py-[8px] relative w-full">
          <PartFrame />
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis">Radiador</p>
          </div>
          <div className="bg-[#8270ff] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Light Mode / Badge">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">IAM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative rounded-bl-[16px] rounded-tl-[16px]" data-name="Column">
      <Header1 />
      <Row />
      <Row1 />
    </div>
  );
}

function Header2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">REF. OEM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">350213214800</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start max-w-[200px] min-h-px min-w-px relative" data-name="Column">
      <Header2 />
      <Row2 />
      <Row3 />
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex items-center px-[8px] py-[6px] relative shrink-0" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">QTD. / HORAS</p>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">01h00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Column">
      <Header3 />
      <Row4 />
      <Row5 />
    </div>
  );
}

function Header4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">CUSTO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">93,11€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[96px]" data-name="Column">
      <Header4 />
      <Row6 />
      <Row7 />
    </div>
  );
}

function Header5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">PREÇO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">50,00€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row9() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">107,08€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[96px]" data-name="Column">
      <Header5 />
      <Row8 />
      <Row9 />
    </div>
  );
}

function Header6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">Desc.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row10() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis">0%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row11() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis">0%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[57px]" data-name="Column">
      <Header6 />
      <Row10 />
      <Row11 />
    </div>
  );
}

function Header7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">Subtotal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row12() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right">50,00€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row13() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right">107,08€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[82px]" data-name="Column">
      <Header7 />
      <Row12 />
      <Row13 />
    </div>
  );
}

function Header8() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Row14() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] py-[6px] size-full" />
      </div>
    </div>
  );
}

function Row15() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] py-[6px] size-full" />
      </div>
    </div>
  );
}

function Column7() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative rounded-br-[16px] rounded-tr-[16px] shrink-0 w-[32px]" data-name="Column">
      <Header8 />
      <Row14 />
      <Row15 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white content-stretch flex items-center relative shrink-0 w-full" data-name="Table">
      <Column />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Column1 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column2 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column3 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column4 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column5 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column6 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column7 />
      </div>
    </div>
  );
}

function Tables() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Tables">
      <div className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Item Table">
        <Table />
      </div>
    </div>
  );
}

function ServicePriceFrame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0" data-name="Service Price Frame">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#27272a] text-[16px] whitespace-nowrap">157,08€</p>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 size-[16px]" data-name="Tooltip / Service Price Breakdown">
        <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="info">
          <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
              <path d={svgPaths.p68b4ff0} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomFrame() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Bottom Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[20px] relative size-full">
          <div className="bg-[rgba(39,39,42,0.05)] content-stretch flex h-[34px] items-start p-[3px] relative rounded-[8px] shrink-0" data-name="Light Mode / Tab Groups">
            <div className="bg-white content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Tab 1">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left icon">
                <div className="absolute inset-[20.83%_8.33%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 11.6667">
                    <path d={svgPaths.p12a16200} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
            </div>
            <button className="content-stretch cursor-pointer flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0" data-name="Tab 2">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left icon">
                <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                    <path d={svgPaths.p1cda870} fill="var(--fill-0, #71717A)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
          <ServicePriceFrame />
        </div>
      </div>
    </div>
  );
}

function ServiceFrameBreakdown() {
  return (
    <div className="relative shrink-0 w-full" data-name="Service Frame Breakdown">
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="bg-white content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full" data-name="Service Table 1">
          <Tables />
          <BottomFrame />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Frame">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#3f3f46] text-[16px] whitespace-nowrap">Bomba de água (substituir)</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative w-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function LightModeInput1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative" data-name="Light Mode / Input">
      <Input1 />
    </div>
  );
}

function HeaderFrame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-[32px] min-w-px relative" data-name="Header Frame">
      <div className="content-stretch flex gap-[4px] items-center overflow-clip p-[4px] relative shrink-0" data-name="Drag Button">
        <div className="h-[18px] relative shrink-0 w-[4px]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 18">
            <path d={svgPaths.p1c8d0740} fill="var(--fill-0, #D4D4D8)" id="Vector (Stroke)" />
          </svg>
        </div>
        <div className="h-[18px] relative shrink-0 w-[4px]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 18">
            <path d={svgPaths.p1c8d0740} fill="var(--fill-0, #D4D4D8)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative shrink-0 size-[32px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <button className="content-stretch cursor-pointer flex items-center justify-center relative rounded-[6px] size-[32px]" data-name="Light Mode / Button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                  <path d={svgPaths.p2063d280} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Service Frame / Title">
        <LightModeInput1 />
      </div>
    </div>
  );
}

function HeaderFrame2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative w-full">
          <HeaderFrame3 />
          <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[32px] min-h-[32px] px-[12px] relative rounded-[6px] shrink-0" data-name="Light Mode / Button">
            <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p5fab880} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#27272a] text-[14px] whitespace-nowrap">Pendente</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[20px] pr-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">ITEM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LaborFrame1() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Labor Frame" style={{ backgroundImage: "linear-gradient(90deg, rgba(232, 168, 56, 0.15) 0%, rgba(232, 168, 56, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="wrench">
        <div className="absolute inset-[4.15%_4.15%_8.33%_8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0034 14.0032">
            <path d={svgPaths.p1a2e8200} fill="var(--fill-0, #E8A838)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row16() {
  return (
    <div className="min-h-[48px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] pl-[20px] pr-[8px] py-[8px] relative w-full">
          <LaborFrame1 />
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis">Bomba de água (substituir)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartFrame1() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Part Frame" style={{ backgroundImage: "linear-gradient(90deg, rgba(206, 105, 224, 0.15) 0%, rgba(206, 105, 224, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="bolt">
        <div className="absolute inset-[4.17%_8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 14.6641">
            <path d={svgPaths.p475cc00} fill="var(--fill-0, #CE69E0)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row17() {
  return (
    <div className="min-h-[48px] relative shrink-0 w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] pl-[20px] pr-[8px] py-[8px] relative w-full">
          <PartFrame1 />
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis">Bomba de água</p>
          </div>
          <div className="bg-[#8270ff] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Light Mode / Badge">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">IAM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative rounded-bl-[16px] rounded-tl-[16px]" data-name="Column">
      <Header9 />
      <Row16 />
      <Row17 />
    </div>
  );
}

function Header10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">REF. OEM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row18() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row19() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">1628941780</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start max-w-[200px] min-h-px min-w-px relative" data-name="Column">
      <Header10 />
      <Row18 />
      <Row19 />
    </div>
  );
}

function Header11() {
  return (
    <div className="content-stretch flex items-center px-[8px] py-[6px] relative shrink-0" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">QTD. / HORAS</p>
      </div>
    </div>
  );
}

function Row20() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">02h30</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row21() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column10() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Column">
      <Header11 />
      <Row20 />
      <Row21 />
    </div>
  );
}

function Header12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">CUSTO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row22() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row23() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">45,77€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column11() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[96px]" data-name="Column">
      <Header12 />
      <Row22 />
      <Row23 />
    </div>
  );
}

function Header13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">PREÇO</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row24() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">50,00€/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row25() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis whitespace-nowrap">52,64€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column12() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[96px]" data-name="Column">
      <Header13 />
      <Row24 />
      <Row25 />
    </div>
  );
}

function Header14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">Desc.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row26() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis">0%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row27() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis">0%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column13() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[57px]" data-name="Column">
      <Header14 />
      <Row26 />
      <Row27 />
    </div>
  );
}

function Header15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[8px] py-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Column 1 Item">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase whitespace-nowrap">Subtotal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row28() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right">125,00€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row29() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right">52,64€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column14() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[82px]" data-name="Column">
      <Header15 />
      <Row28 />
      <Row29 />
    </div>
  );
}

function Header16() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Row30() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] py-[6px] size-full" />
      </div>
    </div>
  );
}

function Row31() {
  return (
    <div className="flex-[1_0_0] min-h-[48px] min-w-px relative w-full" data-name="Row">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] py-[6px] size-full" />
      </div>
    </div>
  );
}

function Column15() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative rounded-br-[16px] rounded-tr-[16px] shrink-0 w-[32px]" data-name="Column">
      <Header16 />
      <Row30 />
      <Row31 />
    </div>
  );
}

function Table1() {
  return (
    <div className="bg-white content-stretch flex items-center relative shrink-0 w-full" data-name="Table">
      <Column8 />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Column9 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column10 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column11 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column12 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column13 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column14 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Column15 />
      </div>
    </div>
  );
}

function Tables1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Tables">
      <div className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Item Table">
        <Table1 />
      </div>
    </div>
  );
}

function ServicePriceFrame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0" data-name="Service Price Frame">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#27272a] text-[16px] whitespace-nowrap">177,64€</p>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 size-[16px]" data-name="Tooltip / Service Price Breakdown">
        <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="info">
          <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
              <path d={svgPaths.p68b4ff0} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomFrame1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Bottom Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[20px] relative size-full">
          <div className="bg-[rgba(39,39,42,0.05)] content-stretch flex h-[34px] items-start p-[3px] relative rounded-[8px] shrink-0" data-name="Light Mode / Tab Groups">
            <div className="bg-white content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Tab 1">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left icon">
                <div className="absolute inset-[20.83%_8.33%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 11.6667">
                    <path d={svgPaths.p12a16200} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
            </div>
            <button className="content-stretch cursor-pointer flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0" data-name="Tab 2">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left icon">
                <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                    <path d={svgPaths.p1cda870} fill="var(--fill-0, #71717A)" id="Vector (Stroke)" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
          <ServicePriceFrame1 />
        </div>
      </div>
    </div>
  );
}

function ServiceFrameBreakdown1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Service Frame Breakdown">
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="bg-white content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full" data-name="Service Table 2">
          <Tables1 />
          <BottomFrame1 />
        </div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Services">
      <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Service Frame 1">
        <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
          <HeaderFrame />
          <ServiceFrameBreakdown />
        </div>
        <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[16px]" />
      </div>
      <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Service Frame 2">
        <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
          <HeaderFrame2 />
          <ServiceFrameBreakdown1 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[16px]" />
      </div>
    </div>
  );
}

function ContentFrame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[630px] items-start left-0 right-0 top-[152px]" data-name="Content Frame">
      <SubheaderFrame />
      <Services />
    </div>
  );
}

function IconFrame1() {
  return (
    <div className="bg-[rgba(130,112,255,0.15)] content-stretch flex items-center p-[6px] relative rounded-[8px] shrink-0" data-name="Icon Frame">
      <div aria-hidden="true" className="absolute border-[#8270ff] border-l-2 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="user-round">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.6667">
            <path d={svgPaths.p7670500} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ContentFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic relative" data-name="Content Frame">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#27272a] text-[14px] w-full">Raúl Fernandes</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis w-full whitespace-nowrap">917 898 413 | rfernandes84@gmail.com</p>
    </div>
  );
}

function UserFrame() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[64px] items-center p-[12px] relative rounded-[12px] shrink-0 w-[300px]" data-name="User Frame">
      <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <IconFrame1 />
      <ContentFrame1 />
    </div>
  );
}

function IconFrame2() {
  return (
    <div className="bg-[rgba(130,112,255,0.15)] content-stretch flex items-center p-[6px] relative rounded-[9999px] shrink-0" data-name="Icon Frame">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="car">
        <div className="absolute bottom-[16.67%] left-[4.17%] right-[4.17%] top-1/4" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 11.6667">
            <path d={svgPaths.p39556c00} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ContentFrame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic relative" data-name="Content Frame">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#27272a] text-[14px] w-full">Renault Clio</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis w-full whitespace-nowrap">AV-59-ZZ | WBABT11010LN54700</p>
    </div>
  );
}

function ClientDetails() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-0 overflow-clip right-0 top-0" data-name="Client Details">
      <UserFrame />
      <div className="bg-white content-stretch flex gap-[12px] h-[64px] items-center p-[12px] relative rounded-[12px] shrink-0 w-[300px]" data-name="Vehicle Frame">
        <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <IconFrame2 />
        <ContentFrame2 />
      </div>
    </div>
  );
}

function Main1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px overflow-x-clip overflow-y-auto relative w-full" data-name="Main">
      <ContentFrame />
      <div className="absolute h-[694px] inset-[88px_0_0_0] pointer-events-none">
        <div className="bg-[#f4f4f5] content-stretch flex gap-[16px] items-start pointer-events-auto sticky top-0" data-name="Light Mode / Tab Groups">
          <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[10px] relative shrink-0" data-name="Tab 1">
            <div aria-hidden="true" className="absolute border-b-2 border-black border-solid inset-0 pointer-events-none" />
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#27272a] text-[14px] text-center whitespace-nowrap">Serviços</p>
          </div>
          <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[10px] relative shrink-0" data-name="Tab 2">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#a1a1aa] text-[14px] text-center whitespace-nowrap">Inspeções</p>
          </div>
        </div>
      </div>
      <ClientDetails />
    </div>
  );
}

function LeftFrame1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Left Frame">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
        <Header />
        <Main1 />
      </div>
    </div>
  );
}

function Header17() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-full" data-name="Header">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-h-px min-w-px not-italic relative text-[#27272a] text-[16px]">Orçamento #843</p>
      </div>
    </div>
  );
}

function IconFrame3() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Icon Frame">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-full items-center pl-[8px] py-[8px] relative">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Icon">
            <div className="absolute inset-[4.17%_12.5%_4.17%_4.17%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 18.3333">
                <path d={svgPaths.pe099ff0} fill="var(--fill-0, #854D0E)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#713f12] text-[14px] whitespace-nowrap">Por aprovar</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[8px] relative" data-name="Text">
      <Text1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pl-[8px] relative w-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function HeaderFrame4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header Frame">
      <Header17 />
      <div className="bg-[#fefce8] relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Callout">
        <div aria-hidden="true" className="absolute border border-[#facc15] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex items-start p-[8px] relative w-full">
          <IconFrame3 />
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis whitespace-nowrap">Criado em</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right">09/07/2025, 12:50:31</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis whitespace-nowrap">Válido até</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right">24/07/2025, 23:59:59</p>
      </div>
    </div>
  );
}

function UserFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="User Frame">
      <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right">Tânia Graça</p>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron-down">
        <div className="absolute inset-[33.33%_20.83%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33313 5.33323">
            <path d={svgPaths.p15a75f00} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis whitespace-nowrap">Responsável</p>
      </div>
      <UserFrame1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis whitespace-nowrap">Horas orçamentadas</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right">03h30</p>
      </div>
    </div>
  );
}

function PrimaryFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Primary Frame">
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function ContentFrame3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-x-clip overflow-y-auto relative shrink-0 w-full" data-name="Content Frame">
      <PrimaryFrame />
    </div>
  );
}

function TopFrame() {
  return (
    <button className="content-stretch cursor-pointer flex gap-[8px] items-center relative shrink-0 w-full" data-name="Top Frame">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="check">
        <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9998 8.66657">
            <path d={svgPaths.p34d58680} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left">Aprovações</p>
      </div>
      <div className="flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "70", "--transform-inner-height": "16" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] size-[24px]" data-name="Light Mode / Button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                  <path d={svgPaths.p2063d280} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function IconFrame4() {
  return (
    <div className="content-stretch flex items-center p-[4px] relative shrink-0" data-name="Icon Frame">
      <div className="bg-[#d4d4d8] rounded-[9999px] shrink-0 size-[8px]" />
    </div>
  );
}

function LeftFrame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Left Frame">
      <IconFrame4 />
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-ellipsis">2 serviços pendentes</p>
      </div>
    </div>
  );
}

function RightFrame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Frame">
      <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis text-right whitespace-nowrap">319,55€</p>
      </div>
    </div>
  );
}

function ServiceFrame() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Service Frame">
      <LeftFrame2 />
      <RightFrame1 />
    </div>
  );
}

function Approvals() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Approvals">
      <ServiceFrame />
    </div>
  );
}

function ExpandableItems() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Expandable Items">
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Services Approved Frame">
        <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-[399px]" data-name="Light Mode / Separator" />
        <TopFrame />
        <Approvals />
      </div>
    </div>
  );
}

function MainFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px overflow-x-clip overflow-y-auto relative w-full" data-name="Main Frame">
      <HeaderFrame4 />
      <ContentFrame3 />
      <ExpandableItems />
    </div>
  );
}

function SideMenuFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative w-full" data-name="Side Menu Frame">
      <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative w-full" data-name="Side Menu - EST (Pending)">
        <div className="bg-[rgba(39,39,42,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Tab Groups">
          <div className="content-stretch flex items-start p-[3px] relative w-full">
            <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" data-name="Tab 1">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#27272a] text-[14px] whitespace-nowrap">Orçamento</p>
                </div>
              </div>
            </div>
            <button className="cursor-pointer flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Tab 2">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#52525b] text-[14px] text-left whitespace-nowrap">Cliente</p>
                </div>
              </div>
            </button>
            <button className="cursor-pointer flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Tab 3">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative w-full">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#52525b] text-[14px] text-left whitespace-nowrap">Veículo</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        <MainFrame />
      </div>
    </div>
  );
}

function TopFrame1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Top Frame">
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-ellipsis">Subtotal</p>
      </div>
      <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis text-right whitespace-nowrap">334,72€</p>
      </div>
    </div>
  );
}

function LeftFrame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Left Frame">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#27272a] text-[16px] whitespace-nowrap">Total</p>
      </div>
      <div className="content-stretch flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative rounded-[6px] shrink-0 size-[24px]" data-name="Light Mode / Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
          <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
              <path d={svgPaths.p2063d280} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomFrame2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Bottom Frame">
      <LeftFrame3 />
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#27272a] text-[16px] whitespace-nowrap">411,71€</p>
      </div>
    </div>
  );
}

function ContentFrame4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Content Frame">
      <TopFrame1 />
      <BottomFrame2 />
    </div>
  );
}

function ButtonsFrame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Buttons Frame">
      <div className="bg-[#262124] max-h-[40px] min-h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Button">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center justify-center max-h-[inherit] min-h-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[inherit] min-h-[inherit] px-[16px] relative w-full">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9998 8.66657">
                  <path d={svgPaths.p34d58680} fill="var(--fill-0, white)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Aprovar orçamento</p>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_black,inset_0px_2px_0px_0px_rgba(255,255,255,0.2)]" />
      </div>
      <div className="bg-white max-h-[40px] min-h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Button">
        <div aria-hidden="true" className="absolute border border-[#d4d4d8] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
        <div className="flex flex-row items-center justify-center max-h-[inherit] min-h-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[inherit] min-h-[inherit] px-[16px] relative w-full">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute inset-[20.83%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33323 9.33323">
                  <path d={svgPaths.p2bd57f80} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3f3f46] text-[14px] whitespace-nowrap">Rejeitar orçamento</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Action Buttons">
      <ContentFrame4 />
      <ButtonsFrame1 />
    </div>
  );
}

function RightFrame() {
  return (
    <div className="bg-white h-full max-w-[360px] relative shrink-0 w-[360px]" data-name="Right Frame">
      <div aria-hidden="true" className="absolute border-[#d4d4d8] border-l border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[inherit] px-[16px] py-[24px] relative size-full">
        <SideMenuFrame />
        <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
        <ActionButtons />
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-full" data-name="Main">
      <LeftFrame1 />
      <RightFrame />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px overflow-clip relative" data-name="Content">
      <div className="bg-white relative shrink-0 w-full" data-name="Navbar">
        <div aria-hidden="true" className="absolute border-[#d4d4d8] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center p-[8px] relative w-full">
            <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
              <TabsFrame />
            </div>
            <ButtonsFrame />
          </div>
        </div>
      </div>
      <Main />
    </div>
  );
}

export default function QuotesViewQuotePendingViewMode() {
  return (
    <div className="bg-[#f4f4f5] content-stretch flex items-center relative size-full" data-name="Quotes - View Quote (Pending | View Mode)1">
      <div className="bg-[#262124] h-full relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Sidebar">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col gap-[24px] h-full items-center py-[12px] relative">
            <LogoFrame />
            <div className="content-stretch flex flex-col items-center justify-center px-[8px] relative shrink-0 w-[56px]" data-name="Add Button">
              <div className="aspect-[40/40] bg-[rgba(130,112,255,0.5)] content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Dark Mode / Button">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
                  <div className="absolute inset-[16.67%]" data-name="Vector (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                      <path d={svgPaths.p15e4fc00} fill="var(--fill-0, white)" id="Vector (Stroke)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <MainButtons />
            <BottomButtons />
          </div>
        </div>
      </div>
      <Content />
    </div>
  );
}