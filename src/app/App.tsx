import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Content } from "../imports/QuotesCreateNewQuote1stQuote";
import { ExpandableSidebar } from "./components/ExpandableSidebar";
import { ToastContainer } from "./components/Toast";

export default function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null);
  const rootRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setRootEl(node);
  }, []);

  return (
    <div ref={rootRef} className="bg-[#f4f4f5] content-stretch flex items-center relative size-full">
      {rootEl && (
        <DndProvider backend={HTML5Backend} options={{ rootElement: rootEl }}>
          <ExpandableSidebar
            isExpanded={isSidebarExpanded}
            onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
          />
          <Content />
          <ToastContainer />
        </DndProvider>
      )}
    </div>
  );
}