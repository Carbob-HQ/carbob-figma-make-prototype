import { useState, useEffect, useRef } from "react";
import { Loader2, CirclePlus, Car } from "lucide-react";
import svgPaths from "../../imports/svg-g6n61e5umj";
import svgPathsVehicle from "../../imports/svg-psklxsa2su";
import renaultClioImg from "figma:asset/971d9046756a1e32d8e7cdd4cbdb495f422b5cd2.png";
import vwPoloImg from "figma:asset/b3cc269a347518079f03162521c3d5ebe8fa17ec.png";
import mercedesGlbImg from "figma:asset/9a2e7dd4abbe513aeb039cbd08a9783bd86b4839.png";
import bmwZ4Img from "figma:asset/6e81c71bfd483fcdf295fab38eea1451ad88a67e.png";

export interface Vehicle {
  id: string;
  clientName: string;
  plate: string;
  brand: string;
  model: string;
  version: string;
  engine: string;
  year: number;
  registrationDate: string;
  vin: string;
  km: string;
  displacement: number;
  power: number;
  fuel: string;
  engineCode: string;
  notes?: string;
  imageUrl?: string;
  noOdometer?: boolean;
}

// Mock vehicle database
const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    clientName: "Raúl Fernandes",
    plate: "AV-59-ZZ",
    brand: "Renault",
    model: "Clio",
    version: "Clio IV",
    engine: "1.5 dCi",
    year: 2020,
    registrationDate: "03/2020",
    vin: "VR3UDYHZSNJ838169",
    km: "50.232",
    displacement: 1499,
    power: 75,
    fuel: "Gasleo",
    engineCode: "BHY (DV6FD)",
    imageUrl: renaultClioImg,
  },
  {
    id: "v2",
    clientName: "João Silva",
    plate: "AV-69-ZQ",
    brand: "BMW",
    model: "Z4 Roadster",
    version: "Z4 Roadster (E86)",
    engine: "2.2 i",
    year: 2004,
    registrationDate: "08/2004",
    vin: "WBABT11010LN54700",
    km: "87.340",
    displacement: 2171,
    power: 170,
    fuel: "Gasolina",
    engineCode: "BHY (DV6FD)",
    imageUrl: bmwZ4Img,
  },
  {
    id: "v3",
    clientName: "João Silva",
    plate: "99-VT-77",
    brand: "Volkswagen",
    model: "Polo",
    version: "Polo VI",
    engine: "1.0 TSI",
    year: 2017,
    registrationDate: "12/2018",
    vin: "WVWZZZAWZKY064864",
    km: "35.200",
    displacement: 999,
    power: 95,
    fuel: "Gasolina",
    engineCode: "BHY (DV6FD)",
    imageUrl: vwPoloImg,
  },
  {
    id: "v4",
    clientName: "Tiago Gomes",
    plate: "BA-71-CC",
    brand: "Mercedes-Benz",
    model: "GLB",
    version: "GLB 2020 (X247)",
    engine: "GLB 180 d",
    year: 2019,
    registrationDate: "04/2023",
    vin: "W1N4M1AB3PW293130",
    km: "28.450",
    displacement: 1950,
    power: 116,
    fuel: "Gasóleo",
    engineCode: "BHY (DV6FD)",
    imageUrl: mercedesGlbImg,
  },
];

export function addVehicleToDatabase(vehicle: Vehicle) {
  if (!mockVehicles.find((v) => v.id === vehicle.id)) {
    mockVehicles.push(vehicle);
  }
}

export function getVehiclesByClientName(clientName: string): Vehicle[] {
  if (!clientName) return [];
  return mockVehicles.filter((v) => v.clientName === clientName);
}

export function getClientNameByVehicleId(vehicleId: string): string {
  const vehicle = mockVehicles.find((v) => v.id === vehicleId);
  return vehicle?.clientName || "";
}

export function updateVehicleClient(vehicleId: string, newClientName: string) {
  const vehicle = mockVehicles.find((v) => v.id === vehicleId);
  if (vehicle) {
    vehicle.clientName = newClientName;
  }
}

export function updateVehicleNotes(vehicleId: string, notes: string) {
  const vehicle = mockVehicles.find((v) => v.id === vehicleId);
  if (vehicle) {
    vehicle.notes = notes;
  }
}

