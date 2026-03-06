import { useState, useEffect, useRef } from "react";
import svgPaths from "../../imports/svg-5v3bbcap51";
import type { Vehicle } from "./VehicleSearchPopup";
import { addVehicleToDatabase } from "./VehicleSearchPopup";
import { showToast } from "./Toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { BrandCombobox } from "./BrandCombobox";
import { YearCombobox } from "./YearCombobox";
import { ModelCombobox } from "./ModelCombobox";
import { VersionCombobox } from "./VersionCombobox";
import { EngineCombobox, getEngineData } from "./EngineCombobox";

import { cn } from "./ui/utils";

import defaultVehicleImg from "figma:asset/8967a33e3fb071b1ff4780ea779726aac5c253ff.png";

interface AddNewVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVehicleAdded: (vehicle: Vehicle) => void;
  associatedClientName?: string;
}

// Mock data — always returns the same BMW regardless of plate
const plateMockData = {
  brand: "BMW",
  model: "5",
  version: "5 (G30)",
  engine: "530 e Plug-in-hybrid",
  year: 2020,
  registrationDate: "04/2023",
  vin: "WBA11AG040CJ68507",
  plate: "",
  km: "",
  displacement: 1998,
  power: 292,
  fuel: "Gasolina/Elétrico",
  engineCode: "BHY (DV6FD)",
};

// Mock data — always returns the same Dacia regardless of VIN
const vinMockData = {
  brand: "Dacia",
  model: "Spring EV",
  version: "Spring EV",
  engine: "",
  year: 2020,
  registrationDate: "04/2023",
  plate: "BA-01-AB",
  vin: "",
  km: "",
  displacement: 0,
  power: 45,
  fuel: "Elétrico",
  engineCode: "",
};

type IdentifiedData = typeof plateMockData;
type ActiveTab = "matricula" | "vin" | "manual";

function formatPlateInput(raw: string): string {
  const clean = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6);
  if (clean.length <= 2) return clean;
  if (clean.length <= 4) return clean.slice(0, 2) + "-" + clean.slice(2);
  return clean.slice(0, 2) + "-" + clean.slice(2, 4) + "-" + clean.slice(4);
}

