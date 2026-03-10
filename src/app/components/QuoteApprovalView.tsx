import { useState, useMemo, useRef, useEffect, type KeyboardEvent } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import {
  Clock,
  CircleCheck,
  CircleX,
  Check,
  X,
  ChevronRight,
  Pencil,
  Send,
  Ellipsis,
  FileText,
  User,
  Car,
} from "lucide-react";
import { ServiceFrame } from "./ServiceFrame";
import { NotesSection } from "./NotesSection";
import type { QuoteService } from "./QuoteServicesData";
import {
  calcQuoteSubtotal,
  calcQuoteTotal,
  calcServiceSubtotal,
} from "./QuoteServicesData";
import type { SelectedClient } from "../../imports/QuotesCreateNewQuote1stQuote";
import type { Vehicle } from "./VehicleSearchPopup";
import svgPaths from "../../imports/svg-x1e5d9e6rz";

// Service status type
export type ServiceStatus = "pending" | "approved" | "rejected";

function generateQuoteTitle(services: QuoteService[]): string {
  if (services.length === 0) return "Novo orçamento";
  if (services.length === 1) return services[0].title;
  return `${services[0].title} mais ${services.length - 1} serviço${services.length - 1 > 1 ? "s" : ""}`;
}

function formatPhone(phone: string): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 9) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return phone;
}

// Read-only client card — matches creation page UserFrame (static)
function ClientCard({ client }: { client: SelectedClient }) {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[64px] items-center p-[12px] relative rounded-[12px] shrink-0 w-[320px]" data-name="User Frame">
      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[12px] border-[#e5e5e5]" />
      <div className="bg-[rgba(130,112,255,0.15)] content-stretch flex items-center p-[6px] relative rounded-[9999px] shrink-0">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]" />
        <div className="relative shrink-0 size-[20px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p112cb400} fill="var(--fill-0, #09090B)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px not-italic relative">
        <p className="font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">{client.name}</p>
        {!client.isEndConsumer && (
          <p className="font-normal leading-[1.5] overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis w-full whitespace-nowrap mt-[4px]">
            {[
              client.phone ? client.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3") : "",
              client.email || "",
            ].filter(Boolean).join(" | ")}
          </p>
        )}
      </div>
    </div>
  );
}

// Read-only vehicle card — matches creation page VehicleFrame (static)
function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[64px] items-center p-[12px] relative rounded-[12px] shrink-0 w-[320px]" data-name="Vehicle Frame">
      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[12px] border-[#e5e5e5]" />
      <div className="bg-[rgba(130,112,255,0.15)] content-stretch flex items-center p-[6px] relative rounded-[9999px] shrink-0">
        <div className="relative shrink-0 size-[20px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p4c83f00} fill="var(--fill-0, #09090B)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic relative">
        <p className="font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">{vehicle.brand} {vehicle.model}</p>
        <p className="font-normal leading-[1.5] overflow-hidden relative shrink-0 text-[12px] text-ellipsis w-full whitespace-nowrap text-[#71717a]">
          {[vehicle.plate, vehicle.vin].filter(Boolean).join(" | ")}
        </p>
      </div>
    </div>
  );
}