export function updateVehicleKm(vehicleId: string, km: string, noOdometer?: boolean) {
  const vehicle = mockVehicles.find((v) => v.id === vehicleId);
  if (vehicle) {
    vehicle.km = km;
    if (noOdometer !== undefined) {
      vehicle.noOdometer = noOdometer;
    }
  }
}

function VehicleResultFrame({ vehicle, onSelect }: { vehicle: Vehicle; onSelect?: (vehicle: Vehicle) => void }) {
  return (
    <div
      className="bg-white content-stretch flex gap-[12px] items-center justify-center px-[8px] py-[6px] relative rounded-[6px] w-full cursor-pointer transition-colors hover:bg-[#e9ebef]"
      data-name="Vehicle Frame"
      onClick={() => onSelect?.(vehicle)}
    >
      {/* Avatar with car icon */}
      <div className="bg-zinc-300 flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Light Mode / Avatar">
        <Car className="size-[16px] text-[#27272A]" />
      </div>
      {/* Content Frame */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
        {/* Line 1: Brand Model */}
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Vehicle">
          <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">
            {vehicle.brand} {vehicle.model}
          </p>
        </div>
        {/* Line 2: Plate | Client Name */}
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Description">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis">
            {vehicle.plate}{vehicle.clientName ? ` | ${vehicle.clientName}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-white min-w-[192px] relative shrink-0 w-full h-[62px]" data-name="Loading">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l-0 border-r-0 border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center items-center min-w-[inherit] size-full">
        <Loader2 className="w-6 h-6 text-[#8270ff] animate-spin" />
      </div>
    </div>
  );
}

interface VehicleSearchPopupProps {
  onSelectVehicle?: (vehicle: Vehicle) => void;
  selectedVehicle?: Vehicle | null;
  onNewVehicle?: () => void;
  associatedVehicles?: Vehicle[];
}

export default function VehicleSearchPopup({ onSelectVehicle, selectedVehicle, onNewVehicle, associatedVehicles }: VehicleSearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setShowResults(false);
      setFilteredVehicles([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    const timer = setTimeout(() => {
      const query = searchQuery.toUpperCase().replace(/[-\s]/g, "");
      const results = mockVehicles.filter((vehicle) => {
        const plateClean = vehicle.plate.replace(/-/g, "").toUpperCase();
        const vinClean = vehicle.vin.toUpperCase();
        return plateClean.includes(query) || vinClean.includes(query);
      });

      setFilteredVehicles(results);
      setIsLoading(false);
      setShowResults(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setFilteredVehicles([]);
    inputRef.current?.focus();
  };

  return (
    <div className="content-stretch flex flex-col items-start relative shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] w-[320px] rounded-[8px] border border-[#e5e5e5]" data-name="Light Mode / Context Popup">

      {/* Search Frame */}
      <div className="bg-white content-stretch flex flex-col items-start justify-center min-w-[192px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Submenu 1">
        <div className="h-[44px] relative shrink-0 w-full" data-name="Search Frame">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[5px] py-[5px] relative size-full overflow-clip rounded-[inherit]">
              <div className="flex flex-1 items-center gap-[8px] min-w-0 h-full border border-[#e5e5e5] rounded-[8px] px-[10px] py-[4px] transition-[box-shadow,border-color] duration-200 ease-out has-[:focus]:border-[#8270ff] has-[:focus]:ring-[3px] has-[:focus]:ring-[#8270ff]/25">
                {/* Search icon */}
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Left Icon">
                  <div className="absolute inset-[8.33%]" data-name="Vector (Stroke)">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6668 16.6665">
                      <path d={svgPaths.p3b794500} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
                    </svg>
                  </div>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Pesquisar por matrícula ou VIN"
                  className="flex-[1_0_0] min-h-px min-w-px font-normal leading-[1.5] not-italic text-[14px] bg-transparent border-none outline-none text-[#27272a] placeholder:text-[#d4d4d8]"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="flex items-center justify-center size-[24px] shrink-0 rounded-[4px] cursor-pointer hover:bg-[#e9ebef] transition-colors"
                  >
                    <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                      <path d="M12.4697 3.53033C12.7626 3.23744 12.7626 2.76256 12.4697 2.46967C12.1768 2.17678 11.7019 2.17678 11.409 2.46967L7.99935 5.87868L4.58968 2.46967C4.29679 2.17678 3.82191 2.17678 3.52902 2.46967C3.23613 2.76256 3.23613 3.23744 3.52902 3.53033L6.93869 6.94L3.52902 10.3497C3.23613 10.6426 3.23613 11.1174 3.52902 11.4103C3.82191 11.7032 4.29679 11.7032 4.58968 11.4103L7.99935 8.00132L11.409 11.4103C11.7019 11.7032 12.1768 11.7032 12.4697 11.4103C12.7626 11.1174 12.7626 10.6426 12.4697 10.3497L9.06001 6.94L12.4697 3.53033Z" fill="#A1A1AA" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results or Loading - animated with grid */}
      <div
        className="grid w-full transition-[grid-template-rows,opacity] duration-200 ease-out"
        style={{
          gridTemplateRows: isLoading || showResults ? "1fr" : "0fr",
          opacity: isLoading || showResults ? 1 : 0,
        }}
      >
        <div className="overflow-hidden min-h-0">
          {isLoading && <LoadingState />}

          {showResults && filteredVehicles.length > 0 && (
            <div className="bg-white min-w-[192px] relative shrink-0 w-full" data-name="Submenu 2">
              <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l-0 border-r-0 border-solid border-t inset-0 pointer-events-none" />
              <div className="flex flex-col justify-center min-w-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[5px] relative w-full">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleResultFrame key={vehicle.id} vehicle={vehicle} onSelect={onSelectVehicle} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {showResults && filteredVehicles.length === 0 && (
            <div className="bg-white min-w-[192px] relative shrink-0 w-full h-[62px]" data-name="No Results">
              <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l-0 border-r-0 border-solid border-t inset-0 pointer-events-none" />
              <div className="flex flex-col justify-center items-center min-w-[inherit] size-full">
                <p className="font-normal leading-[1.5] not-italic text-[#71717a] text-[14px]">Nenhum veículo encontrado</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submenu 2: Show associated vehicles (includes selected) when available, otherwise show selected vehicle only */}
      {!isLoading && !showResults && searchQuery.trim() === "" && (() => {
        // If we have associated vehicles from a client, always show all of them
        if (associatedVehicles && associatedVehicles.length > 0) {
          return (
            <div className="bg-white min-w-[192px] relative shrink-0 w-full" data-name="Submenu 2">
              <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l-0 border-r-0 border-solid border-t inset-0 pointer-events-none" />
              <div className="flex flex-col justify-center min-w-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[5px] relative w-full">
                  {associatedVehicles.map((vehicle) => (
                    <VehicleResultFrame key={vehicle.id} vehicle={vehicle} onSelect={onSelectVehicle} />
                  ))}
                </div>
              </div>
            </div>
          );
        }
        // If no associated vehicles but there is a selected vehicle, show it
        if (selectedVehicle) {
          return (
            <div className="bg-white min-w-[192px] relative shrink-0 w-full" data-name="Submenu 2">
              <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l-0 border-r-0 border-solid border-t inset-0 pointer-events-none" />
              <div className="flex flex-col justify-center min-w-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[5px] relative w-full">
                  <VehicleResultFrame vehicle={selectedVehicle} onSelect={onSelectVehicle} />
                </div>
              </div>
            </div>
          );
        }
        return null;
      })()}

      {/* Bottom - Novo veículo */}
      <div className="bg-white min-w-[192px] relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="Submenu 3">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l-0 border-r-0 border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-col justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[5px] relative w-full">
            <button onClick={onNewVehicle} className="content-stretch cursor-pointer flex items-start relative shrink-0 w-full" data-name="New Vehicle">
              <div className="bg-white flex-[1_0_0] min-h-px min-w-[180px] relative rounded-[6px] w-full transition-colors hover:bg-[#e9ebef]" data-name="Context Button">
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] px-[8px] py-[6px] relative w-full">
                    <CirclePlus className="w-5 h-5 text-[#8270ff] shrink-0" />
                    <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#8270ff] text-[14px] text-left whitespace-pre-wrap">Novo veículo</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}