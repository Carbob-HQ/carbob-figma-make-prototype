// ─── Item Typologies ─────────────────────────────────────────────────────────

export type ItemType = "labor" | "parts" | "consumables" | "additional";

export const itemTypeLabels: Record<ItemType, string> = {
  labor: "Mão de obra",
  parts: "Peças",
  consumables: "Consumíveis",
  additional: "Encargos adicionais",
};

// ─── Item Interfaces ─────────────────────────────────────────────────────────

interface BaseItem {
  id: string;
  type: ItemType;
  designation: string;
  discount: number; // percentage
  subtotal: number;
  vat: number; // percentage (e.g. 23)
  total: number;
  order: number; // drag-and-drop ordering
}

// 1) Mão de obra
export interface LaborItem extends BaseItem {
  type: "labor";
  hours: number;
  pricePerHour: number; // defined at workshop level, may have N tiers
}

// 2) Peças
export interface PartItem extends BaseItem {
  type: "parts";
  referenceOEM: string;
  reference: string;
  quantity: number;
  partType: string; // e.g. "Original", "Equivalente", "Usado"
  costOEM: number;
  unitCost: number;
  retailDiscount: number; // percentage (previously discountOEM)
  markup: number; // percentage
  retailPrice: number;
  unitPrice: number;
}

// 3) Consumíveis
export interface ConsumableItem extends BaseItem {
  type: "consumables";
  calculationType: string; // "fixed" | "percentItem" | "percentService"
  unitCost: number;
  quantity: number;
  markup: number; // percentage
  retailPrice: number;
  retailDiscount: number; // percentage
  unitPrice: number;
  targetItemId?: string;  // for "percentItem" mode – references a labor/part item id
  percentage?: number;    // for "percentItem" and "percentService" modes
}

// 4) Encargos adicionais
export interface AdditionalChargeItem extends BaseItem {
  type: "additional";
  calculationType: string; // "fixed" | "percentItem" | "percentService"
  quantity: number;
  unitPrice: number;
  targetItemId?: string;  // for "percentItem" mode – references a labor/part item id
  percentage?: number;    // for "percentItem" and "percentService" modes
}

export type ServiceItem =
  | LaborItem
  | PartItem
  | ConsumableItem
  | AdditionalChargeItem;

// ─── Service ─────────────────────────────────────────────────────────────────

export interface QuoteService {
  id: string;
  title: string;
  isRecommendation: boolean; // false = standard, true = mechanic recommendation
  items: ServiceItem[];
  order: number; // drag-and-drop ordering
}

// ─── Calculation Helpers ─────────────────────────────────────────────────────

export function calcLaborSubtotal(item: LaborItem): number {
  const base = item.hours * item.pricePerHour;
  return base * (1 - item.discount / 100);
}

export function calcLaborTotal(item: LaborItem): number {
  const sub = calcLaborSubtotal(item);
  return sub * (1 + item.vat / 100);
}

export function calcPartUnitPrice(item: PartItem): number {
  const costAfterOemDiscount = item.costOEM * (1 - item.retailDiscount / 100);
  return costAfterOemDiscount * (1 + item.markup / 100);
}

export function calcPartSubtotal(item: PartItem): number {
  const base = item.unitPrice * item.quantity;
  return base * (1 - item.discount / 100);
}

export function calcPartTotal(item: PartItem): number {
  const sub = calcPartSubtotal(item);
  return sub * (1 + item.vat / 100);
}

export function calcConsumableSubtotal(item: ConsumableItem): number {
  const base = item.unitPrice * item.quantity;
  return base * (1 - item.discount / 100);
}

export function calcConsumableTotal(item: ConsumableItem): number {
  const sub = calcConsumableSubtotal(item);
  return sub * (1 + item.vat / 100);
}

export function calcAdditionalSubtotal(item: AdditionalChargeItem): number {
  const base = item.unitPrice * item.quantity;
  return base * (1 - item.discount / 100);
}

export function calcAdditionalTotal(item: AdditionalChargeItem): number {
  const sub = calcAdditionalSubtotal(item);
  return sub * (1 + item.vat / 100);
}

export function calcItemSubtotal(item: ServiceItem): number {
  switch (item.type) {
    case "labor":
      return calcLaborSubtotal(item);
    case "parts":
      return calcPartSubtotal(item);
    case "consumables":
      return calcConsumableSubtotal(item);
    case "additional":
      return calcAdditionalSubtotal(item);
  }
}

