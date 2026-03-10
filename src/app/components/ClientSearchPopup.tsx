import { useState, useEffect, useRef } from "react";
import svgPaths from "../../imports/svg-wfav1bxa5s";
import svgPathsClientFrame from "../../imports/svg-84svbglmnm";
import { Loader2, CirclePlus, UserRound } from "lucide-react";

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  initials: string;
  isEndConsumer?: boolean;
  nif?: string;
  preferredContact?: string;
  notes?: string;
}

// Mock client database
const mockClients: Client[] = [
  {
    id: "1",
    name: "Raúl Fernandes",
    phone: "917898413",
    email: "rfernandes84@gmail.com",
    initials: "RF",
    nif: "264 823 796",
    preferredContact: "Telefone",
    notes: "Cliente preferencial. Prefere ser contactado ao final do dia.",
  },
  {
    id: "2",
    name: "João Silva",
    phone: "912413791",
    email: "joao_silva@gmail.com",
    initials: "JS",
    nif: "213 456 789",
    preferredContact: "Email",
  },
  {
    id: "3",
    name: "Tiago Gomes",
    phone: "912232425",
    email: "tiago_gomes93@gmail.com",
    initials: "TG",
    nif: "198 765 432",
    preferredContact: "Telefone",
    notes: "Veículo de empresa — faturar ao NIF da empresa.",
  },
];

export function addClientToDatabase(client: Client) {
  // Avoid duplicates
  if (!mockClients.find((c) => c.id === client.id)) {
    mockClients.push(client);
  }
}

export function updateClientNotes(clientId: string, notes: string) {
  const client = mockClients.find((c) => c.id === clientId);
  if (client) {
    client.notes = notes;
  }
}

export function getClientByName(name: string): Client | null {
  if (!name) return null;
  return mockClients.find((c) => c.name === name) || null;
}

function LeftIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Left Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Left Icon">
          <path d={svgPaths.p19f95600} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function X({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative shrink-0 size-[16px] cursor-pointer"
      data-name="x"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p5d91500} fill="var(--fill-0, #A1A1AA)" id="Vector (Stroke)" />
        </g>
      </svg>
    </button>
  );
}

