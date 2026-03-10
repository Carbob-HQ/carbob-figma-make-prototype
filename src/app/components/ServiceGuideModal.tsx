import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { X, ChevronRight, ChevronLeft, ChevronDown, CirclePlus, CircleMinus, Loader2, Trash2, Clock, Search, ClipboardList, Wrench } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import type { Vehicle } from "./VehicleSearchPopup";
import type { QuoteService, ServiceItem, LaborItem, PartItem, ConsumableItem } from "./QuoteServicesData";
import { generateServiceId, generateItemId, calcItemTotal } from "./QuoteServicesData";
import { showToast } from "./Toast";
import imgTecAlliance from "figma:asset/aadee18dc44048d2f735deaf90da573856a589fc.png";

// ─── SVG paths from Figma ────────────────────────────────────────────────────

const CLOSE_PATH = "M8.19526 0.195262C8.45561 -0.0650874 8.87762 -0.0650874 9.13797 0.195262C9.39832 0.455612 9.39832 0.877621 9.13797 1.13797L5.60932 4.66662L9.13797 8.19526L9.18354 8.24604C9.39711 8.50789 9.38205 8.89389 9.13797 9.13797C8.89389 9.38205 8.50789 9.39711 8.24604 9.18354L8.19526 9.13797L4.66662 5.60932L1.13797 9.13797C0.877621 9.39832 0.455612 9.39832 0.195262 9.13797C-0.0650874 8.87762 -0.0650874 8.45561 0.195262 8.19526L3.72391 4.66662L0.195262 1.13797L0.149689 1.08719C-0.0638777 0.82534 -0.0488152 0.439339 0.195262 0.195262C0.439339 -0.0488152 0.82534 -0.0638777 1.08719 0.149689L1.13797 0.195262L4.66662 3.72391L8.19526 0.195262Z";
const PLUS_CIRCLE_PATH = "M13.3333 7.33333C13.3333 4.01962 10.647 1.33333 7.33333 1.33333C4.01962 1.33333 1.33333 4.01962 1.33333 7.33333C1.33333 10.647 4.01962 13.3333 7.33333 13.3333C10.647 13.3333 13.3333 10.647 13.3333 7.33333ZM6.66667 10V8H4.66667C4.29848 8 4 7.70152 4 7.33333C4 6.96514 4.29848 6.66667 4.66667 6.66667H6.66667V4.66667C6.66667 4.29848 6.96514 4 7.33333 4C7.70152 4 8 4.29848 8 4.66667V6.66667H10C10.3682 6.66667 10.6667 6.96514 10.6667 7.33333C10.6667 7.70152 10.3682 8 10 8H8V10C8 10.3682 7.70152 10.6667 7.33333 10.6667C6.96514 10.6667 6.66667 10.3682 6.66667 10ZM14.6667 7.33333C14.6667 11.3834 11.3834 14.6667 7.33333 14.6667C3.28325 14.6667 0 11.3834 0 7.33333C0 3.28325 3.28325 0 7.33333 0C11.3834 0 14.6667 3.28325 14.6667 7.33333Z";
const CLOCK_PATH = "M13.3333 7.33333C13.3333 4.01962 10.647 1.33333 7.33333 1.33333C4.01962 1.33333 1.33333 4.01962 1.33333 7.33333C1.33333 10.647 4.01962 13.3333 7.33333 13.3333C10.647 13.3333 13.3333 10.647 13.3333 7.33333ZM6.66667 3.33333C6.66667 2.96514 6.96514 2.66667 7.33333 2.66667C7.70152 2.66667 8 2.96514 8 3.33333V6.92122L10.2982 8.07031L10.3574 8.10417C10.6428 8.28504 10.7507 8.65611 10.5964 8.96484C10.442 9.27359 10.0803 9.41019 9.76432 9.29036L9.70182 9.26302L7.03516 7.92969C6.8093 7.81676 6.66667 7.58585 6.66667 7.33333V3.33333ZM14.6667 7.33333C14.6667 11.3834 11.3834 14.6667 7.33333 14.6667C3.28325 14.6667 0 11.3834 0 7.33333C0 3.28325 3.28325 0 7.33333 0C11.3834 0 14.6667 3.28325 14.6667 7.33333Z";

// ─── Helper: format minutes to HHhMM ────────────────────────────────────────

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
}

function fmtCurrency(val: number): string {
  return val.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\u00A0/g, " ") + " €";
}

