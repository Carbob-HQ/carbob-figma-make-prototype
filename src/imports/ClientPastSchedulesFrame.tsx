import svgPaths from "./svg-scy6i2t86v";

function TopFrame() {
  return (
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
      <div className="flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "65", "--transform-inner-height": "16" } as React.CSSProperties}>
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

function LinkFrame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Link Frame">
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="external-link">
        <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p101e9700} fill="var(--fill-0, #8270ff)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#8270ff] text-[12px] whitespace-pre-wrap">ORC #791</p>
    </div>
  );
}

function ContentFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">Revisão oficial</p>
      <LinkFrame />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis text-right">23/09/2024</p>
      </div>
      <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis text-right">há 8 meses</p>
      </div>
    </div>
  );
}

function AppointmentFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Appointment Frame">
      <ContentFrame />
      <Frame />
    </div>
  );
}

function LinkFrame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Link Frame">
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="external-link">
        <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p101e9700} fill="var(--fill-0, #8270ff)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#8270ff] text-[12px] whitespace-pre-wrap">ORC #723</p>
    </div>
  );
}

function ContentFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">Revisão simples mais 1 serviço</p>
      <LinkFrame1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis text-right">14/09/2023</p>
      </div>
      <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis text-right">há 1 ano</p>
      </div>
    </div>
  );
}

function AppointmentFrame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Appointment Frame">
      <ContentFrame1 />
      <Frame1 />
    </div>
  );
}

function LinkFrame2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Link Frame">
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="external-link">
        <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p101e9700} fill="var(--fill-0, #8270ff)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#8270ff] text-[12px] whitespace-pre-wrap">ORC #673</p>
    </div>
  );
}

function ContentFrame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
      <p className="font-medium leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis w-full whitespace-nowrap">Pastilhas de travão (substituir) mais 1 serviço</p>
      <LinkFrame2 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis text-right">17/03/2023</p>
      </div>
      <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis text-right">há 2 anos</p>
      </div>
    </div>
  );
}

function AppointmentFrame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Appointment Frame">
      <ContentFrame2 />
      <Frame2 />
    </div>
  );
}

function Appointments() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Appointments">
      <AppointmentFrame />
      <AppointmentFrame1 />
      <AppointmentFrame2 />
    </div>
  );
}

export default function ClientPastSchedulesFrame() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start relative size-full" data-name="Client Past Schedules Frame">
      <div className="bg-[#e5e5e5] h-px shrink-0 w-[399px]" data-name="Light Mode / Separator" />
      <TopFrame />
      <Appointments />
    </div>
  );
}