export function calcItemTotal(item: ServiceItem): number {
  switch (item.type) {
    case "labor":
      return calcLaborTotal(item);
    case "parts":
      return calcPartTotal(item);
    case "consumables":
      return calcConsumableTotal(item);
    case "additional":
      return calcAdditionalTotal(item);
  }
}

export function calcServiceSubtotal(service: QuoteService): number {
  return service.items.reduce((sum, item) => sum + calcItemSubtotal(item), 0);
}

export function calcServiceTotal(service: QuoteService): number {
  return service.items.reduce((sum, item) => sum + calcItemTotal(item), 0);
}

export function calcServiceVat(service: QuoteService): number {
  return calcServiceTotal(service) - calcServiceSubtotal(service);
}

export function calcQuoteSubtotal(services: QuoteService[]): number {
  return services.reduce((sum, s) => sum + calcServiceSubtotal(s), 0);
}

export function calcQuoteVat(services: QuoteService[]): number {
  return services.reduce((sum, s) => sum + calcServiceVat(s), 0);
}

export function calcQuoteTotal(services: QuoteService[]): number {
  return services.reduce((sum, s) => sum + calcServiceTotal(s), 0);
}

// ─── ID Generator ────────────────────────────────────────────────────────────

let serviceCounter = 100;
let itemCounter = 1000;

export function generateServiceId(): string {
  return `svc-${++serviceCounter}`;
}

export function generateItemId(): string {
  return `item-${++itemCounter}`;
}

// ─── Factory Helpers (create empty items / services) ─────────────────────────

export function createLaborItem(order: number): LaborItem {
  return {
    id: generateItemId(),
    type: "labor",
    designation: "",
    hours: 0,
    pricePerHour: 0,
    discount: 0,
    subtotal: 0,
    vat: 23,
    total: 0,
    order,
  };
}

export function createPartItem(order: number): PartItem {
  return {
    id: generateItemId(),
    type: "parts",
    designation: "",
    referenceOEM: "",
    reference: "",
    quantity: 1,
    partType: "",
    costOEM: 0,
    unitCost: 0,
    retailDiscount: 0,
    markup: 0,
    retailPrice: 0,
    unitPrice: 0,
    discount: 0,
    subtotal: 0,
    vat: 23,
    total: 0,
    order,
  };
}

export function createConsumableItem(order: number): ConsumableItem {
  return {
    id: generateItemId(),
    type: "consumables",
    designation: "",
    calculationType: "fixed",
    unitCost: 0,
    quantity: 1,
    markup: 0,
    retailPrice: 0,
    retailDiscount: 0,
    unitPrice: 0,
    discount: 0,
    subtotal: 0,
    vat: 23,
    total: 0,
    order,
  };
}

export function createAdditionalChargeItem(order: number): AdditionalChargeItem {
  return {
    id: generateItemId(),
    type: "additional",
    designation: "",
    calculationType: "fixed",
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    subtotal: 0,
    vat: 23,
    total: 0,
    order,
  };
}

export function createService(order: number, title?: string): QuoteService {
  return {
    id: generateServiceId(),
    title: title || "Novo serviço",
    isRecommendation: false,
    items: [],
    order,
  };
}

// ─── Ordering Helpers ────────────────────────────────────────────────────────

export function reorderServices(
  services: QuoteService[],
  fromIndex: number,
  toIndex: number
): QuoteService[] {
  const result = [...services];
  const [moved] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, moved);
  return result.map((s, i) => ({ ...s, order: i }));
}

export function reorderItems(
  items: ServiceItem[],
  fromIndex: number,
  toIndex: number
): ServiceItem[] {
  const result = [...items];
  const [moved] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, moved);
  return result.map((item, i) => ({ ...item, order: i }));
}

export function sortedServices(services: QuoteService[]): QuoteService[] {
  return [...services].sort((a, b) => a.order - b.order);
}

export function sortedItems(items: ServiceItem[]): ServiceItem[] {
  return [...items].sort((a, b) => a.order - b.order);
}

// ─── Mock Data Store (in-memory persistence) ─────────────────────────────────

const quoteServicesStore: Map<string, QuoteService[]> = new Map();

