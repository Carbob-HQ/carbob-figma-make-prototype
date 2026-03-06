import { useState, useEffect, type RefObject } from "react";

const DEFAULT_MAX_HEIGHT = 300;
const VIEWPORT_MARGIN = 8; // px margin from viewport edge
const DROPDOWN_GAP = 4; // gap between trigger and dropdown

/**
 * Measures available space above/below a trigger element and decides
 * whether the dropdown should flip upward. Also computes a dynamic maxHeight
 * for the scrollable list area (subtracting chrome like search bars).
 *
 * @param triggerRef - Ref to the trigger button element
 * @param isOpen - Whether the dropdown is open
 * @param chromeHeight - Height of non-scrollable dropdown parts (search bar, borders, etc.)
 */
export function useDropdownPosition(
  triggerRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
  chromeHeight: number = 0
) {
  const [flipUp, setFlipUp] = useState(false);
  const [maxHeight, setMaxHeight] = useState(DEFAULT_MAX_HEIGHT);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_MARGIN - DROPDOWN_GAP;
    const spaceAbove = rect.top - VIEWPORT_MARGIN - DROPDOWN_GAP;

    // Available space for the scrollable list = total space - chrome
    const listSpaceBelow = spaceBelow - chromeHeight;
    const listSpaceAbove = spaceAbove - chromeHeight;

    const minListHeight = 120; // minimum usable scrollable area

    if (listSpaceBelow < minListHeight && listSpaceAbove > listSpaceBelow) {
      setFlipUp(true);
      setMaxHeight(Math.min(DEFAULT_MAX_HEIGHT, Math.max(minListHeight, Math.floor(listSpaceAbove))));
    } else {
      setFlipUp(false);
      setMaxHeight(Math.min(DEFAULT_MAX_HEIGHT, Math.max(minListHeight, Math.floor(listSpaceBelow))));
    }
  }, [isOpen, chromeHeight]);

  return { flipUp, maxHeight };
}
