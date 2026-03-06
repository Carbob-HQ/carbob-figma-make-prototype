import imgCarbobPurple from "figma:asset/335bae29933abbce2529018c6b80d0d1b6f73b66.png";

function LeftFrame() {
  return (
    <div className="content-stretch flex h-full items-center p-[10px] relative shrink-0 w-[40px]" data-name="Left Frame">
      <div className="absolute h-[27px] left-[10px] top-[3px] w-[20px]" data-name="Carbob (purple)">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[349.78%] left-[-95.84%] max-w-none top-[-117.99%] w-[838.2%]" src={imgCarbobPurple} />
        </div>
      </div>
    </div>
  );
}

export default function Logo() {
  return (
    <div className="bg-[#262124] content-stretch flex items-center justify-center px-[8px] relative rounded-[8px] size-full" data-name="Logo">
      <LeftFrame />
    </div>
  );
}