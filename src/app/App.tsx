import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Content } from "../imports/QuotesCreateNewQuote1stQuote";
import type { SelectedClient } from "../imports/QuotesCreateNewQuote1stQuote";
import type { Vehicle } from "./components/VehicleSearchPopup";
import type { QuoteService } from "./components/QuoteServicesData";
import { ExpandableSidebar } from "./components/ExpandableSidebar";
import { ToastContainer } from "./components/Toast";
import { QuoteApprovalView } from "./components/QuoteApprovalView";

interface FinalizedQuote {
  client: SelectedClient;
  vehicle: Vehicle;
  services: QuoteService[];
}

export default function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null);
  const [viewMode, setViewMode] = useState<"create" | "approval">("create");
  const [finalizedData, setFinalizedData] = useState<FinalizedQuote | null>(null);
  const rootRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setRootEl(node);
  }, []);

  const handleFinalize = useCallback((data: FinalizedQuote) => {
    setFinalizedData(data);
    setViewMode("approval");
  }, []);

  return (
    <div ref={rootRef} className="bg-[#f4f4f5] content-stretch flex items-center relative size-full">
      {rootEl && (
        <DndProvider backend={HTML5Backend} options={{ rootElement: rootEl }}>
          <ExpandableSidebar
            isExpanded={isSidebarExpanded}
            onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
          />
          {viewMode === "create" ? (
            <Content onFinalize={handleFinalize} />
          ) : finalizedData ? (
            <QuoteApprovalView
              selectedClient={finalizedData.client}
              selectedVehicle={finalizedData.vehicle}
              services={finalizedData.services}
            />
          ) : null}
          <ToastContainer />
        </DndProvider>
      )}
    </div>
  );
}