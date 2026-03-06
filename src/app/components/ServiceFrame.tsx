import { useState, useRef, useEffect, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "./ui/table";
import {
  ChevronRight,
  Trash2,
  Plus,
  Info,
  AlignJustify,
  LayoutGrid,
  GripVertical,
  X,
  Wrench,
  Droplet,
  Euro,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import type { QuoteService } from "./QuoteServicesData";
import {
  calcServiceSubtotal,
  calcServiceVat,
  calcServiceTotal,
  calcItemSubtotal,
  type ServiceItem,
  type LaborItem,
  type PartItem,
  type ConsumableItem,
  type AdditionalChargeItem,
} from "./QuoteServicesData";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { NewItemSheet, formatHoursDisplay, PRICE_OPTIONS } from "./NewItemSheet";
import svgPaths from "../../imports/svg-0sy48dm4o2";

const PART_ICON = (
  <svg className="size-[16px]" fill="none" viewBox="0 0 13.3333 14.6641">
    <path d={svgPaths.p475cc00} fill="currentColor" />
  </svg>
);

const DRAG_TYPE = "SERVICE_FRAME";
const ITEM_DRAG_PREFIX = "SERVICE_ITEM_";

interface DragItem {
  id: string;
  index: number;
}

interface ItemDragItem {
  id: string;
  index: number;
}

interface ServiceFrameProps {
  service: QuoteService;
  index: number;
  onTitleChange: (title: string) => void;
  onDelete: () => void;
  onDeleteAnimationStart?: () => void;
  onMoveService: (dragIndex: number, hoverIndex: number) => void;
  onDropService: () => void;
  onAddItem?: (item: ServiceItem) => void;
  onDeleteItem?: (itemId: string) => void;
  onUpdateItem?: (item: ServiceItem) => void;
  onReorderItems?: (items: ServiceItem[]) => void;
  autoFocus?: boolean;
  autoScroll?: boolean;
  onAutoScrollDone?: () => void;
}

type ViewMode = "list" | "grid";

// Draggable item row for reordering line items within a service
function DraggableItemRow({
  item,
  index,
  dragType,
  onMove,
  onClick,
  children,
}: {
  item: ServiceItem;
  index: number;
  dragType: string;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onClick: () => void;
  children: (grip: React.ReactNode) => React.ReactNode;
}) {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const gripRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: dragType,
    item: (): ItemDragItem => ({ id: item.id, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: dragType,
    hover: (dragItem: ItemDragItem) => {
      if (dragItem.index === index) return;
      onMove(dragItem.index, index);
      dragItem.index = index;
    },
  });

  preview(drop(rowRef));
  drag(gripRef);

  const gripElement = (
    <div
      ref={gripRef}
      className="flex items-center justify-center w-[20px] shrink-0 cursor-grab active:cursor-grabbing opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 ease-out"
      onClick={(e) => e.stopPropagation()}
    >
      <GripVertical className="size-[14px] text-[#D4D4D8]" />
    </div>
  );

  return (
    <tr
      ref={rowRef}
      data-slot="table-row"
      className="border-b border-[rgba(39,39,42,0.1)] cursor-pointer group/item transition-colors hover:bg-muted/50"
      style={{ opacity: isDragging ? 0.4 : 1 }}
      onClick={onClick}
    >
      {children(gripElement)}
    </tr>
  );
}

export function ServiceFrame({
  service,
  index,
  onTitleChange,
  onDelete,
  onDeleteAnimationStart,
  onMoveService,
  onDropService,
  onAddItem,
  onDeleteItem,
  onUpdateItem,
  onReorderItems,
  autoFocus = false,
  autoScroll = false,
  onAutoScrollDone,
}: ServiceFrameProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [displayedView, setDisplayedView] = useState<ViewMode>("list");
  const [viewTransitioning, setViewTransitioning] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newItemSheetOpen, setNewItemSheetOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [localTitle, setLocalTitle] = useState(service.title);
  const frameRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  // Sync from parent when service.title changes externally
  useEffect(() => {
    setLocalTitle(service.title);
  }, [service.title]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
      inputRef.current.select();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (autoScroll && frameRef.current) {
      const el = frameRef.current;
      // Wait for layout to settle before scrolling
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        // Clear the flag after the scroll animation has had time to complete
        setTimeout(() => {
          onAutoScrollDone?.();
        }, 400);
      });
    }
  }, [autoScroll]);

  useEffect(() => {
    // Trigger dissolve-in on mount
    requestAnimationFrame(() => {
      setIsEntering(false);
    });
  }, []);

  // View mode crossfade transition
  useEffect(() => {
    if (viewMode !== displayedView) {
      setViewTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayedView(viewMode);
        setViewTransitioning(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [viewMode, displayedView]);

  const [{ isDragging }, drag, preview] = useDrag({
    type: DRAG_TYPE,
    item: (): DragItem => ({ id: service.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      onDropService();
    },
  });

  const [{ isOver }, drop] = useDrop({
    accept: DRAG_TYPE,
    hover: useCallback(
      (item: DragItem) => {
        if (item.index === index) return;
        onMoveService(item.index, index);
        item.index = index;
      },
      [index, onMoveService]
    ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Connect refs: preview to the whole frame, drag to the handle
  preview(drop(frameRef));
  drag(handleRef);

  const subtotal = calcServiceSubtotal(service);
  const formattedSubtotal = subtotal.toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const vat = calcServiceVat(service);
  const formattedVat = vat.toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const total = calcServiceTotal(service);
  const formattedTotal = total.toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Helper to format currency
  const fmtCurrency = (val: number) =>
    val.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

  // Helper to get price label for labor
  const getLaborPriceLabel = (pricePerHour: number) => {
    const opt = PRICE_OPTIONS.find((o) => parseFloat(o.value) === pricePerHour);
    return opt ? opt.label : `${pricePerHour.toLocaleString("pt-PT", { minimumFractionDigits: 2 })} €/h`;
  };

  const handleAddItem = useCallback(
    (item: ServiceItem) => {
      if (onAddItem) {
        onAddItem({ ...item, order: service.items.length });
      }
    },
    [onAddItem, service.items.length]
  );

  const handleDeleteItem = useCallback(
    (itemId: string) => {
      if (onDeleteItem) {
        onDeleteItem(itemId);
      }
    },
    [onDeleteItem]
  );

  const handleUpdateItem = useCallback(
    (item: ServiceItem) => {
      if (onUpdateItem) {
        onUpdateItem(item);
      }
    },
    [onUpdateItem]
  );

  const handleEditSheetSave = useCallback(
    (item: ServiceItem) => {
      handleUpdateItem(item);
      setEditingItem(null);
    },
    [handleUpdateItem]
  );

  const handleDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    // Allow dialog to close, then start exit animation
    requestAnimationFrame(() => {
      setIsDeleting(true);
      if (onDeleteAnimationStart) {
        onDeleteAnimationStart();
      }
      setTimeout(() => {
        onDelete();
      }, 200);
    });
  }, [onDelete, onDeleteAnimationStart]);

  // Reorder items within a displayed list (sorted/filtered)
  const handleMoveItemInList = useCallback(
    (displayedList: ServiceItem[], dragIdx: number, hoverIdx: number) => {
      const reordered = [...displayedList];
      const orderSlots = reordered.map((i) => i.order);
      const [dragged] = reordered.splice(dragIdx, 1);
      reordered.splice(hoverIdx, 0, dragged);
      const idToNewOrder = new Map(
        reordered.map((item, i) => [item.id, orderSlots[i]])
      );
      const newItems = service.items.map((item) =>
        idToNewOrder.has(item.id)
          ? { ...item, order: idToNewOrder.get(item.id)! }
          : item
      );
      onReorderItems?.(newItems);
    },
    [service.items, onReorderItems]
  );

  // Pre-sorted item lists for rendering
  const sortedAllItems = service.items.slice().sort((a, b) => a.order - b.order);
  const sortedLaborItems = service.items.filter((i) => i.type === "labor").sort((a, b) => a.order - b.order);
  const sortedPartItems = service.items.filter((i) => i.type === "parts").sort((a, b) => a.order - b.order);
  const sortedConsChargeItems = service.items.filter((i) => i.type === "consumables" || i.type === "additional").sort((a, b) => a.order - b.order);

  return (
    <div
      ref={frameRef}
      className="bg-white relative rounded-[16px] shrink-0 w-full border border-[#e5e5e5] transition-opacity duration-200 ease-out"
      style={{
        opacity: isDragging ? 0.4 : isDeleting || isEntering ? 0 : 1,
      }}
    >
      <div className="flex flex-col items-start rounded-[inherit] w-full">
        {/* Header */}
        <div className="w-full">
          <div className="flex items-center gap-[16px] w-full pl-[16px] pr-[12px] py-[12px]">
            <div className="flex flex-1 items-center min-h-[32px]">
              <div
                ref={handleRef}
                className="cursor-grab active:cursor-grabbing p-[4px] group/drag"
              >
                <GripVertical className="size-[16px] text-[#D4D4D8] transition-colors duration-200 ease-out group-hover/drag:text-[#71717a]" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-[32px] cursor-pointer shrink-0 !transition-none hover:!bg-transparent"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <ChevronRight
                  className="size-[16px] text-[#a1a1aa] transition-transform duration-200 ease-out"
                  style={{
                    transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                />
              </Button>
              <div className="flex-1 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={localTitle}
                  onChange={(e) => {
                    setLocalTitle(e.target.value);
                    onTitleChange(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setNewItemSheetOpen(true);
                    }
                  }}
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  onBlur={() => {
                    if (!localTitle.trim()) {
                      setLocalTitle("Novo serviço");
                      onTitleChange("Novo serviço");
                    }
                  }}
                  placeholder="Novo serviço"
                  className="flex w-full h-[36px] min-w-0 border border-transparent bg-transparent !text-[16px] text-[#27272a] font-semibold shadow-none rounded-md px-3 py-1 outline-none transition-[color,box-shadow,border-color] duration-200 ease-out focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:ring-[3px] placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <span
              className="hidden xl:inline shrink-0 text-[16px] text-[#27272a] font-semibold leading-[1.5] whitespace-nowrap transition-opacity duration-200 ease-out"
              style={{ opacity: isExpanded ? 0 : 1, pointerEvents: isExpanded ? "none" : "auto" }}
            >
              {formattedSubtotal} €
            </span>
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-[32px] cursor-pointer shrink-0"
                >
                  <Trash2 className="size-[16px] text-[#27272a]" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#f4f4f5] flex flex-col gap-[24px] p-[24px] rounded-[12px] border border-[#e5e5e5] max-w-[400px]">
                {/* Header */}
                <div className="flex items-start gap-[10px] relative w-full">
                  <AlertDialogTitle className="flex-1 text-[16px] text-[#27272a]">
                    Eliminar serviço
                  </AlertDialogTitle>
                  <AlertDialogCancel asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-[32px] cursor-pointer absolute right-[-8px] top-[-8px] !border-0 !shadow-none !bg-transparent hover:!bg-[#e4e4e7]"
                    >
                      <X className="size-[16px] text-[#27272a]" />
                    </Button>
                  </AlertDialogCancel>
                </div>
                {/* Description */}
                <div className="flex items-center w-full">
                  <AlertDialogDescription className="flex-1 text-[14px] text-[#71717a] font-normal">
                    Tens a certeza que queres eliminar este serviço?
                  </AlertDialogDescription>
                </div>
                {/* Buttons */}
                <div className="flex gap-[8px] items-center justify-end w-full">
                  <AlertDialogCancel asChild>
                    <Button
                      variant="ghost"
                      className="cursor-pointer h-[40px] px-[16px] text-[14px] text-[#27272a] !border-0 !shadow-none !bg-transparent hover:!bg-[#e4e4e7]"
                    >
                      Cancelar
                    </Button>
                  </AlertDialogCancel>
                  <Button
                    className="cursor-pointer h-[40px] px-[16px] text-[14px] text-white bg-[#fb2c36] not-disabled:hover:bg-[#e53e3e] rounded-[8px] shadow-[inset_0px_1px_0px_0px_#fb2c36,inset_0px_2px_0px_0px_rgba(255,255,255,0.15)] transition-colors duration-200 ease-out"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </Button>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Expandable content with dissolve animation */}
        <div
          className="grid w-full transition-[grid-template-rows,opacity] duration-200 ease-out"
          style={{
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <div className="overflow-hidden">
          <div className="p-[16px] pt-0 border-t border-[#e5e5e5]">
            <div className="flex flex-col gap-[16px] items-end w-full pt-[16px]">
              {/* Items table / Grid view with crossfade */}
              <div
                className="w-full transition-opacity duration-100 ease-out"
                style={{ opacity: viewTransitioning ? 0 : 1 }}
              >
                {displayedView === "list" ? (
                  <div className="flex flex-col gap-[4px] w-full">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-b border-[rgba(39,39,42,0.1)]">
                          <TableHead className="pl-[20px] pr-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase">
                            Item
                          </TableHead>
                          <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase max-w-[200px]">
                            Ref.
                          </TableHead>
                          <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-auto text-right">
                            Qtd.
                          </TableHead>
                          <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[96px] text-right">
                            Custo
                          </TableHead>
                          <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[96px] text-right">
                            Preço
                          </TableHead>
                          <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[57px] text-right">
                            Desc.
                          </TableHead>
                          <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[82px] text-right">
                            Subtotal
                          </TableHead>
                          <TableHead className="w-[24px] !p-0 h-auto" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Items will be rendered here */}
                        {sortedAllItems.map((item, idx) => {
                          if (item.type === "labor") {
                            const labor = item as LaborItem;
                            return (
                              <DraggableItemRow
                                key={item.id}
                                item={item}
                                index={idx}
                                dragType={ITEM_DRAG_PREFIX + service.id}
                                onMove={(dragIndex, hoverIndex) => {
                                  handleMoveItemInList(sortedAllItems, dragIndex, hoverIndex);
                                }}
                                onClick={() => setEditingItem(item)}
                              >
                                {(grip) => (<>
                                <TableCell className="pl-0 pr-[16px] py-[8px]">
                                  <div className="flex items-center">
                                    {grip}
                                    <div className="flex items-center gap-[8px]">
                                      <div className="flex items-center p-[4px] rounded-[8px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(232, 168, 56, 0.15) 0%, rgba(232, 168, 56, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
                                        <Wrench className="size-[16px] text-[#E8A838]" />
                                      </div>
                                      <span className="text-[14px] text-[#27272a] font-normal truncate">
                                        {labor.designation || "Mão de obra"}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal max-w-[200px]">-</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal text-right">
                                  {formatHoursDisplay(labor.hours)}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">-</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">{getLaborPriceLabel(labor.pricePerHour)}</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[57px] text-right">{labor.discount} %</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[82px] text-right">{fmtCurrency(calcItemSubtotal(labor))}</TableCell>
                                <TableCell className="w-[24px] !p-0">
                                  <button
                                    className="flex items-center justify-center size-[24px] rounded-[6px] cursor-pointer transition-colors duration-200 ease-out not-disabled:hover:bg-[#e4e4e7]"
                                    onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                                  >
                                    <Trash2 className="size-[14px] text-[#a1a1aa]" />
                                  </button>
                                </TableCell>
                                </>)}
                              </DraggableItemRow>
                            );
                          }
                          if (item.type === "parts") {
                            const part = item as PartItem;
                            return (
                              <DraggableItemRow
                                key={item.id}
                                item={item}
                                index={idx}
                                dragType={ITEM_DRAG_PREFIX + service.id}
                                onMove={(dragIndex, hoverIndex) => {
                                  handleMoveItemInList(sortedAllItems, dragIndex, hoverIndex);
                                }}
                                onClick={() => setEditingItem(item)}
                              >
                                {(grip) => (<>
                                <TableCell className="pl-0 pr-[16px] py-[8px]">
                                  <div className="flex items-center">
                                    {grip}
                                    <div className="flex items-center gap-[8px]">
                                      <div className="flex items-center p-[4px] rounded-[8px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
                                        <span className="text-[#3B82F6]">{PART_ICON}</span>
                                      </div>
                                      <span className="text-[14px] text-[#27272a] font-normal truncate">
                                        {part.designation || "Peça"}
                                      </span>
                                      {part.partType === "OEM" && (
                                        <span className="inline-flex items-center px-[6px] py-[1px] rounded-[4px] bg-[#27272a] text-white text-[11px] leading-[1.5] shrink-0">OEM</span>
                                      )}
                                      {part.partType === "IAM" && (
                                        <span className="inline-flex items-center px-[6px] py-[1px] rounded-[4px] bg-[#8270FF] text-white text-[11px] leading-[1.5] shrink-0">IAM</span>
                                      )}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal max-w-[200px] truncate">
                                  {part.referenceOEM || "-"}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal text-right">
                                  {part.quantity}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">
                                  {fmtCurrency(part.unitCost)}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">
                                  {fmtCurrency(part.unitPrice)}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[57px] text-right">
                                  {part.discount} %
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[82px] text-right">
                                  {fmtCurrency(calcItemSubtotal(part))}
                                </TableCell>
                                <TableCell className="w-[24px] !p-0">
                                  <button
                                    className="flex items-center justify-center size-[24px] rounded-[6px] cursor-pointer transition-colors duration-200 ease-out not-disabled:hover:bg-[#e4e4e7]"
                                    onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                                  >
                                    <Trash2 className="size-[14px] text-[#a1a1aa]" />
                                  </button>
                                </TableCell>
                                </>)}
                              </DraggableItemRow>
                            );
                          }
                          if (item.type === "consumables") {
                            const cons = item as ConsumableItem;
                            const isFixed = cons.calculationType === "fixed";
                            return (
                              <DraggableItemRow
                                key={item.id}
                                item={item}
                                index={idx}
                                dragType={ITEM_DRAG_PREFIX + service.id}
                                onMove={(dragIndex, hoverIndex) => {
                                  handleMoveItemInList(sortedAllItems, dragIndex, hoverIndex);
                                }}
                                onClick={() => setEditingItem(item)}
                              >
                                {(grip) => (<>
                                <TableCell className="pl-0 pr-[16px] py-[8px]">
                                  <div className="flex items-center">
                                    {grip}
                                    <div className="flex items-center gap-[8px]">
                                      <div className="flex items-center p-[4px] rounded-[8px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(38, 33, 36, 0.15) 0%, rgba(38, 33, 36, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
                                        <Droplet className="size-[16px] text-[#262124]" />
                                      </div>
                                      <span className="text-[14px] text-[#27272a] font-normal truncate">
                                        {cons.designation || "Consumível"}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal max-w-[200px]">-</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal text-right">
                                  {isFixed ? String(cons!.quantity).replace(".", ",") : "-"}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">-</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">{fmtCurrency(cons.unitPrice)}</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[57px] text-right">{cons.discount} %</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[82px] text-right">{fmtCurrency(calcItemSubtotal(cons))}</TableCell>
                                <TableCell className="w-[24px] !p-0">
                                  <button
                                    className="flex items-center justify-center size-[24px] rounded-[6px] cursor-pointer transition-colors duration-200 ease-out not-disabled:hover:bg-[#e4e4e7]"
                                    onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                                  >
                                    <Trash2 className="size-[14px] text-[#a1a1aa]" />
                                  </button>
                                </TableCell>
                                </>)}
                              </DraggableItemRow>
                            );
                          }
                          if (item.type === "additional") {
                            const fee = item as AdditionalChargeItem;
                            return (
                              <DraggableItemRow
                                key={item.id}
                                item={item}
                                index={idx}
                                dragType={ITEM_DRAG_PREFIX + service.id}
                                onMove={(dragIndex, hoverIndex) => {
                                  handleMoveItemInList(sortedAllItems, dragIndex, hoverIndex);
                                }}
                                onClick={() => setEditingItem(item)}
                              >
                                {(grip) => (<>
                                <TableCell className="pl-0 pr-[16px] py-[8px]">
                                  <div className="flex items-center">
                                    {grip}
                                    <div className="flex items-center gap-[8px]">
                                      <div className="flex items-center p-[4px] rounded-[8px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(12, 173, 134, 0.15) 0%, rgba(12, 173, 134, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
                                        <Euro className="size-[16px] text-[#0CAD86]" />
                                      </div>
                                      <span className="text-[14px] text-[#27272a] font-normal truncate">
                                        {fee.designation || "Encargo"}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal max-w-[200px]">-</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal text-right">-</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">-</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">{fmtCurrency(fee.unitPrice)}</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[57px] text-right">{fee.discount} %</TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[82px] text-right">{fmtCurrency(calcItemSubtotal(fee))}</TableCell>
                                <TableCell className="w-[24px] !p-0">
                                  <button
                                    className="flex items-center justify-center size-[24px] rounded-[6px] cursor-pointer transition-colors duration-200 ease-out not-disabled:hover:bg-[#e4e4e7]"
                                    onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                                  >
                                    <Trash2 className="size-[14px] text-[#a1a1aa]" />
                                  </button>
                                </TableCell>
                                </>)}
                              </DraggableItemRow>
                            );
                          }
                          return null;
                        })}
                        {sortedAllItems.length === 0 && (
                          <TableRow className="hover:bg-transparent">
                            <TableCell colSpan={8} className="px-[20px] py-[8px] text-[14px] text-[#71717a] font-normal">
                              Sem itens
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col gap-[16px] w-full">
                    {/* Labor table */}
                    <div className="flex flex-col gap-[4px] w-full">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-b border-[rgba(39,39,42,0.1)]">
                            <TableHead className="pl-[20px] pr-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase">
                              Mão de obra
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[60px] text-right">
                              Horas
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[102px] text-right">
                              Preço / hora
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[57px] text-right">
                              Desc.
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[82px] text-right">
                              Subtotal
                            </TableHead>
                            <TableHead className="w-[24px] !p-0 h-auto" />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {/* Labor items rendered in grid view */}
                          {sortedLaborItems.map((item, idx) => {
                            const labor = item as LaborItem;
                            return (
                              <DraggableItemRow
                                key={item.id}
                                item={item}
                                index={idx}
                                dragType={ITEM_DRAG_PREFIX + service.id + "_labor"}
                                onMove={(dragIndex, hoverIndex) => {
                                  handleMoveItemInList(sortedLaborItems, dragIndex, hoverIndex);
                                }}
                                onClick={() => setEditingItem(item)}
                              >
                                {(grip) => (<>
                                <TableCell className="pl-0 pr-[16px] py-[8px]">
                                  <div className="flex items-center">
                                    {grip}
                                    <div className="flex items-center gap-[8px]">
                                      <div className="flex items-center p-[4px] rounded-[8px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(232, 168, 56, 0.15) 0%, rgba(232, 168, 56, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
                                        <Wrench className="size-[16px] text-[#E8A838]" />
                                      </div>
                                      <span className="text-[14px] text-[#27272a] font-normal truncate">
                                        {labor.designation || "Mão de obra"}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[60px] text-right">
                                  {formatHoursDisplay(labor.hours)}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[102px] text-right">
                                  {getLaborPriceLabel(labor.pricePerHour)}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[57px] text-right">
                                  {labor.discount} %
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[82px] text-right">
                                  {fmtCurrency(calcItemSubtotal(labor))}
                                </TableCell>
                                <TableCell className="w-[24px] !p-0">
                                  <button
                                    className="flex items-center justify-center size-[24px] rounded-[6px] cursor-pointer transition-colors duration-200 ease-out not-disabled:hover:bg-[#e4e4e7]"
                                    onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                                  >
                                    <Trash2 className="size-[14px] text-[#a1a1aa]" />
                                  </button>
                                </TableCell>
                                </>)}
                              </DraggableItemRow>
                            );
                          })}
                          {sortedLaborItems.length === 0 && (
                            <TableRow className="hover:bg-transparent">
                              <TableCell colSpan={6} className="px-[20px] py-[8px] text-[14px] text-[#71717a] font-normal">
                                Sem itens
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Parts table */}
                    <div className="flex flex-col gap-[4px] w-full">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-b border-[rgba(39,39,42,0.1)]">
                            <TableHead className="pl-[20px] pr-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase">
                              Peça
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase max-w-[200px]">
                              Ref.
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-auto text-right">
                              Qtd.
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[96px] text-right">
                              Custo
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[96px] text-right">
                              Preço
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[57px] text-right">
                              Desc.
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[82px] text-right">
                              Subtotal
                            </TableHead>
                            <TableHead className="w-[24px] !p-0 h-auto" />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {/* Parts items rendered in grid view */}
                          {sortedPartItems.map((item, idx) => {
                            const part = item as PartItem;
                            return (
                              <DraggableItemRow
                                key={item.id}
                                item={item}
                                index={idx}
                                dragType={ITEM_DRAG_PREFIX + service.id + "_parts"}
                                onMove={(dragIndex, hoverIndex) => {
                                  handleMoveItemInList(sortedPartItems, dragIndex, hoverIndex);
                                }}
                                onClick={() => setEditingItem(item)}
                              >
                                {(grip) => (<>
                                <TableCell className="pl-0 pr-[16px] py-[8px]">
                                  <div className="flex items-center">
                                    {grip}
                                    <div className="flex items-center gap-[8px]">
                                      <div className="flex items-center p-[4px] rounded-[8px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
                                        <span className="text-[#3B82F6]">{PART_ICON}</span>
                                      </div>
                                      <span className="text-[14px] text-[#27272a] font-normal truncate">
                                        {part.designation || "Peça"}
                                      </span>
                                      {part.partType === "OEM" && (
                                        <span className="inline-flex items-center px-[6px] py-[1px] rounded-[4px] bg-[#27272a] text-white text-[11px] leading-[1.5] shrink-0">OEM</span>
                                      )}
                                      {part.partType === "IAM" && (
                                        <span className="inline-flex items-center px-[6px] py-[1px] rounded-[4px] bg-[#8270FF] text-white text-[11px] leading-[1.5] shrink-0">IAM</span>
                                      )}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal max-w-[200px] truncate">
                                  {part.referenceOEM || "-"}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal text-right">
                                  {part.quantity}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">
                                  {fmtCurrency(part.unitCost)}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">
                                  {fmtCurrency(part.unitPrice)}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[57px] text-right">
                                  {part.discount} %
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[82px] text-right">
                                  {fmtCurrency(calcItemSubtotal(part))}
                                </TableCell>
                                <TableCell className="w-[24px] !p-0">
                                  <button
                                    className="flex items-center justify-center size-[24px] rounded-[6px] cursor-pointer transition-colors duration-200 ease-out not-disabled:hover:bg-[#e4e4e7]"
                                    onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                                  >
                                    <Trash2 className="size-[14px] text-[#a1a1aa]" />
                                  </button>
                                </TableCell>
                                </>)}
                              </DraggableItemRow>
                            );
                          })}
                          {sortedPartItems.length === 0 && (
                            <TableRow className="hover:bg-transparent">
                              <TableCell colSpan={8} className="px-[20px] py-[8px] text-[14px] text-[#71717a] font-normal">
                                Sem itens
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Consumables / Fees table (merged) */}
                    <div className="flex flex-col gap-[4px] w-full">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-b border-[rgba(39,39,42,0.1)]">
                            <TableHead className="pl-[20px] pr-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase">
                              Consumível / Encargo
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[60px] text-right">
                              Qtd.
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[96px] text-right">
                              Preço
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[57px] text-right">
                              Desc.
                            </TableHead>
                            <TableHead className="px-[16px] py-[8px] h-auto text-[12px] text-[#a1a1aa] uppercase w-[82px] text-right">
                              Subtotal
                            </TableHead>
                            <TableHead className="w-[24px] !p-0 h-auto" />
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {/* Consumable / Fee items rendered in grid view */}
                          {sortedConsChargeItems.map((item, idx) => {
                            const isConsumable = item.type === "consumables";
                            const cons = isConsumable ? (item as ConsumableItem) : null;
                            const fee = !isConsumable ? (item as AdditionalChargeItem) : null;
                            const isFixed = cons ? cons.calculationType === "fixed" : (fee ? fee.calculationType === "fixed" : true);
                            const qty = isConsumable ? (isFixed ? String(cons!.quantity).replace(".", ",") : "-") : "-";
                            const price = isConsumable ? cons!.unitPrice : fee!.unitPrice;
                            return (
                              <DraggableItemRow
                                key={item.id}
                                item={item}
                                index={idx}
                                dragType={ITEM_DRAG_PREFIX + service.id + "_conscharge"}
                                onMove={(dragIndex, hoverIndex) => {
                                  handleMoveItemInList(sortedConsChargeItems, dragIndex, hoverIndex);
                                }}
                                onClick={() => setEditingItem(item)}
                              >
                                {(grip) => (<>
                                <TableCell className="pl-0 pr-[16px] py-[8px]">
                                  <div className="flex items-center">
                                    {grip}
                                    <div className="flex items-center gap-[8px]">
                                      <div
                                        className="flex items-center p-[4px] rounded-[8px] shrink-0"
                                        style={{
                                          backgroundImage: isConsumable
                                            ? "linear-gradient(90deg, rgba(38, 33, 36, 0.15) 0%, rgba(38, 33, 36, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)"
                                            : "linear-gradient(90deg, rgba(12, 173, 134, 0.15) 0%, rgba(12, 173, 134, 0.15) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
                                        }}
                                      >
                                        {isConsumable
                                          ? <Droplet className="size-[16px] text-[#262124]" />
                                          : <Euro className="size-[16px] text-[#0CAD86]" />}
                                      </div>
                                      <span className="text-[14px] text-[#27272a] font-normal truncate">
                                        {item.designation || (isConsumable ? "Consumível" : "Encargo")}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[60px] text-right">
                                  {qty}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[96px] text-right">
                                  {fmtCurrency(price)}
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[57px] text-right">
                                  {item.discount} %
                                </TableCell>
                                <TableCell className="px-[16px] py-[8px] text-[14px] text-[#27272a] font-normal w-[82px] text-right">
                                  {fmtCurrency(calcItemSubtotal(item))}
                                </TableCell>
                                <TableCell className="w-[24px] !p-0">
                                  <button
                                    className="flex items-center justify-center size-[24px] rounded-[6px] cursor-pointer transition-colors duration-200 ease-out not-disabled:hover:bg-[#e4e4e7]"
                                    onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                                  >
                                    <Trash2 className="size-[14px] text-[#a1a1aa]" />
                                  </button>
                                </TableCell>
                                </>)}
                              </DraggableItemRow>
                            );
                          })}
                          {sortedConsChargeItems.length === 0 && (
                            <TableRow className="hover:bg-transparent">
                              <TableCell colSpan={6} className="px-[20px] py-[8px] text-[14px] text-[#71717a] font-normal">
                                Sem itens
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom frame: view toggle + service price */}
              <div className="flex items-center justify-between w-full pl-[0px] pr-[4px] py-[0px]">
                <div className="flex items-center gap-[8px]">
                {/* New item button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer gap-[8px] text-[#27272a]"
                  onClick={() => setNewItemSheetOpen(true)}
                >
                  <Plus className="size-[16px]" />
                  Novo item
                </Button>
                {/* View toggle tabs */}
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "grid")} className="gap-0">
                  <TabsList className="h-[32px] p-[3px]">
                    <TabsTrigger value="list" className="h-[26px] px-[8px]">
                      <AlignJustify className="size-[16px]" />
                    </TabsTrigger>
                    <TabsTrigger value="grid" className="h-[26px] px-[8px]">
                      <LayoutGrid className="size-[16px]" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                </div>

                {/* Service price */}
                <div className="flex gap-[12px] items-center">
                  <span className="text-[16px] text-[#27272a] font-semibold">
                    {formattedSubtotal} €
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="cursor-pointer flex items-center justify-center">
                        <Info className="size-[16px] text-[#a1a1aa]" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      sideOffset={6}
                      className="rounded-[8px] p-[16px] min-w-[200px]"
                    >
                      <div className="flex flex-col gap-[8px] w-full">
                        {/* Subtotal + IVA */}
                        <div className="flex flex-col gap-[4px] w-full">
                          <div className="flex gap-[4px] items-center justify-between w-full">
                            <span className="flex-1 text-[12px] text-[#a1a1aa] font-normal">Subtotal</span>
                            <span className="text-[12px] text-primary-foreground font-normal">{formattedSubtotal} €</span>
                          </div>
                          <div className="flex gap-[4px] items-center justify-between w-full">
                            <span className="flex-1 text-[12px] text-[#a1a1aa] font-normal">IVA (23%)</span>
                            <span className="text-[12px] text-primary-foreground font-normal">{formattedVat} €</span>
                          </div>
                        </div>
                        {/* Separator */}
                        <div className="h-px w-full bg-[#27272a]" />
                        {/* Total */}
                        <div className="flex gap-[4px] items-center justify-between w-full">
                          <span className="flex-1 text-[13px] text-primary-foreground">Total c/ IVA</span>
                          <span className="text-[13px] text-primary-foreground">{formattedTotal} €</span>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      
      <NewItemSheet open={newItemSheetOpen} onOpenChange={setNewItemSheetOpen} onSave={handleAddItem} serviceItems={service.items} />
      <NewItemSheet
        open={!!editingItem}
        onOpenChange={(open) => { if (!open) setEditingItem(null); }}
        onSave={handleEditSheetSave}
        editItem={editingItem}
        serviceItems={service.items}
      />
    </div>
  );
}
