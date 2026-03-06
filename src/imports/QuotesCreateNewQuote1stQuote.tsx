import { Tabs, TabsList, TabsTrigger, TabsContent } from "../app/components/ui/tabs";
import { Button } from "../app/components/ui/button";
import svgPaths from "./svg-x1e5d9e6rz";
import svgPathsClose from "./svg-oov7nas6ko";
import imgCarbobPurple from "figma:asset/da77b88fbb65a545dcbf78e285437190486af8fa.png";
import { ClientSelectionDropdown } from "../app/components/ClientSelectionDropdown";
import { VehicleSelectionDropdown } from "../app/components/VehicleSelectionDropdown";
import type { Vehicle } from "../app/components/VehicleSearchPopup";
import { getVehiclesByClientName, updateVehicleNotes, updateVehicleKm, updateVehicleClient } from "../app/components/VehicleSearchPopup";
import { getClientByName, updateClientNotes } from "../app/components/ClientSearchPopup";
import { NotesSection } from "../app/components/NotesSection";
import { showToast } from "../app/components/Toast";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import PopoverQuotePricing from "./PopoverQuotePricing";

import { ChevronDown as ChevronDownIcon, ExternalLink, Plus as PlusIcon, ChevronRight as ChevronRightIcon, Car as CarIcon, Calendar as CalendarIcon, CirclePlus, Tag as TagIcon, Check as CheckIcon, Info as InfoIcon, History as HistoryIcon } from "lucide-react";
import { Textarea } from "../app/components/ui/textarea";
import { Checkbox } from "../app/components/ui/checkbox";
import { Badge } from "../app/components/ui/badge";
import { ImageWithFallback } from "../app/components/figma/ImageWithFallback";
import { Input } from "../app/components/ui/input";
import { Label } from "../app/components/ui/label";
import { Switch } from "../app/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "../app/components/ui/dropdown-menu";

import svgPathsClientTab from "./svg-qo9hft7llg";
import { ServiceFrame } from "../app/components/ServiceFrame";
import ChangeVehicleModal from "../app/components/ChangeVehicleModal";
import CancelQuoteModal from "../app/components/CancelQuoteModal";
import LinkClientToVehicleModal from "../app/components/LinkClientToVehicleModal";
import type { QuoteService } from "../app/components/QuoteServicesData";
import { createService, calcQuoteTotal, calcQuoteSubtotal, type ServiceItem } from "../app/components/QuoteServicesData";
import ServiceGuideModal from "../app/components/ServiceGuideModal";

// Mock appointments database
interface Appointment {
  id: string;
  serviceOrderNumber: string;
  services: string[];
  date: string; // dd/mm/yyyy
  clientName: string;
}

const mockAppointments: Appointment[] = [
  // Raúl Fernandes
  { id: "a1", serviceOrderNumber: "791", services: ["Revisão oficial"], date: "23/09/2024", clientName: "Raúl Fernandes" },
  { id: "a2", serviceOrderNumber: "723", services: ["Revisão simples", "Alinhamento de direção"], date: "14/09/2023", clientName: "Raúl Fernandes" },
  { id: "a3", serviceOrderNumber: "673", services: ["Pastilhas de travão (substituir)", "Discos de travão (substituir)"], date: "17/03/2023", clientName: "Raúl Fernandes" },
  // João Silva
  { id: "a4", serviceOrderNumber: "805", services: ["Mudança de óleo"], date: "10/01/2025", clientName: "João Silva" },
  { id: "a5", serviceOrderNumber: "689", services: ["Substituição de bateria", "Diagnóstico eletrónico", "Limpeza de filtro de ar"], date: "02/06/2023", clientName: "João Silva" },
  // Tiago Gomes
  { id: "a6", serviceOrderNumber: "812", services: ["Revisão oficial"], date: "05/02/2025", clientName: "Tiago Gomes" },
  { id: "a7", serviceOrderNumber: "756", services: ["Substituição de correia de distribuição", "Bomba de água"], date: "28/11/2023", clientName: "Tiago Gomes" },
  { id: "a8", serviceOrderNumber: "701", services: ["Alinhamento de direção", "Equilibragem de pneus", "Rotação de pneus"], date: "15/07/2023", clientName: "Tiago Gomes" },
  { id: "a9", serviceOrderNumber: "645", services: ["Inspeção pré-IPO"], date: "22/01/2023", clientName: "Tiago Gomes" },
  // Tiago Gomes (duplicados para teste de scroll)
  { id: "a10", serviceOrderNumber: "812", services: ["Revisão oficial"], date: "05/02/2025", clientName: "Tiago Gomes" },
  { id: "a11", serviceOrderNumber: "756", services: ["Substituição de correia de distribuição", "Bomba de água"], date: "28/11/2023", clientName: "Tiago Gomes" },
  { id: "a12", serviceOrderNumber: "701", services: ["Alinhamento de direção", "Equilibragem de pneus", "Rotação de pneus"], date: "15/07/2023", clientName: "Tiago Gomes" },
  { id: "a13", serviceOrderNumber: "645", services: ["Inspeção pré-IPO"], date: "22/01/2023", clientName: "Tiago Gomes" },
];

function getAppointmentsByClientName(clientName: string): Appointment[] {
  return mockAppointments.filter((a) => a.clientName === clientName);
}

function formatAppointmentTitle(services: string[]): string {
  if (services.length === 0) return "Sem serviços";
  if (services.length === 1) return services[0];
  return `${services[0]} mais ${services.length - 1} serviço${services.length - 1 > 1 ? "s" : ""}`;
}

// Mock service history database (per vehicle — each service line from an order is listed individually)
interface ServiceHistoryEntry {
  id: string;
  vehicleId: string;
  serviceName: string;
  orderNumber: string; // ORC #
  date: string; // dd/mm/yyyy
  km: string;
}

const mockServiceHistory: ServiceHistoryEntry[] = [
  // v1 — Renault Clio (Raúl Fernandes)
  { id: "sh1", vehicleId: "v1", serviceName: "Revisão oficial", orderNumber: "791", date: "23/09/2024", km: "50.232 kms" },
  { id: "sh2", vehicleId: "v1", serviceName: "Revisão simples", orderNumber: "723", date: "14/09/2023", km: "44.877 kms" },
  { id: "sh3", vehicleId: "v1", serviceName: "Alinhamento de direção", orderNumber: "723", date: "14/09/2023", km: "44.877 kms" },
  { id: "sh4", vehicleId: "v1", serviceName: "Pastilhas de travão (substituir)", orderNumber: "673", date: "17/03/2023", km: "41.561 kms" },
  { id: "sh5", vehicleId: "v1", serviceName: "Discos de travão (substituir)", orderNumber: "673", date: "17/03/2023", km: "41.561 kms" },
  // v2 — BMW Z4 Roadster (João Silva)
  { id: "sh6", vehicleId: "v2", serviceName: "Mudança de óleo", orderNumber: "805", date: "10/01/2025", km: "87.340 kms" },
  { id: "sh7", vehicleId: "v2", serviceName: "Substituição de bateria", orderNumber: "689", date: "02/06/2023", km: "82.100 kms" },
  { id: "sh8", vehicleId: "v2", serviceName: "Diagnóstico eletrónico", orderNumber: "689", date: "02/06/2023", km: "82.100 kms" },
  // v3 — Volkswagen Polo (João Silva)
  { id: "sh9", vehicleId: "v3", serviceName: "Limpeza de filtro de ar", orderNumber: "689", date: "02/06/2023", km: "35.200 kms" },
  // v4 — Mercedes-Benz GLB (Tiago Gomes)
  { id: "sh10", vehicleId: "v4", serviceName: "Revisão oficial", orderNumber: "812", date: "05/02/2025", km: "28.450 kms" },
  { id: "sh11", vehicleId: "v4", serviceName: "Substituição de correia de distribuição", orderNumber: "756", date: "28/11/2023", km: "24.300 kms" },
  { id: "sh12", vehicleId: "v4", serviceName: "Bomba de água", orderNumber: "756", date: "28/11/2023", km: "24.300 kms" },
  { id: "sh13", vehicleId: "v4", serviceName: "Alinhamento de direção", orderNumber: "701", date: "15/07/2023", km: "20.800 kms" },
  { id: "sh14", vehicleId: "v4", serviceName: "Equilibragem de pneus", orderNumber: "701", date: "15/07/2023", km: "20.800 kms" },
  { id: "sh15", vehicleId: "v4", serviceName: "Rotação de pneus", orderNumber: "701", date: "15/07/2023", km: "20.800 kms" },
  { id: "sh16", vehicleId: "v4", serviceName: "Inspeção pré-IPO", orderNumber: "645", date: "22/01/2023", km: "17.500 kms" },
];

function getServiceHistoryByVehicleId(vehicleId: string): ServiceHistoryEntry[] {
  return mockServiceHistory.filter((s) => s.vehicleId === vehicleId);
}

interface SelectedClient {
  id: string;
  name: string;
  phone: string;
  email: string;
  initials: string;
  isEndConsumer?: boolean;
  nif?: string;
  preferredContact?: string;
  notes?: string;
}

function CarbobPurple() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Carbob (purple)">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[115.28%] left-[-12.73%] max-w-none top-[-6.94%] w-[123.61%]" src={imgCarbobPurple} />
      </div>
    </div>
  );
}

function LeftFrame() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative shrink-0" data-name="Left Frame">
      <CarbobPurple />
    </div>
  );
}

function Logo() {
  return (
    <div className="bg-[#262124] content-stretch flex h-[40px] items-center justify-center px-[8px] relative rounded-[8px] shrink-0" data-name="Logo">
      <LeftFrame />
    </div>
  );
}

function LogoFrame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Logo Frame">
      <Logo />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3f271800} fill="var(--fill-0, white)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function DarkModeButton() {
  return (
    <div className="aspect-[40/40] bg-[rgba(130,112,255,0.5)] content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Dark Mode / Button">
      <Icon />
    </div>
  );
}

function AddButton() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[8px] relative shrink-0" data-name="Add Button">
      <DarkModeButton />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p57d0e00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function DarkModeButton1() {
  return (
    <div className="aspect-[40/40] content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Dark Mode / Button">
      <Icon1 />
    </div>
  );
}

function HomeButton() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[8px] relative shrink-0" data-name="Home Button">
      <DarkModeButton1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p26f35500} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function DarkModeButton2() {
  return (
    <div className="content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Dark Mode / Button">
      <Icon2 />
    </div>
  );
}

function SchedulingButton() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0" data-name="Scheduling Button">
      <DarkModeButton2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p10750f80} fill="var(--fill-0, white)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function DarkModeButton3() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Dark Mode / Button">
      <Icon3 />
    </div>
  );
}

function SelectedFrame() {
  return <div className="absolute bg-[#8270ff] h-[24px] left-0 rounded-br-[8px] rounded-tr-[8px] top-[8px] w-[4px]" data-name="Selected Frame" />;
}

function JobBoardButton() {
  return (
    <button className="content-stretch cursor-pointer flex gap-[4px] items-center justify-center px-[8px] relative shrink-0" data-name="Job Board Button">
      <DarkModeButton3 />
      <SelectedFrame />
    </button>
  );
}

function MainButtons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative w-full" data-name="Main Buttons">
      <HomeButton />
      <SchedulingButton />
      <JobBoardButton />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_6043)" id="Icon">
          <path d={svgPaths.p3cb1db00} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
        <defs>
          <clipPath id="clip0_1_6043">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function DarkModeButton4() {
  return (
    <div className="content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Dark Mode / Button">
      <Icon4 />
    </div>
  );
}

