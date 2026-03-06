function ContentFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Name">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Raúl Fernandes</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Description">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis">917 898 413 | rfernandes84@gmail.com</p>
      </div>
    </div>
  );
}

export default function Submenu() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center p-[5px] relative rounded-[8px] size-full" data-name="Submenu 2">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-white content-stretch flex gap-[12px] items-center justify-center min-w-[180px] px-[8px] py-[6px] relative rounded-[6px] shrink-0 w-[350px]" data-name="Client Frame">
        <div className="bg-white relative rounded-[9999px] shrink-0 size-[32px]" data-name="Left Icon">
          <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[12px]">RF</p>
          </div>
          <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        </div>
        <ContentFrame />
      </div>
    </div>
  );
}