export function getQuoteServices(quoteId: string): QuoteService[] {
  return quoteServicesStore.get(quoteId) || [];
}

export function setQuoteServices(quoteId: string, services: QuoteService[]): void {
  quoteServicesStore.set(quoteId, services);
}

export function addServiceToQuote(quoteId: string, service: QuoteService): QuoteService[] {
  const current = getQuoteServices(quoteId);
  const updated = [...current, service];
  setQuoteServices(quoteId, updated);
  return updated;
}

export function removeServiceFromQuote(quoteId: string, serviceId: string): QuoteService[] {
  const current = getQuoteServices(quoteId);
  const updated = current
    .filter((s) => s.id !== serviceId)
    .map((s, i) => ({ ...s, order: i }));
  setQuoteServices(quoteId, updated);
  return updated;
}

export function updateServiceInQuote(
  quoteId: string,
  serviceId: string,
  updates: Partial<Omit<QuoteService, "id">>
): QuoteService[] {
  const current = getQuoteServices(quoteId);
  const updated = current.map((s) =>
    s.id === serviceId ? { ...s, ...updates } : s
  );
  setQuoteServices(quoteId, updated);
  return updated;
}

export function addItemToService(
  quoteId: string,
  serviceId: string,
  item: ServiceItem
): QuoteService[] {
  const current = getQuoteServices(quoteId);
  const updated = current.map((s) =>
    s.id === serviceId ? { ...s, items: [...s.items, item] } : s
  );
  setQuoteServices(quoteId, updated);
  return updated;
}

export function removeItemFromService(
  quoteId: string,
  serviceId: string,
  itemId: string
): QuoteService[] {
  const current = getQuoteServices(quoteId);
  const updated = current.map((s) =>
    s.id === serviceId
      ? {
          ...s,
          items: s.items
            .filter((i) => i.id !== itemId)
            .map((i, idx) => ({ ...i, order: idx })),
        }
      : s
  );
  setQuoteServices(quoteId, updated);
  return updated;
}

export function updateItemInService(
  quoteId: string,
  serviceId: string,
  itemId: string,
  updates: Partial<ServiceItem>
): QuoteService[] {
  const current = getQuoteServices(quoteId);
  const updated = current.map((s) =>
    s.id === serviceId
      ? {
          ...s,
          items: s.items.map((i) =>
            i.id === itemId ? ({ ...i, ...updates } as ServiceItem) : i
          ),
        }
      : s
  );
  setQuoteServices(quoteId, updated);
  return updated;
}

export function reorderServicesInQuote(
  quoteId: string,
  fromIndex: number,
  toIndex: number
): QuoteService[] {
  const current = getQuoteServices(quoteId);
  const updated = reorderServices(current, fromIndex, toIndex);
  setQuoteServices(quoteId, updated);
  return updated;
}

export function reorderItemsInService(
  quoteId: string,
  serviceId: string,
  fromIndex: number,
  toIndex: number
): QuoteService[] {
  const current = getQuoteServices(quoteId);
  const updated = current.map((s) =>
    s.id === serviceId
      ? { ...s, items: reorderItems(s.items, fromIndex, toIndex) }
      : s
  );
  setQuoteServices(quoteId, updated);
  return updated;
}

// ─── Recalculate item computed fields ────────────────────────────────────────

export function recalcItem<T extends ServiceItem>(item: T): T {
  switch (item.type) {
    case "labor": {
      const i = item as LaborItem;
      const subtotal = calcLaborSubtotal(i);
      const total = calcLaborTotal(i);
      return { ...item, subtotal, total } as T;
    }
    case "parts": {
      const i = item as PartItem;
      const unitPrice = calcPartUnitPrice(i);
      const subtotal = calcPartSubtotal({ ...i, unitPrice });
      const total = calcPartTotal({ ...i, unitPrice });
      return { ...item, unitPrice, subtotal, total } as T;
    }
    case "consumables": {
      const i = item as ConsumableItem;
      const subtotal = calcConsumableSubtotal(i);
      const total = calcConsumableTotal(i);
      return { ...item, subtotal, total } as T;
    }
    case "additional": {
      const i = item as AdditionalChargeItem;
      const subtotal = calcAdditionalSubtotal(i);
      const total = calcAdditionalTotal(i);
      return { ...item, subtotal, total } as T;
    }
  }
}