/** Compute breakdown summary for a selected service's items */
function computeServiceBreakdown(items: ServiceItem[]) {
  const laborItems = items.filter((i): i is LaborItem => i.type === "labor");
  const partsItems = items.filter((i): i is PartItem => i.type === "parts");
  const consumableItems = items.filter((i): i is ConsumableItem => i.type === "consumables");

  const laborSubtotal = laborItems.reduce((sum, i) => sum + i.subtotal, 0);
  const totalHours = laborItems.reduce((sum, i) => sum + i.hours, 0);
  const partsSubtotal = partsItems.reduce((sum, i) => sum + i.subtotal, 0);
  const consumablesSubtotal = consumableItems.reduce((sum, i) => sum + i.subtotal, 0);

  // Format hours as HHhMM
  const h = Math.floor(totalHours);
  const m = Math.round((totalHours - h) * 60);
  const hoursStr = `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;

  // Effective rate (if all labor items share the same rate, show it; otherwise compute average)
  const rates = new Set(laborItems.map((i) => i.pricePerHour));
  const rateStr = rates.size === 1
    ? fmtCurrency(laborItems[0].pricePerHour)
    : totalHours > 0 ? fmtCurrency(laborSubtotal / totalHours) : "0,00 €";

  return { laborSubtotal, totalHours, hoursStr, rateStr, partsSubtotal, consumablesSubtotal, hasLabor: laborItems.length > 0, hasParts: partsItems.length > 0, hasConsumables: consumableItems.length > 0 };
}

// ─── Guide Service type (template) ──────────────────────────────────────────

interface GuideServiceTemplate {
  id: string;
  title: string;
  subtitle?: string;
  timeMinutes: number;
  items: ServiceItem[];
}

interface GuideCategory {
  id: string;
  name: string;
  services: GuideServiceTemplate[];
}

// ─── Mock Data: realistic service guide ─────────────────────────────────────

function makeLabor(designation: string, hours: number, pricePerHour: number, discount = 0, order = 0): LaborItem {
  const base = hours * pricePerHour;
  const subtotal = base * (1 - discount / 100);
  const vat = 23;
  return {
    id: generateItemId(), type: "labor", designation, hours, pricePerHour, discount, subtotal, vat, total: subtotal * (1 + vat / 100), order,
  };
}

function makePart(designation: string, qty: number, unitCost: number, unitPrice: number, partType = "OEM", refOEM = "", discount = 0, order = 0): PartItem {
  const base = unitPrice * qty;
  const subtotal = base * (1 - discount / 100);
  const vat = 23;
  return {
    id: generateItemId(), type: "parts", designation, referenceOEM: refOEM, reference: "", quantity: qty, partType,
    costOEM: unitCost, unitCost, retailDiscount: 0, markup: unitCost > 0 ? Math.round(((unitPrice / unitCost) - 1) * 100) : 0,
    retailPrice: unitCost, unitPrice, discount, subtotal, vat, total: subtotal * (1 + vat / 100), order,
  };
}

function makeConsumable(designation: string, qty: number, unitPrice: number, discount = 0, order = 0): ConsumableItem {
  const base = unitPrice * qty;
  const subtotal = base * (1 - discount / 100);
  const vat = 23;
  return {
    id: generateItemId(), type: "consumables", designation, calculationType: "fixed", unitCost: unitPrice * 0.6,
    quantity: qty, markup: 67, retailPrice: unitPrice * 0.6, retailDiscount: 0, unitPrice, discount, subtotal, vat, total: subtotal * (1 + vat / 100), order,
  };
}

const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: "gerais",
    name: "Gerais",
    services: [
      {
        id: "gs-1", title: "Check-up de verão / inverno", subtitle: "Inspeção geral de níveis, luzes, travões, etc.", timeMinutes: 40,
        items: [
          makeLabor("Check-up sazonal", 0.67, 35, 0, 0),
          makeConsumable("Líquido limpa-vidros", 1, 4.50, 0, 1),
        ],
      },
      {
        id: "gs-2", title: "Lavagem e aspiração", timeMinutes: 60,
        items: [
          makeLabor("Lavagem e aspiração completa", 1, 35, 0, 0),
          makeConsumable("Produto de limpeza interior", 1, 6.00, 0, 1),
          makeConsumable("Cera de proteção", 1, 8.50, 0, 2),
        ],
      },
      {
        id: "gs-3", title: "Polimento de faróis", timeMinutes: 45,
        items: [
          makeLabor("Polimento de faróis", 0.75, 40, 0, 0),
          makeConsumable("Kit polimento faróis", 1, 12.00, 0, 1),
        ],
      },
      {
        id: "gs-4", title: "Polimento de pintura", timeMinutes: 180,
        items: [
          makeLabor("Polimento de pintura completo", 3, 40, 0, 0),
          makeConsumable("Compound de polimento", 1, 18.00, 0, 1),
          makeConsumable("Cera de acabamento", 1, 22.00, 0, 2),
        ],
      },
    ],
  },
  {
    id: "oleo",
    name: "Mudança de óleo",
    services: [
      {
        id: "os-1", title: "Óleo de motor", subtitle: "Substituir", timeMinutes: 30,
        items: [
          makeLabor("Substituição de óleo de motor", 0.5, 35, 0, 0),
          makePart("Óleo de motor 5W-30 5L", 1, 28.00, 42.00, "OEM", "152089", 0, 1),
          makeConsumable("Anilha de carter", 1, 1.50, 0, 2),
        ],
      },
      {
        id: "os-2", title: "Filtro de óleo do motor", subtitle: "Substituir", timeMinutes: 15,
        items: [
          makeLabor("Substituição filtro de óleo", 0.25, 35, 0, 0),
          makePart("Filtro de óleo", 1, 6.50, 12.00, "OEM", "152071", 0, 1),
        ],
      },
      {
        id: "os-3", title: "Filtro de ar", subtitle: "Substituir", timeMinutes: 30,
        items: [
          makeLabor("Substituição filtro de ar", 0.5, 35, 0, 0),
          makePart("Filtro de ar", 1, 8.00, 15.50, "OEM", "165467", 0, 1),
        ],
      },
      {
        id: "os-4", title: "Filtro de combustível", subtitle: "Substituir", timeMinutes: 45,
        items: [
          makeLabor("Substituição filtro de combustível", 0.75, 35, 0, 0),
          makePart("Filtro de combustível", 1, 12.00, 22.00, "OEM", "164039", 0, 1),
        ],
      },
      {
        id: "os-5", title: "Filtro de habitáculo", subtitle: "Substituir", timeMinutes: 23,
        items: [
          makeLabor("Substituição filtro habitáculo", 0.38, 35, 0, 0),
          makePart("Filtro de habitáculo", 1, 9.00, 16.00, "OEM", "272772835R", 0, 1),
        ],
      },
    ],
  },
  {
    id: "ac",
    name: "Ar condicionado",
    services: [
      {
        id: "ac-1", title: "Recarga de AC", timeMinutes: 60,
        items: [
          makeLabor("Recarga de ar condicionado", 1, 40, 0, 0),
          makeConsumable("Gás refrigerante R134a", 1, 35.00, 0, 1),
          makeConsumable("Óleo compressor AC", 1, 8.00, 0, 2),
        ],
      },
      {
        id: "ac-2", title: "Limpeza do sistema de AC", timeMinutes: 45,
        items: [
          makeLabor("Limpeza sistema AC", 0.75, 40, 0, 0),
          makeConsumable("Spray antibacteriano AC", 1, 12.00, 0, 1),
        ],
      },
      {
        id: "ac-3", title: "Substituição compressor AC", timeMinutes: 180,
        items: [
          makeLabor("Substituição compressor AC", 3, 40, 0, 0),
          makePart("Compressor AC", 1, 280.00, 420.00, "OEM", "926009956R", 0, 1),
          makeConsumable("Gás refrigerante R134a", 1, 35.00, 0, 2),
        ],
      },
      {
        id: "ac-4", title: "Substituição condensador AC", timeMinutes: 120,
        items: [
          makeLabor("Substituição condensador AC", 2, 40, 0, 0),
          makePart("Condensador AC", 1, 145.00, 220.00, "OEM", "921006454R", 0, 1),
          makeConsumable("Gás refrigerante R134a", 1, 35.00, 0, 2),
        ],
      },
    ],
  },
  {
    id: "pastilhas",
    name: "Pastilhas e discos",
    services: [
      {
        id: "pd-1", title: "Pastilhas dianteiras", subtitle: "Substituir", timeMinutes: 60,
        items: [
          makeLabor("Substituição pastilhas dianteiras", 1, 40, 0, 0),
          makePart("Jogo pastilhas dianteiras", 1, 22.00, 38.00, "OEM", "410602192R", 0, 1),
        ],
      },
      {
        id: "pd-2", title: "Pastilhas traseiras", subtitle: "Substituir", timeMinutes: 60,
        items: [
          makeLabor("Substituição pastilhas traseiras", 1, 40, 0, 0),
          makePart("Jogo pastilhas traseiras", 1, 18.00, 32.00, "OEM", "440609883R", 0, 1),
        ],
      },
      {
        id: "pd-3", title: "Discos dianteiros", subtitle: "Substituir", timeMinutes: 90,
        items: [
          makeLabor("Substituição discos dianteiros", 1.5, 40, 0, 0),
          makePart("Par discos dianteiros", 1, 48.00, 78.00, "OEM", "402060010R", 0, 1),
        ],
      },
      {
        id: "pd-4", title: "Discos traseiros", subtitle: "Substituir", timeMinutes: 90,
        items: [
          makeLabor("Substituição discos traseiros", 1.5, 40, 0, 0),
          makePart("Par discos traseiros", 1, 38.00, 62.00, "OEM", "432001539R", 0, 1),
        ],
      },
      {
        id: "pd-5", title: "Pastilhas + discos dianteiros", subtitle: "Substituir", timeMinutes: 120,
        items: [
          makeLabor("Substituição pastilhas e discos dianteiros", 2, 40, 0, 0),
          makePart("Par discos dianteiros", 1, 48.00, 78.00, "OEM", "402060010R", 0, 1),
          makePart("Jogo pastilhas dianteiras", 1, 22.00, 38.00, "OEM", "410602192R", 0, 2),
        ],
      },
      {
        id: "pd-6", title: "Pastilhas + discos traseiros", subtitle: "Substituir", timeMinutes: 120,
        items: [
          makeLabor("Substituição pastilhas e discos traseiros", 2, 40, 0, 0),
          makePart("Par discos traseiros", 1, 38.00, 62.00, "OEM", "432001539R", 0, 1),
          makePart("Jogo pastilhas traseiras", 1, 18.00, 32.00, "OEM", "440609883R", 0, 2),
        ],
      },
    ],
  },
  {
    id: "amortecedores",
    name: "Amortecedores",
    services: [
      {
        id: "am-1", title: "Amortecedores dianteiros", subtitle: "Substituir", timeMinutes: 120,
        items: [
          makeLabor("Substituição amortecedores dianteiros", 2, 40, 0, 0),
          makePart("Par amortecedores dianteiros", 1, 95.00, 155.00, "OEM", "543020957R", 0, 1),
        ],
      },
      {
        id: "am-2", title: "Amortecedores traseiros", subtitle: "Substituir", timeMinutes: 90,
        items: [
          makeLabor("Substituição amortecedores traseiros", 1.5, 40, 0, 0),
          makePart("Par amortecedores traseiros", 1, 72.00, 120.00, "OEM", "562105778R", 0, 1),
        ],
      },
      {
        id: "am-3", title: "Kit completo de amortecedores", subtitle: "Substituir", timeMinutes: 210,
        items: [
          makeLabor("Substituição kit completo amortecedores", 3.5, 40, 0, 0),
          makePart("Par amortecedores dianteiros", 1, 95.00, 155.00, "OEM", "543020957R", 0, 1),
          makePart("Par amortecedores traseiros", 1, 72.00, 120.00, "OEM", "562105778R", 0, 2),
        ],
      },
      {
        id: "am-4", title: "Molas de suspensão dianteiras", subtitle: "Substituir", timeMinutes: 90,
        items: [
          makeLabor("Substituição molas dianteiras", 1.5, 40, 0, 0),
          makePart("Par molas suspensão dianteira", 1, 55.00, 92.00, "OEM", "540104407R", 0, 1),
        ],
      },
    ],
  },
  {
    id: "distribuicao",
    name: "Correia de distribuição",
    services: [
      {
        id: "cd-1", title: "Kit de distribuição", subtitle: "Substituir", timeMinutes: 240,
        items: [
          makeLabor("Substituição kit de distribuição", 4, 45, 0, 0),
          makePart("Kit correia distribuição", 1, 85.00, 145.00, "OEM", "130C11508R", 0, 1),
          makeConsumable("Líquido refrigerante", 2, 8.50, 0, 2),
        ],
      },
      {
        id: "cd-2", title: "Kit distribuição + bomba de água", subtitle: "Substituir", timeMinutes: 300,
        items: [
          makeLabor("Substituiç���������o kit distribuição + bomba água", 5, 45, 0, 0),
          makePart("Kit correia distribuição", 1, 85.00, 145.00, "OEM", "130C11508R", 0, 1),
          makePart("Bomba de água", 1, 42.00, 72.00, "OEM", "210108845R", 0, 2),
          makeConsumable("Líquido refrigerante", 3, 8.50, 0, 3),
        ],
      },
      {
        id: "cd-3", title: "Tensor da correia", subtitle: "Substituir", timeMinutes: 90,
        items: [
          makeLabor("Substituição tensor da correia", 1.5, 45, 0, 0),
          makePart("Tensor da correia", 1, 35.00, 58.00, "OEM", "117509654R", 0, 1),
        ],
      },
    ],
  },
  {
    id: "embraiagem",
    name: "Embraiagem",
    services: [
      {
        id: "em-1", title: "Kit de embraiagem", subtitle: "Substituir", timeMinutes: 300,
        items: [
          makeLabor("Substituição kit de embraiagem", 5, 45, 0, 0),
          makePart("Kit embraiagem completo", 1, 135.00, 225.00, "OEM", "302050901R", 0, 1),
        ],
      },
      {
        id: "em-2", title: "Kit embraiagem + volante motor", subtitle: "Substituir", timeMinutes: 360,
        items: [
          makeLabor("Substituição embraiagem + volante motor", 6, 45, 0, 0),
          makePart("Kit embraiagem completo", 1, 135.00, 225.00, "OEM", "302050901R", 0, 1),
          makePart("Volante motor bimassa", 1, 220.00, 365.00, "OEM", "123007656R", 0, 2),
        ],
      },
      {
        id: "em-3", title: "Cabo de embraiagem", subtitle: "Substituir", timeMinutes: 60,
        items: [
          makeLabor("Substituição cabo de embraiagem", 1, 40, 0, 0),
          makePart("Cabo de embraiagem", 1, 18.00, 32.00, "OEM", "306205043R", 0, 1),
        ],
      },
    ],
  },
];

// ─── Types for selected services ───────────────────────────────────────────

interface SelectedGuideService {
  templateId: string;
  title: string;
  subtitle?: string;
  totalWithVat: number;
  items: ServiceItem[];
}

// ─── Mock Data: Deferred (rejected) services per client ─────────────────────

interface DeferredQuote {
  id: string;
  orderNumber: string;
  date: string;
  rejectedServices: GuideServiceTemplate[];
}

interface ClientDeferredData {
  clientId: string;
  quotes: DeferredQuote[];
}

const MOCK_DEFERRED_DATA: ClientDeferredData[] = [
  {
    clientId: "3", // Tiago Gomes
    quotes: [
      {
        id: "dq-1",
        orderNumber: "OS-2025/11",
        date: "13/01/2025",
        rejectedServices: [
          {
            id: "ds-1",
            title: "Substituir conjunto de filtros do habitáculo",
            subtitle: "A cada 30.000 km / 1 ano(s)",
            timeMinutes: 75,
            items: [
              makeLabor("Substituição filtros habitáculo", 1.25, 35, 0, 0),
              makePart("Filtro de habitáculo", 1, 9.00, 16.00, "OEM", "272772835R", 0, 1),
              makePart("Filtro de ar condicionado", 1, 12.00, 20.00, "OEM", "271131150R", 0, 2),
            ],
          },
        ],
      },
      {
        id: "dq-2",
        orderNumber: "OS-2024/43",
        date: "02/03/2024",
        rejectedServices: [
          {
            id: "ds-2",
            title: "Pastilhas dianteiras",
            subtitle: "Substituir",
            timeMinutes: 60,
            items: [
              makeLabor("Substituição pastilhas dianteiras", 1, 40, 0, 0),
              makePart("Jogo pastilhas dianteiras", 1, 22.00, 38.00, "OEM", "410602192R", 0, 1),
            ],
          },
          {
            id: "ds-3",
            title: "Alinhamento de direção",
            timeMinutes: 45,
            items: [
              makeLabor("Alinhamento de direção", 0.75, 40, 0, 0),
            ],
          },
        ],
      },
    ],
  },
  // João Silva (id: "2") — no deferred services, so not included
];

/** Get deferred data for a client. Returns empty array if none. */
function getDeferredQuotes(clientId: string | undefined): DeferredQuote[] {
  if (!clientId) return [];
  const data = MOCK_DEFERRED_DATA.find((d) => d.clientId === clientId);
  return data?.quotes ?? [];
}

// ─── Mock Data: Scheduled Maintenance ───────────────────────────────────────

interface MaintenanceServiceTemplate {
  id: string;
  title: string;
  subtitle?: string;
  timeMinutes: number;
  items: ServiceItem[];
}

interface MaintenanceRevision {
  id: string;
  km: number;
  maintenancePlan: MaintenanceServiceTemplate[];
  additionalServices: MaintenanceServiceTemplate[];
}

/** Generate mock revisions every 10,000 km up to 200,000 km */
function generateRevisions(): MaintenanceRevision[] {
  const revisions: MaintenanceRevision[] = [];
  for (let km = 10000; km <= 200000; km += 10000) {
    const id = `rev-${km}`;
    const plan: MaintenanceServiceTemplate[] = [];
    // Base service present in every revision
    const baseService: MaintenanceServiceTemplate = {
      id: `${id}-mp-1`, title: `Serviços a cada 10.000 km / 1 ano(s)`, timeMinutes: 45,
      items: [makeLabor("Revisão periódica", 0.75, 35, 0, 0)],
    };
    plan.push(baseService);
    // Every 30,000 km — filter services
    if (km % 30000 === 0) {
      plan.push({
        id: `${id}-mp-2`, title: "Substituir conjunto de filtros do habitáculo",
        subtitle: "A cada 30.000 km / 1 ano(s)", timeMinutes: 15,
        items: [
          makeLabor("Substituição filtros habitáculo", 0.25, 35, 0, 0),
          makePart("Filtro de habitáculo", 1, 9.00, 16.00, "OEM", "272772835R", 0, 1),
        ],
      });
    }
    // Every 60,000 km — additional checks
    if (km % 60000 === 0) {
      plan.push({
        id: `${id}-mp-3`, title: "Executar teste de estrada",
        subtitle: "Todos os 60.000 km", timeMinutes: 10,
        items: [makeLabor("Teste de estrada", 0.17, 35, 0, 0)],
      });
      plan.push({
        id: `${id}-mp-4`, title: "Substituir filtro de combustível",
        subtitle: "Todos os 60.000 km / 4 anos", timeMinutes: 20,
        items: [
          makeLabor("Substituição filtro de combustível", 0.33, 35, 0, 0),
          makePart("Filtro de combustível", 1, 12.00, 22.00, "OEM", "164039", 0, 1),
        ],
      });
      plan.push({
        id: `${id}-mp-5`, title: "Substituir filtro de ar",
        subtitle: "Todos os 60.000 km / 4 anos", timeMinutes: 10,
        items: [
          makeLabor("Substituição filtro de ar", 0.17, 35, 0, 0),
          makePart("Filtro de ar", 1, 8.00, 15.50, "OEM", "165467", 0, 1),
        ],
      });
    }
    // Update base service total time to sum of all plan times
    baseService.timeMinutes = plan.reduce((sum, s) => sum + s.timeMinutes, 0);

    // Additional services
    const additional: MaintenanceServiceTemplate[] = [
      {
        id: `${id}-as-1`, title: "Trabalho suplementar da revisão",
        subtitle: "A primeira vez após 4 anos, depois a cada 2 anos", timeMinutes: 60,
        items: [makeLabor("Trabalho suplementar", 1, 40, 0, 0)],
      },
      {
        id: `${id}-as-2`, title: "Correia dos agregados",
        subtitle: "A cada 120.000 km / 6 anos", timeMinutes: 45,
        items: [
          makeLabor("Substituição correia agregados", 0.75, 40, 0, 0),
          makePart("Correia dos agregados", 1, 22.00, 38.00, "OEM", "117200364R", 0, 1),
        ],
      },
    ];
    if (km % 30000 === 0) {
      additional.push({
        id: `${id}-as-3`, title: "Filtro de partículas de fuligem",
        subtitle: "Primeiramente em 180.000 km depois todos 30.000 km", timeMinutes: 15,
        items: [makeLabor("Inspeção filtro partículas", 0.25, 40, 0, 0)],
      });
    }
    if (km % 180000 === 0) {
      additional.push({
        id: `${id}-as-6`, title: "Polia tensora - correia dos agregados",
        subtitle: "Todos 180.000 km / 10 anos", timeMinutes: 30,
        items: [
          makeLabor("Substituição polia tensora", 0.5, 40, 0, 0),
          makePart("Polia tensora", 1, 18.00, 32.00, "OEM", "117509654R", 0, 1),
        ],
      });
      additional.push({
        id: `${id}-as-7`, title: "Substituição da correia dentada, polia tensora, polia de desvio e bomba do líquido de refrigeração",
        subtitle: "Todos 180.000 km / 10 anos", timeMinutes: 75,
        items: [
          makeLabor("Substitui��ão kit distribuição completo", 1.25, 45, 0, 0),
          makePart("Kit correia distribuição", 1, 85.00, 145.00, "OEM", "130C11508R", 0, 1),
          makePart("Bomba de água", 1, 42.00, 72.00, "OEM", "210108845R", 0, 2),
        ],
      });
    }
    additional.push({
      id: `${id}-as-4`, title: "Líquido de travões",
      subtitle: "Todos 2 anos", timeMinutes: 75,
      items: [
        makeLabor("Substituição líquido travões", 1.25, 40, 0, 0),
      ],
    });
    additional.push({
      id: `${id}-as-5`, title: "Anticongelante",
      subtitle: "A primeira vez com 120.000 km / 4 anos e, em seguida, a cada 30.000 km / 1 anos", timeMinutes: 75,
      items: [
        makeLabor("Substituição anticongelante", 1.25, 40, 0, 0),
      ],
    });

    revisions.push({ id, km, maintenancePlan: plan, additionalServices: additional });
  }
  return revisions;
}

const ALL_REVISIONS = generateRevisions();

/** Given km, find nearest next and previous revisions */
function findRevisions(km: number): { next: MaintenanceRevision; previous: MaintenanceRevision | null; recommendedId: string } {
  const nextRev = ALL_REVISIONS.find((r) => r.km >= km) || ALL_REVISIONS[ALL_REVISIONS.length - 1];
  const nextIdx = ALL_REVISIONS.indexOf(nextRev);
  const prevRev = nextIdx > 0 ? ALL_REVISIONS[nextIdx - 1] : null;
  let recommendedId = nextRev.id;
  if (prevRev) {
    const distToNext = Math.abs(nextRev.km - km);
    const distToPrev = Math.abs(km - prevRev.km);
    if (distToPrev < distToNext) recommendedId = prevRev.id;
  }
  return { next: nextRev, previous: prevRev, recommendedId };
}

// ─── Mock Data: Service Search (categories → subcategories → services) ──────

interface SearchSubcategory {
  id: string;
  name: string;
  services: GuideServiceTemplate[];
}

interface SearchCategory {
  id: string;
  name: string;
  subcategories: SearchSubcategory[];
}

interface ServiceSearchResult {
  categoryId: string;
  categoryName: string;
  subcategoryName: string;
  service: GuideServiceTemplate;
}

const SEARCH_CATEGORIES: SearchCategory[] = [
  {
    id: "sc-accionamento", name: "Accionamento",
    subcategories: [
      { id: "sc-ac-motor", name: "Motor completo", services: [
        { id: "scs-mc-1", title: "Motor completo", subtitle: "Desmontagem e montagem", timeMinutes: 480, items: [makeLabor("Desmontagem e montagem motor completo", 8, 50, 0, 0)] },
        { id: "scs-mc-2", title: "Motor completo", subtitle: "Substituir", timeMinutes: 600, items: [makeLabor("Substituição motor completo", 10, 50, 0, 0)] },
        { id: "scs-mc-3", title: "Apoio do motor", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição apoio do motor", 1.5, 45, 0, 0), makePart("Apoio do motor", 1, 35.00, 58.00, "OEM", "112102785R", 0, 1)] },
        { id: "scs-mc-4", title: "Junta da cabeça do motor", subtitle: "Substituir", timeMinutes: 360, items: [makeLabor("Substituição junta da cabeça", 6, 50, 0, 0), makePart("Junta da cabeça", 1, 45.00, 78.00, "OEM", "110441371R", 0, 1)] },
      ]},
      { id: "sc-ac-embraiagem", name: "Embraiagem", services: [
        { id: "scs-em-1", title: "Kit de embraiagem", subtitle: "Substituir", timeMinutes: 300, items: [makeLabor("Substituição kit de embraiagem", 5, 45, 0, 0), makePart("Kit embraiagem completo", 1, 135.00, 225.00, "OEM", "302050901R", 0, 1)] },
        { id: "scs-em-2", title: "Volante motor bimassa", subtitle: "Substituir", timeMinutes: 120, items: [makeLabor("Substituição volante motor", 2, 45, 0, 0), makePart("Volante motor bimassa", 1, 220.00, 365.00, "OEM", "123007656R", 0, 1)] },
        { id: "scs-em-3", title: "Cabo de embraiagem", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição cabo embraiagem", 1, 40, 0, 0), makePart("Cabo de embraiagem", 1, 18.00, 32.00, "OEM", "306205043R", 0, 1)] },
      ]},
      { id: "sc-ac-caixa", name: "Caixa de velocidades", services: [
        { id: "scs-cv-1", title: "Caixa de velocidades", subtitle: "Desmontagem e montagem", timeMinutes: 300, items: [makeLabor("Desmontagem e montagem caixa velocidades", 5, 50, 0, 0)] },
        { id: "scs-cv-2", title: "Óleo da caixa de velocidades", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição óleo caixa", 1, 40, 0, 0)] },
        { id: "scs-cv-3", title: "Retentor da caixa de velocidades", subtitle: "Substituir", timeMinutes: 180, items: [makeLabor("Substituição retentor caixa", 3, 45, 0, 0), makePart("Retentor caixa", 1, 8.00, 15.00, "OEM", "383421065R", 0, 1)] },
      ]},
      { id: "sc-ac-diferencial", name: "Diferencial atrás", services: [
        { id: "scs-df-1", title: "Diferencial", subtitle: "Desmontagem e montagem", timeMinutes: 240, items: [makeLabor("Desmontagem e montagem diferencial", 4, 50, 0, 0)] },
        { id: "scs-df-2", title: "Óleo do diferencial", subtitle: "Substituir", timeMinutes: 45, items: [makeLabor("Substituição óleo diferencial", 0.75, 40, 0, 0)] },
      ]},
      { id: "sc-ac-cablagem", name: "Cablagem de accionamento", services: [
        { id: "scs-cab-1", title: "Cablagem de accionamento", subtitle: "Verificar", timeMinutes: 30, items: [makeLabor("Verificação cablagem", 0.5, 35, 0, 0)] },
        { id: "scs-cab-2", title: "Tubo flexível de travão", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição tubo flexível", 1, 40, 0, 0), makePart("Tubo flexível travão", 2, 8.00, 14.00, "OEM", "462107372R", 0, 1)] },
      ]},
      { id: "sc-ac-aspiracao", name: "Sistema de aspiração", services: [
        { id: "scs-asp-1", title: "Filtro de ar", subtitle: "Substituir", timeMinutes: 30, items: [makeLabor("Substituição filtro de ar", 0.5, 35, 0, 0), makePart("Filtro de ar", 1, 8.00, 15.50, "OEM", "165467", 0, 1)] },
        { id: "scs-asp-2", title: "Colector de admissão", subtitle: "Desmontagem e montagem", timeMinutes: 120, items: [makeLabor("Desmontagem e montagem colector", 2, 45, 0, 0)] },
        { id: "scs-asp-3", title: "Turbocompressor", subtitle: "Substituir", timeMinutes: 240, items: [makeLabor("Substituição turbocompressor", 4, 50, 0, 0), makePart("Turbocompressor", 1, 450.00, 720.00, "OEM", "144103742R", 0, 1)] },
      ]},
      { id: "sc-ac-escape", name: "Sistema de escape", services: [
        { id: "scs-esc-1", title: "Catalisador", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição catalisador", 1.5, 45, 0, 0), makePart("Catalisador", 1, 280.00, 450.00, "OEM", "208A01859R", 0, 1)] },
        { id: "scs-esc-2", title: "Silencioso traseiro", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição silencioso", 1, 40, 0, 0), makePart("Silencioso traseiro", 1, 95.00, 155.00, "OEM", "201009735R", 0, 1)] },
        { id: "scs-esc-3", title: "Sonda lambda", subtitle: "Substituir", timeMinutes: 45, items: [makeLabor("Substituição sonda lambda", 0.75, 40, 0, 0), makePart("Sonda lambda", 1, 52.00, 85.00, "OEM", "226A41772R", 0, 1)] },
      ]},
      { id: "sc-ac-eletrico", name: "Sistema elétrico do motor", services: [
        { id: "scs-elm-1", title: "Motor de arranque", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição motor de arranque", 1.5, 45, 0, 0), makePart("Motor de arranque", 1, 120.00, 195.00, "OEM", "233001903R", 0, 1)] },
        { id: "scs-elm-2", title: "Alternador", subtitle: "Substituir", timeMinutes: 120, items: [makeLabor("Substituição alternador", 2, 45, 0, 0), makePart("Alternador", 1, 180.00, 295.00, "OEM", "231001553R", 0, 1)] },
        { id: "scs-elm-3", title: "Velas de incandescência", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição velas incandescência", 1, 40, 0, 0), makePart("Velas de incandescência (jogo)", 1, 28.00, 48.00, "OEM", "110655505R", 0, 1)] },
      ]},
      { id: "sc-ac-mistura", name: "Preparação da mistura", services: [
        { id: "scs-mix-1", title: "Injetores", subtitle: "Substituir", timeMinutes: 180, items: [makeLabor("Substituição injetores", 3, 50, 0, 0), makePart("Injetor (unidade)", 4, 65.00, 105.00, "OEM", "166004020R", 0, 1)] },
        { id: "scs-mix-2", title: "Corpo do acelerador", subtitle: "Limpar", timeMinutes: 60, items: [makeLabor("Limpeza corpo acelerador", 1, 40, 0, 0)] },
      ]},
      { id: "sc-ac-combustivel", name: "Alimentação de combustível", services: [
        { id: "scs-fuel-1", title: "Bomba de combustível", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substitui��ão bomba combustível", 1.5, 45, 0, 0), makePart("Bomba de combustível", 1, 85.00, 140.00, "OEM", "172024549R", 0, 1)] },
        { id: "scs-fuel-2", title: "Filtro de combustível", subtitle: "Substituir", timeMinutes: 45, items: [makeLabor("Substituição filtro combustível", 0.75, 35, 0, 0), makePart("Filtro de combustível", 1, 12.00, 22.00, "OEM", "164039", 0, 1)] },
        { id: "scs-fuel-3", title: "Depósito de combustível", subtitle: "Desmontagem e montagem", timeMinutes: 120, items: [makeLabor("Desmontagem e montagem depósito", 2, 45, 0, 0)] },
      ]},
      { id: "sc-ac-refrigeracao", name: "Refrigeração", services: [
        { id: "scs-ref-1", title: "Radiador", subtitle: "Desmontagem e montagem", timeMinutes: 60, items: [makeLabor("Desmontagem e montagem radiador", 1, 45, 0, 0)] },
        { id: "scs-ref-2", title: "Radiador", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição radiador", 1, 45, 0, 0), makePart("Radiador", 1, 95.00, 155.00, "OEM", "214100078R", 0, 1)] },
        { id: "scs-ref-3", title: "Recipiente de compensação do agente de refrigeração", subtitle: "Substituir", timeMinutes: 30, items: [makeLabor("Substituição vaso expansão", 0.5, 40, 0, 0), makePart("Vaso de expansão", 1, 15.00, 28.00, "OEM", "217100336R", 0, 1)] },
        { id: "scs-ref-4", title: "Sensor de temperatura do líquido de refrigeração", subtitle: "Substituir", timeMinutes: 10, items: [makeLabor("Substituição sensor temperatura", 0.17, 40, 0, 0), makePart("Sensor temperatura", 1, 8.00, 14.00, "OEM", "226400847R", 0, 1)] },
        { id: "scs-ref-5", title: "Encaixe do ventilador", subtitle: "Desmontagem e montagem", timeMinutes: 30, items: [makeLabor("Desmontagem e montagem ventilador", 0.5, 40, 0, 0)] },
        { id: "scs-ref-6", title: "Encaixe do ventilador", subtitle: "Substituir", timeMinutes: 30, items: [makeLabor("Substituição ventilador", 0.5, 40, 0, 0), makePart("Motoventilador", 1, 68.00, 110.00, "OEM", "214810847R", 0, 1)] },
        { id: "scs-ref-7", title: "Bomba de água", subtitle: "Substituir", timeMinutes: 150, items: [makeLabor("Substituição bomba de água", 2.5, 45, 0, 0), makePart("Bomba de água", 1, 42.00, 72.00, "OEM", "210108845R", 0, 1)] },
        { id: "scs-ref-8", title: "Junta da bomba de água", subtitle: "Substituir", timeMinutes: 105, items: [makeLabor("Substituição junta bomba de água", 1.75, 45, 0, 0), makePart("Junta bomba de água", 1, 5.00, 9.00, "OEM", "210108846R", 0, 1)] },
      ]},
      { id: "sc-ac-aquecimento", name: "Aquecimento / ar condicionado", services: [
        { id: "scs-hvac-1", title: "Compressor AC", subtitle: "Substituir", timeMinutes: 180, items: [makeLabor("Substituição compressor AC", 3, 40, 0, 0), makePart("Compressor AC", 1, 280.00, 420.00, "OEM", "926009956R", 0, 1)] },
        { id: "scs-hvac-2", title: "Condensador AC", subtitle: "Substituir", timeMinutes: 120, items: [makeLabor("Substituição condensador AC", 2, 40, 0, 0), makePart("Condensador AC", 1, 145.00, 220.00, "OEM", "921006454R", 0, 1)] },
        { id: "scs-hvac-3", title: "Radiador de aquecimento", subtitle: "Substituir", timeMinutes: 240, items: [makeLabor("Substituição radiador aquecimento", 4, 45, 0, 0), makePart("Radiador de aquecimento", 1, 55.00, 92.00, "OEM", "271154EA0A", 0, 1)] },
      ]},
    ],
  },
  {
    id: "sc-trabalhos", name: "Trabalhos gerais",
    subcategories: [
      { id: "sc-tg-diagnostico", name: "Diagnóstico", services: [
        { id: "scs-tg-1", title: "Diagnóstico eletrónico", subtitle: "Leitura de avarias", timeMinutes: 30, items: [makeLabor("Diagnóstico eletrónico", 0.5, 40, 0, 0)] },
        { id: "scs-tg-2", title: "Teste de bateria", subtitle: "Verificar", timeMinutes: 15, items: [makeLabor("Teste de bateria", 0.25, 35, 0, 0)] },
      ]},
      { id: "sc-tg-inspecao", name: "Inspeção", services: [
        { id: "scs-tg-3", title: "Pré-inspeção periódica obrigatória", timeMinutes: 60, items: [makeLabor("Pré-IPO completa", 1, 40, 0, 0)] },
        { id: "scs-tg-4", title: "Inspeção visual de segurança", timeMinutes: 30, items: [makeLabor("Inspeção visual de segurança", 0.5, 35, 0, 0)] },
      ]},
      { id: "sc-tg-lavagem", name: "Lavagem e limpeza", services: [
        { id: "scs-tg-5", title: "Lavagem exterior e interior", timeMinutes: 60, items: [makeLabor("Lavagem completa", 1, 35, 0, 0)] },
      ]},
    ],
  },
  {
    id: "sc-chassis-frente", name: "Chassis frente",
    subcategories: [
      { id: "sc-cf-suspensao", name: "Suspensão dianteira", services: [
        { id: "scs-cf-1", title: "Amortecedor dianteiro", subtitle: "Substituir", timeMinutes: 120, items: [makeLabor("Substituição amortecedores dianteiros", 2, 40, 0, 0), makePart("Par amortecedores dianteiros", 1, 95.00, 155.00, "OEM", "543020957R", 0, 1)] },
        { id: "scs-cf-2", title: "Mola helicoidal dianteira", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição molas dianteiras", 1.5, 40, 0, 0), makePart("Par molas dianteiras", 1, 55.00, 92.00, "OEM", "540104407R", 0, 1)] },
        { id: "scs-cf-3", title: "Braço de suspensão inferior", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição braço suspensão", 1.5, 45, 0, 0), makePart("Braço suspensão inferior", 2, 38.00, 62.00, "OEM", "545010279R", 0, 1)] },
      ]},
      { id: "sc-cf-travoes", name: "Travões dianteiros", services: [
        { id: "scs-cf-4", title: "Pastilhas dianteiras", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição pastilhas dianteiras", 1, 40, 0, 0), makePart("Jogo pastilhas dianteiras", 1, 22.00, 38.00, "OEM", "410602192R", 0, 1)] },
        { id: "scs-cf-5", title: "Discos dianteiros", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição discos dianteiros", 1.5, 40, 0, 0), makePart("Par discos dianteiros", 1, 48.00, 78.00, "OEM", "402060010R", 0, 1)] },
      ]},
      { id: "sc-cf-cubo", name: "Cubo de roda dianteiro", services: [
        { id: "scs-cf-6", title: "Rolamento do cubo de roda", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição rolamento cubo", 1.5, 45, 0, 0), makePart("Rolamento cubo dianteiro", 1, 28.00, 48.00, "OEM", "402107049R", 0, 1)] },
      ]},
    ],
  },
  {
    id: "sc-direccao", name: "Direcção",
    subcategories: [
      { id: "sc-dir-mecanismo", name: "Mecanismo de direcção", services: [
        { id: "scs-dir-1", title: "Caixa de direcção", subtitle: "Substituir", timeMinutes: 180, items: [makeLabor("Substituição caixa de direcção", 3, 50, 0, 0), makePart("Caixa de direcção", 1, 320.00, 520.00, "OEM", "491004646R", 0, 1)] },
        { id: "scs-dir-2", title: "Bomba de direcção assistida", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição bomba direcção", 1.5, 45, 0, 0), makePart("Bomba direcção assistida", 1, 150.00, 245.00, "OEM", "491101525R", 0, 1)] },
      ]},
      { id: "sc-dir-bielas", name: "Bielas e terminais", services: [
        { id: "scs-dir-3", title: "Terminal de direcção", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição terminal direcção", 1, 40, 0, 0), makePart("Terminal de direcção", 2, 15.00, 26.00, "OEM", "485204427R", 0, 1)] },
        { id: "scs-dir-4", title: "Barra estabilizadora", subtitle: "Substituir bielas", timeMinutes: 45, items: [makeLabor("Substituição bielas estabilizadora", 0.75, 40, 0, 0), makePart("Biela barra estabilizadora", 2, 10.00, 18.00, "OEM", "546180007R", 0, 1)] },
      ]},
    ],
  },
  {
    id: "sc-chassis-traseiro", name: "Chassis traseiro",
    subcategories: [
      { id: "sc-ct-suspensao", name: "Suspensão traseira", services: [
        { id: "scs-ct-1", title: "Amortecedor traseiro", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição amortecedores traseiros", 1.5, 40, 0, 0), makePart("Par amortecedores traseiros", 1, 72.00, 120.00, "OEM", "562105778R", 0, 1)] },
        { id: "scs-ct-2", title: "Mola helicoidal traseira", subtitle: "Substituir", timeMinutes: 75, items: [makeLabor("Substituição molas traseiras", 1.25, 40, 0, 0), makePart("Par molas traseiras", 1, 42.00, 72.00, "OEM", "550101540R", 0, 1)] },
      ]},
      { id: "sc-ct-travoes", name: "Travões traseiros", services: [
        { id: "scs-ct-3", title: "Pastilhas traseiras", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição pastilhas traseiras", 1, 40, 0, 0), makePart("Jogo pastilhas traseiras", 1, 18.00, 32.00, "OEM", "440609883R", 0, 1)] },
        { id: "scs-ct-4", title: "Discos traseiros", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição discos traseiros", 1.5, 40, 0, 0), makePart("Par discos traseiros", 1, 38.00, 62.00, "OEM", "432001539R", 0, 1)] },
      ]},
    ],
  },
  {
    id: "sc-carrocaria-frente", name: "Carroçaria à frente",
    subcategories: [
      { id: "sc-caf-para-choques", name: "Para-choques dianteiro", services: [
        { id: "scs-caf-1", title: "Para-choques dianteiro", subtitle: "Desmontagem e montagem", timeMinutes: 60, items: [makeLabor("Desmontagem e montagem para-choques", 1, 40, 0, 0)] },
        { id: "scs-caf-2", title: "Para-choques dianteiro", subtitle: "Substituir", timeMinutes: 75, items: [makeLabor("Substituiç��o para-choques dianteiro", 1.25, 40, 0, 0), makePart("Para-choques dianteiro", 1, 120.00, 195.00, "OEM", "620224419R", 0, 1)] },
      ]},
      { id: "sc-caf-farois", name: "Faróis", services: [
        { id: "scs-caf-3", title: "Farol dianteiro", subtitle: "Substituir", timeMinutes: 45, items: [makeLabor("Substituição farol dianteiro", 0.75, 40, 0, 0), makePart("Farol dianteiro", 1, 180.00, 295.00, "OEM", "260608085R", 0, 1)] },
        { id: "scs-caf-4", title: "Polimento de faróis", timeMinutes: 45, items: [makeLabor("Polimento de faróis", 0.75, 40, 0, 0)] },
      ]},
      { id: "sc-caf-capo", name: "Capô", services: [
        { id: "scs-caf-5", title: "Capô", subtitle: "Desmontagem e montagem", timeMinutes: 45, items: [makeLabor("Desmontagem e montagem capô", 0.75, 40, 0, 0)] },
      ]},
    ],
  },
  {
    id: "sc-carrocaria-atras", name: "Carroçaria atrás",
    subcategories: [
      { id: "sc-cat-para-choques", name: "Para-choques traseiro", services: [
        { id: "scs-cat-1", title: "Para-choques traseiro", subtitle: "Desmontagem e montagem", timeMinutes: 60, items: [makeLabor("Desmontagem e montagem para-choques traseiro", 1, 40, 0, 0)] },
        { id: "scs-cat-2", title: "Para-choques traseiro", subtitle: "Substituir", timeMinutes: 75, items: [makeLabor("Substituição para-choques traseiro", 1.25, 40, 0, 0), makePart("Para-choques traseiro", 1, 105.00, 175.00, "OEM", "850108635R", 0, 1)] },
      ]},
      { id: "sc-cat-farolins", name: "Farolins", services: [
        { id: "scs-cat-3", title: "Farolim traseiro", subtitle: "Substituir", timeMinutes: 30, items: [makeLabor("Substituição farolim", 0.5, 35, 0, 0), makePart("Farolim traseiro", 1, 45.00, 75.00, "OEM", "265500013R", 0, 1)] },
      ]},
      { id: "sc-cat-mala", name: "Porta da mala", services: [
        { id: "scs-cat-4", title: "Amortecedor porta-mala", subtitle: "Substituir", timeMinutes: 20, items: [makeLabor("Substituição amortecedor mala", 0.33, 35, 0, 0), makePart("Amortecedor porta-mala", 2, 12.00, 22.00, "OEM", "904500014R", 0, 1)] },
      ]},
    ],
  },
  {
    id: "sc-celula", name: "Célula do passageiro",
    subcategories: [
      { id: "sc-cel-vidros", name: "Vidros", services: [
        { id: "scs-cel-1", title: "Para-brisas", subtitle: "Substituir", timeMinutes: 120, items: [makeLabor("Substituição para-brisas", 2, 45, 0, 0), makePart("Para-brisas", 1, 150.00, 245.00, "OEM", "727019436R", 0, 1)] },
        { id: "scs-cel-2", title: "Vidro lateral", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição vidro lateral", 1, 40, 0, 0), makePart("Vidro lateral", 1, 65.00, 105.00, "OEM", "823000093R", 0, 1)] },
      ]},
      { id: "sc-cel-portas", name: "Portas", services: [
        { id: "scs-cel-3", title: "Elevador de vidro elétrico", subtitle: "Substituir", timeMinutes: 90, items: [makeLabor("Substituição elevador vidro", 1.5, 40, 0, 0), makePart("Elevador vidro elétrico", 1, 48.00, 78.00, "OEM", "807300051R", 0, 1)] },
        { id: "scs-cel-4", title: "Fechadura da porta", subtitle: "Substituir", timeMinutes: 60, items: [makeLabor("Substituição fechadura", 1, 40, 0, 0), makePart("Fechadura porta", 1, 55.00, 90.00, "OEM", "805020004R", 0, 1)] },
      ]},
      { id: "sc-cel-interior", name: "Habitáculo", services: [
        { id: "scs-cel-5", title: "Filtro de habitáculo", subtitle: "Substituir", timeMinutes: 15, items: [makeLabor("Substituição filtro habitáculo", 0.25, 35, 0, 0), makePart("Filtro de habitáculo", 1, 9.00, 16.00, "OEM", "272772835R", 0, 1)] },
      ]},
    ],
  },
  {
    id: "sc-eletrico", name: "Sistema elétrico do veículo",
    subcategories: [
      { id: "sc-el-bateria", name: "Bateria", services: [
        { id: "scs-el-1", title: "Bateria", subtitle: "Substituir", timeMinutes: 30, items: [makeLabor("Substituição bateria", 0.5, 35, 0, 0), makePart("Bateria 12V 60Ah", 1, 65.00, 105.00, "OEM", "244100753R", 0, 1)] },
        { id: "scs-el-2", title: "Terminal da bateria", subtitle: "Substituir", timeMinutes: 15, items: [makeLabor("Substituição terminais bateria", 0.25, 35, 0, 0), makePart("Terminais bateria", 2, 5.00, 9.00, "OEM", "243800012R", 0, 1)] },
      ]},
      { id: "sc-el-iluminacao", name: "Iluminação", services: [
        { id: "scs-el-3", title: "Lâmpada farol dianteiro", subtitle: "Substituir", timeMinutes: 15, items: [makeLabor("Substituição lâmpada farol", 0.25, 35, 0, 0), makePart("Lâmpada H7", 2, 4.00, 8.00, "OEM", "", 0, 1)] },
        { id: "scs-el-4", title: "Lâmpada farolim traseiro", subtitle: "Substituir", timeMinutes: 10, items: [makeLabor("Substituição lâmpada farolim", 0.17, 35, 0, 0), makePart("Lâmpada P21W", 2, 2.00, 4.00, "OEM", "", 0, 1)] },
      ]},
      { id: "sc-el-sensores", name: "Sensores e módulos", services: [
        { id: "scs-el-5", title: "Sensor ABS", subtitle: "Substituir", timeMinutes: 45, items: [makeLabor("Substituição sensor ABS", 0.75, 40, 0, 0), makePart("Sensor ABS", 1, 22.00, 38.00, "OEM", "479100591R", 0, 1)] },
        { id: "scs-el-6", title: "Sensor de estacionamento", subtitle: "Substituir", timeMinutes: 30, items: [makeLabor("Substituição sensor estacionamento", 0.5, 35, 0, 0), makePart("Sensor estacionamento", 1, 18.00, 32.00, "OEM", "284420105R", 0, 1)] },
      ]},
    ],
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

interface ServiceGuideModalProps {
  open: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  onAddServices: (services: QuoteService[]) => void;
  clientId?: string;
}

export default function ServiceGuideModal({ open, onClose, vehicle, onAddServices, clientId }: ServiceGuideModalProps) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<SelectedGuideService[]>([]);
  const backdropRef = useRef<HTMLDivElement>(null);
  const selectedListRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const handleSelectedListScroll = useCallback(() => {
    const el = selectedListRef.current;
    if (!el) return;
    setShowTopFade(el.scrollTop > 0);
    setShowBottomFade(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  }, []);

  useEffect(() => {
    handleSelectedListScroll();
  }, [selectedServices, handleSelectedListScroll]);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [loadingServiceIds, setLoadingServiceIds] = useState<Set<string>>(new Set());
  const loadingTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const [activeTab, setActiveTab] = useState("oficina");
  const [selectedDeferredQuoteId, setSelectedDeferredQuoteId] = useState<string | null>(null);

  // Maintenance tab state
  const [maintGearbox, setMaintGearbox] = useState<string>("");
  const [maintKm, setMaintKm] = useState<string>("");
  const [maintSearchState, setMaintSearchState] = useState<"idle" | "loading" | "results">("idle");
  const maintKmRef = useRef<HTMLInputElement>(null);
  const [maintRevisions, setMaintRevisions] = useState<{ next: MaintenanceRevision; previous: MaintenanceRevision | null; recommendedId: string } | null>(null);
  const [selectedRevisionId, setSelectedRevisionId] = useState<string | null>(null);
  const [maintPlanExpanded, setMaintPlanExpanded] = useState(true);
  const [maintAdditionalExpanded, setMaintAdditionalExpanded] = useState(false);

  // Service search tab state
  const [searchCategoryId, setSearchCategoryId] = useState<string | null>(null);
  const [searchSubcategoryId, setSearchSubcategoryId] = useState<string | null>(null);

  // Free-text search within pesquisa tab
  const [serviceSearchQuery, setServiceSearchQuery] = useState("");
  const [serviceSearchLoading, setServiceSearchLoading] = useState(false);
  const [serviceSearchActive, setServiceSearchActive] = useState(false);
  const [serviceSearchFilterCatId, setServiceSearchFilterCatId] = useState<string | null>(null);
  const serviceSearchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [serviceSearchResults, setServiceSearchResults] = useState<ServiceSearchResult[]>([]);
  const [serviceSearchFadingOut, setServiceSearchFadingOut] = useState(false);
  const pesquisaSearchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input when pesquisa tab becomes active
  useEffect(() => {
    if (activeTab === "pesquisa") {
      requestAnimationFrame(() => {
        pesquisaSearchInputRef.current?.focus();
      });
    }
  }, [activeTab]);

  const normalizeStr = useCallback((str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
  , []);

  const performServiceSearch = useCallback((query: string) => {
    const q = normalizeStr(query.trim());
    if (!q) return;
    const results: ServiceSearchResult[] = [];
    SEARCH_CATEGORIES.forEach((cat) => {
      cat.subcategories.forEach((sub) => {
        sub.services.forEach((svc) => {
          const matchTitle = normalizeStr(svc.title).includes(q);
          const matchSubtitle = svc.subtitle ? normalizeStr(svc.subtitle).includes(q) : false;
          const matchCat = normalizeStr(cat.name).includes(q);
          const matchSub = normalizeStr(sub.name).includes(q);
          // Also search in part references / designations
          const matchItems = svc.items.some((item) => {
            if (item.type === "parts") return normalizeStr((item as PartItem).designation).includes(q) || normalizeStr((item as PartItem).reference).includes(q);
            if (item.type === "labor") return normalizeStr((item as LaborItem).designation).includes(q);
            return false;
          });
          if (matchTitle || matchSubtitle || matchCat || matchSub || matchItems) {
            results.push({ categoryId: cat.id, categoryName: cat.name, subcategoryName: sub.name, service: svc });
          }
        });
      });
    });
    setServiceSearchResults(results);
    setServiceSearchActive(true);
    setServiceSearchFilterCatId(null);
    // Reset category/subcategory navigation
    setSearchCategoryId(null);
    setSearchSubcategoryId(null);
  }, [normalizeStr]);

  // Dynamic search: debounce as user types
  useEffect(() => {
    if (serviceSearchTimerRef.current) clearTimeout(serviceSearchTimerRef.current);
    const q = serviceSearchQuery.trim();
    if (!q) {
      if (serviceSearchActive) {
        setServiceSearchActive(false);
        setServiceSearchResults([]);
        setServiceSearchFilterCatId(null);
      }
      setServiceSearchLoading(false);
      return;
    }
    setServiceSearchLoading(true);
    serviceSearchTimerRef.current = setTimeout(() => {
      setServiceSearchLoading(false);
      performServiceSearch(serviceSearchQuery);
    }, 300);
    return () => {
      if (serviceSearchTimerRef.current) clearTimeout(serviceSearchTimerRef.current);
    };
  }, [serviceSearchQuery]);

  const handleServiceSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceSearchQuery.trim()) return;
    if (serviceSearchTimerRef.current) clearTimeout(serviceSearchTimerRef.current);
    setServiceSearchLoading(false);
    performServiceSearch(serviceSearchQuery);
  }, [serviceSearchQuery, performServiceSearch]);

  const clearServiceSearch = useCallback(() => {
    setServiceSearchQuery("");
    setServiceSearchActive(false);
    setServiceSearchResults([]);
    setServiceSearchFilterCatId(null);
    setServiceSearchLoading(false);
    if (serviceSearchTimerRef.current) clearTimeout(serviceSearchTimerRef.current);
  }, []);

  // Compute matched categories from search results
  const searchMatchedCategories = useMemo(() => {
    if (!serviceSearchActive) return [];
    const catMap = new Map<string, { id: string; name: string; count: number }>();
    serviceSearchResults.forEach((r) => {
      const existing = catMap.get(r.categoryId);
      if (existing) {
        existing.count += 1;
      } else {
        catMap.set(r.categoryId, { id: r.categoryId, name: r.categoryName, count: 1 });
      }
    });
    return Array.from(catMap.values());
  }, [serviceSearchActive, serviceSearchResults]);

  // Filtered results based on category filter
  const filteredSearchResults = useMemo(() => {
    if (!serviceSearchFilterCatId) return serviceSearchResults;
    return serviceSearchResults.filter((r) => r.categoryId === serviceSearchFilterCatId);
  }, [serviceSearchResults, serviceSearchFilterCatId]);

  const deferredQuotes = getDeferredQuotes(clientId);
  const hasDeferredServices = deferredQuotes.length > 0;
  const selectedDeferredQuote = deferredQuotes.find((q) => q.id === selectedDeferredQuoteId) || null;

  // Cleanup loading timers on unmount/close
  useEffect(() => {
    if (!visible) {
      loadingTimersRef.current.forEach((timer) => clearTimeout(timer));
      loadingTimersRef.current.clear();
      setLoadingServiceIds(new Set());
      // Also cleanup search state
      if (serviceSearchTimerRef.current) clearTimeout(serviceSearchTimerRef.current);
      setServiceSearchLoading(false);
    }
  }, [visible]);

  // Check scroll overflow
  const updateScrollIndicators = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Check after render
    const raf = requestAnimationFrame(updateScrollIndicators);
    const el = tabsRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollIndicators, { passive: true });
      window.addEventListener("resize", updateScrollIndicators);
    }
    return () => {
      cancelAnimationFrame(raf);
      if (el) {
        el.removeEventListener("scroll", updateScrollIndicators);
        window.removeEventListener("resize", updateScrollIndicators);
      }
    };
  }, [visible, updateScrollIndicators]);

  // Open/close animation
  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
      const timer = setTimeout(() => {
        setVisible(false);
        setSelectedCategoryId(null);
        setSelectedServices([]);
        setActiveTab("oficina");
        setSelectedDeferredQuoteId(null);
        setMaintGearbox("");
        setMaintKm("");
        setMaintSearchState("idle");
        setMaintRevisions(null);
        setSelectedRevisionId(null);
        setMaintPlanExpanded(true);
        setMaintAdditionalExpanded(false);
        setSearchCategoryId(null);
        setSearchSubcategoryId(null);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Init maintenance km from vehicle when switching to manutencao tab
  useEffect(() => {
    if (activeTab === "manutencao" && maintKm === "" && vehicle.km) {
      const numericKm = vehicle.km.replace(/[^\d]/g, "");
      if (numericKm) {
        const n = Number(numericKm);
        setMaintKm(n ? n.toLocaleString("pt-PT") : numericKm);
      }
    }
  }, [activeTab]);

  const handleMaintSearch = useCallback(() => {
    if (!maintGearbox || !maintKm) return;
    setMaintSearchState("loading");
    setTimeout(() => {
      const km = parseInt(maintKm.replace(/\D/g, ""), 10) || 0;
      const revs = findRevisions(km);
      setMaintRevisions(revs);
      // Auto-select recommended
      setSelectedRevisionId(revs.recommendedId);
      setMaintPlanExpanded(true);
      setMaintAdditionalExpanded(false);
      setMaintSearchState("results");
    }, 1500);
  }, [maintGearbox, maintKm]);

  const handleMaintBack = useCallback(() => {
    setMaintSearchState("idle");
    setMaintRevisions(null);
    setSelectedRevisionId(null);
  }, []);

  const selectedRevision = maintRevisions
    ? (selectedRevisionId === maintRevisions.next.id ? maintRevisions.next : maintRevisions.previous)
    : null;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      handleClose();
    }
  }, [handleClose]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  const selectedCategory = GUIDE_CATEGORIES.find((c) => c.id === selectedCategoryId) || null;

  const toggleService = useCallback((template: GuideServiceTemplate) => {
    const alreadySelected = selectedServices.some((s) => s.templateId === template.id);
    if (alreadySelected) {
      // Remove immediately
      setSelectedServices((prev) => prev.filter((s) => s.templateId !== template.id));
      // Cancel any pending loading timer for this service
      const existing = loadingTimersRef.current.get(template.id);
      if (existing) {
        clearTimeout(existing);
        loadingTimersRef.current.delete(template.id);
      }
      setLoadingServiceIds((prev) => { const next = new Set(prev); next.delete(template.id); return next; });
      return;
    }
    // Add with loading delay
    if (loadingServiceIds.has(template.id)) return; // Already loading
    setLoadingServiceIds((prev) => new Set(prev).add(template.id));
    const timer = setTimeout(() => {
      const clonedItems = template.items.map((item) => ({ ...item, id: generateItemId() }));
      const totalWithVat = clonedItems.reduce((sum, item) => sum + calcItemTotal(item), 0);
      setSelectedServices((prev) => [...prev, { templateId: template.id, title: template.title, subtitle: template.subtitle, totalWithVat, items: clonedItems }]);
      setLoadingServiceIds((prev) => { const next = new Set(prev); next.delete(template.id); return next; });
      loadingTimersRef.current.delete(template.id);
    }, 1500);
    loadingTimersRef.current.set(template.id, timer);
  }, [selectedServices, loadingServiceIds]);

  const removeSelectedService = useCallback((templateId: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.templateId !== templateId));
  }, []);

  const isServiceSelected = useCallback((templateId: string) => {
    return selectedServices.some((s) => s.templateId === templateId);
  }, [selectedServices]);

  const addAllFromSection = useCallback((templates: MaintenanceServiceTemplate[]) => {
    templates.forEach((t) => {
      if (!selectedServices.some((s) => s.templateId === t.id) && !loadingServiceIds.has(t.id)) {
        toggleService(t as GuideServiceTemplate);
      }
    });
  }, [selectedServices, loadingServiceIds, toggleService]);

  const removeAllFromSection = useCallback((templates: MaintenanceServiceTemplate[]) => {
    templates.forEach((t) => {
      if (selectedServices.some((s) => s.templateId === t.id)) {
        removeSelectedService(t.id);
      }
    });
  }, [selectedServices, removeSelectedService]);

  const areAllSectionSelected = useCallback((templates: MaintenanceServiceTemplate[]) => {
    return templates.length > 0 && templates.every((t) => selectedServices.some((s) => s.templateId === t.id));
  }, [selectedServices]);

  const totalWithVat = selectedServices.reduce((sum, s) => sum + s.totalWithVat, 0);

  const handleAddServices = useCallback(() => {
    if (selectedServices.length === 0) return;
    const newQuoteServices: QuoteService[] = selectedServices.map((sel, idx) => ({
      id: generateServiceId(),
      title: sel.title,
      isRecommendation: false,
      items: sel.items.map((item, itemIdx) => ({ ...item, id: generateItemId(), order: itemIdx })),
      order: idx,
    }));
    onAddServices(newQuoteServices);
    const count = newQuoteServices.length;
    showToast(count === 1 ? "Servi��o adicionado com sucesso" : "Serviços adicionados com sucesso", "info");
    handleClose();
  }, [selectedServices, onAddServices, handleClose]);

  if (!visible) return null;

  const vehicleTitle = `${vehicle.brand} ${vehicle.version} ${vehicle.engine} ${vehicle.power}cv`;
  const tabItems = [
    { value: "oficina", label: "Serviços da oficina" },
    { value: "diferidos", label: "Serviços diferidos" },
    { value: "manutencao", label: "Manutenção programada" },
    { value: "pesquisa", label: "Pesquisa de serviços" },
    { value: "grafica", label: "Pesquisa gráfica" },
  ];

  const content = (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: animating ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)",
        transition: "background-color 200ms ease-out",
      }}
    >
      <div
        className="bg-[#f4f4f5] flex flex-col gap-[24px] p-[24px] rounded-[12px] relative"
        style={{
          width: "calc(100% - 32px)",
          height: "calc(100% - 32px)",
          opacity: animating ? 1 : 0,
          transition: "opacity 200ms ease-out",
        }}
      >
        {/* Border overlay */}
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />

        {/* Header */}
        <div className="flex gap-[10px] items-start relative shrink-0 w-full">
          <div className="flex flex-1 flex-col gap-[8px] items-center justify-center min-w-0 relative">
            <p className="font-medium text-[16px] text-[#27272a] leading-[1.5] w-full">
              Guia de serviços - {vehicleTitle}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="absolute right-[-8px] top-[-8px] flex items-center justify-center size-[32px] rounded-[6px] cursor-pointer not-disabled:hover:bg-[#e4e4e7] transition-colors duration-200 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <div className="overflow-clip relative shrink-0 size-[16px]">
              <div className="absolute inset-[20.83%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33323 9.33323">
                  <path d={CLOSE_PATH} fill="#27272A" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Content Frame */}
        <div className="flex flex-1 gap-[24px] items-start min-h-0 w-full">

          {/* Left Frame */}
          <div className="flex flex-1 flex-col gap-[16px] h-full items-start min-w-0">

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setSelectedDeferredQuoteId(null); }} className="shrink-0 w-full">
              <div className="relative w-full">
                <div
                  ref={tabsRef}
                  className="overflow-x-auto overflow-y-hidden no-scrollbar"
                >
                  <TabsList variant="line" className="w-full">
                    {tabItems.map((tab) => {
                      const isDiferidos = tab.value === "diferidos";
                      const isDisabled = isDiferidos && !hasDeferredServices;
                      if (isDisabled) {
                        return (
                          <Tooltip key={tab.value}>
                            <TooltipTrigger asChild>
                              <span>
                                <TabsTrigger value={tab.value} disabled>
                                  {tab.label}
                                </TabsTrigger>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              Cliente sem serviços rejeitados em orçamentos anteriores
                            </TooltipContent>
                          </Tooltip>
                        );
                      }
                      return (
                        <TabsTrigger key={tab.value} value={tab.value}>
                          {tab.label}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
                {/* Left fade */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[32px] pointer-events-none transition-opacity duration-200"
                  style={{
                    opacity: canScrollLeft ? 1 : 0,
                    background: "linear-gradient(to right, #f4f4f5, transparent)",
                  }}
                />
                {/* Right fade */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-[32px] pointer-events-none transition-opacity duration-200"
                  style={{
                    opacity: canScrollRight ? 1 : 0,
                    background: "linear-gradient(to left, #f4f4f5, transparent)",
                  }}
                />
              </div>
            </Tabs>

            {/* Main area with bg */}
            <div className="bg-[rgba(39,39,42,0.05)] flex-1 min-h-0 relative rounded-[16px] w-full">
              <div
                key={activeTab}
                className="flex gap-[16px] items-start p-[16px] h-full"
                style={{ animation: "tabFadeIn 200ms ease-out" }}
              >

                {activeTab === "oficina" ? (
                  <>
                    {/* Navigation Frame (categories) */}
                    <div className="bg-white flex flex-col h-full items-start overflow-clip relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[320px]">
                      {/* Top Frame - header */}
                      <div className="relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full">
                        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
                        <div className="flex flex-col items-start p-[16px] relative w-full border-b border-[#e5e5e5]">
                          <div className="flex items-center relative shrink-0 w-full">
                            <p className="flex-1 text-[14px] text-[#27272a] leading-[1.5] font-medium">Categorias</p>
                          </div>
                        </div>
                      </div>
                      {/* Bottom Frame - category list */}
                      <div className="flex flex-1 flex-col items-start min-h-0 p-[16px] relative rounded-bl-[16px] rounded-br-[16px] w-full border border-t-0 border-[#e5e5e5]">
                        <div className="flex flex-1 flex-col gap-[8px] items-start min-h-0 overflow-x-clip overflow-y-auto relative w-full">
                          {GUIDE_CATEGORIES.map((cat) => {
                            const isActive = selectedCategoryId === cat.id;
                            return (
                              <button
                                key={cat.id}
                                onClick={() => setSelectedCategoryId(cat.id)}
                                className={`relative flex items-center rounded-[8px] shrink-0 w-full px-[16px] py-[8px] transition-colors duration-200 ease-out cursor-pointer border-0 ${isActive ? "bg-[#F7F7FD]" : "bg-transparent hover:bg-accent"}`}
                              >
                                {/* Active indicator bar */}
                                {isActive && (
                                  <span className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-full bg-[#8270FF]" />
                                )}
                                <div className="flex flex-1 flex-col items-start min-w-0">
                                  <span className="text-[14px] text-[#27272a] leading-[1.5] text-left font-normal truncate w-full">
                                    {cat.name}
                                  </span>
                                  <span className={`text-[12px] leading-[1.5] font-normal ${isActive ? "text-[#8270FF]" : "text-[#71717a]"}`}>
                                    {cat.services.length} {cat.services.length === 1 ? "serviço" : "serviços"}
                                  </span>
                                </div>
                                <ChevronRight className="size-[16px] shrink-0" style={{ color: isActive ? "#27272A" : "#A1A1AA" }} />
                              </button>
                            );
                          })}
                        </div>
                        
                      </div>
                    </div>

                    {/* Content area (services list) */}
                    <div className="flex flex-1 flex-col gap-[8px] h-full items-start min-w-[360px] overflow-x-clip overflow-y-auto">
                      {!selectedCategory ? (
                        <div className="flex flex-1 flex-col gap-[16px] items-center justify-center w-full">
                          <ClipboardList className="size-[24px] text-[#a1a1aa]" />
                          <p className="text-[14px] text-[#71717a] leading-[1.5] text-center max-w-[240px]">
                            Seleciona uma categoria para aceder aos serviços
                          </p>
                        </div>
                      ) : (
                        <div key={selectedCategoryId} className="flex flex-col gap-[8px] w-full" style={{ animation: "tabFadeIn 200ms ease-out" }}>
                        {selectedCategory.services.map((svc) => {
                          const selected = isServiceSelected(svc.id);
                          const loading = loadingServiceIds.has(svc.id);
                          return (
                            <div
                              key={svc.id}
                              className="bg-white relative rounded-[16px] shrink-0 w-full"
                            >
                              <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[16px] ${selected ? "border-[#8270FF]" : "border-[#e5e5e5]"}`} />
                              <div className="flex flex-row items-center w-full">
                                <div className="flex gap-[12px] items-center p-[16px] relative w-full">
                                  {/* Label – categories tab */}
                                  <div className="flex flex-1 flex-col gap-[4px] items-start justify-center min-w-0">
                                    <p className="text-[14px] text-[#27272a] leading-[1.5] truncate w-full font-medium">
                                      {svc.title}
                                    </p>
                                    {svc.subtitle && (
                                      <p className="text-[12px] text-[#71717a] leading-[1.5] truncate w-full">
                                        {svc.subtitle}
                                      </p>
                                    )}
                                  </div>
                                  {/* Time */}
                                  <div className="flex gap-[8px] items-center justify-end shrink-0">
                                    <div className="overflow-clip relative shrink-0 size-[16px]">
                                      <div className="absolute inset-[4.17%]">
                                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                                          <path d={CLOCK_PATH} fill="#71717A" />
                                        </svg>
                                      </div>
                                    </div>
                                    <p className="text-[14px] text-[#71717a] leading-[1.5]">
                                      {formatTime(svc.timeMinutes)}
                                    </p>
                                  </div>
                                  {/* Add/Remove button */}
                                  {loading ? (
                                    <div className="flex items-center justify-center size-[40px] min-w-[40px] min-h-[40px] shrink-0">
                                      <Loader2 className="size-[16px] text-[#a1a1aa] animate-spin" />
                                    </div>
                                  ) : (
                                    <Tooltip delayDuration={200}>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          onClick={() => toggleService(svc)}
                                          className="size-[40px] min-w-[40px] min-h-[40px] rounded-[8px] shrink-0"
                                        >
                                          {selected ? (
                                            <CircleMinus className="size-[16px] text-[#FB2C36]" />
                                          ) : (
                                            <CirclePlus className="size-[16px] text-[#27272a]" />
                                          )}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="top">
                                        {selected ? "Remover" : "Adicionar"}
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        </div>
                      )}
                    </div>
                  </>
                ) : activeTab === "diferidos" ? (
                  <>
                    {/* Navigation Frame (previous quotes) */}
                    <div className="bg-white flex flex-col h-full items-start overflow-clip relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[320px]">
                      {/* Top Frame - header */}
                      <div className="relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full">
                        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
                        <div className="flex flex-col items-start p-[16px] relative w-full border-b border-[#e5e5e5]">
                          <div className="flex items-center relative shrink-0 w-full">
                            <p className="flex-1 text-[14px] text-[#27272a] leading-[1.5] font-medium">Orçamentos anteriores</p>
                          </div>
                        </div>
                      </div>
                      {/* Bottom Frame - quotes list */}
                      <div className="flex flex-1 flex-col items-start min-h-0 p-[16px] relative rounded-bl-[16px] rounded-br-[16px] w-full border border-t-0 border-[#e5e5e5]">
                        <div className="flex flex-1 flex-col gap-[8px] items-start min-h-0 overflow-x-clip overflow-y-auto relative w-full">
                          {deferredQuotes.map((quote) => {
                            const isActive = selectedDeferredQuoteId === quote.id;
                            return (
                              <button
                                key={quote.id}
                                onClick={() => setSelectedDeferredQuoteId(quote.id)}
                                className={`relative flex items-center rounded-[8px] shrink-0 w-full px-[16px] py-[8px] transition-colors duration-200 ease-out cursor-pointer border-0 ${isActive ? "bg-[#F7F7FD]" : "bg-transparent hover:bg-accent"}`}
                              >
                                {isActive && (
                                  <span className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-full bg-[#8270FF]" />
                                )}
                                <div className="flex flex-1 flex-col items-start min-w-0">
                                  <span className="text-[14px] text-[#27272a] leading-[1.5] text-left font-normal truncate w-full">
                                    {quote.orderNumber}
                                  </span>
                                  <span className={`text-[12px] leading-[1.5] font-normal ${isActive ? "text-[#8270FF]" : "text-[#71717a]"}`}>
                                    {quote.date}
                                  </span>
                                </div>
                                <ChevronRight className="size-[16px] shrink-0" style={{ color: isActive ? "#27272A" : "#A1A1AA" }} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Content area (rejected services from selected quote) */}
                    <div className="flex flex-1 flex-col gap-[8px] h-full items-start min-w-[360px] overflow-x-clip overflow-y-auto">
                      {!selectedDeferredQuote ? (
                        <div className="flex flex-1 flex-col gap-[16px] items-center justify-center w-full">
                          <ClipboardList className="size-[24px] text-[#a1a1aa]" />
                          <p className="text-[14px] text-[#71717a] leading-[1.5] text-center max-w-[240px]">
                            Seleciona um orçamento para aceder aos serviços
                          </p>
                        </div>
                      ) : (
                        <div key={selectedDeferredQuoteId} className="flex flex-col gap-[8px] w-full" style={{ animation: "tabFadeIn 200ms ease-out" }}>
                        {selectedDeferredQuote.rejectedServices.map((svc) => {
                          const selected = isServiceSelected(svc.id);
                          const loading = loadingServiceIds.has(svc.id);
                          return (
                            <div
                              key={svc.id}
                              className="bg-white relative rounded-[16px] shrink-0 w-full"
                            >
                              <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[16px] ${selected ? "border-[#8270FF]" : "border-[#e5e5e5]"}`} />
                              <div className="flex flex-row items-center w-full">
                                <div className="flex gap-[12px] items-center p-[16px] relative w-full">
                                  {/* Label */}
                                  <div className="flex flex-1 flex-col gap-[4px] items-start justify-center min-w-0">
                                    <p className="text-[14px] text-[#27272a] leading-[1.5] truncate w-full font-medium">
                                      {svc.title}
                                    </p>
                                    {svc.subtitle && (
                                      <p className="text-[12px] text-[#71717a] leading-[1.5]">
                                        {svc.subtitle}
                                      </p>
                                    )}
                                  </div>
                                  {/* Time */}
                                  <div className="flex gap-[8px] items-center justify-end shrink-0">
                                    <div className="overflow-clip relative shrink-0 size-[16px]">
                                      <div className="absolute inset-[4.17%]">
                                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                                          <path d={CLOCK_PATH} fill="#71717A" />
                                        </svg>
                                      </div>
                                    </div>
                                    <p className="text-[14px] text-[#71717a] leading-[1.5]">
                                      {formatTime(svc.timeMinutes)}
                                    </p>
                                  </div>
                                  {/* Add/Remove button */}
                                  {loading ? (
                                    <div className="flex items-center justify-center size-[40px] min-w-[40px] min-h-[40px] shrink-0">
                                      <Loader2 className="size-[16px] text-[#a1a1aa] animate-spin" />
                                    </div>
                                  ) : (
                                    <Tooltip delayDuration={200}>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          onClick={() => toggleService(svc)}
                                          className="size-[40px] min-w-[40px] min-h-[40px] rounded-[8px] shrink-0"
                                        >
                                          {selected ? (
                                            <CircleMinus className="size-[16px] text-[#FB2C36]" />
                                          ) : (
                                            <CirclePlus className="size-[16px] text-[#27272a]" />
                                          )}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="top">
                                        {selected ? "Remover" : "Adicionar"}
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        </div>
                      )}
                    </div>
                  </>
                ) : activeTab === "manutencao" ? (
                  <>
                    {/* Navigation Frame (search / revisions) */}
                    <div className="bg-white flex flex-col h-full items-start overflow-clip relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[320px]">
                      {/* Top Frame - header */}
                      <div className="relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full">
                        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
                        <div className="flex items-center h-[52px] px-[16px] relative w-full border-b border-[#e5e5e5]">
                          {maintSearchState === "results" ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleMaintBack}
                              className="h-[32px] min-h-[32px] rounded-[6px] px-[12px]"
                            >
                              <ChevronLeft className="size-[16px] text-[#a1a1aa]" />
                              <span className="text-[14px] text-[#27272a] leading-[1.5]">Revisões</span>
                            </Button>
                          ) : (
                            <div className="flex items-center relative shrink-0 w-full">
                              <p className="flex-1 text-[14px] text-[#27272a] leading-[1.5] font-medium">Pesquisar revisão</p>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Bottom Frame */}
                      <div className="flex flex-1 flex-col items-start min-h-0 relative rounded-bl-[16px] rounded-br-[16px] w-full border border-t-0 border-[#e5e5e5]">
                        <div className="overflow-clip rounded-[inherit] size-full">
                          <div className="flex flex-col gap-[16px] items-start p-[16px] relative size-full">
                            {maintSearchState === "results" && maintRevisions ? (
                              /* Revisions list */
                              <div className="flex flex-1 flex-col gap-[8px] items-start min-h-0 overflow-x-clip overflow-y-auto relative w-full">
                                {/* Next revision */}
                                <button
                                  onClick={() => { setSelectedRevisionId(maintRevisions.next.id); setMaintPlanExpanded(true); setMaintAdditionalExpanded(false); }}
                                  className={`relative flex items-center rounded-[8px] shrink-0 w-full px-[16px] py-[8px] transition-colors duration-200 ease-out cursor-pointer border-0 ${selectedRevisionId === maintRevisions.next.id ? "bg-[#F7F7FD]" : "bg-transparent hover:bg-accent"}`}
                                >
                                  {selectedRevisionId === maintRevisions.next.id && (
                                    <span className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-full bg-[#8270FF]" />
                                  )}
                                  <div className="flex flex-1 flex-col items-start min-w-0">
                                    <div className="flex gap-[16px] items-center">
                                      <span className="text-[14px] text-[#27272a] leading-[1.5] text-left font-normal">Próxima revisão</span>
                                      {maintRevisions.recommendedId === maintRevisions.next.id && (
                                        <span className="bg-[rgba(96,165,250,0.2)] text-[#1e40af] text-[12px] leading-[1.5] px-[8px] py-[4px] rounded-[6px]">Recomendado</span>
                                      )}
                                    </div>
                                    <span className={`text-[12px] leading-[1.5] font-normal ${selectedRevisionId === maintRevisions.next.id ? "text-[#8270FF]" : "text-[#71717a]"}`}>{maintRevisions.next.km.toLocaleString("pt-PT")} Kms</span>
                                  </div>
                                  <ChevronRight className="size-[16px] shrink-0" style={{ color: selectedRevisionId === maintRevisions.next.id ? "#27272A" : "#A1A1AA" }} />
                                </button>
                                {/* Previous revision */}
                                {maintRevisions.previous && (
                                  <button
                                    onClick={() => { setSelectedRevisionId(maintRevisions.previous!.id); setMaintPlanExpanded(true); setMaintAdditionalExpanded(false); }}
                                    className={`relative flex items-center rounded-[8px] shrink-0 w-full px-[16px] py-[8px] transition-colors duration-200 ease-out cursor-pointer border-0 ${selectedRevisionId === maintRevisions.previous.id ? "bg-[#F7F7FD]" : "bg-transparent hover:bg-accent"}`}
                                  >
                                    {selectedRevisionId === maintRevisions.previous.id && (
                                      <span className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-full bg-[#8270FF]" />
                                    )}
                                    <div className="flex flex-1 flex-col items-start min-w-0">
                                      <div className="flex gap-[16px] items-center">
                                        <span className="text-[14px] text-[#27272a] leading-[1.5] text-left font-normal">Revisão anterior</span>
                                        {maintRevisions.recommendedId === maintRevisions.previous.id && (
                                          <span className="bg-[rgba(96,165,250,0.2)] text-[#1e40af] text-[12px] leading-[1.5] px-[8px] py-[4px] rounded-[6px]">Recomendado</span>
                                        )}
                                      </div>
                                      <span className={`text-[12px] leading-[1.5] font-normal ${selectedRevisionId === maintRevisions.previous.id ? "text-[#8270FF]" : "text-[#71717a]"}`}>{maintRevisions.previous.km.toLocaleString("pt-PT")} Kms</span>
                                    </div>
                                    <ChevronRight className="size-[16px] shrink-0" style={{ color: selectedRevisionId === maintRevisions.previous.id ? "#27272A" : "#A1A1AA" }} />
                                  </button>
                                )}
                              </div>
                            ) : (
                              /* Search form */
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  if (maintGearbox && maintKm && maintSearchState !== "loading") handleMaintSearch();
                                }}
                                className="flex flex-1 flex-col gap-[24px] items-start w-full overflow-y-auto px-[4px] -mx-[4px]"
                              >
                                <div className="flex flex-col gap-[16px] items-start w-full shrink-0">
                                  {/* Gearbox select */}
                                  <div className="flex flex-col gap-[8px] items-start w-full">
                                    <label className="text-[14px] text-[#27272a] leading-[1.5]">Caixa de velocidades</label>
                                    <Select value={maintGearbox} onValueChange={(v) => { setMaintGearbox(v); setTimeout(() => maintKmRef.current?.focus(), 0); }}>
                                      <SelectTrigger className="h-[40px] w-full rounded-[8px] font-normal bg-white">
                                        <SelectValue placeholder="Selecionar..." />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="manual">Caixa manual</SelectItem>
                                        <SelectItem value="automatic">Caixa automática</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  {/* Km input */}
                                  <div className="flex flex-col gap-[8px] items-start w-full">
                                    <label className="text-[14px] text-[#27272a] leading-[1.5]">Quilómetros</label>
                                    <Input
                                      ref={maintKmRef}
                                      type="text"
                                      inputMode="numeric"
                                      value={maintKm}
                                      onChange={(e) => {
                                        const digits = e.target.value.replace(/\D/g, "");
                                        if (!digits) { setMaintKm(""); return; }
                                        setMaintKm(Number(digits).toLocaleString("pt-PT"));
                                      }}
                                      placeholder="100.000"
                                      className="h-[40px] rounded-[8px] bg-white"
                                    />
                                  </div>
                                </div>
                                {/* Hidden submit button to enable implicit form submission when visible button is disabled */}
                                <button type="submit" hidden />
                                {/* Search button */}
                                <Button
                                  type="submit"
                                  variant="default"
                                  disabled={!maintGearbox || !maintKm || maintSearchState === "loading"}
                                  className="h-[40px] min-h-[40px] rounded-[8px] shrink-0 w-full disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  {maintSearchState === "loading" ? (
                                    <Loader2 className="size-[16px] animate-spin mr-[8px]" />
                                  ) : null}
                                  Pesquisar revisão
                                </Button>
                              </form>
                            )}
                            {/* Branding */}
                            <div className="shrink-0 w-full">
                              <div className="flex flex-col gap-[8px] items-start px-[16px] py-[8px]">
                                <p className="text-[12px] text-[#71717a] leading-[1.5] font-normal">Com tecnologia</p>
                                <div className="h-[24px] w-[105px]">
                                  <img alt="TecAlliance" className="max-w-none object-contain size-full" src={imgTecAlliance} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="flex flex-1 flex-col gap-[16px] h-full items-start min-w-[360px] overflow-x-clip overflow-y-auto">
                      {!selectedRevision ? (
                        <div className="flex flex-1 flex-col gap-[16px] items-center justify-center w-full">
                          <ClipboardList className="size-[24px] text-[#a1a1aa]" />
                          <p className="text-[14px] text-[#71717a] leading-[1.5] text-center max-w-[240px]">
                            Introduz a quilometragem do veículo para acederes à manutenção programada
                          </p>
                        </div>
                      ) : (
                        <div key={selectedRevisionId} className="flex flex-col gap-[16px] w-full" style={{ animation: "tabFadeIn 200ms ease-out" }}>
                          {/* Plano de manutenção oficial */}
                          <div className="bg-white relative rounded-[16px] shrink-0 w-full border border-solid border-[#e5e5e5]">
                            <div className="flex flex-col items-start overflow-clip rounded-[inherit] w-full relative">
                              {/* Header */}
                              <div className="relative shrink-0 w-full">
                                <div className="flex items-center p-[16px] w-full relative">
                                  <button
                                    onClick={() => setMaintPlanExpanded(!maintPlanExpanded)}
                                    className="flex flex-1 gap-[8px] items-center cursor-pointer"
                                  >
                                    <ChevronDown
                                      className="size-[16px] text-[#a1a1aa] transition-transform duration-200"
                                      style={{ transform: maintPlanExpanded ? "rotate(0deg)" : "rotate(-90deg)" }}
                                    />
                                    <span className="text-[14px] text-[#27272a] leading-[1.5] text-left">Plano de manutenção oficial</span>
                                  </button>
                                  {areAllSectionSelected(selectedRevision.maintenancePlan) ? (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeAllFromSection(selectedRevision.maintenancePlan)}
                                      className="h-[32px] min-h-[32px] rounded-[6px] px-[12px] shrink-0"
                                    >
                                      <CircleMinus className="size-[16px] text-[#FB2C36]" />
                                      <span className="text-[14px] text-[#27272a] leading-[1.5]">Desselecionar todos</span>
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => addAllFromSection(selectedRevision.maintenancePlan)}
                                      className="h-[32px] min-h-[32px] rounded-[6px] px-[12px] shrink-0"
                                    >
                                      <CirclePlus className="size-[16px] text-[#a1a1aa]" />
                                      <span className="text-[14px] text-[#27272a] leading-[1.5]">Adicionar todos</span>
                                    </Button>
                                  )}
                                </div>
                              </div>
                              {/* Services */}
                              <div className="w-full" style={{ display: "grid", gridTemplateRows: maintPlanExpanded ? "1fr" : "0fr", transition: "grid-template-rows 200ms ease-out" }}>
                                <div className="overflow-hidden min-h-0">
                                  <div className="flex flex-col items-start p-[16px] w-full border-t border-solid border-[#e5e5e5]">
                                    {selectedRevision.maintenancePlan.map((svc) => {
                                      const selected = isServiceSelected(svc.id);
                                      const loading = loadingServiceIds.has(svc.id);
                                      return (
                                        <div key={svc.id} className="bg-white flex gap-[12px] items-center py-[8px] shrink-0 w-full">
                                          <div className="flex flex-1 flex-col gap-[4px] items-start justify-center min-w-0">
                                            <p className="text-[14px] text-[#27272a] leading-[1.5] truncate w-full font-medium">{svc.title}</p>
                                            {svc.subtitle && (
                                              <p className="text-[12px] text-[#71717a] leading-[1.5] truncate w-full">{svc.subtitle}</p>
                                            )}
                                          </div>
                                          <div className="flex gap-[8px] items-center justify-end shrink-0">
                                            <Clock className="size-[16px] text-[#71717a]" />
                                            <p className="text-[14px] text-[#71717a] leading-[1.5]">{formatTime(svc.timeMinutes)}</p>
                                          </div>
                                          {loading ? (
                                            <div className="flex items-center justify-center size-[40px] min-w-[40px] min-h-[40px] shrink-0">
                                              <Loader2 className="size-[16px] text-[#a1a1aa] animate-spin" />
                                            </div>
                                          ) : (
                                            <Tooltip delayDuration={200}>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="outline"
                                                  size="icon"
                                                  onClick={() => toggleService(svc as GuideServiceTemplate)}
                                                  className="size-[40px] min-w-[40px] min-h-[40px] rounded-[8px] shrink-0"
                                                >
                                                  {selected ? (
                                                    <CircleMinus className="size-[16px] text-[#FB2C36]" />
                                                  ) : (
                                                    <CirclePlus className="size-[16px] text-[#27272a]" />
                                                  )}
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent side="top">
                                                {selected ? "Remover" : "Adicionar"}
                                              </TooltipContent>
                                            </Tooltip>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Serviços adicionais */}
                          <div className="bg-white relative rounded-[16px] shrink-0 w-full border border-solid border-[#e5e5e5]">
                            <div className="flex flex-col items-start overflow-clip rounded-[inherit] w-full relative">
                              {/* Header */}
                              <div className="relative shrink-0 w-full">
                                <div className="flex items-center p-[16px] w-full relative">
                                  <button
                                    onClick={() => setMaintAdditionalExpanded(!maintAdditionalExpanded)}
                                    className="flex flex-1 gap-[8px] items-center cursor-pointer"
                                  >
                                    <ChevronDown
                                      className="size-[16px] text-[#a1a1aa] transition-transform duration-200"
                                      style={{ transform: maintAdditionalExpanded ? "rotate(0deg)" : "rotate(-90deg)" }}
                                    />
                                    <span className="text-[14px] text-[#27272a] leading-[1.5] text-left">Serviços adicionais</span>
                                  </button>
                                  {areAllSectionSelected(selectedRevision.additionalServices) ? (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeAllFromSection(selectedRevision.additionalServices)}
                                      className="h-[32px] min-h-[32px] rounded-[6px] px-[12px] shrink-0"
                                    >
                                      <CircleMinus className="size-[16px] text-[#FB2C36]" />
                                      <span className="text-[14px] text-[#27272a] leading-[1.5]">Desselecionar todos</span>
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => addAllFromSection(selectedRevision.additionalServices)}
                                      className="h-[32px] min-h-[32px] rounded-[6px] px-[12px] shrink-0"
                                    >
                                      <CirclePlus className="size-[16px] text-[#a1a1aa]" />
                                      <span className="text-[14px] text-[#27272a] leading-[1.5]">Adicionar todos</span>
                                    </Button>
                                  )}
                                </div>
                              </div>
                              {/* Services */}
                              <div className="w-full" style={{ display: "grid", gridTemplateRows: maintAdditionalExpanded ? "1fr" : "0fr", transition: "grid-template-rows 200ms ease-out" }}>
                                <div className="overflow-hidden min-h-0">
                                  <div className="flex flex-col items-start p-[16px] w-full border-t border-solid border-[#e5e5e5]">
                                    {selectedRevision.additionalServices.map((svc) => {
                                      const selected = isServiceSelected(svc.id);
                                      const loading = loadingServiceIds.has(svc.id);
                                      return (
                                        <div key={svc.id} className="bg-white flex gap-[12px] items-center py-[8px] shrink-0 w-full">
                                          <div className="flex flex-1 flex-col gap-[4px] items-start justify-center min-w-0">
                                            <p className="text-[14px] text-[#27272a] leading-[1.5] w-full">{svc.title}</p>
                                            {svc.subtitle && (
                                              <p className="text-[12px] text-[#71717a] leading-[1.5] w-full">{svc.subtitle}</p>
                                            )}
                                          </div>
                                          <div className="flex gap-[8px] items-center justify-end shrink-0">
                                            <Clock className="size-[16px] text-[#71717a]" />
                                            <p className="text-[14px] text-[#71717a] leading-[1.5]">{formatTime(svc.timeMinutes)}</p>
                                          </div>
                                          {loading ? (
                                            <div className="flex items-center justify-center size-[40px] min-w-[40px] min-h-[40px] shrink-0">
                                              <Loader2 className="size-[16px] text-[#a1a1aa] animate-spin" />
                                            </div>
                                          ) : (
                                            <Tooltip delayDuration={200}>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="outline"
                                                  size="icon"
                                                  onClick={() => toggleService(svc as GuideServiceTemplate)}
                                                  className="size-[40px] min-w-[40px] min-h-[40px] rounded-[8px] shrink-0"
                                                >
                                                  {selected ? (
                                                    <CircleMinus className="size-[16px] text-[#FB2C36]" />
                                                  ) : (
                                                    <CirclePlus className="size-[16px] text-[#27272a]" />
                                                  )}
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent side="top">
                                                {selected ? "Remover" : "Adicionar"}
                                              </TooltipContent>
                                            </Tooltip>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : activeTab === "pesquisa" ? (() => {
                  const searchCategory = SEARCH_CATEGORIES.find((c) => c.id === searchCategoryId) || null;
                  const searchSubcategory = searchCategory?.subcategories.find((s) => s.id === searchSubcategoryId) || null;
                  return (
                    <>
                      {/* Navigation Frame */}
                      <div className="bg-white flex flex-col h-full items-start overflow-clip relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[320px]">
                        {/* Top Frame - header */}
                        <div className="relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full">
                          <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
                          <div className="flex flex-col justify-center h-[52px] px-[16px] relative w-full border-b border-[#e5e5e5]">
                            {serviceSearchActive ? (
                              <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={clearServiceSearch}
                                  className="h-[32px] min-h-[32px] rounded-[6px] px-[12px] self-start"
                                >
                                  <ChevronLeft className="size-[16px] text-[#a1a1aa]" />
                                  <span className="text-[14px] text-[#27272a] leading-[1.5]">Resultados</span>
                                </Button>
                            ) : searchCategoryId && searchCategory ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => { setSearchCategoryId(null); setSearchSubcategoryId(null); }}
                                className="h-[32px] min-h-[32px] rounded-[6px] px-[12px] self-start"
                              >
                                <ChevronLeft className="size-[16px] text-[#a1a1aa]" />
                                <span className="text-[14px] text-[#27272a] leading-[1.5]">{searchCategory.name}</span>
                              </Button>
                            ) : (
                              <div className="flex items-center relative shrink-0 w-full">
                                <p className="flex-1 text-[14px] text-[#27272a] leading-[1.5] font-medium">Categorias</p>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Bottom Frame - list */}
                        <div className="flex flex-1 flex-col items-start min-h-0 relative rounded-bl-[16px] rounded-br-[16px] w-full border border-t-0 border-[#e5e5e5]">
                          <div className="overflow-clip rounded-[inherit] size-full">
                            <div className="flex flex-col gap-[16px] items-start p-[16px] relative size-full">
                              <div key={serviceSearchActive ? `search-${serviceSearchFilterCatId || "all"}` : (searchCategoryId || "root")} className="flex flex-1 flex-col gap-[8px] items-start min-h-0 overflow-x-clip overflow-y-auto relative w-full" style={{ animation: "tabFadeIn 200ms ease-out" }}>
                                {serviceSearchActive ? (
                                  /* Search results: matched categories with badge */
                                  searchMatchedCategories.length > 0 ? (
                                    searchMatchedCategories.map((cat) => {
                                      const isActive = serviceSearchFilterCatId === cat.id;
                                      return (
                                        <button
                                          key={cat.id}
                                          onClick={() => setServiceSearchFilterCatId(isActive ? null : cat.id)}
                                          className={`relative flex items-center rounded-[8px] shrink-0 w-full px-[16px] py-[8px] transition-colors duration-200 ease-out cursor-pointer border-0 ${isActive ? "bg-[#F7F7FD]" : "bg-transparent hover:bg-accent"}`}
                                        >
                                          {isActive && (
                                            <span className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-full bg-[#8270FF]" />
                                          )}
                                          <span className="flex-1 text-[14px] text-[#27272a] leading-[1.5] text-left font-normal truncate">
                                            {cat.name}
                                          </span>
                                          <div className="flex items-center gap-[8px] shrink-0">
                                            <Badge className="size-[20px] p-0 flex items-center justify-center rounded-full bg-[#8270FF] text-[12px] text-white leading-[1.5] border-none not-disabled:hover:bg-[#8270FF]">
                                              {cat.count}
                                            </Badge>
                                            <ChevronRight className="size-[16px] shrink-0" style={{ color: isActive ? "#27272A" : "#A1A1AA" }} />
                                          </div>
                                        </button>
                                      );
                                    })
                                  ) : (
                                    <div className="flex flex-1 items-center justify-center w-full">
                                      <p className="text-[14px] text-[#71717a] leading-[1.5] text-center">Sem resultados</p>
                                    </div>
                                  )
                                ) : !searchCategory ? (
                                  /* Level 0: Categories */
                                  SEARCH_CATEGORIES.map((cat) => (
                                    <button
                                      key={cat.id}
                                      onClick={() => { setSearchCategoryId(cat.id); setSearchSubcategoryId(null); }}
                                      className="relative flex items-center rounded-[8px] shrink-0 w-full px-[16px] py-[8px] transition-colors duration-200 ease-out cursor-pointer border-0 bg-transparent hover:bg-accent"
                                    >
                                      <span className="flex-1 text-[14px] text-[#27272a] leading-[1.5] text-left font-normal truncate">
                                        {cat.name}
                                      </span>
                                      <ChevronRight className="size-[16px] shrink-0" style={{ color: "#A1A1AA" }} />
                                    </button>
                                  ))
                                ) : (
                                  /* Level 1/2: Subcategories */
                                  searchCategory.subcategories.map((sub) => {
                                    const isActive = searchSubcategoryId === sub.id;
                                    return (
                                      <button
                                        key={sub.id}
                                        onClick={() => setSearchSubcategoryId(sub.id)}
                                        className={`relative flex items-center rounded-[8px] shrink-0 w-full px-[16px] py-[8px] transition-colors duration-200 ease-out cursor-pointer border-0 ${isActive ? "bg-[#F7F7FD]" : "bg-transparent hover:bg-accent"}`}
                                      >
                                        {isActive && (
                                          <span className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-full bg-[#8270FF]" />
                                        )}
                                        <div className="flex flex-1 flex-col items-start min-w-0">
                                          <span className="text-[14px] text-[#27272a] leading-[1.5] text-left font-normal truncate w-full">
                                            {sub.name}
                                          </span>
                                          <span className={`text-[12px] leading-[1.5] font-normal ${isActive ? "text-[#8270FF]" : "text-[#71717a]"}`}>
                                            {sub.services.length} {sub.services.length === 1 ? "serviço" : "serviços"}
                                          </span>
                                        </div>
                                        <ChevronRight className="size-[16px] shrink-0" style={{ color: isActive ? "#27272A" : "#A1A1AA" }} />
                                      </button>
                                    );
                                  })
                                )}
                              </div>
                              {/* Branding */}
                              <div className="shrink-0 w-full">
                                <div className="flex flex-col gap-[8px] items-start px-[16px] py-[8px]">
                                  <p className="text-[12px] text-[#71717a] leading-[1.5] font-normal">Com tecnologia</p>
                                  <div className="h-[24px] w-[105px]">
                                    <img alt="TecAlliance" className="max-w-none object-contain size-full" src={imgTecAlliance} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content area (services list) */}
                      <div className="flex flex-1 flex-col gap-[8px] h-full items-start min-w-[360px] overflow-x-clip overflow-y-auto">
                        {!searchSubcategory && !serviceSearchActive ? (
                          <div className="flex flex-1 flex-col items-start w-full h-full">
                            {/* Search input */}
                            <div className="w-full shrink-0">
                              <form onSubmit={handleServiceSearchSubmit}>
                                <div className="group/search bg-white h-[40px] relative rounded-[8px] w-full transition-shadow duration-200 ease-out focus-within:ring-[3px] focus-within:ring-[#8270FF]/20">
                                  <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] transition-colors duration-200 ease-out group-focus-within/search:border-[#8270FF]" />
                                  <div className="flex flex-row items-center size-full">
                                    <div className="flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
                                      {serviceSearchLoading ? (
                                        <Loader2 className="size-[20px] text-[#a1a1aa] animate-spin shrink-0" />
                                      ) : (
                                        <Search className="size-[20px] text-[#a1a1aa] shrink-0" />
                                      )}
                                      <input
                                        ref={pesquisaSearchInputRef}
                                        type="text"
                                        value={serviceSearchQuery}
                                        onChange={(e) => setServiceSearchQuery(e.target.value)}
                                        placeholder="Pesquisar por grupo funcional ou por peça"
                                        className="flex-1 text-[14px] text-[#27272a] leading-[1.5] bg-transparent outline-none placeholder:text-[#d4d4d8] min-w-0"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <button type="submit" hidden />
                              </form>
                            </div>
                            <div className="flex flex-1 flex-col gap-[16px] items-center justify-center w-full pb-[40px]">
                              <ClipboardList className="size-[24px] text-[#a1a1aa]" />
                              <p className="text-[14px] text-[#71717a] leading-[1.5] text-center max-w-[240px]">
                                Seleciona uma categoria ou pesquisa para aceder aos serviços
                              </p>
                            </div>
                          </div>
                        ) : serviceSearchActive ? (
                          <div className="flex flex-1 flex-col w-full p-[3px]">
                            {/* Search input - persistent at top */}
                            <div className="w-full shrink-0">
                              <form onSubmit={handleServiceSearchSubmit}>
                                <div className="group/search bg-white h-[40px] relative rounded-[8px] w-full transition-shadow duration-200 ease-out focus-within:ring-[3px] focus-within:ring-[#8270FF]/20">
                                  <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px] transition-colors duration-200 ease-out group-focus-within/search:border-[#8270FF]" />
                                  <div className="flex flex-row items-center size-full">
                                    <div className="flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
                                      {serviceSearchLoading ? (
                                        <Loader2 className="size-[20px] text-[#a1a1aa] animate-spin shrink-0" />
                                      ) : (
                                        <Search className="size-[20px] text-[#a1a1aa] shrink-0" />
                                      )}
                                      <input
                                        ref={pesquisaSearchInputRef}
                                        type="text"
                                        value={serviceSearchQuery}
                                        onChange={(e) => setServiceSearchQuery(e.target.value)}
                                        placeholder="Pesquisar por grupo funcional ou por peça"
                                        className="flex-1 text-[14px] text-[#27272a] leading-[1.5] bg-transparent outline-none placeholder:text-[#d4d4d8] min-w-0"
                                      />
                                      {!serviceSearchLoading && (
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => {
                                            setServiceSearchFadingOut(true);
                                            setTimeout(() => {
                                              clearServiceSearch();
                                              setServiceSearchFadingOut(false);
                                            }, 200);
                                          }}
                                          className="shrink-0 size-[24px] rounded-[6px]"
                                        >
                                          <X className="size-[14px] text-[#71717a]" />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <button type="submit" hidden />
                              </form>
                            </div>
                            <div className="flex flex-col gap-[16px] w-full flex-1 min-h-0 transition-opacity duration-200 ease-out pt-[8px]" style={{ opacity: serviceSearchFadingOut ? 0 : 1 }}>
                            {/* Results count */}
                            {filteredSearchResults.length > 0 && (
                            <div className="shrink-0 px-[4px]">
                              <p className="text-[12px] text-[#71717a] leading-[1.5]">
                                {filteredSearchResults.length} {filteredSearchResults.length === 1 ? "resultado encontrado" : "resultados encontrados"}{serviceSearchFilterCatId ? ` em ${searchMatchedCategories.find(c => c.id === serviceSearchFilterCatId)?.name || ""}` : ""}
                              </p>
                            </div>
                            )}
                            {/* Results list */}
                            <div key={serviceSearchFilterCatId || "all"} className="flex flex-col gap-[8px] w-full flex-1 min-h-0 overflow-y-auto" style={{ animation: "tabFadeIn 200ms ease-out" }}>
                              {filteredSearchResults.length > 0 ? (
                                filteredSearchResults.map((result) => {
                                  const svc = result.service;
                                  const selected = isServiceSelected(svc.id);
                                  const loading = loadingServiceIds.has(svc.id);
                                  return (
                                    <div
                                      key={svc.id}
                                      className="bg-white relative rounded-[16px] shrink-0 w-full"
                                    >
                                      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[16px] ${selected ? "border-[#8270FF]" : "border-[#e5e5e5]"}`} />
                                      <div className="flex flex-row items-center w-full">
                                        <div className="flex gap-[12px] items-center p-[16px] relative w-full">
                                          {/* Label */}
                                          <div className="flex flex-1 flex-col gap-[4px] items-start justify-center min-w-0">
                                            <p className="text-[14px] text-[#27272a] leading-[1.5] truncate w-full font-medium">
                                              {svc.title}
                                            </p>
                                            <p className="text-[12px] text-[#71717a] leading-[1.5]">
                                              {svc.subtitle?.includes("Substituir") || svc.subtitle?.includes("Substituição") ? "Substituição" : svc.subtitle?.includes("Desmontagem") ? "Desmontagem e montagem" : svc.subtitle?.includes("Pintu") || svc.subtitle?.includes("Pintar") ? "Pintura" : "Reparação"}
                                            </p>
                                          </div>
                                          {/* Time */}
                                          <div className="flex gap-[8px] items-center justify-end shrink-0">
                                            <div className="overflow-clip relative shrink-0 size-[16px]">
                                              <div className="absolute inset-[4.17%]">
                                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                                                  <path d={CLOCK_PATH} fill="#71717A" />
                                                </svg>
                                              </div>
                                            </div>
                                            <p className="text-[14px] text-[#71717a] leading-[1.5]">
                                              {formatTime(svc.timeMinutes)}
                                            </p>
                                          </div>
                                          {/* Add/Remove button */}
                                          {loading ? (
                                            <div className="flex items-center justify-center size-[40px] min-w-[40px] min-h-[40px] shrink-0">
                                              <Loader2 className="size-[16px] text-[#a1a1aa] animate-spin" />
                                            </div>
                                          ) : (
                                            <Tooltip delayDuration={200}>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="outline"
                                                  size="icon"
                                                  onClick={() => toggleService(svc)}
                                                  className="size-[40px] min-w-[40px] min-h-[40px] rounded-[8px] shrink-0"
                                                >
                                                  {selected ? (
                                                    <CircleMinus className="size-[16px] text-[#FB2C36]" />
                                                  ) : (
                                                    <CirclePlus className="size-[16px] text-[#27272a]" />
                                                  )}
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent side="top">
                                                {selected ? "Remover" : "Adicionar"}
                                              </TooltipContent>
                                            </Tooltip>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="flex flex-1 items-center justify-center">
                                  <p className="text-[14px] text-[#71717a] leading-[1.5] text-center">Sem resultados encontrados</p>
                                </div>
                              )}
                            </div>
                            </div>
                          </div>
                        ) : (
                          <div key={searchSubcategoryId} className="flex flex-col gap-[8px] w-full" style={{ animation: "tabFadeIn 200ms ease-out" }}>
                          {searchSubcategory.services.map((svc) => {
                            const selected = isServiceSelected(svc.id);
                            const loading = loadingServiceIds.has(svc.id);
                            return (
                              <div
                                key={svc.id}
                                className="bg-white relative rounded-[16px] shrink-0 w-full"
                              >
                                <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[16px] ${selected ? "border-[#8270FF]" : "border-[#e5e5e5]"}`} />
                                <div className="flex flex-row items-center w-full">
                                  <div className="flex gap-[12px] items-center p-[16px] relative w-full">
                                    {/* Label */}
                                    <div className="flex flex-1 flex-col gap-[4px] items-start justify-center min-w-0">
                                      <p className="text-[14px] text-[#27272a] leading-[1.5] truncate w-full font-medium">
                                        {svc.title}
                                      </p>
                                      {svc.subtitle && (
                                        <p className="text-[12px] text-[#71717a] leading-[1.5]">
                                          {svc.subtitle}
                                        </p>
                                      )}
                                    </div>
                                    {/* Time */}
                                    <div className="flex gap-[8px] items-center justify-end shrink-0">
                                      <div className="overflow-clip relative shrink-0 size-[16px]">
                                        <div className="absolute inset-[4.17%]">
                                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                                            <path d={CLOCK_PATH} fill="#71717A" />
                                          </svg>
                                        </div>
                                      </div>
                                      <p className="text-[14px] text-[#71717a] leading-[1.5]">
                                        {formatTime(svc.timeMinutes)}
                                      </p>
                                    </div>
                                    {/* Add/Remove button */}
                                    {loading ? (
                                      <div className="flex items-center justify-center size-[40px] min-w-[40px] min-h-[40px] shrink-0">
                                        <Loader2 className="size-[16px] text-[#a1a1aa] animate-spin" />
                                      </div>
                                    ) : (
                                      <Tooltip delayDuration={200}>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => toggleService(svc)}
                                            className="size-[40px] min-w-[40px] min-h-[40px] rounded-[8px] shrink-0"
                                          >
                                            {selected ? (
                                              <CircleMinus className="size-[16px] text-[#FB2C36]" />
                                            ) : (
                                              <CirclePlus className="size-[16px] text-[#27272a]" />
                                            )}
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                          {selected ? "Remover" : "Adicionar"}
                                        </TooltipContent>
                                      </Tooltip>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })() : null}

              </div>
            </div>
          </div>  {/* end Left Frame */}

          {/* Right Frame */}
          <div className="flex flex-col gap-[16px] h-full items-start relative shrink-0 w-[320px]">

            {/* Selected Services Frame */}
            <div className="flex flex-1 flex-col gap-[24px] items-start min-h-0 relative w-full">
              <div className="flex flex-col h-[40px] items-start pt-[10px] relative shrink-0 w-full">
                <div className="flex h-[24px] items-center relative shrink-0 w-full">
                  <p className="flex-1 text-[16px] text-[#27272a] leading-[1.5] font-medium">
                    Serviços selecionados
                    {selectedServices.length > 0 && (
                      <span className="inline-flex items-center justify-center ml-[8px] size-[20px] rounded-full bg-[#8270FF] text-white text-[12px] font-medium leading-[1.5] align-middle">{selectedServices.length}</span>
                    )}
                  </p>
                  {selectedServices.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer text-[#71717a] transition-colors duration-200 ease-out"
                      onClick={() => setSelectedServices([])}
                    >
                      Limpar
                    </Button>
                  )}
                </div>
              </div>

              {/* Services list */}
              <div className="relative flex-1 min-h-0 w-full">
                {/* Top fade */}
                <div
                  className="pointer-events-none absolute top-0 left-0 right-0 h-[24px] z-10 transition-opacity duration-200 ease-out"
                  style={{
                    background: "linear-gradient(to bottom, white, transparent)",
                    opacity: showTopFade ? 1 : 0,
                  }}
                />
                <div
                  ref={selectedListRef}
                  onScroll={handleSelectedListScroll}
                  className="flex flex-col gap-[16px] items-start w-full overflow-y-auto h-full"
                >
                  {selectedServices.length === 0 ? (
                    <div className="flex flex-1 flex-col gap-[16px] items-center justify-center w-full">
                      <Wrench className="size-[24px] text-[#a1a1aa]" />
                      <p className="text-[14px] text-[#71717a] leading-[1.5] text-center max-w-[240px]">
                        Ainda não existem serviços
                      </p>
                    </div>
                  ) : (
                    selectedServices.map((sel, idx) => {
                      const bd = computeServiceBreakdown(sel.items);
                      return (
                      <div key={sel.templateId} className="flex flex-col gap-[16px] items-start w-full shrink-0">
                        {idx > 0 && (
                          <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" />
                        )}
                        <div className="flex flex-col gap-[8px] items-start w-full rounded-[8px]">
                          {/* Row 1: title + total price */}
                          <div className="flex items-start justify-between w-full gap-[16px]">
                            <div className="flex flex-col gap-[4px] items-start min-w-0 flex-1">
                              <p className="text-[14px] text-[#27272a] leading-[1.5] font-medium line-clamp-2 w-full">
                                {sel.title}
                              </p>
                              {sel.subtitle && (
                                <p className="text-[12px] text-[#71717a] leading-[1.5]">
                                  {sel.subtitle}
                                </p>
                              )}
                            </div>
                            <p className="text-[14px] text-[#27272a] leading-[1.5] font-medium shrink-0 pr-[8px]">
                              {fmtCurrency(bd.laborSubtotal + bd.partsSubtotal + bd.consumablesSubtotal)}
                            </p>
                          </div>
                          {/* Breakdown rows */}
                          <div className="flex flex-col gap-[4px] w-full">
                          {bd.hasLabor && (
                            <div className="flex items-center justify-between w-full">
                              <p className="text-[12px] text-[#71717a] leading-[1.5]">
                                Mão de obra ({bd.hoursStr})
                              </p>
                              <p className="text-[12px] text-[#71717a] leading-[1.5] shrink-0 pr-[8px]">
                                {fmtCurrency(bd.laborSubtotal)}
                              </p>
                            </div>
                          )}
                          {bd.hasParts && (
                            <div className="flex items-center justify-between w-full">
                              <p className="text-[12px] text-[#71717a] leading-[1.5]">
                                Peças
                              </p>
                              <p className="text-[12px] text-[#71717a] leading-[1.5] shrink-0 pr-[8px]">
                                {fmtCurrency(bd.partsSubtotal)}
                              </p>
                            </div>
                          )}
                          {bd.hasConsumables && (
                            <div className="flex items-center justify-between w-full">
                              <p className="text-[12px] text-[#71717a] leading-[1.5]">
                                Consumíveis
                              </p>
                              <p className="text-[12px] text-[#71717a] leading-[1.5] shrink-0 pr-[8px]">
                                {fmtCurrency(bd.consumablesSubtotal)}
                              </p>
                            </div>
                          )}
                          </div>
                          {/* Delete button */}
                          <div className="flex justify-end w-full">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSelectedService(sel.templateId)}
                              className="size-[32px] min-w-[32px] min-h-[32px] rounded-[6px] shrink-0 group/delete"
                            >
                              <Trash2 className="size-[16px] text-[#a1a1aa] transition-colors duration-200 ease-out group-hover/delete:text-[#27272a]" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      );
                    })
                  )}
                </div>
                {/* Bottom fade */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-[24px] z-10 transition-opacity duration-200 ease-out"
                  style={{
                    background: "linear-gradient(to top, white, transparent)",
                    opacity: showBottomFade ? 1 : 0,
                  }}
                />
              </div>
            </div>

            {/* Separator */}
            <div className="bg-[#e5e5e5] h-px shrink-0 w-full" />

            {/* Summary Frame */}
            <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              {/* Total */}
              <div className="flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                <div className="flex gap-[16px] items-start w-full">
                  <div className="flex flex-1 items-center min-w-0 relative">
                    <p className="flex-1 text-[14px] text-[#71717a] leading-[1.5]">Subtotal</p>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0">
                    <p className="text-[14px] text-[#71717a] leading-[1.5]">
                      {fmtCurrency(selectedServices.reduce((sum, s) => { const bd = computeServiceBreakdown(s.items); return sum + bd.laborSubtotal + bd.partsSubtotal + bd.consumablesSubtotal; }, 0))}
                    </p>
                  </div>
                </div>
                <div className="flex gap-[16px] items-start w-full">
                  <div className="flex flex-1 items-center min-w-0 relative">
                    <p className="flex-1 text-[16px] text-[#27272a] leading-[1.5] font-medium">Total</p>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0">
                    <p className="text-[16px] text-[#27272a] leading-[1.5] font-semibold">
                      {fmtCurrency(totalWithVat)}
                    </p>
                  </div>
                </div>
              </div>
              {/* Add button */}
              <Button
                onClick={handleAddServices}
                disabled={selectedServices.length === 0}
                className="h-[40px] min-h-[40px] relative rounded-[8px] shrink-0 w-full cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-200"
              >
                {selectedServices.length > 0
                  ? `Adicionar ${selectedServices.length} serviço${selectedServices.length > 1 ? "s" : ""}`
                  : "Adicionar serviços"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}