function getCleanPlate(plate: string): string {
  return plate.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

export default function AddNewVehicleModal({ isOpen, onClose, onVehicleAdded, associatedClientName }: AddNewVehicleModalProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("matricula");
  const [plate, setPlate] = useState("");
  const [vinInput, setVinInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [identifiedData, setIdentifiedData] = useState<IdentifiedData | null>(null);

  // Manual tab state
  const [manualBrand, setManualBrand] = useState("");
  const [manualModel, setManualModel] = useState("");
  const [manualVersion, setManualVersion] = useState("");
  const [manualEngine, setManualEngine] = useState("");
  const [manualYear, setManualYear] = useState("");
  const [manualPlate, setManualPlate] = useState("");

  // Modal animation
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const plateInputRef = useRef<HTMLInputElement>(null);
  const vinInputRef = useRef<HTMLInputElement>(null);

  // Validation error for matrícula/VIN input when user tries to add without identification
  const [inputError, setInputError] = useState(false);

  // Validation errors for manual tab fields
  const [manualErrors, setManualErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      setTimeout(() => {
        if (activeTab === "matricula") {
          plateInputRef.current?.focus();
        } else {
          vinInputRef.current?.focus();
        }
      }, 220);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Reset form on close
        setActiveTab("matricula");
        setPlate("");
        setVinInput("");
        setIsLoading(false);
        setIdentifiedData(null);
        setManualBrand("");
        setManualModel("");
        setManualVersion("");
        setManualEngine("");
        setManualYear("");
        setManualPlate("");
        setInputError(false);
        setManualErrors(new Set());
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTabChange = (tab: ActiveTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setPlate("");
    setVinInput("");
    setIsLoading(false);
    setIdentifiedData(null);
    setInputError(false);
    setTimeout(() => {
      if (tab === "matricula") {
        plateInputRef.current?.focus();
      } else {
        vinInputRef.current?.focus();
      }
    }, 50);
  };

  const cleanPlate = getCleanPlate(plate);
  const isPlateComplete = cleanPlate.length === 6;
  const isVinValid = vinInput.trim().length > 0;
  
  const canIdentify = activeTab === "matricula"
    ? isPlateComplete && !isLoading && !identifiedData
    : isVinValid && !isLoading && !identifiedData;

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPlateInput(e.target.value);
    setPlate(formatted);
    setInputError(false);
    // Reset identified data when plate changes
    if (identifiedData) {
      setIdentifiedData(null);
    }
  };

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinInput(e.target.value);
    setInputError(false);
    // Reset identified data when VIN changes
    if (identifiedData) {
      setIdentifiedData(null);
    }
  };

  const handleIdentify = () => {
    if (!canIdentify) return;
    setIsLoading(true);
    setInputError(false);

    setTimeout(() => {
      if (activeTab === "matricula") {
        setIdentifiedData(plateMockData);
      } else {
        setIdentifiedData(vinMockData);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleAdd = () => {
    if (activeTab === "manual") {
      const errors = new Set<string>();
      if (!manualBrand) errors.add("brand");
      if (!manualYear) errors.add("year");
      if (!manualModel) errors.add("model");
      if (!manualVersion) errors.add("version");
      if (!manualEngine) errors.add("engine");
      if (errors.size > 0) {
        setManualErrors(errors);
        return;
      }
      const engineData = getEngineData(manualVersion, manualEngine);
      const cleanManualPlate = getCleanPlate(manualPlate);
      const formattedPlate = cleanManualPlate.length === 6 ? formatPlateInput(cleanManualPlate) : manualPlate;

      const newVehicle: Vehicle = {
        id: `v_${Date.now()}`,
        clientName: associatedClientName || "",
        plate: formattedPlate,
        brand: manualBrand,
        model: manualModel,
        version: manualVersion,
        engine: manualEngine,
        year: parseInt(manualYear, 10),
        registrationDate: "",
        vin: "",
        km: "",
        displacement: engineData?.cc ?? 0,
        power: engineData?.power ?? 0,
        fuel: engineData?.fuel ?? "",
        engineCode: "",
        imageUrl: defaultVehicleImg,
      };

      addVehicleToDatabase(newVehicle);
      onVehicleAdded(newVehicle);
      onClose();
      showToast("Veículo adicionado com sucesso");
      return;
    }

    if (!identifiedData) {
      setInputError(true);
      return;
    }

    const resolvedPlate = activeTab === "matricula"
      ? formatPlateInput(cleanPlate)
      : identifiedData.plate;
    const resolvedVin = activeTab === "vin"
      ? vinInput.trim().toUpperCase()
      : identifiedData.vin;

    const newVehicle: Vehicle = {
      id: `v_${Date.now()}`,
      clientName: associatedClientName || "",
      plate: resolvedPlate,
      brand: identifiedData.brand,
      model: identifiedData.model,
      version: identifiedData.version,
      engine: identifiedData.engine,
      year: identifiedData.year,
      registrationDate: identifiedData.registrationDate,
      vin: resolvedVin,
      km: identifiedData.km,
      displacement: identifiedData.displacement,
      power: identifiedData.power,
      fuel: identifiedData.fuel,
      engineCode: identifiedData.engineCode,
      imageUrl: defaultVehicleImg,
    };

    addVehicleToDatabase(newVehicle);
    onVehicleAdded(newVehicle);
    onClose();
    showToast("Veículo adicionado com sucesso");
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-200 ease-out"
      style={{ opacity: isAnimating ? 1 : 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div
        className="bg-[#f4f4f5] flex flex-col gap-[24px] items-start p-[24px] relative rounded-[12px] w-[640px] h-[613px] z-10 overflow-visible"
        style={{ transform: isAnimating ? "scale(1)" : "scale(0.98)", transition: "transform 200ms ease-out" }}
      >
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />

        {/* Header */}
        <div className="flex gap-[10px] items-start relative shrink-0 w-full">
          <div className="flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px relative">
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[16px] w-full whitespace-pre-wrap">Adicionar novo veículo</p>
          </div>
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] right-[-8px] rounded-[6px] size-[32px] top-[-8px] cursor-pointer transition-colors duration-200 ease-out hover:bg-[#e4e4e7]"
          >
            <div className="overflow-clip relative shrink-0 size-[16px]">
              <div className="absolute inset-[20.83%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33323 9.33323">
                  <path d={svgPaths.p2bd57f80} fill="#27272A" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => handleTabChange(v as ActiveTab)}
          className="flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative w-full overflow-visible"
        >
          <TabsList variant="line">
            <TabsTrigger value="matricula">
              Matrícula
            </TabsTrigger>
            <TabsTrigger value="vin">
              VIN
            </TabsTrigger>
            <TabsTrigger value="manual">
              Seleção manual
            </TabsTrigger>
          </TabsList>

          {/* Main content */}
          <div className="flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative w-full overflow-visible">
            {activeTab !== "manual" ? (
              <>
                {/* Input section */}
                <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  {/* Label */}
                  <div className="flex gap-[4px] items-center relative shrink-0 w-full">
                    <div className="flex items-center relative shrink-0">
                      <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[14px] text-ellipsis text-[#27272a]">
                        {activeTab === "matricula" ? "Introduz a matrícula do veículo" : "Introduz o VIN do veículo"}
                      </p>
                    </div>
                    <div className="flex items-start relative shrink-0 group/tooltip">
                      <div className="overflow-clip relative shrink-0 size-[12px]">
                        <div className="absolute inset-[4.17%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
                            <path d={svgPaths.p169dfe80} fill="#A1A1AA" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-[6px] px-[10px] py-[6px] bg-[#27272a] text-white text-[12px] leading-[1.5] font-normal rounded-[6px] whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 ease-out">
                        Apenas válido para veículos ligeiros nacionais
                      </div>
                    </div>
                  </div>

                  {/* Input + Button row */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (canIdentify) handleIdentify();
                    }}
                    className="flex gap-[8px] items-start relative shrink-0 w-full"
                  >
                    <div className="relative shrink-0 w-[360px]">
                      {activeTab === "matricula" ? (
                        <Input
                          ref={plateInputRef}
                          type="text"
                          value={plate}
                          onChange={handlePlateChange}
                          placeholder="AA-00-AA"
                          className={cn("h-[40px] pr-[40px] bg-white", isLoading && "pr-[40px]", inputError && "border-[#ef4444] focus-visible:border-[#ef4444] focus-visible:ring-[#ef4444]/20")}
                          disabled={isLoading}
                        />
                      ) : (
                        <Input
                          ref={vinInputRef}
                          type="text"
                          value={vinInput}
                          onChange={handleVinChange}
                          placeholder="WVWZZZ1JZXW000001"
                          className={cn("h-[40px] pr-[40px] bg-white", isLoading && "pr-[40px]", inputError && "border-[#ef4444] focus-visible:border-[#ef4444] focus-visible:ring-[#ef4444]/20")}
                          disabled={isLoading}
                        />
                      )}
                      {/* Spinner */}
                      {isLoading && (
                        <div className="absolute right-[12px] top-1/2 -translate-y-1/2 size-[20px]">
                          <svg className="block size-full animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#D4D4D8" strokeWidth="3" fill="none" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="#3F3F46" strokeWidth="3" strokeLinecap="round" fill="none" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Identificar button */}
                    <Button
                      type="submit"
                      disabled={!canIdentify}
                      size="lg"
                      className="shrink-0 cursor-pointer"
                    >
                      Identificar
                    </Button>
                  </form>

                  {/* Info text */}
                  <div className="flex gap-[8px] items-start relative shrink-0 w-full">
                    <div className="overflow-clip relative shrink-0 size-[16px]">
                      <div className="absolute inset-[4.17%]">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                          <path d={svgPaths.p68b4ff0} fill="#09090B" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-[1_0_0] items-center min-h-px min-w-px relative">
                      <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#71717a] text-[12px] text-ellipsis whitespace-pre-wrap">
                        {activeTab === "matricula"
                          ? "Iremos identificar o veículo automaticamente com base na sua matrícula"
                          : "Iremos identificar o veículo automaticamente com base no seu VIN"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Outputs section - shown after identification */}
                {identifiedData && (
                  <>
                    <div className="bg-[rgba(39,39,42,0.15)] h-px shrink-0 w-full" />
                    <div
                      className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(3,minmax(0,1fr))] h-[248px] relative shrink-0 w-full transition-opacity duration-200 ease-out"
                    >
                      {/* Row 1 */}
                      <div className="flex flex-col gap-[6px] items-start relative shrink-0">
                        <Label className="text-[14px] text-[#27272a]">Marca</Label>
                        <Input readOnly disabled value={identifiedData.brand} className="h-[40px] bg-[rgba(39,39,42,0.1)] border-transparent text-[14px] text-[#3f3f46]" />
                      </div>
                      <div className="flex flex-col gap-[6px] items-start relative shrink-0">
                        <Label className="text-[14px] text-[#27272a]">Modelo</Label>
                        <Input readOnly disabled value={identifiedData.model} className="h-[40px] bg-[rgba(39,39,42,0.1)] border-transparent text-[14px] text-[#3f3f46]" />
                      </div>
                      {/* Row 2 */}
                      <div className="flex flex-col gap-[6px] items-start relative shrink-0">
                        <Label className="text-[14px] text-[#27272a]">Versão</Label>
                        <Input readOnly disabled value={identifiedData.version} className="h-[40px] bg-[rgba(39,39,42,0.1)] border-transparent text-[14px] text-[#3f3f46]" />
                      </div>
                      <div className="flex flex-col gap-[6px] items-start relative shrink-0">
                        <Label className="text-[14px] text-[#27272a]">Motorização</Label>
                        <Input readOnly disabled value={identifiedData.engine} className="h-[40px] bg-[rgba(39,39,42,0.1)] border-transparent text-[14px] text-[#3f3f46]" />
                      </div>
                      {/* Row 3 */}
                      <div className="flex flex-col gap-[6px] items-start relative shrink-0">
                        <Label className="text-[14px] text-[#27272a]">Data de matrícula</Label>
                        <Input readOnly disabled value={identifiedData.registrationDate} className="h-[40px] bg-[rgba(39,39,42,0.1)] border-transparent text-[14px] text-[#3f3f46]" />
                      </div>
                      {activeTab === "matricula" ? (
                        <div className="flex flex-col gap-[6px] items-start relative shrink-0">
                          <Label className="text-[14px] text-[#27272a]">VIN</Label>
                          <Input readOnly disabled value={identifiedData.vin} className="h-[40px] bg-[rgba(39,39,42,0.1)] border-transparent text-[14px] text-[#3f3f46]" />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-[6px] items-start relative shrink-0">
                          <Label className="text-[14px] text-[#27272a]">Matrícula</Label>
                          <Input readOnly disabled value={identifiedData.plate} className="h-[40px] bg-[rgba(39,39,42,0.1)] border-transparent text-[14px] text-[#3f3f46]" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              /* Manual selection tab content */
              <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full overflow-visible">
                <div className="flex items-center relative shrink-0 w-full">
                  <p className="flex-[1_0_0] font-normal leading-[1.5] min-h-px min-w-px not-italic overflow-hidden relative text-[#27272a] text-[14px] text-ellipsis whitespace-pre-wrap">Seleciona o ano, marca, modelo e versão do veículo</p>
                </div>
                <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(3,minmax(0,1fr))] h-[248px] relative shrink-0 w-full overflow-visible">
                  {/* Row 1, Col 1: Marca */}
                  <BrandCombobox
                    label="Marca *"
                    value={manualBrand}
                    onChange={(brand) => {
                      setManualBrand(brand);
                      setManualYear("");
                      setManualModel("");
                      setManualVersion("");
                      setManualEngine("");
                      setManualErrors((prev) => { const next = new Set(prev); next.delete("brand"); next.delete("year"); next.delete("model"); next.delete("version"); next.delete("engine"); return next; });
                    }}
                    error={manualErrors.has("brand")}
                  />
                  {/* Row 1, Col 2: Ano */}
                  <YearCombobox
                    label="Ano *"
                    value={manualYear}
                    onChange={(year) => {
                      setManualYear(year);
                      setManualModel("");
                      setManualVersion("");
                      setManualEngine("");
                      setManualErrors((prev) => { const next = new Set(prev); next.delete("year"); next.delete("model"); next.delete("version"); next.delete("engine"); return next; });
                    }}
                    disabled={!manualBrand}
                    error={manualErrors.has("year")}
                  />
                  {/* Row 2, Col 1: Modelo */}
                  <ModelCombobox
                    label="Modelo *"
                    brand={manualBrand}
                    value={manualModel}
                    onChange={(model) => {
                      setManualModel(model);
                      setManualVersion("");
                      setManualEngine("");
                      setManualErrors((prev) => { const next = new Set(prev); next.delete("model"); next.delete("version"); next.delete("engine"); return next; });
                    }}
                    disabled={!manualBrand || !manualYear}
                    error={manualErrors.has("model")}
                  />
                  {/* Row 2, Col 2: Versão */}
                  <VersionCombobox
                    label="Versão *"
                    model={manualModel}
                    year={manualYear}
                    value={manualVersion}
                    onChange={(version) => {
                      setManualVersion(version);
                      setManualEngine("");
                      setManualErrors((prev) => { const next = new Set(prev); next.delete("version"); next.delete("engine"); return next; });
                    }}
                    disabled={!manualModel}
                    error={manualErrors.has("version")}
                  />
                  {/* Row 3, Col 1: Motorização */}
                  <EngineCombobox
                    label="Motorização *"
                    version={manualVersion}
                    value={manualEngine}
                    onChange={(engine) => {
                      setManualEngine(engine);
                      setManualErrors((prev) => { const next = new Set(prev); next.delete("engine"); return next; });
                    }}
                    disabled={!manualVersion}
                    error={manualErrors.has("engine")}
                  />
                  {/* Row 3, Col 2: Matrícula */}
                  <div className="flex flex-col gap-[6px] items-start relative shrink-0">
                    <p className="font-medium leading-[1.5] not-italic text-[#27272a] text-[14px]">Matrícula</p>
                    <Input
                      type="text"
                      value={manualPlate}
                      onChange={(e) => setManualPlate(formatPlateInput(e.target.value))}
                      placeholder="AA-00-AA"
                      className="w-full min-h-[40px] h-[40px] bg-white rounded-[8px] border-[#e5e5e5] text-[14px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Tabs>

        {/* Footer buttons */}
        <div className="flex items-center justify-end relative shrink-0 w-full">
          <div className="flex gap-[8px] items-center relative shrink-0">
            <Button
              variant="ghost"
              size="lg"
              onClick={onClose}
              className="cursor-pointer"
            >
              Cancelar
            </Button>

            <Button
              onClick={handleAdd}
              size="lg"
              className="cursor-pointer"
            >
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}