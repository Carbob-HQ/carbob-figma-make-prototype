import { useState, useRef, useCallback } from "react";
import { Home, Calendar, SquareKanban, ListTree, HelpCircle, Settings, Plus, PanelRightOpen, PanelRightClose } from "lucide-react";
import imgCarbobCropped from "figma:asset/335bae29933abbce2529018c6b80d0d1b6f73b66.png";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { NewActionPopup } from "./NewActionPopup";
import { ListsPopup } from "./ListsPopup";

interface ExpandableSidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function ExpandableSidebar({ isExpanded, onToggle }: ExpandableSidebarProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isNewPopupOpen, setIsNewPopupOpen] = useState(false);
  const [newBtnRect, setNewBtnRect] = useState<DOMRect | null>(null);
  const newBtnRef = useRef<HTMLButtonElement>(null);
  const [isListsPopupOpen, setIsListsPopupOpen] = useState(false);
  const [listsBtnRect, setListsBtnRect] = useState<DOMRect | null>(null);
  const listsBtnRef = useRef<HTMLButtonElement>(null);
  const [justCollapsed, setJustCollapsed] = useState(false);
  const prevExpandedRef = useRef(isExpanded);

  // Track collapse transition — justCollapsed is true for 200ms after sidebar collapses
  if (prevExpandedRef.current && !isExpanded) {
    setJustCollapsed(true);
    setTimeout(() => setJustCollapsed(false), 200);
  }
  prevExpandedRef.current = isExpanded;

  const handleNewClick = useCallback(() => {
    if (isNewPopupOpen) {
      setIsNewPopupOpen(false);
      return;
    }
    setIsListsPopupOpen(false);
    if (newBtnRef.current) {
      setNewBtnRect(newBtnRef.current.getBoundingClientRect());
      setIsNewPopupOpen(true);
    }
  }, [isNewPopupOpen]);

  const handleCloseNewPopup = useCallback(() => {
    setIsNewPopupOpen(false);
  }, []);

  const handleListsClick = useCallback(() => {
    if (isListsPopupOpen) {
      setIsListsPopupOpen(false);
      return;
    }
    setIsNewPopupOpen(false);
    if (listsBtnRef.current) {
      setListsBtnRect(listsBtnRef.current.getBoundingClientRect());
      setIsListsPopupOpen(true);
    }
  }, [isListsPopupOpen]);

  const handleCloseListsPopup = useCallback(() => {
    setIsListsPopupOpen(false);
  }, []);

  return (
    <div
      className={cn(
        "bg-[#262124] flex flex-col gap-6 h-full items-center py-3 relative shadow-sm shrink-0 transition-[width] duration-200 ease-out",
        isExpanded ? "w-[240px]" : "w-[56px]"
      )}
      data-name="Sidebar"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Logo Frame */}
      <div className="flex items-center relative shrink-0 w-full px-2">
        <div
          className="bg-[#262124] h-10 relative rounded-lg w-full flex items-center overflow-hidden"
          data-name="Logo"
          onClick={isExpanded ? onToggle : undefined}
        >
          {/* Logo image — always rendered, anchored left, clip width animates */}
          <div className="relative shrink-0 h-full flex items-center px-[10px] z-10 bg-[#262124]">
            <div className={cn(
              "overflow-hidden h-[27.25px] transition-[width,opacity] duration-200 ease-out",
              isExpanded ? "w-[127px]" : "w-[20px]",
              !isExpanded && isHovering && "opacity-0"
            )}>
              <div className="relative w-[127px] h-[27.25px] shrink-0">
                <img alt="Carbob Logo" className="absolute h-[346.57%] left-[-15.12%] max-w-none top-[-116.91%] w-[132.24%]" src={imgCarbobCropped} />
              </div>
            </div>

            {/* Collapsed overlay: expand button fades in on sidebar hover, delayed only during collapse animation */}
            <div className={cn(
              "absolute inset-0 transition-opacity duration-200 ease-out",
              !isExpanded && isHovering && !justCollapsed ? "opacity-100" : "opacity-0 pointer-events-none",
              justCollapsed && "!transition-none"
            )}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                    className="group/toggle h-10 w-10 cursor-pointer not-disabled:hover:bg-white/10 transition-colors duration-200 ease-out"
                  >
                    <PanelRightClose className="h-5 w-5 text-white/50 group-hover/toggle:text-white transition-colors duration-200 ease-out" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Abrir barra lateral
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Collapse Button — always rendered, hidden instantly on collapse */}
          <div className={cn(
            "shrink-0 ml-auto px-1 z-0",
            isExpanded ? "visible" : "invisible"
          )}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); onToggle(); }}
                  className={cn(
                    "group/collapse shrink-0 h-10 w-10 not-disabled:hover:bg-white/10 transition-colors duration-200 ease-out",
                    isExpanded && "cursor-pointer"
                  )}
                >
                  <PanelRightOpen className="h-5 w-5 text-white/50 group-hover/collapse:text-white transition-colors duration-200 ease-out" />
                </Button>
              </TooltipTrigger>
              {isExpanded && (
                <TooltipContent side="right" sideOffset={8}>
                  Fechar barra lateral
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Add Button (Criar) */}
      <div className={cn("flex flex-col items-start relative shrink-0 w-full px-2")}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={newBtnRef}
              onClick={handleNewClick}
              className={cn(
                "not-disabled:hover:bg-[#8270FF] text-white h-10 gap-2 cursor-pointer transition-colors duration-200 ease-out",
                isNewPopupOpen ? "bg-[#8270FF]" : "bg-[rgba(130,112,255,0.5)]",
                isExpanded ? "w-full justify-start" : "w-10 px-0 justify-center"
              )}
            >
              <Plus className="h-4 w-4" />
              {isExpanded && <span className="font-medium">Novo</span>}
            </Button>
          </TooltipTrigger>
          {!isExpanded && !isNewPopupOpen && (
            <TooltipContent side="right" sideOffset={8}>
              Novo
            </TooltipContent>
          )}
        </Tooltip>

        {isNewPopupOpen && newBtnRect && (
          <NewActionPopup anchorRect={newBtnRect} onClose={handleCloseNewPopup} />
        )}
      </div>

      {/* Main Buttons */}
      <div className="flex flex-1 flex-col gap-1 items-start w-full px-2">
        {/* Home Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "group/btn w-full h-10 gap-2 text-white not-disabled:hover:bg-white/10 cursor-pointer transition-colors duration-200 ease-out overflow-hidden justify-start",
                !isExpanded && "px-0"
              )}
            >
              <Home className="h-4 w-4 shrink-0 text-[#A1A1AA] group-hover/btn:text-white transition-colors duration-200 ease-out" />
              <span className="text-[#A1A1AA] group-hover/btn:text-white font-medium transition-[color,opacity] duration-200 ease-out whitespace-nowrap"
                style={{ opacity: isExpanded ? 1 : 0 }}
              >Início</span>
            </Button>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right" sideOffset={8}>
              Início
            </TooltipContent>
          )}
        </Tooltip>

        {/* Scheduling Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "group/btn w-full h-10 gap-2 text-white not-disabled:hover:bg-white/10 cursor-pointer transition-colors duration-200 ease-out overflow-hidden justify-start",
                !isExpanded && "px-0"
              )}
            >
              <Calendar className="h-4 w-4 shrink-0 text-[#A1A1AA] group-hover/btn:text-white transition-colors duration-200 ease-out" />
              <span className="text-[#A1A1AA] group-hover/btn:text-white font-medium transition-[color,opacity] duration-200 ease-out whitespace-nowrap"
                style={{ opacity: isExpanded ? 1 : 0 }}
              >Agendamentos</span>
            </Button>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right" sideOffset={8}>
              Agendamentos
            </TooltipContent>
          )}
        </Tooltip>

        {/* Job Board Button (Selected) */}
        <div className="relative w-full">
          <div className="absolute left-[-8px] top-2 w-1 h-6 bg-[#8270ff] rounded-r-lg" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "group/btn w-full h-10 gap-2 bg-white/10 text-white not-disabled:hover:bg-white/15 cursor-pointer transition-colors duration-200 ease-out overflow-hidden justify-start",
                  !isExpanded && "px-0"
                )}
              >
                <SquareKanban className="h-4 w-4 shrink-0 text-white transition-colors duration-200 ease-out" />
                <span className="text-white font-medium transition-[color,opacity] duration-200 ease-out whitespace-nowrap"
                  style={{ opacity: isExpanded ? 1 : 0 }}
                >Quadro de trabalho</span>
              </Button>
            </TooltipTrigger>
            {!isExpanded && (
              <TooltipContent side="right" sideOffset={8}>
                Quadro de trabalho
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Lists Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={listsBtnRef}
              variant="ghost"
              onClick={handleListsClick}
              className={cn(
                "group/btn w-full h-10 gap-2 text-white not-disabled:hover:bg-white/10 cursor-pointer transition-colors duration-200 ease-out overflow-hidden justify-start",
                !isExpanded && "px-0",
                isListsPopupOpen && "bg-white/10"
              )}
            >
              <ListTree className={cn("h-4 w-4 shrink-0 group-hover/btn:text-white transition-colors duration-200 ease-out", isListsPopupOpen ? "text-white" : "text-[#A1A1AA]")} />
              <span className={cn("group-hover/btn:text-white font-medium transition-[color,opacity] duration-200 ease-out whitespace-nowrap", isListsPopupOpen ? "text-white" : "text-[#A1A1AA]")}
                style={{ opacity: isExpanded ? 1 : 0 }}
              >Listas</span>
            </Button>
          </TooltipTrigger>
          {!isExpanded && !isListsPopupOpen && (
            <TooltipContent side="right" sideOffset={8}>
              Listas
            </TooltipContent>
          )}
        </Tooltip>
      </div>

      {isListsPopupOpen && listsBtnRect && (
        <ListsPopup anchorRect={listsBtnRect} onClose={handleCloseListsPopup} />
      )}

      {/* Bottom Buttons */}
      <div className="flex flex-col gap-1 items-start w-full px-2">
        {/* Help Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "group/btn w-full h-10 gap-2 text-white not-disabled:hover:bg-white/10 cursor-pointer transition-colors duration-200 ease-out overflow-hidden justify-start",
                !isExpanded && "px-0"
              )}
            >
              <HelpCircle className="h-4 w-4 shrink-0 text-[#A1A1AA] group-hover/btn:text-white transition-colors duration-200 ease-out" />
              <span className="text-[#A1A1AA] group-hover/btn:text-white font-medium transition-[color,opacity] duration-200 ease-out whitespace-nowrap"
                style={{ opacity: isExpanded ? 1 : 0 }}
              >Ajuda</span>
            </Button>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right" sideOffset={8}>
              Ajuda
            </TooltipContent>
          )}
        </Tooltip>

        {/* Settings Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "group/btn w-full h-10 gap-2 text-white not-disabled:hover:bg-white/10 cursor-pointer transition-colors duration-200 ease-out overflow-hidden justify-start",
                !isExpanded && "px-0"
              )}
            >
              <Settings className="h-4 w-4 shrink-0 text-[#A1A1AA] group-hover/btn:text-white transition-colors duration-200 ease-out" />
              <span className="text-[#A1A1AA] group-hover/btn:text-white font-medium transition-[color,opacity] duration-200 ease-out whitespace-nowrap"
                style={{ opacity: isExpanded ? 1 : 0 }}
              >Definições</span>
            </Button>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right" sideOffset={8}>
              Definições
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </div>
  );
}