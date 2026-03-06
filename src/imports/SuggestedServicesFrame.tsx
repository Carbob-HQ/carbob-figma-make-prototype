import svgPaths from "./svg-puvxnhichb";

function TextFrame() {
  return (
    <button className="content-stretch cursor-pointer flex flex-[1_0_0] gap-[8px] h-full items-center min-h-px min-w-px relative" data-name="Text Frame">
      <div className="flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative shrink-0 size-[32px]" style={{ "--transform-inner-width": "114", "--transform-inner-height": "16" } as React.CSSProperties}>
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
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Serviços adicionais</p>
      </div>
    </button>
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
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Adicionar todos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Trabalho suplementar da revisão</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">A primeira vez após 4 anos, depois a cada 2 anos</p>
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
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">01h00</p>
      </div>
    </div>
  );
}

function LabelFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Correia dos agregados</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">A cada 120.000 km / 6 anos</p>
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
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">00h45</p>
      </div>
    </div>
  );
}

function LabelFrame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Filtro de partículas de fuligem</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Primeiramente em 180.000 km depois todos 30.000 km</p>
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
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">00h15</p>
      </div>
    </div>
  );
}

function LabelFrame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Polia tensora - correia dos agregados</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Todos 180.000 km / 10 anos</p>
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
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">00h30</p>
      </div>
    </div>
  );
}

function LabelFrame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Substituição da correia dentada, polia tensora, polia de desvio e bomba do líquido de refrigeração</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Todos 180.000 km / 10 anos</p>
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
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">01h15</p>
      </div>
    </div>
  );
}

function LabelFrame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Líquido de travões</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">Todos 2 anos</p>
      </div>
    </div>
  );
}

function TimeFrame5() {
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
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">01h15</p>
      </div>
    </div>
  );
}

function LabelFrame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Anticongelante</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">A primeira vez com 120.000 km / 4 anos e, em seguida, a cada 30.000 km / 1 anos</p>
      </div>
    </div>
  );
}

function TimeFrame6() {
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
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis">01h15</p>
      </div>
    </div>
  );
}

function Services() {
  return (
    <div className="relative shrink-0 w-full" data-name="Services">
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="bg-white content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Service Frame">
          <LabelFrame />
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
          <LabelFrame1 />
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
          <LabelFrame2 />
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
          <LabelFrame3 />
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
          <LabelFrame4 />
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
        <div className="bg-white content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Service Frame">
          <LabelFrame5 />
          <TimeFrame5 />
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
          <TimeFrame6 />
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

export default function SuggestedServicesFrame() {
  return (
    <div className="bg-white relative rounded-[16px] size-full" data-name="Suggested Services Frame">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ServiceFrame />
        <Services />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}