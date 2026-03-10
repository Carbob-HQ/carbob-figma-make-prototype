import svgPaths from "./svg-r98xep0608";
import imgImage324 from "figma:asset/aadee18dc44048d2f735deaf90da573856a589fc.png";

function TopFrame() {
  return (
    <div className="relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Top Frame">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Heading">
          <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Pesquisar revisão</p>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Caixa de velocidades</p>
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
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Caixa manual</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-[12px] size-[16px] top-1/2" data-name="Right Icon">
            <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.9999 11.9998">
                <path d={svgPaths.p3aa5f0e0} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
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
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Quilómetros</p>
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
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#d4d4d8] text-[14px] text-ellipsis text-left whitespace-nowrap">100000</p>
        </div>
      </div>
    </div>
  );
}

function InputsFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Inputs Frame">
      <div className="content-stretch flex flex-col gap-[12px] items-start max-w-[320px] min-w-[240px] relative shrink-0 w-full" data-name="Light Mode / Field">
        <TopBlock />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Select, State=Filled, Size=sm">
          <Input />
        </div>
      </div>
      <button className="content-stretch cursor-pointer flex flex-col gap-[12px] items-start max-w-[320px] min-w-[240px] relative shrink-0 w-full" data-name="Light Mode / Field">
        <TopBlock1 />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Idle, Size=sm">
          <Input1 />
        </div>
      </button>
    </div>
  );
}

function Main1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px overflow-x-clip overflow-y-auto relative w-full" data-name="Main">
      <InputsFrame />
      <div className="bg-white max-h-[40px] min-h-[40px] opacity-30 relative rounded-[8px] shrink-0 w-full" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
        <div className="flex flex-row items-center justify-center max-h-[inherit] min-h-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[inherit] min-h-[inherit] px-[16px] relative w-full">
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Pesquisar revisão</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandingFrame() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Branding Frame">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[8px] relative w-full">
          <p className="font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#71717a] text-[12px] w-[min-content] whitespace-pre-wrap">Com tecnologia</p>
          <div className="h-[24px] relative shrink-0 w-[105px]" data-name="image 324">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgImage324} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomFrame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-bl-[16px] rounded-br-[16px] w-full" data-name="Bottom Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
          <Main1 />
          <BrandingFrame />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-bl-[16px] rounded-br-[16px]" />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-[360px] overflow-x-clip overflow-y-auto relative" data-name="Content">
      <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-center text-ellipsis whitespace-pre-wrap">Seleciona a revisão adequada de acordo com a quilometragem do veículo para aceder à respetiva manutenção programada</p>
      </div>
    </div>
  );
}

export default function Main() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] content-stretch flex gap-[16px] items-start p-[16px] relative rounded-[16px] size-full" data-name="Main">
      <div className="bg-white content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[320px]" data-name="Navigation Frame">
        <TopFrame />
        <BottomFrame />
      </div>
      <Content />
    </div>
  );
}