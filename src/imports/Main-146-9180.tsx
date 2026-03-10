import svgPaths from "./svg-lblcr7o14h";
import imgImage324 from "figma:asset/aadee18dc44048d2f735deaf90da573856a589fc.png";

function TopFrame() {
  return (
    <div className="h-[52px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Top Frame">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[16px] relative size-full">
          <div className="max-h-[32px] min-h-[32px] relative rounded-[6px] shrink-0 w-full" data-name="Light Mode / Button">
            <div className="flex flex-row items-center justify-center max-h-[inherit] min-h-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[inherit] min-h-[inherit] px-[12px] relative w-full">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
                  <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                      <path d={svgPaths.p18d16880} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                    </svg>
                  </div>
                </div>
                <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Revisões</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopFrame1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Top Frame">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Próxima revisão</p>
      <div className="bg-[rgba(96,165,250,0.2)] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Light Mode / Badge">
        <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#1e40af] text-[12px]">Recomendado</p>
      </div>
    </div>
  );
}

function LabelFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <TopFrame1 />
      <p className="font-normal leading-[1.5] not-italic relative shrink-0 text-[#71717a] text-[12px] w-full whitespace-pre-wrap">60000KM</p>
    </div>
  );
}

function ButtonFrame() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] min-h-[60px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Button Frame">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center min-h-[inherit] px-[16px] relative w-full">
          <LabelFrame />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron-right">
            <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                <path d={svgPaths.p2063d280} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px not-italic relative whitespace-pre-wrap" data-name="Label Frame">
      <p className="font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-[228px]">Revisão anterior</p>
      <p className="font-normal leading-[1.5] min-w-full relative shrink-0 text-[#71717a] text-[12px] w-[min-content]">50000KM</p>
    </div>
  );
}

function ButtonFrame1() {
  return (
    <div className="min-h-[60px] relative rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full" data-name="Button Frame">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center min-h-[inherit] px-[16px] relative w-full">
          <LabelFrame1 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="chevron-right">
            <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                <path d={svgPaths.p2063d280} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Main1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px overflow-x-clip overflow-y-auto relative w-full" data-name="Main">
      <ButtonFrame />
      <ButtonFrame1 />
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

function NavigationFrame() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[320px]" data-name="Navigation Frame">
      <TopFrame />
      <BottomFrame />
    </div>
  );
}

function TextFrame() {
  return (
    <div className="content-stretch cursor-pointer flex flex-[1_0_0] gap-[8px] h-full items-center min-h-px min-w-px relative" data-name="Text Frame" role="button" tabIndex="0">
      <div className="flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative shrink-0 size-[32px]" style={{ "--transform-inner-width": "247", "--transform-inner-height": "16" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] size-[32px]" data-name="Light Mode / Button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
                  <path d={svgPaths.p2063d280} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
        <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Plano de manutenção oficial</p>
      </div>
    </div>
  );
}

function ServiceFrame() {
  return (
    <div className="relative shrink-0 w-full" data-name="Service Frame">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <TextFrame />
          </div>
          <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[32px] min-h-[32px] px-[12px] relative rounded-[6px] shrink-0" data-name="Light Mode / Button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p30dbaa20} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Adicionar todos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelFrame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-left whitespace-pre-wrap">Serviços a cada 30.000 km / 1 ano(s)</p>
      </div>
    </div>
  );
}

function TimeFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="Time Frame">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="clock">
        <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p5fab880} fill="var(--fill-0, #71717A)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Time">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis text-left">01h18</p>
      </div>
    </div>
  );
}

function LabelFrame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-left whitespace-pre-wrap">Substituir conjunto de filtros do habitáculo</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis text-left whitespace-pre-wrap">A cada 30.000 km / 1 ano(s)</p>
      </div>
    </div>
  );
}

function TimeFrame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="Time Frame">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="clock">
        <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p5fab880} fill="var(--fill-0, #71717A)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Time">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis text-left">00h15</p>
      </div>
    </div>
  );
}

function LabelFrame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-left whitespace-pre-wrap">Executar teste de estrada</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis text-left whitespace-pre-wrap">Todos os 60.000 km</p>
      </div>
    </div>
  );
}

function TimeFrame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="Time Frame">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="clock">
        <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p5fab880} fill="var(--fill-0, #71717A)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Time">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis text-left">00h10</p>
      </div>
    </div>
  );
}

function LabelFrame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-left whitespace-pre-wrap">Substituir filtro de combustível</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis text-left whitespace-pre-wrap">Todos os 60.000 km / 4 anos</p>
      </div>
    </div>
  );
}

function TimeFrame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="Time Frame">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="clock">
        <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p5fab880} fill="var(--fill-0, #71717A)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Time">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis text-left">00h20</p>
      </div>
    </div>
  );
}

function LabelFrame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-left whitespace-pre-wrap">Substituir filtro de ar</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis text-left whitespace-pre-wrap">Todos os 60.000 km / 4 anos</p>
      </div>
    </div>
  );
}

function TimeFrame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="Time Frame">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="clock">
        <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
            <path d={svgPaths.p5fab880} fill="var(--fill-0, #71717A)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Time">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis text-left">00h10</p>
      </div>
    </div>
  );
}

function Services() {
  return (
    <div className="relative shrink-0 w-full" data-name="Services">
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="bg-white content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Service Frame">
          <LabelFrame2 />
          <TimeFrame />
          <div className="bg-white content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Light Mode / Button">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p30dbaa20} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Service Frame">
          <LabelFrame3 />
          <TimeFrame1 />
          <div className="bg-white content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Light Mode / Button">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p30dbaa20} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Service Frame">
          <LabelFrame4 />
          <TimeFrame2 />
          <div className="bg-white content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Light Mode / Button">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p30dbaa20} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Service Frame">
          <LabelFrame5 />
          <TimeFrame3 />
          <div className="bg-white content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Light Mode / Button">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p30dbaa20} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Service Frame">
          <LabelFrame6 />
          <TimeFrame4 />
          <div className="bg-white content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Light Mode / Button">
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
              <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p30dbaa20} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextFrame1() {
  return (
    <div className="content-stretch cursor-pointer flex flex-[1_0_0] gap-[8px] h-full items-center min-h-px min-w-px relative" data-name="Text Frame" role="button" tabIndex="0">
      <div className="content-stretch flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Light Mode / Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
          <div className="absolute inset-[20.83%_33.33%]" data-name="Vector (Stroke)">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33323 9.33313">
              <path d={svgPaths.p2063d280} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
        <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Serviços adicionais</p>
      </div>
    </div>
  );
}

function ServiceFrame1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Service Frame">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <TextFrame1 />
          </div>
          <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[32px] min-h-[32px] px-[12px] relative rounded-[6px] shrink-0" data-name="Light Mode / Button">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icon">
              <div className="absolute inset-[4.17%]" data-name="Vector (Stroke)">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                  <path d={svgPaths.p30dbaa20} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                </svg>
              </div>
            </div>
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Adicionar todos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[16px] h-full items-start min-h-px min-w-[360px] overflow-x-clip overflow-y-auto relative" data-name="Content">
      <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Maintenance Plan Frame">
        <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
          <ServiceFrame />
          <Services />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      </div>
      <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Suggested Services Frame">
        <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
          <ServiceFrame1 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      </div>
    </button>
  );
}

export default function Main() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] content-stretch flex gap-[16px] items-start p-[16px] relative rounded-[16px] size-full" data-name="Main">
      <NavigationFrame />
      <Content />
    </div>
  );
}