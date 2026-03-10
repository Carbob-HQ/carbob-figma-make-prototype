import svgPaths from "./svg-20o89e9dyh";

function Text() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Nome *</p>
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

function Input() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#d4d4d8] text-[14px] text-ellipsis">Nome</p>
        </div>
      </div>
    </div>
  );
}

function LabelFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">SMS</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white relative rounded-[9999px] shrink-0 size-[8px]">
      <div className="size-full" />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
        <LabelFrame />
        <div className="bg-[#27272a] relative rounded-[9999px] shrink-0 size-[18px]" data-name="Light Mode / Radio / Radio Selector">
          <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
            <Frame1 />
          </div>
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
        </div>
      </div>
    </div>
  );
}

function LabelFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">Email</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
        <div className="content-stretch flex items-center pt-px relative shrink-0" data-name="Radio Frame">
          <div className="relative rounded-[9999px] shrink-0 size-[18px]" data-name="Light Mode / Radio / Radio Selector">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
          </div>
        </div>
        <LabelFrame1 />
      </div>
    </div>
  );
}

function LabelFrame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">Ambos</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
        <div className="content-stretch flex items-center pt-px relative shrink-0" data-name="Radio Frame">
          <div className="relative rounded-[9999px] shrink-0 size-[18px]" data-name="Light Mode / Radio / Radio Selector">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
          </div>
        </div>
        <LabelFrame2 />
      </div>
    </div>
  );
}

function RadioItems() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Radio Items">
      <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="Radio Item 1">
        <Frame />
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="Radio Item 2">
        <Frame2 />
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="Radio Item 3">
        <Frame3 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Número de telefone *</p>
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

function Input1() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left Icon">
            <div className="absolute inset-[4.17%_4.17%_4.47%_4.63%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.24 18.2736">
                <path d={svgPaths.p1febc800} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Endereço de email</p>
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

function Input2() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left Icon">
            <div className="absolute inset-[12.5%_4.17%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 15">
                <path d={svgPaths.pef93580} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Years() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Years">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-h-px min-w-px relative w-full" data-name="Light Mode / Field">
        <TopBlock />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Idle, Size=sm">
          <Input />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Light Mode / Radio Group / Radio Group">
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Heading">
          <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Método preferencial de contacto *</p>
        </div>
        <RadioItems />
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Field">
        <TopBlock1 />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Idle, Size=sm">
          <Input1 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Field">
        <TopBlock2 />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Idle, Size=sm">
          <Input2 />
        </div>
      </div>
    </div>
  );
}

function ButtonsFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0 w-full" data-name="Buttons Frame">
      <button className="content-stretch cursor-pointer flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0" data-name="Light Mode / Button">
        <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Cancelar</p>
      </button>
      <div className="bg-[#27272a] content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] opacity-30 px-[16px] relative rounded-[8px] shrink-0" data-name="Light Mode / Button">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Adicionar</p>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_black,inset_0px_2px_0px_0px_rgba(255,255,255,0.2)]" />
      </div>
    </div>
  );
}

export default function ModalAddNewClient() {
  return (
    <div className="bg-[#f4f4f5] content-stretch flex flex-col gap-[24px] items-start opacity-99 p-[24px] relative rounded-[12px] size-full" data-name="Modal / Add New Client">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Card Items / Header Block">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px relative" data-name="Light Mode / Card Items / Header">
          <p className="font-medium leading-[1.25] not-italic relative shrink-0 text-[#27272a] text-[16px] w-full whitespace-pre-wrap">Adicionar novo cliente</p>
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
      <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Light Mode / Tab Groups">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[12px] relative shrink-0" data-name="Tab 1">
          <div aria-hidden="true" className="absolute border-b-2 border-black border-solid inset-0 pointer-events-none" />
          <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-center">Contacto</p>
        </div>
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[12px] relative shrink-0" data-name="Tab 2">
          <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[14px] text-center">Faturação</p>
        </div>
      </div>
      <Years />
      <ButtonsFrame />
    </div>
  );
}