function HelpButton() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0" data-name="Help Button">
      <DarkModeButton4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1c433e80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function DarkModeButton5() {
  return (
    <div className="content-stretch flex items-center justify-center max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px] relative rounded-[8px] shrink-0 size-[40px]" data-name="Dark Mode / Button">
      <Icon5 />
    </div>
  );
}

function SettingsButton() {
  return (
    <div className="content-stretch flex items-center justify-center px-[8px] relative shrink-0" data-name="Settings Button">
      <DarkModeButton5 />
    </div>
  );
}

function BottomButtons() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Bottom Buttons">
      <HelpButton />
      <SettingsButton />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#262124] content-stretch flex flex-col gap-[24px] h-full items-center py-[12px] relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[56px]" data-name="Sidebar">
      <LogoFrame />
      <AddButton />
      <MainButtons />
      <BottomButtons />
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Left Icon">
          <path d={svgPaths.p2c438a80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LightModeButton() {
  return (
    <div className="flex-[1_0_0] max-h-[40px] min-h-[40px] min-w-px relative rounded-[8px]" data-name="Light Mode / Button">
      <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-h-[inherit] min-h-[inherit] px-[16px] relative w-full">
          <LeftIcon />
          <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#a1a1aa] text-[14px]">Pesquisar</p>
        </div>
      </div>
    </div>
  );
}

function SearchFrame() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[200px]" data-name="Search Frame">
      <LightModeButton />
    </div>
  );
}

function TabsFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-h-px min-w-px relative" data-name="Tabs Frame">
      <SearchFrame />
    </div>
  );
}

function LeftIcon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_6028)" id="Left Icon">
          <path d={svgPaths.p3cb1db00} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
        </g>
        <defs>
          <clipPath id="clip0_1_6028">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LightModeButton1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0 w-[40px]" data-name="Light Mode / Button">
      <LeftIcon1 />
    </div>
  );
}

function LightModeButton2() {
  return (
    <div className="absolute bg-[#fb2c36] content-stretch flex gap-[8px] items-center justify-center left-[28px] px-[4px] rounded-[100px] top-[-4px]" data-name="Light Mode / Button">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[12px] text-white">4</p>
    </div>
  );
}

function NotificationsButton() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Notifications Button">
      <LightModeButton1 />
      <LightModeButton2 />
    </div>
  );
}

function AvatarLightModeCircle() {
  return (
    <div className="bg-[#3b82f6] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Avatar / Light Mode / Circle">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[12px] text-white">DA</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3ad2e500} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function IconFrame() {
  return (
    <div className="content-stretch flex h-full items-center px-[8px] relative shrink-0" data-name="Icon Frame">
      <Icon6 />
    </div>
  );
}

function LightModeProfileCircle() {
  return (
    <div className="content-stretch flex items-center px-[6px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Light Mode / Profile / Circle">
      <AvatarLightModeCircle />
      <div className="flex flex-row items-center self-stretch">
        <IconFrame />
      </div>
    </div>
  );
}

function ProfileButton() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Profile Button">
      <LightModeProfileCircle />
    </div>
  );
}

function ButtonsFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Buttons Frame">
      <NotificationsButton />
      <ProfileButton />
    </div>
  );
}

function Navbar() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Navbar">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[8px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <TabsFrame />
          </div>
          <ButtonsFrame />
        </div>
      </div>
    </div>
  );
}

function LightModeHeading() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
      <p className="flex-[1_0_0] font-semibold leading-[1.25] min-h-px min-w-px not-italic relative text-[#27272a] text-[24px] whitespace-pre-wrap">ORC #843: Novo orçamento</p>
    </div>
  );
}

function LightModeButton3() {
  return (
    <Button className="cursor-pointer">Fechar</Button>
  );
}

function CloseButton() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Close Button">
      <LightModeButton3 />
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Button Group">
      <CloseButton />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex items-center justify-between min-h-[40px] relative shrink-0 w-full" data-name="Header">
      <LightModeHeading />
      <ButtonGroup />
    </div>
  );
}

function UserRound() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="user-round">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="user-round">
          <path d={svgPaths.p112cb400} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function IconFrame1() {
  return (
    <div className="bg-[rgba(130,112,255,0.15)] content-stretch flex items-center p-[6px] relative rounded-[9999px] shrink-0" data-name="Icon Frame">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]" />
      <UserRound />
    </div>
  );
}

function LightModeText() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Selecionar cliente</p>
    </div>
  );
}

function ContentFrame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content Frame">
      <LightModeText />
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Left Icon">
          <path d={svgPaths.p2c438a80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function UserFrame({ isOpen, selectedClient, onClearClient, associationHint }: { isOpen?: boolean; selectedClient?: SelectedClient | null; onClearClient?: () => void; associationHint?: string | null }) {
  if (selectedClient) {
    return (
      <div className="bg-white content-stretch flex gap-[12px] h-[64px] items-center p-[12px] relative rounded-[12px] shrink-0 w-[320px] group cursor-pointer" data-name="User Frame">
        <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[12px] transition-[border-color] duration-200 ease-out border-[#e5e5e5] group-hover:border-[#71717a]" />
        <IconFrame1 />
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px not-italic relative" data-name="Content Frame">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">{selectedClient.name}</p>
          {!selectedClient.isEndConsumer && (
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis w-full whitespace-nowrap mt-[4px]">
              {[
                selectedClient.phone ? selectedClient.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3") : "",
                selectedClient.email || "",
              ].filter(Boolean).join(" | ")}
            </p>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClearClient?.(); }}
          className="hidden group-hover:flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] rounded-[6px] shrink-0 transition-colors duration-200 ease-out hover:bg-[#e4e4e7] group/close-btn cursor-pointer"
          data-name="Light Mode / Button"
        >
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[20.83%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33323 9.33323">
                <path d={svgPathsClose.p2bd57f80} fill="currentColor" className="text-[#a1a1aa] group-hover/close-btn:text-[#27272a] transition-colors duration-200 ease-out" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[64px] items-center p-[12px] relative rounded-[12px] shrink-0 w-[320px] group cursor-pointer" data-name="User Frame">
      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[12px] transition-[border-color] duration-200 ease-out border-[#e5e5e5] group-hover:border-[#71717a]" />
      <IconFrame1 />
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Content Frame">
        <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">
            {associationHint || "Selecionar cliente"}
          </p>
        </div>
      </div>
      <Search />
    </div>
  );
}

function Car() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="car">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="car">
          <path d={svgPaths.p4c83f00} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function IconFrame2() {
  return (
    <div className="bg-[rgba(130,112,255,0.15)] content-stretch flex items-center p-[6px] relative rounded-[9999px] shrink-0" data-name="Icon Frame">
      <Car />
    </div>
  );
}

function LightModeText1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Selecionar veículo</p>
    </div>
  );
}

function ContentFrame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Content Frame">
      <LightModeText1 />
    </div>
  );
}

function Search1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Left Icon">
          <path d={svgPaths.p2c438a80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function VehicleFrame({ isOpen, selectedVehicle, onClearVehicle, associationHint }: { isOpen?: boolean; selectedVehicle?: Vehicle | null; onClearVehicle?: () => void; associationHint?: string | null }) {
  if (selectedVehicle) {
    return (
      <div className="bg-white content-stretch flex gap-[12px] h-[64px] items-center p-[12px] relative rounded-[12px] shrink-0 w-[320px] group cursor-pointer" data-name="Vehicle Frame">
        <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[12px] transition-[border-color] duration-200 ease-out border-[#e5e5e5] group-hover:border-[#71717a]" />
        <IconFrame2 />
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic relative" data-name="Content Frame">
          <p className="font-medium leading-[1.5] relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">{selectedVehicle.brand} {selectedVehicle.model}</p>
          <p className="font-normal leading-[1.5] overflow-hidden relative shrink-0 text-[12px] text-ellipsis w-full whitespace-nowrap text-[#71717a]">
            {[selectedVehicle.plate, selectedVehicle.vin].filter(Boolean).join(" | ")}
          </p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClearVehicle?.(); }}
          className="flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] rounded-[6px] shrink-0 opacity-0 group-hover:opacity-100 transition-[opacity,background-color] duration-200 ease-out hover:bg-[#e4e4e7] group/close-btn cursor-pointer"
          data-name="Light Mode / Button"
        >
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon">
            <div className="absolute inset-[20.83%]" data-name="Vector (Stroke)">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33323 9.33323">
                <path d={svgPathsClose.p2bd57f80} fill="currentColor" className="text-[#a1a1aa] group-hover/close-btn:text-[#27272a] transition-colors duration-200 ease-out" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[64px] items-center p-[12px] relative rounded-[12px] shrink-0 w-[320px] group cursor-pointer" data-name="Vehicle Frame">
      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[12px] transition-[border-color] duration-200 ease-out border-[#e5e5e5] group-hover:border-[#71717a]" />
      <IconFrame2 />
      <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative" data-name="Content Frame">
        <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">
            {associationHint || "Selecionar veículo"}
          </p>
        </div>
      </div>
      <Search1 />
    </div>
  );
}

function ClientDetails({ selectedClient, setSelectedClient, selectedVehicle, setSelectedVehicle, services, setServices }: {
  selectedClient: SelectedClient | null;
  setSelectedClient: (client: SelectedClient | null) => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  services: QuoteService[];
  setServices: React.Dispatch<React.SetStateAction<QuoteService[]>>;
}) {
  const [isChangeVehicleModalOpen, setIsChangeVehicleModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const pendingVehicleChangeRef = useRef<{ vehicle: Vehicle | null; isDifferentOwner: boolean } | null>(null);
  const skipCloseCleanupRef = useRef(false);

  const hasServices = services.length > 0;

  const isDifferentOwnerVehicle = useCallback((vehicle: Vehicle | null) => {
    if (!vehicle || !selectedClient || selectedClient.isEndConsumer) return false;
    return !!(vehicle.clientName && vehicle.clientName !== selectedClient.name);
  }, [selectedClient]);

  const handleVehicleChange = useCallback((vehicle: Vehicle | null) => {
    // If there are services and a vehicle is currently selected, show confirmation
    if (hasServices && selectedVehicle) {
      const differentOwner = isDifferentOwnerVehicle(vehicle);
      pendingVehicleChangeRef.current = { vehicle, isDifferentOwner: differentOwner };
      setIsChangeVehicleModalOpen(true);
      return;
    }
    setSelectedVehicle(vehicle);
  }, [hasServices, selectedVehicle, setSelectedVehicle, isDifferentOwnerVehicle]);

  const handleConfirmVehicleChange = useCallback(() => {
    if (pendingVehicleChangeRef.current) {
      const { vehicle, isDifferentOwner } = pendingVehicleChangeRef.current;
      // Always clear services
      setServices([]);
      if (isDifferentOwner && vehicle) {
        // Don't set vehicle yet — close ChangeVehicleModal then show LinkModal with dissolve
        skipCloseCleanupRef.current = true; // prevent onClose from clearing pendingVehicleChangeRef
        setIsChangeVehicleModalOpen(false);
        setTimeout(() => {
          setIsLinkModalOpen(true);
        }, 200); // wait for ChangeVehicleModal fade-out before showing LinkModal
      } else {
        setSelectedVehicle(vehicle);
        pendingVehicleChangeRef.current = null;
      }
    }
  }, [setSelectedVehicle, setServices]);

  // Get existing client info for the link modal
  const pendingLinkClientInfo = useMemo(() => {
    const v = pendingVehicleChangeRef.current?.vehicle;
    if (!v?.clientName) return { name: "", phone: "", email: "" };
    const client = getClientByName(v.clientName);
    if (client) return { name: client.name, phone: client.phone, email: client.email };
    return { name: v.clientName, phone: "", email: "" };
  }, [isLinkModalOpen]);

  const handleLinkAssociate = useCallback(() => {
    if (pendingVehicleChangeRef.current?.vehicle && selectedClient?.name) {
      const vehicle = pendingVehicleChangeRef.current.vehicle;
      updateVehicleClient(vehicle.id, selectedClient.name);
      setSelectedVehicle({ ...vehicle, clientName: selectedClient.name });
      showToast("Veículo associado com sucesso");
    }
    setIsLinkModalOpen(false);
    pendingVehicleChangeRef.current = null;
  }, [selectedClient, setSelectedVehicle]);

  const handleLinkNotAssociate = useCallback(() => {
    if (pendingVehicleChangeRef.current?.vehicle) {
      setSelectedVehicle(pendingVehicleChangeRef.current.vehicle);
    }
    setIsLinkModalOpen(false);
    pendingVehicleChangeRef.current = null;
  }, [setSelectedVehicle]);

  const handleLinkClose = useCallback(() => {
    setIsLinkModalOpen(false);
    pendingVehicleChangeRef.current = null;
  }, []);
  // Compute associated vehicles when a client is selected (and no vehicle selected yet)
  const associatedVehicles = useMemo(() => {
    if (!selectedClient || selectedClient.isEndConsumer) return [];
    return getVehiclesByClientName(selectedClient.name);
  }, [selectedClient, selectedVehicle]);

  // Compute associated client when a vehicle is selected (and no client selected yet)
  const associatedClient = useMemo(() => {
    if (!selectedVehicle || !selectedVehicle.clientName) return null;
    return getClientByName(selectedVehicle.clientName);
  }, [selectedVehicle]);

  // Compute hint text for VehicleFrame (when no vehicle is selected but client is)
  const vehicleHint = useMemo(() => {
    if (selectedVehicle || !selectedClient || selectedClient.isEndConsumer) return null;
    const count = associatedVehicles.length;
    if (count === 0) return "Sem veículos associados";
    return `${count} veículo${count > 1 ? "s" : ""} associado${count > 1 ? "s" : ""}`;
  }, [selectedClient, selectedVehicle, associatedVehicles]);

  // Compute hint text for UserFrame (when no client is selected but vehicle is)
  const clientHint = useMemo(() => {
    if (selectedClient || !selectedVehicle) return null;
    if (!selectedVehicle.clientName || !associatedClient) return "Sem cliente associado";
    return "1 cliente associado";
  }, [selectedClient, selectedVehicle, associatedClient]);

  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Client Details">
      <ClientSelectionDropdown
        selectedClient={selectedClient}
        onSelectedClientChange={(client) => {
          setSelectedClient(client);
        }}
        associatedClient={associatedClient}
        selectedVehicle={selectedVehicle}
        onClientAssociatedToVehicle={(client) => {
          // Update the vehicle state with the new clientName
          if (selectedVehicle) {
            setSelectedVehicle({ ...selectedVehicle, clientName: client.name });
          }
          setSelectedClient(client);
        }}
      >
        <UserFrame associationHint={clientHint} />
      </ClientSelectionDropdown>
      <VehicleSelectionDropdown
        selectedVehicle={selectedVehicle}
        onSelectedVehicleChange={handleVehicleChange}
        associatedVehicles={associatedVehicles}
        associatedClientName={selectedClient?.name || ""}
        isClientEndConsumer={selectedClient?.isEndConsumer || false}
        hasServicesToConfirm={hasServices && !!selectedVehicle}
      >
        <VehicleFrame associationHint={vehicleHint} />
      </VehicleSelectionDropdown>
      <ChangeVehicleModal
        isOpen={isChangeVehicleModalOpen}
        onClose={() => {
          setIsChangeVehicleModalOpen(false);
          if (skipCloseCleanupRef.current) {
            skipCloseCleanupRef.current = false;
          } else {
            pendingVehicleChangeRef.current = null;
          }
        }}
        onConfirm={handleConfirmVehicleChange}
      />
      <LinkClientToVehicleModal
        isOpen={isLinkModalOpen}
        onClose={handleLinkClose}
        onAssociate={handleLinkAssociate}
        onNotAssociate={handleLinkNotAssociate}
        existingClient={pendingLinkClientInfo}
      />
    </div>
  );
}

function Wrench() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="wrench">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="wrench">
          <path d={svgPaths.p15853200} fill="var(--fill-0, #09090B)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LightModeHeading1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[16px] whitespace-pre-wrap">Serviços</p>
    </div>
  );
}

function SubheaderFrame() {
  return (
    <Tabs defaultValue="servicos" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="servicos">Serviços</TabsTrigger>
        <TabsTrigger
          value="inspecoes"
          disabled
          className="disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50 not-disabled:hover:text-[#71717a]"
        >
          Inspeções
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function ChevronRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-right">
          <path d={svgPaths.p1fe4c100} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LightModeButton4() {
  return (
    <div className="content-stretch flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Light Mode / Button">
      <ChevronRight />
    </div>
  );
}

function LightModeHeading2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Notas e comentários do cliente</p>
    </div>
  );
}

function HeaderFrame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center min-h-[32px] relative shrink-0 w-full" data-name="Header Frame">
      <LightModeButton4 />
      <LightModeHeading2 />
    </div>
  );
}

