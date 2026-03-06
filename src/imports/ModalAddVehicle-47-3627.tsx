import svgPaths from "./svg-ujl5027gat";

function TextFrame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Text Frame">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">Introduz o VIN do veículo</p>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Tooltip / Vehicle Search Context">
        <div className="overflow-clip relative shrink-0 size-[12px]" data-name="info">
          <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <path d={svgPaths.p169dfe80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#3f3f46] text-[14px] whitespace-pre-wrap">W1N4M1AB1PW293130</p>
          <div className="-translate-y-1/2 absolute right-[12px] size-[20px] top-1/2" data-name="Spinner / Light Mode">
            <div className="absolute inset-[-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
                <path d={svgPaths.p2f0f4700} id="Ellipse 26" stroke="var(--stroke-0, #D4D4D8)" strokeWidth="3" />
              </svg>
            </div>
            <div className="absolute bottom-[49.64%] left-[92.5%] right-[-7.5%] top-1/2">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.00017 0.0722561">
                <path d={svgPaths.p2b67d803} id="Ellipse 27" stroke="var(--stroke-0, #3F3F46)" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputsFrame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Inputs Frame">
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[360px]" data-name="Column 1 Item">
        <Input />
      </div>
      <div className="bg-[#262124] content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0" data-name="Light Mode / Button">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Identificar</p>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_black,inset_0px_2px_0px_0px_rgba(255,255,255,0.2)]" />
      </div>
    </div>
  );
}

function InfoFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Info Frame">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="info">
        <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p68b4ff0} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Iremos identificar o veículo automaticamente com base no seu VIN</p>
      </div>
    </div>
  );
}

function InputsFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Inputs Frame">
      <TextFrame />
      <InputsFrame1 />
      <InfoFrame />
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Main">
      <InputsFrame />
    </div>
  );
}

function AddVehicleFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[453px] items-start relative shrink-0 w-full" data-name="Add Vehicle Frame">
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Column 1 Item">
        <div aria-hidden="true" className="absolute border-[rgba(39,39,42,0.1)] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[10px] relative shrink-0" data-name="Tab 1">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#a1a1aa] text-[14px] text-center">Matrícula</p>
        </div>
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[10px] relative shrink-0" data-name="Tab 2">
          <div aria-hidden="true" className="absolute border-b-2 border-black border-solid inset-0 pointer-events-none" />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-center">VIN</p>
        </div>
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[10px] relative shrink-0" data-name="Tab 3">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#a1a1aa] text-[14px] text-center">Seleção manual</p>
        </div>
      </div>
      <Main />
    </div>
  );
}

function RightFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right Frame">
      <button className="content-stretch cursor-pointer flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0" data-name="Light Mode / Button">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Cancelar</p>
      </button>
      <div className="bg-[#262124] content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] opacity-30 px-[16px] relative rounded-[8px] shrink-0" data-name="Light Mode / Button">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Adicionar</p>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_black,inset_0px_2px_0px_0px_rgba(255,255,255,0.2)]" />
      </div>
    </div>
  );
}

function ButtonsFrame() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Buttons Frame">
      <RightFrame />
    </div>
  );
}

export default function ModalAddVehicle() {
  return (
    <div className="bg-[#f4f4f5] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[12px] size-full" data-name="Modal / Add Vehicle">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full" data-name="Light Mode / Card Items / Header Block">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px relative" data-name="Light Mode / Card Items / Header">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.25] not-italic relative shrink-0 text-[#27272a] text-[16px] w-full whitespace-pre-wrap">Adicionar novo veículo</p>
        </div>
        <button className="absolute content-stretch cursor-pointer flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] right-[-8px] rounded-[6px] size-[32px] top-[-8px]" data-name="Light Mode / Button">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[20.83%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33323 9.33323">
                <path d={svgPaths.p2bd57f80} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </button>
      </div>
      <AddVehicleFrame />
      <ButtonsFrame />
    </div>
  );
}