function UserRoundSvg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="user-round">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="user-round">
          <path d={svgPaths.p112cb400} fill="var(--fill-0, #27272A)" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function ClientFrame({ client, onSelect }: { client: Client; onSelect?: (client: Client) => void }) {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center min-w-[180px] px-[8px] py-[6px] relative rounded-[6px] w-full cursor-pointer transition-colors hover:bg-[#e9ebef]" data-name="Client Frame" onClick={() => onSelect?.(client)}>
      {/* Icon Frame - circle with initials */}
      <div className="bg-[#d4d4d8] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Left Icon">
        <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
          <span className="text-[12px] font-medium leading-[1.5] text-[#27272a]">{client.initials}</span>
        </div>
        
      </div>
      {/* Content Frame */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Name">
          <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">{client.name}</p>
        </div>
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Description">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis">
            {client.isEndConsumer
              ? "Sem dados de cliente"
              : [
                  client.phone ? client.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3") : "",
                  client.email || "",
                ].filter(Boolean).join(" | ")}
          </p>
        </div>
      </div>
    </div>
  );
}

function EndConsumerFrame({ onSelect }: { onSelect?: () => void }) {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-center min-w-[180px] px-[8px] py-[6px] relative rounded-[6px] w-full cursor-pointer transition-colors hover:bg-[#e9ebef]" data-name="End Consumer Frame" onClick={onSelect}>
      {/* Icon Frame - circle with user icon */}
      <div className="bg-[#d4d4d8] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Left Icon">
        <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
          <UserRound className="size-[16px] text-[#27272a]" />
        </div>
        
      </div>
      {/* Content Frame */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Content Frame">
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Name">
          <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#27272a] text-[14px] whitespace-pre-wrap">Consumidor final</p>
        </div>
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Description">
          <p className="font-normal leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[#71717a] text-[12px] text-ellipsis">Sem dados de cliente</p>
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

export default function ClientSearchPopup({ onSelectClient, selectedClient, onNewClient, associatedClient }: { onSelectClient?: (client: Client) => void; selectedClient?: Client | null; onNewClient?: () => void; associatedClient?: Client | null }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the search input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setShowResults(false);
      setFilteredClients([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    const timer = setTimeout(() => {
      // Search logic: filter by name, phone, or email
      const normalize = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const query = searchQuery.toLowerCase().replace(/\s/g, "");
      const normalizedQuery = normalize(searchQuery);
      const results = mockClients.filter((client) => {
        const nameMatch = normalize(client.name).includes(normalizedQuery);
        const phoneMatch = client.phone.includes(query);
        const emailMatch = client.email.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || phoneMatch || emailMatch;
      });

      setFilteredClients(results);
      setIsLoading(false);
      setShowResults(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setFilteredClients([]);
  };

  const handleSelectEndConsumer = () => {
    onSelectClient?.({
      id: "end-consumer",
      name: "Consumidor final",
      phone: "",
      email: "",
      initials: "CF",
      isEndConsumer: true,
    });
  };

  return (
    <div className="content-stretch flex flex-col items-start relative shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] w-[320px] rounded-[8px] border border-[#e5e5e5]" data-name="Light Mode / Context Popup">

      {/* Search Frame */}
      <div className="bg-white content-stretch flex flex-col items-start justify-center min-w-[192px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Submenu 1">
        <div className="h-[44px] relative shrink-0 w-full" data-name="Search Frame">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[5px] py-[5px] relative size-full overflow-clip rounded-[inherit]">
              <div className="flex flex-1 items-center gap-[8px] min-w-0 h-full border border-[#e5e5e5] rounded-[8px] px-[10px] py-[4px] transition-[box-shadow,border-color] duration-200 ease-out has-[:focus]:border-[#8270ff] has-[:focus]:ring-[3px] has-[:focus]:ring-[#8270ff]/25">
                <LeftIcon />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar por nome, telefone ou email"
                  className="flex-[1_0_0] min-h-px min-w-px font-normal leading-[1.5] not-italic text-[14px] bg-transparent border-none outline-none text-[#27272a] placeholder:text-[#d4d4d8]"
                />
                {searchQuery && (
                  <div className="content-stretch flex items-center justify-center size-[24px] shrink-0 rounded-[4px] cursor-pointer hover:bg-[#e9ebef] transition-colors" data-name="Light Mode / Button">
                    <X onClick={handleClearSearch} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results or Loading - animated with grid for smooth height */}
      <div
        className="grid w-full transition-[grid-template-rows,opacity] duration-200 ease-out"
        style={{
          gridTemplateRows: isLoading ? "1fr" : "0fr",
          opacity: isLoading ? 1 : 0,
        }}
      >
        <div className="overflow-hidden min-h-0">
          {isLoading && <LoadingState />}
        </div>
      </div>

      {/* Submenu 2 — always visible: search results (if any) + Consumidor final at the end */}
      {!isLoading && (
        <div className="bg-white min-w-[192px] relative shrink-0 w-full" data-name="Submenu 2">
          <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l-0 border-r-0 border-solid border-t inset-0 pointer-events-none" />
          <div className="flex flex-col justify-center min-w-[inherit] size-full">
            <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[5px] relative w-full">
              {/* Search results */}
              {showResults && filteredClients.map((client) => (
                <ClientFrame key={client.id} client={client} onSelect={onSelectClient} />
              ))}
              {/* Show currently selected client when search is empty */}
              {!showResults && selectedClient && !selectedClient.isEndConsumer && searchQuery.trim() === "" && (
                <ClientFrame key={selectedClient.id} client={selectedClient} onSelect={onSelectClient} />
              )}
              {/* Show associated client when no search, no selected client */}
              {!showResults && !selectedClient && associatedClient && searchQuery.trim() === "" && (
                <ClientFrame key={associatedClient.id} client={associatedClient} onSelect={onSelectClient} />
              )}
              {/* Consumidor final — always last */}
              <EndConsumerFrame onSelect={handleSelectEndConsumer} />
            </div>
          </div>
        </div>
      )}

      {/* Bottom buttons — Novo cliente only */}
      <div className="bg-white min-w-[192px] relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="Submenu 3">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-l-0 border-r-0 border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-col justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-center min-w-[inherit] p-[5px] relative w-full">
            {/* Novo cliente */}
            <button onClick={onNewClient} className="content-stretch cursor-pointer flex items-start relative shrink-0 w-full" data-name="New Client">
              <div className="bg-white flex-[1_0_0] min-h-px min-w-[180px] relative rounded-[6px] w-full transition-colors hover:bg-[#e9ebef]" data-name="Context Button 2.1">
                <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
                  <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] px-[8px] py-[6px] relative w-full">
                    <CirclePlus className="w-5 h-5 text-[#8270ff] shrink-0" />
                    <p className="flex-[1_0_0] font-medium leading-[1.5] min-h-px min-w-px not-italic relative text-[#8270ff] text-[14px] text-left whitespace-pre-wrap">Novo cliente</p>
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