function Frame2() {
  return <div className="bg-[#f43f5e] content-stretch flex flex-col items-start overflow-clip p-[8px] rounded-[9999px] shrink-0 size-[32px]" />;
}

function Frame1() {
  return <div className="bg-[#eab308] rounded-[9999px] shrink-0 size-[32px]" />;
}

function Frame3() {
  return <div className="bg-[#22c55e] rounded-[9999px] shrink-0 size-[32px]" />;
}

function Frame() {
  return <div className="bg-[#3b82f6] rounded-[9999px] shrink-0 size-[32px]" />;
}

function Frame4() {
  return <div className="bg-[#a855f7] rounded-[9999px] shrink-0 size-[32px]" />;
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame1 />
      <Frame3 />
      <Frame />
      <Frame4 />
    </div>
  );
}

export default function ColorSelectorFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full" data-name="Color Selector Frame">
      <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Heading">
        <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Identificador de cor</p>
      </div>
      <Frame5 />
    </div>
  );
}