// Approval header with editable title + buttons
function ApprovalHeader({
  services,
  quoteTitle,
  onTitleChange,
}: {
  services: QuoteService[];
  quoteTitle: string;
  onTitleChange: (title: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(quoteTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(quoteTitle);
  }, [quoteTitle]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    const trimmed = editValue.trim();
    if (trimmed) {
      onTitleChange(trimmed);
    } else {
      setEditValue(quoteTitle);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === "Escape") {
      setEditValue(quoteTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="content-stretch flex gap-[16px] items-start min-h-[40px] relative shrink-0 w-full">
      {/* Title frame */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative">
        <div className="content-stretch flex items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="content-stretch flex h-[32px] items-center justify-center relative shrink-0">
              <p className="font-semibold leading-[1.25] not-italic relative shrink-0 text-[#27272a] text-[24px] whitespace-nowrap">ORC #843:</p>
            </div>
            <div className="content-stretch flex items-start relative shrink-0">
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="font-semibold leading-[1.25] text-[#27272a] text-[24px] bg-transparent border-none outline-none min-w-0 p-0"
                />
              ) : (
                <button
                  className="content-stretch cursor-pointer flex items-center justify-center relative shrink-0"
                  onClick={() => setIsEditing(true)}
                >
                  <p className="font-semibold leading-[1.25] not-italic relative shrink-0 text-[#27272a] text-[24px] text-left whitespace-nowrap">
                    {quoteTitle}
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Button group */}
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
        <Button variant="outline" className="cursor-pointer gap-[8px] h-[40px]">
          <Pencil className="size-[16px]" />
          Editar
        </Button>
        <Button variant="outline" className="cursor-pointer gap-[8px] h-[40px]">
          <Send className="size-[16px]" />
          Enviar
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer size-[40px]">
              <Ellipsis className="size-[16px]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">Duplicar orçamento</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Exportar PDF</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-[#dc2626]">Eliminar orçamento</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Right panel "Por aprovar" callout
function PendingCallout() {
  return (
    <div className="bg-[#fefce8] relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#facc15] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex items-start p-[8px] relative w-full">
        <div className="relative self-stretch shrink-0">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex h-full items-center pl-[8px] py-[8px] relative">
              <FileText className="size-[20px] text-[#854D0E]" />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] min-h-px min-w-px relative">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[16px] items-center pl-[8px] relative w-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[8px] relative">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#713f12] text-[14px] whitespace-nowrap">Por aprovar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Approvals expandable section in right panel
function ApprovalsSection({ services, serviceStatuses }: { services: QuoteService[]; serviceStatuses: Record<string, ServiceStatus> }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const pendingCount = Object.values(serviceStatuses).filter(s => s === "pending").length;
  const approvedCount = Object.values(serviceStatuses).filter(s => s === "approved").length;
  const rejectedCount = Object.values(serviceStatuses).filter(s => s === "rejected").length;

  const pendingTotal = services
    .filter(s => serviceStatuses[s.id] === "pending")
    .reduce((sum, s) => sum + calcServiceSubtotal(s), 0);

  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full">
      <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" />
      <button
        onClick={() => setIsExpanded(prev => !prev)}
        className="content-stretch cursor-pointer flex gap-[8px] items-center relative shrink-0 w-full"
      >
        <Check className="size-[16px] text-[#a1a1aa] shrink-0" />
        <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
          <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left">
            Aprovações
          </p>
        </div>
        <div className="content-stretch flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative rounded-[6px] shrink-0 size-[24px]">
          <ChevronRight
            className="size-[16px] text-[#27272a] transition-transform duration-200 ease-out"
            style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>
      <div
        className="grid w-full transition-[grid-template-rows,opacity,margin] duration-200 ease-out"
        style={{
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="overflow-hidden min-h-0">
          <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
            {/* Summary row */}
            {pendingCount > 0 && (
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative">
                  <div className="content-stretch flex items-center p-[4px] relative shrink-0">
                    <div className="bg-[#d4d4d8] rounded-[9999px] shrink-0 size-[8px]" />
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
                    <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-ellipsis">
                      {pendingCount} serviço{pendingCount > 1 ? "s" : ""} pendente{pendingCount > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                  <div className="content-stretch flex items-center justify-end relative shrink-0">
                    <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis text-right whitespace-nowrap">
                      {pendingTotal.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Right panel action buttons (Approve / Reject)
function ApprovalActionButtons({ services }: { services: QuoteService[] }) {
  const subtotal = useMemo(() => {
    const val = calcQuoteSubtotal(services);
    return val.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }, [services]);

  const total = useMemo(() => {
    const val = calcQuoteTotal(services);
    return val.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }, [services]);

  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      {/* Subtotal + Total */}
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
            <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-ellipsis whitespace-pre-wrap">Subtotal</p>
          </div>
          <div className="content-stretch flex items-center justify-end relative shrink-0">
            <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis text-right">{subtotal}</p>
          </div>
        </div>
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative">
            <div className="content-stretch flex items-center justify-center relative shrink-0">
              <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[16px]">Total</p>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative shrink-0">
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[16px]">{total}</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <Button className="w-full h-[40px] bg-[#262124] text-white not-disabled:hover:bg-[#3f3f46] cursor-pointer gap-[8px]">
          <Check className="size-[16px]" />
          Aprovar orçamento
        </Button>
        <Button variant="outline" className="w-full h-[40px] cursor-pointer gap-[8px]">
          <X className="size-[16px]" />
          Rejeitar orçamento
        </Button>
      </div>
    </div>
  );
}

// Right panel
function ApprovalRightPanel({
  selectedClient,
  selectedVehicle,
  services,
  serviceStatuses,
}: {
  selectedClient: SelectedClient;
  selectedVehicle: Vehicle;
  services: QuoteService[];
  serviceStatuses: Record<string, ServiceStatus>;
}) {
  const sideMenuRef = useRef<HTMLDivElement>(null);

  const RESPONSAVEIS = [
    { id: "1", name: "Hélder Barbosa" },
    { id: "2", name: "Sónia Dias" },
    { id: "3", name: "Tânia Graça" },
  ];
  const [selectedResp, setSelectedResp] = useState("Tânia Graça");

  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] h-full items-start p-[16px] relative shrink-0 w-[360px]">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-solid inset-0 pointer-events-none" />
      <div ref={sideMenuRef} className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start max-w-[360px] min-h-px min-w-px relative w-full @container">
        <Tabs defaultValue="orcamento" className="flex flex-col gap-[24px] items-start relative size-full flex-1 min-h-0">
          <TabsList className="w-full">
            <TabsTrigger value="orcamento" className="cursor-pointer">Orçamento</TabsTrigger>
            <TabsTrigger value="cliente" className="cursor-pointer">Cliente</TabsTrigger>
            <TabsTrigger value="veiculo" className="cursor-pointer">Veículo</TabsTrigger>
          </TabsList>

          <TabsContent value="orcamento" className="flex flex-col gap-[24px] items-start w-full m-0">
            {/* Header + callout */}
            <div className="content-stretch flex flex-col flex-1 min-h-0 gap-[24px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-full">
                  <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
                    <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[16px] whitespace-pre-wrap">Orçamento #843</p>
                  </div>
                </div>
                <PendingCallout />
              </div>

              {/* Quote details */}
              <div className="content-stretch flex flex-col items-start overflow-x-clip overflow-y-auto relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex @max-[308px]:flex-col gap-[16px] @max-[308px]:gap-[2px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex items-center relative shrink-0">
                      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Criado em</p>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] @max-[308px]:flex-none @max-[308px]:w-full items-center justify-end @max-[308px]:justify-start min-h-px min-w-px relative">
                      <p className="flex-[1_0_0] @max-[308px]:flex-none font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right @max-[308px]:text-left whitespace-pre-wrap">09/07/2025, 12:50:31</p>
                    </div>
                  </div>

                  <div className="content-stretch flex @max-[308px]:flex-col gap-[16px] @max-[308px]:gap-[2px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex items-center relative shrink-0">
                      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Válido até</p>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] @max-[308px]:flex-none @max-[308px]:w-full items-center justify-end @max-[308px]:justify-start min-h-px min-w-px relative">
                      <p className="flex-[1_0_0] @max-[308px]:flex-none font-medium leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right @max-[308px]:text-left whitespace-pre-wrap">24/07/2025, 23:59:59</p>
                    </div>
                  </div>

                  <div className="content-stretch flex @max-[308px]:flex-col gap-[16px] @max-[308px]:gap-[2px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex items-center relative shrink-0">
                      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Responsável</p>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] @max-[308px]:flex-none @max-[308px]:w-full items-center justify-end @max-[308px]:justify-start min-h-px min-w-px relative">
                      <p className="flex-[1_0_0] @max-[308px]:flex-none font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#8270ff] text-[14px] text-ellipsis text-right @max-[308px]:text-left whitespace-pre-wrap">{selectedResp}</p>
                    </div>
                  </div>

                  <div className="content-stretch flex @max-[308px]:flex-col gap-[16px] @max-[308px]:gap-[2px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex items-center relative shrink-0">
                      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Horas orçamentadas</p>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] @max-[308px]:flex-none @max-[308px]:w-full items-center justify-end @max-[308px]:justify-start min-h-px min-w-px relative">
                      <p className="flex-[1_0_0] @max-[308px]:flex-none font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right @max-[308px]:text-left whitespace-pre-wrap">00h00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approvals section */}
              <ApprovalsSection services={services} serviceStatuses={serviceStatuses} />
            </div>

            {/* Separator + action buttons */}
            <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" />
            <ApprovalActionButtons services={services} />
          </TabsContent>

          <TabsContent value="cliente" className="flex flex-col flex-1 w-full m-0 items-center justify-center pt-[4px]">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-h-px min-w-px overflow-clip relative w-full">
              <User className="size-[24px] text-[#a1a1aa] shrink-0" />
              <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
                <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-center text-ellipsis whitespace-pre-wrap">{selectedClient.name}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="veiculo" className="flex flex-col flex-1 w-full m-0 items-center justify-center pt-[4px]">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-h-px min-w-px overflow-clip relative w-full">
              <Car className="size-[24px] text-[#a1a1aa] shrink-0" />
              <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
                <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-center text-ellipsis whitespace-pre-wrap">{selectedVehicle.brand} {selectedVehicle.model}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Main content area with services
function ApprovalContentArea({
  services,
  serviceStatuses,
}: {
  services: QuoteService[];
  serviceStatuses: Record<string, ServiceStatus>;
}) {
  const sortedServices = [...services].sort((a, b) => a.order - b.order);

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full">
      <div className="sticky top-0 z-10 bg-[#f4f4f5] w-full pb-[1px]">
        <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative">
            <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
              <div className="flex gap-[8px] items-center px-[8px] py-[10px] relative shrink-0 border-b-2 border-[#27272a]">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-center whitespace-nowrap">Serviços</p>
              </div>
              <button className="cursor-pointer flex gap-[8px] items-center px-[8px] py-[10px] relative shrink-0">
                <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#a1a1aa] text-[14px] text-center whitespace-nowrap">Inspeções</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes button (readOnly) */}
      <NotesSection readOnly />

      {/* Service frames */}
      <div className="flex flex-col gap-[16px] w-full">
        {sortedServices.map((service, index) => (
          <ServiceFrame
            key={service.id}
            service={service}
            index={index}
            onTitleChange={() => {}}
            onDelete={() => {}}
            onMoveService={() => {}}
            onDropService={() => {}}
            readOnly
            serviceStatus={serviceStatuses[service.id] || "pending"}
          />
        ))}
      </div>
    </div>
  );
}

// Main export
export function QuoteApprovalView({
  selectedClient,
  selectedVehicle,
  services,
}: {
  selectedClient: SelectedClient;
  selectedVehicle: Vehicle;
  services: QuoteService[];
}) {
  const [quoteTitle, setQuoteTitle] = useState(() => generateQuoteTitle(services));

  // Initialize all services as "pending"
  const [serviceStatuses, setServiceStatuses] = useState<Record<string, ServiceStatus>>(() => {
    const statuses: Record<string, ServiceStatus> = {};
    services.forEach(s => { statuses[s.id] = "pending"; });
    return statuses;
  });

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px overflow-clip relative">
      {/* Navbar - reuse same structure */}
      <div className="bg-white relative shrink-0 w-full">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center p-[8px] relative w-full">
            <div className="flex flex-[1_0_0] flex-row items-center self-stretch" />
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0" />
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-full">
        {/* Left frame */}
        <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-center p-[24px] relative size-full">
              <div className="flex flex-col gap-[24px] items-start w-full max-w-[1280px] flex-1 min-h-0">
                <ApprovalHeader
                  services={services}
                  quoteTitle={quoteTitle}
                  onTitleChange={setQuoteTitle}
                />
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative w-full overflow-y-auto thin-scrollbar px-[4px] -mx-[4px]">
                  {/* Client + Vehicle cards (read-only) */}
                  <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full">
                    <ClientCard client={selectedClient} />
                    <VehicleCard vehicle={selectedVehicle} />
                  </div>

                  {/* Services content */}
                  <ApprovalContentArea
                    services={services}
                    serviceStatuses={serviceStatuses}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <ApprovalRightPanel
          selectedClient={selectedClient}
          selectedVehicle={selectedVehicle}
          services={services}
          serviceStatuses={serviceStatuses}
        />
      </div>
    </div>
  );
}