function Notes() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="Notes">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <HeaderFrame />
      </div>
    </div>
  );
}

function Wrench1() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="wrench">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="wrench">
          <path d={svgPaths.p1ec4df80} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LightModeText2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Light Mode / Text">
      <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-center text-ellipsis whitespace-nowrap">Adiciona um serviço para iniciar</p>
    </div>
  );
}

function TopFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="Top Frame">
      <Wrench1 />
      <LightModeText2 />
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="plus">
          <path d={svgPaths.p3f271800} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LightModeButton5({ disabled, onClick }: { disabled?: boolean; onClick?: () => void }) {
  return (
    <Button variant="outline" size="sm" className="cursor-pointer gap-[8px]" disabled={disabled} onClick={onClick}>
      <Plus />
      <span className="text-[14px] text-[#27272a]">Novo serviço</span>
    </Button>
  );
}

function LeftIcon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Left Icon">
          <path d={svgPaths.p1260800} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LightModeButton6({ disabled, onClick }: { disabled?: boolean; onClick?: () => void }) {
  return (
    <Button variant="outline" size="sm" className="cursor-pointer gap-[8px]" disabled={disabled} onClick={onClick}>
      <LeftIcon2 />
      <span className="text-[14px] text-[#27272a]">Guia de serviços</span>
    </Button>
  );
}

function ButtonsFrame1({ disabled, onNewService, onServiceGuide }: { disabled?: boolean; onNewService?: () => void; onServiceGuide?: () => void }) {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Buttons Frame">
      <LightModeButton5 disabled={disabled} onClick={onNewService} />
      <LightModeButton6 disabled={disabled} onClick={onServiceGuide} />
    </div>
  );
}

function EmptyServiceFrame({ hasVehicle, onNewService, onServiceGuide }: { hasVehicle?: boolean; onNewService?: () => void; onServiceGuide?: () => void }) {
  return (
    <div className="bg-white h-[360px] relative rounded-[16px] shrink-0 w-full" data-name="Empty Service Frame">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center p-[16px] relative size-full">
          <TopFrame />
          <ButtonsFrame1 disabled={!hasVehicle} onNewService={onNewService} onServiceGuide={onServiceGuide} />
        </div>
      </div>
    </div>
  );
}

function ContentFrame2({ hasVehicle, selectedVehicle, clientId, services, onAddService, onUpdateServiceTitle, onDeleteService, onMoveService, onDropService, onAddItem, onDeleteItem, onUpdateItem, onReorderItems, onAddGuideServices, newServiceId, onNewServiceScrolled }: {
  hasVehicle?: boolean;
  selectedVehicle?: Vehicle | null;
  clientId?: string;
  services: QuoteService[];
  onAddService: () => void;
  onUpdateServiceTitle: (serviceId: string, title: string) => void;
  onDeleteService: (serviceId: string) => void;
  onMoveService: (dragIndex: number, hoverIndex: number) => void;
  onDropService: () => void;
  onAddItem: (serviceId: string, item: ServiceItem) => void;
  onDeleteItem: (serviceId: string, itemId: string) => void;
  onUpdateItem: (serviceId: string, item: ServiceItem) => void;
  onReorderItems: (serviceId: string, items: ServiceItem[]) => void;
  onAddGuideServices: (services: QuoteService[]) => void;
  newServiceId?: string | null;
  onNewServiceScrolled?: () => void;
}) {
  const sortedServices = [...services].sort((a, b) => a.order - b.order);
  const [isRightSlotExiting, setIsRightSlotExiting] = useState(false);
  const [serviceGuideOpen, setServiceGuideOpen] = useState(false);
  const prevServicesLength = useRef(services.length);

  // Reset exiting state only when going from 0 back to >0 services
  useEffect(() => {
    if (prevServicesLength.current === 0 && services.length > 0) {
      setIsRightSlotExiting(false);
    }
    prevServicesLength.current = services.length;
  }, [services.length]);

  const handleOpenServiceGuide = useCallback(() => {
    if (selectedVehicle) setServiceGuideOpen(true);
  }, [selectedVehicle]);

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full" data-name="Content Frame">
      <div className="sticky top-0 z-10 bg-[#f4f4f5] w-full pb-[1px]">
        <SubheaderFrame />
      </div>
      <NotesSection rightSlotExiting={isRightSlotExiting} rightSlot={services.length > 0 ? (
        <>
          <LightModeButton5 disabled={!hasVehicle} onClick={onAddService} />
          <LightModeButton6 disabled={!hasVehicle} onClick={handleOpenServiceGuide} />
        </>
      ) : undefined} />
      {services.length === 0 ? (
        <EmptyServiceFrame hasVehicle={hasVehicle} onNewService={onAddService} onServiceGuide={handleOpenServiceGuide} />
      ) : (
        <div className="flex flex-col gap-[16px] w-full">
          {sortedServices.map((service, index) => (
              <ServiceFrame
                key={service.id}
                service={service}
                index={index}
                onTitleChange={(title) => onUpdateServiceTitle(service.id, title)}
                onDelete={() => onDeleteService(service.id)}
                onDeleteAnimationStart={services.length === 1 ? () => setIsRightSlotExiting(true) : undefined}
                onMoveService={onMoveService}
                onDropService={onDropService}
                onAddItem={(item) => onAddItem(service.id, item)}
                onDeleteItem={(itemId) => onDeleteItem(service.id, itemId)}
                onUpdateItem={(item) => onUpdateItem(service.id, item)}
                onReorderItems={(items) => onReorderItems(service.id, items)}
                autoFocus={service.id === newServiceId}
                autoScroll={service.id === newServiceId}
                onAutoScrollDone={onNewServiceScrolled}
              />
            ))}
        </div>
      )}
      {selectedVehicle && (
        <ServiceGuideModal
          open={serviceGuideOpen}
          onClose={() => setServiceGuideOpen(false)}
          vehicle={selectedVehicle}
          onAddServices={onAddGuideServices}
          clientId={clientId}
        />
      )}
    </div>
  );
}

