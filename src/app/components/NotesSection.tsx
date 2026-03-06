import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { cn } from "./ui/utils";
import svgPaths from "../../imports/svg-3t20tc1fen";

export function NotesSection({ rightSlot, rightSlotExiting }: { rightSlot?: React.ReactNode; rightSlotExiting?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [clientNotes, setClientNotes] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        {/* Notes Toggle Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "group/notes gap-2 cursor-pointer shadow-none transition-all duration-200 ease-out",
            isOpen
              ? "bg-white border-[#8270FF] not-disabled:hover:bg-[#e4e4e7] not-disabled:hover:text-[#3f3f46]"
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
          <span className="font-medium text-[14px] text-[#3f3f46]">Notas</span>
          {filledCount > 0 && (
            <span className="bg-[#8270FF] text-white text-[12px] font-medium leading-4 h-[22px] min-w-[22px] px-2 flex items-center justify-center rounded-full">
              {filledCount}
            </span>
          )}
        </Button>
        {rightSlot && (
          <div
            className="flex gap-[8px] items-center transition-opacity duration-200 ease-out"
            style={{ opacity: rightSlotExiting ? 0 : 1 }}
          >
            {rightSlot}
          </div>
        )}
      </div>

      {/* Notes Frame */}
      {isMounted && (
        <div
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
                    className="h-16 min-h-16 resize-none text-[14px] rounded-lg border-[#e5e5e5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-white"
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
                    className="h-16 min-h-16 resize-none text-[14px] rounded-lg border-[#e5e5e5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-white"
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