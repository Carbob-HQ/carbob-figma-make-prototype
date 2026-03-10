import svgPaths from "./svg-y8eq54zur2";

function Text() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Encargo</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#d4d4d8] text-[14px] text-ellipsis">Designação</p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white relative rounded-[9999px] shrink-0 size-[8px]">
      <div className="size-full" />
    </div>
  );
}

function RadioFrame() {
  return (
    <div className="content-stretch flex items-center pt-px relative shrink-0" data-name="Radio Frame">
      <div className="bg-[#27272a] relative rounded-[9999px] shrink-0 size-[18px]" data-name="Light Mode / Radio / Radio Selector">
        <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
          <Frame />
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      </div>
    </div>
  );
}

function LabelFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">Valor fixo</p>
    </div>
  );
}

function RadioFrame1() {
  return (
    <div className="content-stretch flex items-center pt-px relative shrink-0" data-name="Radio Frame">
      <div className="bg-white relative rounded-[9999px] shrink-0 size-[18px]" data-name="Light Mode / Radio / Radio Selector">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      </div>
    </div>
  );
}

function LabelFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">% do subtotal de item</p>
    </div>
  );
}

function RadioFrame2() {
  return (
    <div className="content-stretch flex items-center pt-px relative shrink-0" data-name="Radio Frame">
      <div className="bg-white relative rounded-[9999px] shrink-0 size-[18px]" data-name="Light Mode / Radio / Radio Selector">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      </div>
    </div>
  );
}

function LabelFrame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px relative" data-name="Label Frame">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">% do subtotal do serviço</p>
    </div>
  );
}

function RadioItems() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Radio Items">
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Radio Item 1">
        <RadioFrame />
        <LabelFrame />
      </div>
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Radio Item 2">
        <RadioFrame1 />
        <LabelFrame1 />
      </div>
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Radio Item 3">
        <RadioFrame2 />
        <LabelFrame2 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Preço</p>
    </div>
  );
}

function TopBlock() {
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
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">0,00€</p>
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Desconto</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <p className="font-normal leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">0%</p>
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Subtotal</p>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="font-normal leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">0,00€</p>
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">Taxa de IVA</p>
    </div>
  );
}

function TopBlock1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Top block">
      <Text4 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">23%</p>
          <div className="-translate-y-1/2 absolute overflow-clip right-[12px] size-[16px] top-1/2" data-name="Right Icon">
            <div className="absolute inset-[33.33%_20.83%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33313 5.33323">
                <path d={svgPaths.p15a75f00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Text">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Total c/ IVA</p>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[rgba(39,39,42,0.05)] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[40px] py-[8px] relative size-full">
          <p className="font-normal leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px]">0,00€</p>
        </div>
      </div>
    </div>
  );
}

export default function FeeDetailsFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-name="Fee Details Frame">
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Input">
        <Text />
        <Input />
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="Light Mode / Radio Group / Radio Group">
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Heading">
          <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Tipo de cálculo</p>
        </div>
        <RadioItems />
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Field">
        <TopBlock />
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Type=Text, State=Filled, Size=sm">
          <Input1 />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Input">
        <Text2 />
        <Input2 />
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Input">
        <Text3 />
        <Input3 />
      </div>
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="VAT Dropdown">
        <div className="content-stretch flex flex-col gap-[12px] h-[72px] items-start relative shrink-0 w-full" data-name="Light Mode / Field">
          <TopBlock1 />
          <button className="content-stretch cursor-pointer flex flex-col h-[40px] items-center justify-center min-h-[40px] relative shrink-0 w-full" data-name="Variant=Listbox, Size=md, State=Filled">
            <Button />
          </button>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Input">
        <Text5 />
        <Input4 />
      </div>
    </div>
  );
}