function Main1({ selectedClient, setSelectedClient, selectedVehicle, setSelectedVehicle, services, setServices }: {
  selectedClient: SelectedClient | null;
  setSelectedClient: (client: SelectedClient | null) => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  services: QuoteService[];
  setServices: React.Dispatch<React.SetStateAction<QuoteService[]>>;
}) {

  const [newServiceId, setNewServiceId] = useState<string | null>(null);

  const handleAddService = useCallback(() => {
    setServices((prev) => {
      const newService = createService(prev.length);
      setNewServiceId(newService.id);
      return [...prev, newService];
    });
  }, []);

  const handleUpdateServiceTitle = useCallback((serviceId: string, title: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, title } : s))
    );
  }, []);

  const handleDeleteService = useCallback((serviceId: string) => {
    setServices((prev) =>
      prev
        .filter((s) => s.id !== serviceId)
        .map((s, i) => ({ ...s, order: i }))
    );
  }, []);

  const handleMoveService = useCallback((dragIndex: number, hoverIndex: number) => {
    setServices((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const [dragged] = sorted.splice(dragIndex, 1);
      sorted.splice(hoverIndex, 0, dragged);
      return sorted.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  const handleDropService = useCallback(() => {
    // Order is already persisted via handleMoveService — this is a hook for future side effects
  }, []);

  const handleAddItem = useCallback((serviceId: string, item: ServiceItem) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? { ...s, items: [...s.items, { ...item, order: s.items.length }] }
          : s
      )
    );
  }, []);

  const handleDeleteItem = useCallback((serviceId: string, itemId: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? {
              ...s,
              items: s.items
                .filter((i) => i.id !== itemId)
                .map((i, idx) => ({ ...i, order: idx })),
            }
          : s
      )
    );
  }, []);

  const handleUpdateItem = useCallback((serviceId: string, item: ServiceItem) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === item.id ? item : i
              ),
            }
          : s
      )
    );
  }, []);

  const handleReorderItems = useCallback((serviceId: string, items: ServiceItem[]) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId ? { ...s, items } : s
      )
    );
  }, []);

  const handleAddGuideServices = useCallback((guideServices: QuoteService[]) => {
    setServices((prev) => {
      const startOrder = prev.length;
      const withOrders = guideServices.map((s, i) => ({ ...s, order: startOrder + i }));
      return [...prev, ...withOrders];
    });
  }, []);

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative w-full overflow-y-auto thin-scrollbar px-[4px] -mx-[4px]" data-name="Main">
      <ClientDetails selectedClient={selectedClient} setSelectedClient={setSelectedClient} selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} services={services} setServices={setServices} />
      <ContentFrame2
        hasVehicle={!!selectedVehicle}
        selectedVehicle={selectedVehicle}
        clientId={selectedClient?.id}
        services={services}
        onAddService={handleAddService}
        onUpdateServiceTitle={handleUpdateServiceTitle}
        onDeleteService={handleDeleteService}
        onMoveService={handleMoveService}
        onDropService={handleDropService}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
        onReorderItems={handleReorderItems}
        onAddGuideServices={handleAddGuideServices}
        newServiceId={newServiceId}
        onNewServiceScrolled={() => setNewServiceId(null)}
      />
    </div>
  );
}

function LeftFrame1({ selectedClient, setSelectedClient, selectedVehicle, setSelectedVehicle, services, setServices }: {
  selectedClient: SelectedClient | null;
  setSelectedClient: (client: SelectedClient | null) => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  services: QuoteService[];
  setServices: React.Dispatch<React.SetStateAction<QuoteService[]>>;
}) {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Left Frame">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center p-[24px] relative size-full">
          <div className="flex flex-col gap-[24px] items-start w-full max-w-[1280px] flex-1 min-h-0">
            <Header />
            <Main1 selectedClient={selectedClient} setSelectedClient={setSelectedClient} selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} services={services} setServices={setServices} />
          </div>
        </div>
      </div>
    </div>
  );
}



function LightModeHeading3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Heading">
      <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[16px] whitespace-pre-wrap">Orçamento #843</p>
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex h-[32px] items-center relative shrink-0 w-full" data-name="Header">
      <LightModeHeading3 />
    </div>
  );
}

function SquarePen() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="square-pen">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="square-pen">
          <path d={svgPaths.p3759da00} fill="var(--fill-0, #3B82F6)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function IconFrame3() {
  return (
    <div className="content-stretch flex items-center pl-[8px] py-[8px] relative self-stretch shrink-0" data-name="Icon Frame">
      <SquarePen />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Text">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#2563eb] text-[14px]">Rascunho</p>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px py-[8px] relative" data-name="Text">
      <Text1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pl-[8px] relative w-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function LightModeCallout() {
  return (
    <div className="bg-[#eff6ff] relative rounded-[8px] shrink-0 w-full" data-name="Light Mode / Callout">
      <div aria-hidden="true" className="absolute border border-[#bfdbfe] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex items-start p-[8px] relative w-full">
        <IconFrame3 />
        <Content1 />
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header">
      <Header2 />
      <LightModeCallout />
    </div>
  );
}

function LightModeText3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Criado em</p>
    </div>
  );
}

function LightModeText4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] @max-[308px]:flex-none @max-[308px]:w-full items-center justify-end @max-[308px]:justify-start min-h-px min-w-px relative" data-name="Light Mode / Text">
      <p className="flex-[1_0_0] @max-[308px]:flex-none font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right @max-[308px]:text-left whitespace-pre-wrap">09/07/2025 às 12h50</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex @max-[308px]:flex-col gap-[16px] @max-[308px]:gap-[2px] items-start relative shrink-0 w-full" data-name="Frame">
      <LightModeText3 />
      <LightModeText4 />
    </div>
  );
}

function LightModeText5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Responsável</p>
    </div>
  );
}

function LightModeText6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="Light Mode / Text">
      <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right whitespace-pre-wrap">Tânia Graça</p>
    </div>
  );
}

const RESPONSAVEIS = [
  { id: "1", name: "Hélder Barbosa" },
  { id: "2", name: "Sónia Dias" },
  { id: "3", name: "Tânia Graça" },
];

function UserFrame1() {
  const [selected, setSelected] = useState("Tânia Graça");
  const [isStacked, setIsStacked] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    let container = btn.parentElement;
    while (container && !getComputedStyle(container).containerType.includes("inline-size")) {
      container = container.parentElement;
    }
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIsStacked(entry.contentRect.width < 308);
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button ref={btnRef} variant="link" size={null} className="flex flex-[1_0_0] @max-[308px]:flex-none gap-[4px] items-center justify-end @max-[308px]:justify-start min-h-px min-w-px h-auto no-underline hover:no-underline cursor-pointer focus-visible:ring-0 focus-visible:border-transparent border-none ring-0 outline-none !p-0">
          <span className="overflow-hidden text-[14px] font-normal leading-[1.5] text-[#8270ff] text-ellipsis text-right whitespace-pre-wrap">{selected}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isStacked ? "start" : "end"} className="min-w-[180px]">
        <DropdownMenuLabel className="text-[12px] text-[#71717a] font-medium">Responsável</DropdownMenuLabel>
        {RESPONSAVEIS.map((r) => (
          <DropdownMenuCheckboxItem
            key={r.id}
            checked={selected === r.name}
            onCheckedChange={() => setSelected(r.name)}
            className="cursor-pointer"
          >
            {r.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex @max-[308px]:flex-col gap-[16px] @max-[308px]:gap-[2px] items-start relative shrink-0 w-full" data-name="Frame">
      <LightModeText5 />
      <div className="flex flex-[1_0_0] @max-[308px]:flex-none @max-[308px]:w-full @max-[308px]:[&>button]:!justify-start min-h-px min-w-px">
        <UserFrame1 />
      </div>
    </div>
  );
}

function LightModeText7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">Horas orçamentadas</p>
    </div>
  );
}

function LightModeText8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] @max-[308px]:flex-none @max-[308px]:w-full items-center justify-end @max-[308px]:justify-start min-h-px min-w-px relative" data-name="Light Mode / Text">
      <p className="flex-[1_0_0] @max-[308px]:flex-none font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right @max-[308px]:text-left whitespace-pre-wrap">00h00</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex @max-[308px]:flex-col gap-[16px] @max-[308px]:gap-[2px] items-start relative shrink-0 w-full" data-name="Frame">
      <LightModeText7 />
      <LightModeText8 />
    </div>
  );
}

function PrimaryFrame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Primary Frame">
      <Frame />
      <Frame1 />
      <Frame2 />
    </div>
  );
}

function ContentFrame3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-x-clip overflow-y-auto relative shrink-0 w-full" data-name="Content Frame">
      <PrimaryFrame />
    </div>
  );
}

function MainFrame() {
  return (
    <div className="content-stretch flex flex-col flex-1 min-h-0 gap-[24px] items-start relative shrink-0 w-full" data-name="Main Frame">
      <Header1 />
      <ContentFrame3 />
    </div>
  );
}

function ClientTabEmptyState() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-h-px min-w-px overflow-clip relative w-full" data-name="Main Frame">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="user-round">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
            <path d={svgPathsClientTab.p13bae6c0} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-center text-ellipsis whitespace-pre-wrap">Sem cliente selecionado</p>
      </div>
    </div>
  );
}

function VehicleTabEmptyState() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-center min-h-px min-w-px overflow-clip relative w-full" data-name="Main Frame">
      <CarIcon className="size-[24px] text-[#a1a1aa] shrink-0" />
      <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-center text-ellipsis whitespace-pre-wrap">Sem veículo selecionado</p>
      </div>
    </div>
  );
}

