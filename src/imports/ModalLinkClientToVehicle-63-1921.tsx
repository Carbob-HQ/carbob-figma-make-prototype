import svgPaths from "./svg-bt96uk6sxi";

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Não existe nenhum cliente associado a este veículo.</p>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Queres associar o veículo a este cliente?</p>
      </div>
    </div>
  );
}

export default function ModalLinkClientToVehicle() {
  return (
    <div className="bg-[#f4f4f5] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[12px] size-full" data-name="Modal / Link Client to Vehicle">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full" data-name="Light Mode / Card Items / Header Block">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px relative" data-name="Light Mode / Card Items / Header">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.25] not-italic relative shrink-0 text-[#27272a] text-[16px] w-full whitespace-pre-wrap">Associar veículo</p>
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
      <Frame />
      <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0 w-full" data-name="Light Mode / Card Items / Buttons Block">
        <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0" data-name="Button 2">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Não associar</p>
        </div>
        <div className="bg-[#262124] content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0" data-name="Button 1">
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Associar</p>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_black,inset_0px_2px_0px_0px_rgba(255,255,255,0.2)]" />
        </div>
      </div>
    </div>
  );
}