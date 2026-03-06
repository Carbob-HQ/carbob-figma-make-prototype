import svgPaths from "./svg-weg3mtv2bw";
import svgPathsClientTab from "./svg-qo9hft7llg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../app/components/ui/tabs";
import { ChevronDown } from "lucide-react";

export default function SideMenuEstPending() {
  return (
    <Tabs defaultValue="orcamento" className="bg-white flex flex-col gap-[24px] items-start relative size-full flex-1 min-h-0">
      <TabsList className="w-full rounded-lg">
        <TabsTrigger value="orcamento" className="cursor-pointer text-[14px]">Orçamento</TabsTrigger>
        <TabsTrigger value="cliente" className="cursor-pointer text-[14px]">Cliente</TabsTrigger>
        <TabsTrigger value="veiculo" className="cursor-pointer text-[14px]">Veículo</TabsTrigger>
      </TabsList>

      <TabsContent value="orcamento" className="flex flex-col gap-[24px] items-start w-full m-0">
        <div className="flex flex-col gap-[16px] items-start w-full">
          <div className="flex h-[32px] items-center w-full">
            <p className="flex-1 text-[#27272a] text-[16px] leading-[1.5]">Orçamento #843</p>
          </div>
          <div className="bg-[#eff6ff] relative rounded-lg w-full">
            <div aria-hidden="true" className="absolute border border-[#bfdbfe] border-solid inset-0 pointer-events-none rounded-lg" />
            <div className="flex items-start p-2 w-full">
              <div className="flex items-center pl-2 py-2 shrink-0">
                <div className="overflow-clip shrink-0 size-5">
                  <svg className="block size-full" fill="none" viewBox="0 0 17.4967 17.4967">
                    <path d={svgPaths.p15d32600} fill="#3B82F6" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 flex items-center pl-2 py-2">
                <p className="text-[#2563eb] text-[14px] leading-[1.5]">Rascunho</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[8px] items-start w-full">
          <div className="flex gap-4 items-start w-full">
            <p className="text-[#71717a] text-[14px] leading-[1.5] shrink-0">Criado em</p>
            <p className="flex-1 text-[#27272a] text-[14px] leading-[1.5] text-right">09/07/2025, 12:50:31</p>
          </div>
          <div className="flex gap-4 items-start w-full">
            <p className="text-[#71717a] text-[14px] leading-[1.5] shrink-0">Responsável</p>
            <div className="flex flex-1 gap-1 items-center justify-end">
              <p className="text-[#27272a] text-[14px] leading-[1.5] text-right">Tânia Graça</p>
              <ChevronDown className="size-4 text-[#27272a]" />
            </div>
          </div>
          <div className="flex gap-4 items-start w-full">
            <p className="text-[#71717a] text-[14px] leading-[1.5] shrink-0">Horas orçamentadas</p>
            <p className="flex-1 text-[#27272a] text-[14px] leading-[1.5] text-right">00h00</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="cliente" className="flex flex-col flex-1 items-center justify-center w-full m-0">
        <div className="flex flex-[1_0_0] flex-col gap-[16px] items-center min-h-px min-w-px overflow-clip relative w-full">
          <div className="overflow-clip relative shrink-0 size-[24px]">
            <div className="absolute inset-[8.33%_12.5%]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
                <path d={svgPathsClientTab.p13bae6c0} fill="var(--fill-0, #A1A1AA)" />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center relative shrink-0 w-full">
            <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-center text-ellipsis whitespace-pre-wrap">Sem cliente selecionado</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="veiculo" className="flex flex-col gap-[24px] items-start w-full m-0">
        <p className="text-[#71717a] text-[14px] leading-[1.5]">Nenhum veículo selecionado</p>
      </TabsContent>
    </Tabs>
  );
}