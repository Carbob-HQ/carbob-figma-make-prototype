import svgPaths from "./svg-0e88sqm843";

function TextFrame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Text Frame">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">Introduz o VIN do veículo</p>
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
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">W1N4M1AB1PW293130</p>
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
      <div className="bg-[#27272a] content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0" data-name="Light Mode / Button">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Identificar</p>
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
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Iremos identificar o veículo automaticamente com base no seu VIN</p>
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

function Text() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Data de matrícula</p>
    </div>
  );
}

function TopBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
      <Text />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">12/2023</p>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Marca</p>
    </div>
  );
}

function TopBlock1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
      <Text1 />
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Mercedes-Benz</p>
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Modelo</p>
    </div>
  );
}

function TopBlock2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
      <Text2 />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">GLB</p>
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Versão</p>
    </div>
  );
}

function TopBlock3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
      <Text3 />
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">GLB (2023-2025)</p>
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Motorização</p>
    </div>
  );
}

function TopBlock4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
      <Text4 />
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">180 d</p>
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Matrícula</p>
    </div>
  );
}

function TopBlock5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
      <Text5 />
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">BA-71-CC</p>
        </div>
      </div>
    </div>
  );
}

function OutputsFrame() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(3,minmax(0,1fr))] h-[248px] relative shrink-0 w-full" data-name="Outputs Frame">
      <div className="col-1 content-stretch flex flex-col gap-[12px] items-start justify-self-stretch relative row-3 self-start shrink-0" data-name="Light Mode / Field">
        <TopBlock />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Readonly, Size=sm">
          <Input1 />
        </div>
      </div>
      <div className="col-1 content-stretch flex flex-col gap-[12px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Light Mode / Field">
        <TopBlock1 />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Readonly, Size=sm">
          <Input2 />
        </div>
      </div>
      <div className="col-2 content-stretch flex flex-col gap-[12px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Light Mode / Field">
        <TopBlock2 />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Readonly, Size=sm">
          <Input3 />
        </div>
      </div>
      <div className="col-1 content-stretch flex flex-col gap-[12px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="Light Mode / Field">
        <TopBlock3 />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Readonly, Size=sm">
          <Input4 />
        </div>
      </div>
      <div className="col-2 content-stretch flex flex-col gap-[12px] items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="Light Mode / Field">
        <TopBlock4 />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Readonly, Size=sm">
          <Input5 />
        </div>
      </div>
      <div className="col-2 content-stretch flex flex-col gap-[12px] items-start justify-self-stretch relative row-3 self-stretch shrink-0" data-name="Light Mode / Field">
        <TopBlock5 />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Readonly, Size=sm">
          <Input6 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full" data-name="Main">
      <InputsFrame />
      <div className="bg-[#e5e5e5] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
      <OutputsFrame />
    </div>
  );
}

function AddVehicleFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[453px] items-start relative shrink-0 w-full" data-name="Add Vehicle Frame">
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Column 1 Item">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[12px] relative shrink-0" data-name="Tab 1">
          <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[14px] text-center">Matrícula</p>
        </div>
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[12px] relative shrink-0" data-name="Tab 2">
          <div aria-hidden="true" className="absolute border-b-2 border-black border-solid inset-0 pointer-events-none" />
          <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-center">VIN</p>
        </div>
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[12px] relative shrink-0" data-name="Tab 3">
          <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[14px] text-center">Seleção manual</p>
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
        <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Cancelar</p>
      </button>
      <div className="bg-[#27272a] content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0" data-name="Light Mode / Button">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Adicionar</p>
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
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Card Items / Header Block">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px relative" data-name="Light Mode / Card Items / Header">
          <p className="font-medium leading-[1.25] not-italic relative shrink-0 text-[#27272a] text-[16px] w-full whitespace-pre-wrap">Adicionar novo veículo</p>
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