function VehicleInfoSection({ vehicle }: { vehicle: Vehicle }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const rows = [
    { label: "Marca", value: vehicle.brand },
    { label: "Modelo", value: vehicle.model },
    { label: "Versão", value: vehicle.version },
    { label: "Motorização", value: vehicle.engine },
    { label: "Data de fabrico", value: vehicle.year ? String(vehicle.year) : "" },
    { label: "Cilindrada (cc)", value: vehicle.displacement ? String(vehicle.displacement) : "" },
    { label: "Potência (cv)", value: vehicle.power ? String(vehicle.power) : "" },
    { label: "Combustível", value: vehicle.fuel },
    { label: "Código de motor", value: vehicle.engineCode },
  ];

  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Vehicle Details Frame">
      <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
      <div className="flex flex-col w-full">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="content-stretch cursor-pointer flex gap-[8px] items-center relative shrink-0 w-full"
          data-name="Top Frame"
        >
          <InfoIcon className="size-[16px] text-[#a1a1aa] shrink-0" />
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
            <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Informação geral</p>
          </div>
          <div className="content-stretch flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative rounded-[6px] shrink-0 size-[24px]">
            <ChevronRightIcon
              className="size-[16px] text-[#27272a] transition-transform duration-200 ease-out"
              style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </div>
        </button>
        {/* Expandable info details — smart animate via CSS grid */}
        <div
          className="grid w-full transition-[grid-template-rows,opacity,margin] duration-200 ease-out"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0,
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="content-stretch flex flex-col gap-[8px] items-start w-full" data-name="Info Details">
              {rows.map((row) => (
                <div key={row.label} className="content-stretch flex @max-[308px]:flex-col gap-[16px] @max-[308px]:gap-[2px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex items-center relative shrink-0">
                    <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">{row.label}</p>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] @max-[308px]:flex-none @max-[308px]:w-full items-center justify-end @max-[308px]:justify-start min-h-px min-w-px relative">
                    <p className="flex-[1_0_0] @max-[308px]:flex-none font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right @max-[308px]:text-left whitespace-pre-wrap">{row.value || "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceHistoryRow({ entry }: { entry: ServiceHistoryEntry }) {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Appointment Frame">
      {/* Left: Content Frame */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis w-full whitespace-nowrap">{entry.serviceName}</p>
        <Button
          variant="link"
          size={null}
          className="!p-0 h-auto gap-[4px] cursor-pointer"
        >
          <ExternalLink className="size-[12px] text-[#8270ff] shrink-0" />
          <span className="font-medium leading-[1.5] text-[#8270ff] text-[12px]">ORC #{entry.orderNumber}</span>
        </Button>
      </div>
      {/* Right: Date + KM */}
      <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0">
        <div className="content-stretch flex items-center justify-end relative shrink-0">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis text-right">{entry.date}</p>
        </div>
        <div className="content-stretch flex items-center justify-end relative shrink-0">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis text-right">{entry.km}</p>
        </div>
      </div>
    </div>
  );
}

function VehicleServiceHistorySection({ vehicleId }: { vehicleId: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const entries = useMemo(() => getServiceHistoryByVehicleId(vehicleId), [vehicleId]);

  if (entries.length === 0) return null;

  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Vehicle Service History Frame">
      <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
      <div className="flex flex-col w-full">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="content-stretch cursor-pointer flex gap-[8px] items-center relative shrink-0 w-full"
          data-name="Top Frame"
        >
          <HistoryIcon className="size-[16px] text-[#a1a1aa] shrink-0" />
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
            <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Histórico de serviços</p>
          </div>
          <span className="bg-[#8270FF] text-white text-[12px] font-medium leading-[1.5] h-[22px] min-w-[22px] px-2 flex items-center justify-center rounded-full shrink-0">
            {entries.length}
          </span>
          <div className="content-stretch flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative rounded-[6px] shrink-0 size-[24px]">
            <ChevronRightIcon
              className="size-[16px] text-[#27272a] transition-transform duration-200 ease-out"
              style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </div>
        </button>
        {/* Expandable service list — smart animate via CSS grid */}
        <div
          className="grid w-full transition-[grid-template-rows,opacity,margin] duration-200 ease-out"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0,
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="content-stretch flex flex-col gap-[8px] items-start w-full" data-name="Services">
              {entries.map((entry) => (
                <ServiceHistoryRow key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VehicleTabContentRow({ label, value, showAddButton, onValueClick, onAddClick, noOdometerLabel, onNoOdometerClick }: { label: string; value?: string; showAddButton?: boolean; onValueClick?: () => void; onAddClick?: () => void; noOdometerLabel?: string; onNoOdometerClick?: () => void }) {
  return (
    <div className="content-stretch flex @max-[308px]:flex-col gap-[16px] @max-[308px]:gap-[2px] items-start relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">{label}</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] @max-[308px]:flex-none @max-[308px]:w-full items-center justify-end @max-[308px]:justify-start min-h-px min-w-px relative" data-name="Light Mode / Text">
        {noOdometerLabel ? (
          <Button variant="link" size={null} className="!p-0 h-auto cursor-pointer" onClick={onNoOdometerClick}>
            <span className="font-normal leading-[1.5] text-[#8270ff] text-[14px]">{noOdometerLabel}</span>
          </Button>
        ) : value ? (
          onValueClick ? (
            <Button variant="link" size={null} className="!p-0 h-auto cursor-pointer" onClick={onValueClick}>
              <span className="font-normal leading-[1.5] text-[#8270ff] text-[14px]">{value}</span>
            </Button>
          ) : (
            <p className="flex-[1_0_0] @max-[308px]:flex-none font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right @max-[308px]:text-left whitespace-pre-wrap">{value}</p>
          )
        ) : showAddButton ? (
          <Button variant="link" size={null} className="!p-0 h-auto cursor-pointer" onClick={onAddClick}>
            <span className="font-medium leading-[1.5] text-[#8270ff] text-[14px]">Adicionar</span>
          </Button>
        ) : (
          <p className="flex-[1_0_0] @max-[308px]:flex-none font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right @max-[308px]:text-left whitespace-pre-wrap">—</p>
        )}
      </div>
    </div>
  );
}

function UpdateKmModal({ isOpen, onClose, currentKm, currentNoOdometer, onSave }: { isOpen: boolean; onClose: () => void; currentKm: string; currentNoOdometer?: boolean; onSave: (km: string, noOdometer: boolean) => void }) {
  const [kmValue, setKmValue] = useState(currentKm);
  const [noOdometer, setNoOdometer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatKm = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return "";
    return Number(digits).toLocaleString("pt-PT");
  };

  useEffect(() => {
    if (isOpen) {
      setKmValue(formatKm(currentKm));
      setNoOdometer(!!currentNoOdometer);
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      setTimeout(() => inputRef.current?.focus(), 220);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentKm, currentNoOdometer]);

  const handleSave = () => {
    if (noOdometer) {
      onSave(kmValue.trim(), true);
      showToast("Alteração guardada com sucesso");
    } else if (kmValue.trim()) {
      onSave(kmValue.trim(), false);
      showToast("Alteração guardada com sucesso");
    }
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setKmValue(formatKm(digits));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-200 ease-out"
      style={{ opacity: isAnimating ? 1 : 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Modal */}
      <div className="bg-white flex flex-col gap-[20px] items-start p-[24px] relative rounded-[12px] w-[400px] z-10">
        

        {/* Title */}
        <p className="font-medium leading-[1.5] text-[#27272a] text-[16px]">Atualizar quilometragem</p>

        {/* Input field + toggle */}
        <div className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col gap-[6px] w-full">
            <Label htmlFor="km-input" className="text-[14px] text-[#27272a]">Quilometragem</Label>
            <Input
              ref={inputRef}
              id="km-input"
              inputMode="numeric"
              value={kmValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="100.000"
              disabled={noOdometer}
              className="text-[14px] font-normal"
            />
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-[8px]">
            <Switch
              id="no-odometer"
              checked={noOdometer}
              onCheckedChange={setNoOdometer}
            />
            <Label htmlFor="no-odometer" className="text-[14px] text-[#71717a] font-normal cursor-pointer">O veículo não tem odómetro</Label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-[8px] justify-end w-full">
          <Button variant="ghost" className="cursor-pointer" onClick={onClose}>Cancelar</Button>
          <Button className="cursor-pointer" onClick={handleSave}>Guardar</Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function VehicleTabContent({ vehicle, onVehicleUpdate, containerRef }: { vehicle: Vehicle; onVehicleUpdate?: (vehicle: Vehicle) => void; containerRef?: React.RefObject<HTMLDivElement | null> }) {
  const notesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(() => getVehicleTags(vehicle.id).tagIds);
  const [vehicleOnlyTags, setVehicleOnlyTags] = useState<TagData[]>(() => getVehicleTags(vehicle.id).clientOnlyTags);
  const [isTagsPopupOpen, setIsTagsPopupOpen] = useState(false);
  const [isKmModalOpen, setIsKmModalOpen] = useState(false);

  // Sync state when vehicle changes
  useEffect(() => {
    const saved = getVehicleTags(vehicle.id);
    setSelectedTagIds(saved.tagIds);
    setVehicleOnlyTags(saved.clientOnlyTags);
  }, [vehicle.id]);

  const [tagsTriggerRect, setTagsTriggerRect] = useState<{ top: number; left: number; bottom: number; width: number } | null>(null);
  const [tagsContainerRect, setTagsContainerRect] = useState<{ left: number; width: number } | null>(null);
  const tagsTriggerRef = useRef<HTMLButtonElement>(null);

  const handleToggleTag = (tagId: string, tagData?: TagData) => {
    setSelectedTagIds((prev) => {
      const next = prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId];
      setVehicleOnlyTags((prevTags) => {
        let nextTags = prevTags;
        if (tagData && !availableTagsDb.find((t) => t.id === tagData.id)) {
          nextTags = prevTags.some((t) => t.id === tagData.id) ? prevTags : [...prevTags, tagData];
        }
        saveVehicleTags(vehicle.id, next, nextTags);
        return nextTags;
      });
      return next;
    });
  };

  const openTagsPopup = () => {
    if (tagsTriggerRef.current) {
      const rect = tagsTriggerRef.current.getBoundingClientRect();
      setTagsTriggerRect({ top: rect.top, left: rect.left, bottom: rect.bottom, width: rect.width });
    }
    if (containerRef?.current) {
      const cRect = containerRef.current.getBoundingClientRect();
      setTagsContainerRect({ left: cRect.left, width: cRect.width });
    }
    setIsTagsPopupOpen(true);
  };

  const handleKmSave = (km: string, noOdometer: boolean) => {
    updateVehicleKm(vehicle.id, km, noOdometer);
    onVehicleUpdate?.({ ...vehicle, km, noOdometer });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
    notesTimeoutRef.current = setTimeout(() => {
      updateVehicleNotes(vehicle.id, newNotes);
      onVehicleUpdate?.({ ...vehicle, notes: newNotes });
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
    };
  }, []);

  const selectedTags = selectedTagIds
    .map((id) => availableTagsDb.find((t) => t.id === id) || vehicleOnlyTags.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => t != null);

  return (
    <div className="flex flex-[1_0_0] flex-col min-h-px min-w-px relative w-full" style={{ overflow: 'clip', overflowClipMargin: '3px' }}>
    <div className="visible-scrollbar content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative w-full -mx-[3px] px-[3px]" data-name="Main Frame">
      {/* Header Frame */}
      <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="Header Frame">
        {/* Header: Name + Shortcut Button */}
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px pt-[4px] relative" data-name="Left Frame">
            <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Heading">
              <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[16px] whitespace-pre-wrap">{vehicle.brand} {vehicle.model}</p>
            </div>
            {/* Tags */}
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Tags">
              <div className="content-start flex flex-[1_0_0] flex-wrap gap-[8px] items-center min-h-px min-w-px relative" data-name="Tags">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className={`${tag.bg} ${tag.text} ${tag.border} text-[12px] leading-[1.5] font-medium pl-[8px] pr-[4px] py-[2px] rounded-[6px] gap-[4px]`}
                  >
                    {tag.label}
                    <button
                      onClick={() => handleToggleTag(tag.id)}
                      className="inline-flex items-center justify-center size-[14px] rounded-full cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200 ease-out"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </Badge>
                ))}
                <Button
                  ref={tagsTriggerRef}
                  variant="ghost"
                  size={null}
                  className={`bg-[rgba(161,161,170,0.15)] rounded-[6px] h-auto not-disabled:hover:bg-[rgba(161,161,170,0.25)] cursor-pointer ${selectedTags.length >= 1 ? '!p-[4px]' : 'gap-[6px] !px-[8px] !py-[4px]'}`}
                  onClick={openTagsPopup}
                >
                  <PlusIcon className="size-[16px] text-[#3f3f46]" />
                  {selectedTags.length < 1 && (
                    <span className="font-medium leading-[1.5] text-[#3f3f46] text-[12px]">Adicionar</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
          {/* Shortcut button */}
          <div className="content-stretch flex items-start relative shrink-0" data-name="Shortcut Button">
            <Button
              variant="ghost"
              size="icon"
              className="max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] size-[32px] rounded-[6px] cursor-pointer not-disabled:hover:bg-[#e4e4e7]"
            >
              <ExternalLink className="size-[16px] text-[#27272a]" />
            </Button>
          </div>
        </div>
        {/* Vehicle image */}
        {vehicle.imageUrl && (
          <div className="relative shrink-0 w-[223px] h-[80px] rounded-[4px] overflow-hidden">
            <ImageWithFallback
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={vehicle.imageUrl}
            />
          </div>
        )}
      </div>

      {/* Vehicle notes textarea */}
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Field">
        <Textarea
          key={vehicle.id}
          placeholder="Notas sobre o veículo"
          defaultValue={vehicle.notes || ""}
          onChange={handleNotesChange}
          className="min-h-[64px] h-[64px] text-[14px] leading-[1.5] font-normal resize-none bg-white"
        />
      </div>

      {/* Vehicle data */}
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Frame">
        <VehicleTabContentRow label="Matrícula" value={vehicle.plate || undefined} showAddButton={!vehicle.plate} />
        <VehicleTabContentRow label="Data de matrícula" value={vehicle.registrationDate || undefined} />
        <VehicleTabContentRow label="VIN" value={vehicle.vin || undefined} showAddButton={!vehicle.vin} />
        <VehicleTabContentRow
          label="Quilómetros"
          value={vehicle.noOdometer ? undefined : (vehicle.km || undefined)}
          showAddButton={!vehicle.noOdometer && !vehicle.km}
          onValueClick={() => setIsKmModalOpen(true)}
          onAddClick={() => setIsKmModalOpen(true)}
          noOdometerLabel={vehicle.noOdometer ? "Sem odómetro" : undefined}
          onNoOdometerClick={() => setIsKmModalOpen(true)}
        />
      </div>

      {/* Expandable sections */}
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Expandable Items">
        {/* Informação geral */}
        <VehicleInfoSection vehicle={vehicle} />
        {/* Histórico de serviços */}
        <VehicleServiceHistorySection vehicleId={vehicle.id} />
      </div>

      {/* Tags popup */}
      {isTagsPopupOpen && tagsTriggerRect && tagsContainerRect && (
        <TagsPopup
          selectedTagIds={selectedTagIds}
          onToggleTag={handleToggleTag}
          onClose={() => setIsTagsPopupOpen(false)}
          triggerRect={tagsTriggerRect}
          containerRect={tagsContainerRect}
        />
      )}

      {/* Km update modal */}
      <UpdateKmModal
        isOpen={isKmModalOpen}
        onClose={() => setIsKmModalOpen(false)}
        currentKm={vehicle.km || ""}
        currentNoOdometer={vehicle.noOdometer}
        onSave={handleKmSave}
      />
    </div>
    </div>
  );
}

function ClientTabContentRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="content-stretch flex @max-[308px]:flex-col gap-[16px] @max-[308px]:gap-[2px] items-start relative shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex items-center relative shrink-0" data-name="Light Mode / Text">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis">{label}</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] @max-[308px]:flex-none @max-[308px]:w-full items-center justify-end @max-[308px]:justify-start min-h-px min-w-px relative" data-name="Light Mode / Text">
        <p className="flex-[1_0_0] @max-[308px]:flex-none font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis text-right @max-[308px]:text-left whitespace-pre-wrap">{value || "—"}</p>
      </div>
    </div>
  );
}

function ClientVehiclesSection({ clientName }: { clientName: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const vehicles = useMemo(() => getVehiclesByClientName(clientName), [clientName]);

  if (vehicles.length === 0) return null;

  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Client Vehicles Frame">
      <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
      <div className="flex flex-col w-full">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="content-stretch cursor-pointer flex gap-[8px] items-center relative shrink-0 w-full"
          data-name="Top Frame"
        >
          <CarIcon className="size-[16px] text-[#a1a1aa] shrink-0" />
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
            <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Veículos</p>
          </div>
          <span className="bg-[#8270FF] text-white text-[12px] font-medium leading-[1.5] h-[22px] min-w-[22px] px-2 flex items-center justify-center rounded-full shrink-0">
            {vehicles.length}
          </span>
          <div className="content-stretch flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative rounded-[6px] shrink-0 size-[24px]">
            <ChevronRightIcon
              className="size-[16px] text-[#27272a] transition-transform duration-200 ease-out"
              style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </div>
        </button>
        {/* Expandable vehicle list — smart animate via CSS grid */}
        <div
          className="grid w-full transition-[grid-template-rows,opacity,margin] duration-200 ease-out"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0,
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="content-stretch flex flex-col gap-[8px] items-start w-full" data-name="Vehicles">
              {vehicles.map((vehicle) => (
                <VehicleRow key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VehicleRow({ vehicle }: { vehicle: Vehicle }) {
  const displayLabel = `${vehicle.brand} ${vehicle.version} ${vehicle.engine} ${vehicle.power}cv`;
  const plateOrVin = vehicle.plate || vehicle.vin;

  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Vehicle">
      {/* Left: Content Frame */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
        <p className="font-normal leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] w-full whitespace-pre-wrap">{vehicle.brand} {vehicle.model}</p>
        <Button
          variant="link"
          size={null}
          className="!p-0 h-auto gap-[4px] cursor-pointer"
        >
          <ExternalLink className="size-[12px] text-[#8270ff] shrink-0" />
          <span className="font-medium leading-[1.5] text-[#8270ff] text-[12px]">{plateOrVin}</span>
        </Button>
      </div>
      {/* Right: Info Frame */}
      <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0">
        {vehicle.registrationDate && (
          <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Light Mode / Text">
            <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis text-right">{vehicle.registrationDate}</p>
          </div>
        )}
        <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Light Mode / Text">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis text-right">{vehicle.fuel}</p>
        </div>
      </div>
    </div>
  );
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  const title = formatAppointmentTitle(appointment.services);

  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Appointment Frame">
      {/* Left: Content Frame */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
        <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#27272a] text-[14px] text-ellipsis w-full whitespace-nowrap">{title}</p>
        <Button
          variant="link"
          size={null}
          className="!p-0 h-auto gap-[4px] cursor-pointer"
        >
          <ExternalLink className="size-[12px] text-[#8270ff] shrink-0" />
          <span className="font-medium leading-[1.5] text-[#8270ff] text-[12px]">OS #{appointment.serviceOrderNumber}</span>
        </Button>
      </div>
      {/* Right: Date Frame */}
      <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0">
        <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Light Mode / Text">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis text-right">{appointment.date}</p>
        </div>
      </div>
    </div>
  );
}

function ClientAppointmentsSection({ clientName }: { clientName: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const appointments = useMemo(() => getAppointmentsByClientName(clientName), [clientName]);

  // Hide section entirely if no appointments
  if (appointments.length === 0) return null;

  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Client Past Schedules Frame">
      <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" data-name="Light Mode / Separator" />
      <div className="flex flex-col w-full">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="content-stretch cursor-pointer flex gap-[8px] items-center relative shrink-0 w-full"
          data-name="Top Frame"
        >
          <CalendarIcon className="size-[16px] text-[#a1a1aa] shrink-0" />
          <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
            <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] text-left whitespace-pre-wrap">Marcações</p>
          </div>
          <span className="bg-[#8270FF] text-white text-[12px] font-medium leading-[1.5] h-[22px] min-w-[22px] px-2 flex items-center justify-center rounded-full shrink-0">
            {appointments.length}
          </span>
          <div className="content-stretch flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative rounded-[6px] shrink-0 size-[24px]">
            <ChevronRightIcon
              className="size-[16px] text-[#27272a] transition-transform duration-200 ease-out"
              style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
            />
          </div>
        </button>
        {/* Expandable appointment list — smart animate via CSS grid */}
        <div
          className="grid w-full transition-[grid-template-rows,opacity,margin] duration-200 ease-out"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0,
          }}
        >
          <div className="overflow-hidden min-h-0">
            <div className="content-stretch flex flex-col gap-[8px] items-start w-full" data-name="Appointments">
              {appointments.map((appointment) => (
                <AppointmentRow key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tag color options for the color selector
const TAG_COLORS = [
  { id: "red", hex: "#f43f5e", bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
  { id: "yellow", hex: "#eab308", bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  { id: "green", hex: "#22c55e", bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
  { id: "blue", hex: "#3b82f6", bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  { id: "purple", hex: "#a855f7", bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
];

// Mock tags database
let availableTagsDb = [
  { id: "tag-vip", label: "VIP", color: "red", bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
  { id: "tag-frota", label: "Frota", color: "blue", bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  { id: "tag-amigos", label: "Amigos", color: "amber", bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
];

// Per-client tags persistence (client ID → { tagIds, clientOnlyTags })
type TagData = { id: string; label: string; color: string; bg: string; text: string; border: string };
const clientTagsDb: Record<string, { tagIds: string[]; clientOnlyTags: TagData[] }> = {};

function getClientTags(clientId: string): { tagIds: string[]; clientOnlyTags: TagData[] } {
  return clientTagsDb[clientId] || { tagIds: [], clientOnlyTags: [] };
}

function saveClientTags(clientId: string, tagIds: string[], clientOnlyTags: TagData[]) {
  clientTagsDb[clientId] = { tagIds, clientOnlyTags };
}

// Per-vehicle tags persistence (vehicle ID → { tagIds, clientOnlyTags })
const vehicleTagsDb: Record<string, { tagIds: string[]; clientOnlyTags: TagData[] }> = {};

function getVehicleTags(vehicleId: string): { tagIds: string[]; clientOnlyTags: TagData[] } {
  return vehicleTagsDb[vehicleId] || { tagIds: [], clientOnlyTags: [] };
}

function saveVehicleTags(vehicleId: string, tagIds: string[], clientOnlyTags: TagData[]) {
  vehicleTagsDb[vehicleId] = { tagIds, clientOnlyTags };
}

function TagsPopup({ selectedTagIds, onToggleTag, onClose, triggerRect, containerRect }: {
  selectedTagIds: string[];
  onToggleTag: (tagId: string, tagData?: { id: string; label: string; color: string; bg: string; text: string; border: string }) => void;
  onClose: () => void;
  triggerRect: { top: number; left: number; bottom: number; width: number };
  containerRect: { left: number; width: number };
}) {
  const popupRef = useRef<HTMLDivElement>(null);
  const newTagInputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("red");
  const [shouldSaveTag, setShouldSaveTag] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
  const colorBtnRef = useRef<HTMLButtonElement>(null);
  const colorDropdownRef = useRef<HTMLDivElement>(null);
  const [savedTags, setSavedTags] = useState(availableTagsDb);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const handleStartCreating = () => {
    setIsCreatingTag(true);
    setNewTagName("");
    setSelectedColor("red");
    setShouldSaveTag(false);
    setTimeout(() => newTagInputRef.current?.focus(), 0);
  };

  const handleCancelCreating = () => {
    setIsCreatingTag(false);
    setNewTagName("");
    setColorDropdownOpen(false);
    setColorDropdownVisible(false);
  };

  const handleSaveNewTag = () => {
    if (!newTagName.trim()) return;
    const colorConfig = TAG_COLORS.find(c => c.id === selectedColor) || TAG_COLORS[0];
    const newTag = {
      id: `tag-${Date.now()}`,
      label: newTagName.trim(),
      color: selectedColor,
      bg: colorConfig.bg,
      text: colorConfig.text,
      border: colorConfig.border,
    };
    if (shouldSaveTag) {
      availableTagsDb = [...availableTagsDb, newTag];
      setSavedTags(availableTagsDb);
    }
    onToggleTag(newTag.id, newTag);
    setIsCreatingTag(false);
    setNewTagName("");
    onClose();
  };

  const openColorDropdown = () => {
    setColorDropdownOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setColorDropdownVisible(true);
      });
    });
  };

  const closeColorDropdown = () => {
    setColorDropdownVisible(false);
    setTimeout(() => setColorDropdownOpen(false), 200);
  };

  useEffect(() => {
    if (!colorDropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        colorDropdownRef.current &&
        !colorDropdownRef.current.contains(e.target as Node) &&
        colorBtnRef.current &&
        !colorBtnRef.current.contains(e.target as Node)
      ) {
        closeColorDropdown();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [colorDropdownOpen]);

  return createPortal(
    <div
      ref={popupRef}
      className="fixed bg-white rounded-[10px] shadow-lg border border-[#e5e5e5] flex flex-col z-[9999]"
      style={{
        top: triggerRect.bottom + 8,
        left: containerRect.left,
        width: containerRect.width,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 200ms ease-out",
      }}
    >
      {/* Submenu 1: Title + Tag checkboxes */}
      <div className="bg-white min-w-[192px] relative shrink-0 w-full rounded-t-[10px]" data-name="Submenu 1">
        <div className="flex flex-col justify-center min-w-[inherit] size-full">
          <div className="px-[13px] pt-[13px] pb-[5px]">
            <p className="font-normal leading-[1.5] text-[#71717a] text-[14px]">Tags guardados</p>
          </div>
          <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[5px] relative w-full">
            {savedTags.map((tag) => (
              <div key={tag.id} className="content-stretch flex items-center relative shrink-0 w-full">
                <label className="flex items-center gap-[8px] cursor-pointer w-full px-[8px] py-[6px] rounded-[6px] transition-colors hover:bg-[#f4f4f5]">
                  <Checkbox
                    checked={selectedTagIds.includes(tag.id)}
                    onCheckedChange={() => onToggleTag(tag.id)}
                    className="cursor-pointer"
                  />
                  <Badge
                    variant="outline"
                    className={`${tag.bg} ${tag.text} ${tag.border} text-[12px] leading-[1.5] font-medium px-[8px] py-[2px] rounded-[6px]`}
                  >
                    {tag.label}
                  </Badge>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submenu 2: New tag button */}
      <div className="bg-white min-w-[192px] relative rounded-b-[10px] shrink-0 w-full" data-name="Submenu 2">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l-0 border-r-0 border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-col justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">

          <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[5px] relative w-full">
            {/* Button - smart animate */}
            <div
              className="grid w-full transition-all duration-200 ease-out"
              style={{
                gridTemplateRows: !isCreatingTag ? "1fr" : "0fr",
                opacity: !isCreatingTag ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <div className="content-stretch flex items-center relative shrink-0 w-full">
                  <button onClick={handleStartCreating} className="flex items-center gap-[8px] px-[8px] py-[6px] rounded-[6px] cursor-pointer transition-colors hover:bg-[#f4f4f5] w-full">
                    <CirclePlus className="w-5 h-5 text-[#8270ff] shrink-0" />
                    <p className="font-medium leading-[1.5] text-[#8270ff] text-[14px]">Novo tag</p>
                  </button>
                </div>
              </div>
            </div>
            {/* Form - smart animate */}
            <div
              className="grid w-full transition-all duration-200 ease-out"
              style={{
                gridTemplateRows: isCreatingTag ? "1fr" : "0fr",
                opacity: isCreatingTag ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-[16px] w-full px-[8px] py-[6px]">
                {/* Input with color selector */}
                <div className="flex flex-col gap-[6px] w-full">
                  <p className="font-medium leading-[1.5] text-[#27272a] text-[14px]">Tag</p>
                  <div className="relative w-full flex">
                    {/* Color selector button */}
                    <button
                      ref={colorBtnRef}
                      type="button"
                      onClick={() => colorDropdownOpen ? closeColorDropdown() : openColorDropdown()}
                      className="flex items-center gap-[6px] h-9 px-[10px] bg-white border border-[var(--input)] rounded-l-md border-r-0 cursor-pointer hover:bg-[#e4e4e7] transition-colors duration-200 ease-out shrink-0"
                    >
                      <span
                        className="size-[14px] rounded-full shrink-0"
                        style={{ backgroundColor: (TAG_COLORS.find(c => c.id === selectedColor) || TAG_COLORS[0]).hex }}
                      />
                      <ChevronDownIcon className="w-3.5 h-3.5 text-[#a1a1aa]" />
                    </button>

                    {/* Tag name input */}
                    <Input
                      ref={newTagInputRef}
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      placeholder="Adicionar tag"
                      className="h-9 text-[14px] font-normal bg-white rounded-l-none flex-1"
                      onKeyDown={(e) => { if (e.key === "Enter") handleSaveNewTag(); }}
                    />

                    {/* Color dropdown */}
                    {colorDropdownOpen && (
                      <div
                        ref={colorDropdownRef}
                        className="absolute top-[calc(100%+4px)] left-0 bg-white rounded-[8px] border border-[#e4e4e7] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)] z-50 flex flex-row items-center gap-[6px] transition-opacity duration-200 ease-out overflow-hidden p-[6px]"
                        style={{ opacity: colorDropdownVisible ? 1 : 0 }}
                      >
                        {TAG_COLORS.map((color) => (
                          <button
                            key={color.id}
                            type="button"
                            onClick={() => {
                              setSelectedColor(color.id);
                              closeColorDropdown();
                            }}
                            className="shrink-0 size-[24px] rounded-full flex items-center justify-center cursor-pointer border-none bg-transparent transition-all duration-200 ease-out hover:brightness-110"
                            style={{ backgroundColor: color.hex }}
                          >
                            {selectedColor === color.id && (
                              <CheckIcon className="w-3 h-3 text-white" strokeWidth={3} />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Save checkbox */}
                <div className="flex items-center gap-[8px] cursor-pointer" onClick={() => setShouldSaveTag(prev => !prev)}>
                  <Checkbox
                    checked={shouldSaveTag}
                    onCheckedChange={(checked) => setShouldSaveTag(checked === true)}
                    className="cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="font-normal leading-[1.5] text-[#27272a] text-[14px]">Guardar tag para ser reutilizado</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-[8px] justify-end w-full">
                  <Button variant="ghost" size="sm" onClick={handleCancelCreating} className="cursor-pointer text-[14px] font-medium">
                    Cancelar
                  </Button>
                  <Button size="sm" onClick={handleSaveNewTag} disabled={!newTagName.trim()} className="cursor-pointer text-[14px] font-medium">
                    Guardar
                  </Button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ClientTabContent({ client, onClientUpdate, containerRef }: { client: SelectedClient; onClientUpdate?: (client: SelectedClient) => void; containerRef?: React.RefObject<HTMLDivElement | null> }) {
  const notesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(() => getClientTags(client.id).tagIds);
  const [clientOnlyTags, setClientOnlyTags] = useState<TagData[]>(() => getClientTags(client.id).clientOnlyTags);
  const [isTagsPopupOpen, setIsTagsPopupOpen] = useState(false);

  // Sync state when client changes
  useEffect(() => {
    const saved = getClientTags(client.id);
    setSelectedTagIds(saved.tagIds);
    setClientOnlyTags(saved.clientOnlyTags);
  }, [client.id]);
  const [tagsTriggerRect, setTagsTriggerRect] = useState<{ top: number; left: number; bottom: number; width: number } | null>(null);
  const [tagsContainerRect, setTagsContainerRect] = useState<{ left: number; width: number } | null>(null);
  const tagsTriggerRef = useRef<HTMLButtonElement>(null);

  const handleToggleTag = (tagId: string, tagData?: TagData) => {
    setSelectedTagIds((prev) => {
      const next = prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId];
      // Persist — use functional update for clientOnlyTags to get latest value
      setClientOnlyTags((prevTags) => {
        let nextTags = prevTags;
        if (tagData && !availableTagsDb.find((t) => t.id === tagData.id)) {
          nextTags = prevTags.some((t) => t.id === tagData.id) ? prevTags : [...prevTags, tagData];
        }
        saveClientTags(client.id, next, nextTags);
        return nextTags;
      });
      return next;
    });
  };

  const openTagsPopup = () => {
    if (tagsTriggerRef.current) {
      const rect = tagsTriggerRef.current.getBoundingClientRect();
      setTagsTriggerRect({ top: rect.top, left: rect.left, bottom: rect.bottom, width: rect.width });
    }
    if (containerRef?.current) {
      const cRect = containerRef.current.getBoundingClientRect();
      setTagsContainerRect({ left: cRect.left, width: cRect.width });
    }
    setIsTagsPopupOpen(true);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    // Debounce: persist after 300ms of inactivity
    if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
    notesTimeoutRef.current = setTimeout(() => {
      updateClientNotes(client.id, newNotes);
      onClientUpdate?.({ ...client, notes: newNotes });
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
    };
  }, []);

  const formatPhone = (phone: string) => {
    if (!phone) return "—";
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 9) {
      return `+351 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }
    return phone;
  };

  const selectedTags = selectedTagIds
    .map((id) => availableTagsDb.find((t) => t.id === id) || clientOnlyTags.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => t != null);

  return (
    <div className="flex flex-[1_0_0] flex-col min-h-px min-w-px relative w-full" style={{ overflow: 'clip', overflowClipMargin: '3px' }}>
    <div className="visible-scrollbar content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative w-full -mx-[3px] px-[3px]" data-name="Main Frame">
      {/* Header Frame */}
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Header Frame">
        {/* Header: Name + Shortcut Button */}
        <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px pt-[4px] relative" data-name="Left Frame">
            <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Light Mode / Heading">
              <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[16px] whitespace-pre-wrap">{client.name}</p>
            </div>
            {/* Tags */}
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Tags">
              <div className="content-start flex flex-[1_0_0] flex-wrap gap-[8px] items-center min-h-px min-w-px relative" data-name="Tags">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className={`${tag.bg} ${tag.text} ${tag.border} text-[12px] leading-[1.5] font-medium pl-[8px] pr-[4px] py-[2px] rounded-[6px] gap-[4px]`}
                  >
                    {tag.label}
                    <button
                      onClick={() => handleToggleTag(tag.id)}
                      className="inline-flex items-center justify-center size-[14px] rounded-full cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200 ease-out"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </Badge>
                ))}
                <Button
                  ref={tagsTriggerRef}
                  variant="ghost"
                  size={null}
                  className={`bg-[rgba(161,161,170,0.15)] rounded-[6px] h-auto not-disabled:hover:bg-[rgba(161,161,170,0.25)] cursor-pointer ${selectedTags.length >= 1 ? '!p-[4px]' : 'gap-[6px] !px-[8px] !py-[4px]'}`}
                  onClick={openTagsPopup}
                >
                  <PlusIcon className="size-[16px] text-[#3f3f46]" />
                  {selectedTags.length < 1 && (
                    <span className="font-medium leading-[1.5] text-[#3f3f46] text-[12px]">Adicionar</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
          {/* Shortcut button */}
          <div className="content-stretch flex items-start relative shrink-0" data-name="Shortcut Button">
            <Button
              variant="ghost"
              size="icon"
              className="max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] size-[32px] rounded-[6px] cursor-pointer not-disabled:hover:bg-[#e4e4e7]"
            >
              <ExternalLink className="size-[16px] text-[#27272a]" />
            </Button>
          </div>
        </div>
        {/* Client notes textarea */}
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Light Mode / Field">
          <Textarea
            key={client.id}
            placeholder="Notas sobre o cliente"
            defaultValue={client.notes || ""}
            onChange={handleNotesChange}
            className="min-h-[64px] h-[64px] text-[14px] leading-[1.5] font-normal resize-none bg-white"
          />
        </div>
      </div>

      {/* Client data */}
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Frame">
        <ClientTabContentRow label="Telefone" value={formatPhone(client.phone)} />
        <ClientTabContentRow label="Email" value={client.email} />
        <ClientTabContentRow label="Contacto pref." value={client.preferredContact || "—"} />
        <ClientTabContentRow label="NIF" value={client.nif || "—"} />
      </div>

      {/* Expandable sections */}
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Expandable Items">
        {/* Veículos */}
        <ClientVehiclesSection clientName={client.name} />
        {/* Marcações */}
        <ClientAppointmentsSection clientName={client.name} />
      </div>

      {/* Tags popup */}
      {isTagsPopupOpen && tagsTriggerRect && tagsContainerRect && (
        <TagsPopup
          selectedTagIds={selectedTagIds}
          onToggleTag={handleToggleTag}
          onClose={() => setIsTagsPopupOpen(false)}
          triggerRect={tagsTriggerRect}
          containerRect={tagsContainerRect}
        />
      )}
    </div>
    </div>
  );
}

function SideMenuEstPending({ selectedClient, onClientUpdate, selectedVehicle, onVehicleUpdate, services }: { selectedClient?: SelectedClient | null; onClientUpdate?: (client: SelectedClient) => void; selectedVehicle?: Vehicle | null; onVehicleUpdate?: (vehicle: Vehicle) => void; services?: QuoteService[] }) {
  const showClientEmptyState = !selectedClient || selectedClient.isEndConsumer;
  const showVehicleEmptyState = !selectedVehicle;
  const sideMenuRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sideMenuRef} className="bg-white flex flex-col gap-[24px] items-start relative size-full flex-1 min-h-0">
      <Tabs defaultValue="orcamento" className="flex flex-col gap-[24px] items-start relative size-full flex-1 min-h-0">
        <TabsList className="w-full">
          <TabsTrigger value="orcamento" className="cursor-pointer">Orçamento</TabsTrigger>
          <TabsTrigger value="cliente" className="cursor-pointer">Cliente</TabsTrigger>
          <TabsTrigger value="veiculo" className="cursor-pointer">Veículo</TabsTrigger>
        </TabsList>
        <TabsContent value="orcamento" className="flex flex-col gap-[24px] items-start w-full m-0">
          <MainFrame />
          <LightModeSeparator />
          <ActionButtons selectedClient={selectedClient} selectedVehicle={selectedVehicle} services={services} />
        </TabsContent>
        <TabsContent value="cliente" className={`flex flex-col flex-1 w-full m-0 ${showClientEmptyState ? 'items-center justify-center pt-[4px]' : 'items-start'}`}>
          {showClientEmptyState ? <ClientTabEmptyState /> : <ClientTabContent client={selectedClient!} onClientUpdate={onClientUpdate} containerRef={sideMenuRef} />}
        </TabsContent>
        <TabsContent value="veiculo" className={`flex flex-col flex-1 w-full m-0 ${showVehicleEmptyState ? 'items-center justify-center pt-[4px]' : 'items-start'}`}>
          {showVehicleEmptyState ? <VehicleTabEmptyState /> : <VehicleTabContent vehicle={selectedVehicle!} onVehicleUpdate={onVehicleUpdate} containerRef={sideMenuRef} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SideMenuFrame({ selectedClient, onClientUpdate, selectedVehicle, onVehicleUpdate, services }: { selectedClient?: SelectedClient | null; onClientUpdate?: (client: SelectedClient) => void; selectedVehicle?: Vehicle | null; onVehicleUpdate?: (vehicle: Vehicle) => void; services?: QuoteService[] }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start max-w-[360px] min-h-px min-w-px relative w-full @container" data-name="Side Menu Frame">
      <SideMenuEstPending selectedClient={selectedClient} onClientUpdate={onClientUpdate} selectedVehicle={selectedVehicle} onVehicleUpdate={onVehicleUpdate} services={services} />
    </div>
  );
}

function LightModeSeparator() {
  return <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" data-name="Light Mode / Separator" />;
}

function LightModeText9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Light Mode / Text">
      <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[14px] text-ellipsis whitespace-pre-wrap">Subtotal</p>
    </div>
  );
}

function LightModeText10({ value }: { value?: string }) {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Light Mode / Text">
      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[14px] text-ellipsis text-right">{value ?? "0,00 €"}</p>
    </div>
  );
}

function TopFrame1({ subtotal }: { subtotal?: string }) {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Top Frame">
      <LightModeText9 />
      <LightModeText10 value={subtotal} />
    </div>
  );
}

function LightModeHeading4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Heading">
      <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[16px]">Total</p>
    </div>
  );
}

function ChevronRight1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-right">
          <path d={svgPaths.p1fe4c100} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function LightModeButton7() {
  return (
    <div className="content-stretch flex items-center justify-center max-h-[24px] max-w-[24px] min-h-[24px] min-w-[24px] relative rounded-[6px] shrink-0 size-[24px]" data-name="Light Mode / Button">
      <ChevronRight1 />
    </div>
  );
}

function LeftFrame2({ services }: { services?: QuoteService[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const openPopover = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // Position above the trigger, 8px gap, aligned left with the BottomFrame parent
      const parentRect = triggerRef.current.closest('[data-name="Bottom Frame"]')?.getBoundingClientRect();
      const left = parentRect ? parentRect.left : rect.left;
      setPopoverPos({ top: rect.top, left });
    }
    setIsOpen(true);
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const closePopover = useCallback(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsOpen(false), 200);
    return () => clearTimeout(timer);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        closePopover();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, closePopover]);

  return (
    <>
      <div
        ref={triggerRef}
        onClick={() => isOpen ? closePopover() : openPopover()}
        className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative cursor-pointer"
        data-name="Left Frame"
      >
        <LightModeHeading4 />
        <LightModeButton7 />
      </div>
      {isOpen && createPortal(
        <>
          {/* Dark overlay */}
          <div
            className="fixed inset-0 bg-black/20 transition-opacity duration-200 ease-out"
            style={{ opacity: isVisible ? 1 : 0, zIndex: 9998 }}
            onMouseDown={closePopover}
          />
          {/* Popover */}
          <div
            ref={popoverRef}
            className="fixed transition-opacity duration-200 ease-out w-[328px]"
            style={{
              opacity: isVisible ? 1 : 0,
              zIndex: 9999,
              top: popoverPos.top,
              left: popoverPos.left,
              transform: "translateY(calc(-100% - 8px))",
            }}
          >
            <PopoverQuotePricing services={services} />
          </div>
        </>,
        document.body
      )}
    </>
  );
}

function LightModeText11({ value }: { value?: string }) {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Light Mode / Text">
      <p className="font-semibold leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[16px]">{value ?? "0,00 €"}</p>
    </div>
  );
}

function BottomFrame({ total, services }: { total?: string; services?: QuoteService[] }) {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Bottom Frame">
      <LeftFrame2 services={services} />
      <LightModeText11 value={total} />
    </div>
  );
}

function ContentFrame4({ services }: { services?: QuoteService[] }) {
  const subtotal = useMemo(() => {
    const val = calcQuoteSubtotal(services ?? []);
    return val.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }, [services]);

  const total = useMemo(() => {
    const val = calcQuoteTotal(services ?? []);
    return val.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }, [services]);

  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Content Frame">
      <TopFrame1 subtotal={subtotal} />
      <BottomFrame total={total} services={services} />
    </div>
  );
}

function ActionButtons({ selectedClient, selectedVehicle, services }: { selectedClient?: SelectedClient | null; selectedVehicle?: Vehicle | null; services?: QuoteService[] }) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const canFinalize = useMemo(() => {
    const hasClient = !!selectedClient;
    const hasVehicle = !!selectedVehicle;
    const hasServiceWithValue = (services ?? []).some(s => calcQuoteTotal([s]) > 0);
    return hasClient && hasVehicle && hasServiceWithValue;
  }, [selectedClient, selectedVehicle, services]);

  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Action Buttons">
      <ContentFrame4 services={services} />
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Buttons Frame">
        <Button className="w-full h-[40px] bg-[#262124] text-white not-disabled:hover:bg-[#3f3f46] cursor-pointer" disabled={!canFinalize}>
          Finalizar orçamento
        </Button>
        <Button variant="outline" className="w-full h-[40px] cursor-pointer" onClick={() => setIsCancelModalOpen(true)}>
          Cancelar
        </Button>
      </div>
      <CancelQuoteModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onKeepDraft={() => {
          // No-op: next pages not yet created
        }}
        onCancelQuote={() => {
          // No-op: next pages not yet created
        }}
      />
    </div>
  );
}

function RightFrame({ selectedClient, onClientUpdate, selectedVehicle, onVehicleUpdate, services }: { selectedClient?: SelectedClient | null; onClientUpdate?: (client: SelectedClient) => void; selectedVehicle?: Vehicle | null; onVehicleUpdate?: (vehicle: Vehicle) => void; services?: QuoteService[] }) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] h-full items-start p-[16px] relative shrink-0 w-[clamp(320px,28vw,360px)]" data-name="Right Frame">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-solid inset-0 pointer-events-none" />
      <SideMenuFrame selectedClient={selectedClient} onClientUpdate={onClientUpdate} selectedVehicle={selectedVehicle} onVehicleUpdate={onVehicleUpdate} services={services} />
    </div>
  );
}

function Main({ selectedClient, setSelectedClient, selectedVehicle, setSelectedVehicle, services, setServices }: {
  selectedClient: SelectedClient | null;
  setSelectedClient: (client: SelectedClient | null) => void;
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  services: QuoteService[];
  setServices: React.Dispatch<React.SetStateAction<QuoteService[]>>;
}) {
  const handleClientUpdate = useCallback((updatedClient: SelectedClient) => {
    setSelectedClient(updatedClient);
  }, [setSelectedClient]);

  const handleVehicleUpdate = useCallback((updatedVehicle: Vehicle) => {
    setSelectedVehicle(updatedVehicle);
  }, [setSelectedVehicle]);

  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-full" data-name="Main">
      <LeftFrame1 selectedClient={selectedClient} setSelectedClient={setSelectedClient} selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} services={services} setServices={setServices} />
      <RightFrame selectedClient={selectedClient} onClientUpdate={handleClientUpdate} selectedVehicle={selectedVehicle} onVehicleUpdate={handleVehicleUpdate} services={services} />
    </div>
  );
}

function Content() {
  const [selectedClient, setSelectedClient] = useState<SelectedClient | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [services, setServices] = useState<QuoteService[]>([]);

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-h-px min-w-px overflow-clip relative" data-name="Content">
      <Navbar />
      <Main selectedClient={selectedClient} setSelectedClient={setSelectedClient} selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} services={services} setServices={setServices} />
    </div>
  );
}

export { Content };

export default function QuotesCreateNewQuote1stQuote() {
  return (
    <div className="bg-[#f4f4f5] content-stretch flex items-center relative size-full" data-name="Quotes - Create New Quote | 1st Quote">
      <Sidebar />
      <Content />
    </div>
  );
}