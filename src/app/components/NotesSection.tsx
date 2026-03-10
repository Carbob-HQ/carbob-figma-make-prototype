import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { cn } from "./ui/utils";
import svgPaths from "../../imports/svg-3t20tc1fen";

export function NotesSection({ rightSlot }: { rightSlot?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [clientNotes, setClientNotes] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isOpen) {
      // Opening: mount immediately, then fade in on next frame
      setIsMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFadeIn(true);
        });
      });
    } else {
      // Closing: fade out first, then unmount after 200ms
      setFadeIn(false);
      timeoutRef.current = setTimeout(() => {
        setIsMounted(false);
      }, 200);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filledCount = useMemo(() => {
    let count = 0;
    if (clientNotes.trim()) count++;
    if (internalNotes.trim()) count++;
    return count;
  }, [clientNotes, internalNotes]);

  return (
    <div className={cn("flex flex-col items-start w-full", isMounted && "gap-4")}>
      {/* Button Row */}
      <div className="flex items-center justify-between w-full">
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group/notes gap-2 cursor-pointer shadow-none transition-all duration-200 ease-out",
          isOpen
            ? "bg-white border-[#8270ff] not-disabled:hover:bg-[#e5e5e5] not-disabled:hover:text-[#27272a]"
            : ""
        )}
      >
        <svg
          className="shrink-0 size-4"
          fill="none"
          viewBox="0 0 12 14.6667"
        >
          <path d={svgPaths.p1fd3c000} fill="#27272A" />
        </svg>
        <span className="font-medium text-[14px] text-[#27272a]">Notas</span>
        {filledCount > 0 && (
          <span className="bg-[#8270ff] text-white text-[11px] font-medium leading-none h-[20px] min-w-[20px] px-1.5 flex items-center justify-center rounded-full">
            {filledCount}
          </span>
        )}
      </Button>
      {rightSlot && (
        <div className="flex gap-[8px] items-center">
          {rightSlot}
        </div>
      )}
      </div>

      {/* Notes Frame */}
      {isMounted && (
        <div
          ref={panelRef}
          className={cn(
            "w-full grid transition-all duration-200 ease-out",
            fadeIn ? "opacity-100 grid-rows-[1fr]" : "opacity-0 grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="bg-white relative rounded-2xl w-full border border-[#e5e5e5]">
              <div className="flex gap-4 items-start p-4 w-full">
                {/* Client Comments */}
                <div className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                  <Label className="text-[14px] text-[#27272a]">
                    Comentários do cliente
                  </Label>
                  <Textarea
                    placeholder="Adicionar notas"
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="h-16 min-h-16 resize-none text-[14px] rounded-lg border-[#e5e5e5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-[#fafafa]"
                  />
                </div>

                {/* Internal Notes */}
                <div className="flex flex-1 flex-col gap-[8px] items-start min-w-0">
                  <Label className="text-[14px] text-[#27272a]">
                    Notas internas
                  </Label>
                  <Textarea
                    placeholder="Adicionar notas"
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    className="h-16 min-h-16 resize-none text-[14px] rounded-lg border-[#e5e5e5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-[#fafafa]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}