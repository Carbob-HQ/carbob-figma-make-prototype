import svgPaths from "./svg-kcws562h2v";

function LabelFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px not-italic relative text-left whitespace-pre-wrap" data-name="Label Frame">
      <p className="font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full">Clio IV</p>
      <p className="font-normal leading-[1.5] relative shrink-0 text-[#71717a] text-[12px] w-full">{`11/2012 -> 08/2021`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <LabelFrame />
      </div>
    </div>
  );
}

function LabelFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Label Frame">
      <p className="font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full">Clio IV Sport Tourer</p>
      <p className="font-normal leading-[1.5] relative shrink-0 text-[#71717a] text-[12px] w-full">{`11/2012 -> 08/2021`}</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <LabelFrame1 />
      </div>
    </div>
  );
}

function LabelFrame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Label Frame">
      <p className="font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full">Clio V</p>
      <p className="font-normal leading-[1.5] relative shrink-0 text-[#71717a] text-[12px] w-full">{`06/2019 -> Hoje`}</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <LabelFrame2 />
      </div>
    </div>
  );
}

function Versions() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Versions">
      <button className="content-stretch cursor-pointer flex items-start relative shrink-0 w-[528px]" data-name="Button 2">
        <Frame />
      </button>
      <div className="content-stretch flex items-start relative shrink-0 w-[528px]" data-name="Button 3">
        <Frame1 />
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-[528px]" data-name="Button 4">
        <Frame2 />
      </div>
    </div>
  );
}

export default function ModalVersion() {
  return (
    <div className="bg-[#f4f4f5] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[12px] size-full" data-name="Modal / Version">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Card Items / Header Block">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px relative" data-name="Light Mode / Card Items / Header">
          <p className="font-medium leading-[1.25] not-italic relative shrink-0 text-[#27272a] text-[16px] w-full whitespace-pre-wrap">Seleciona a versão do veículo</p>
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
      <Versions />
    </div>
  );
}
