import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";
import svgPathsContacto from "../../imports/svg-20o89e9dyh";
import svgPathsFaturacao from "../../imports/svg-2964oc9jyx";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

type ContactMethod = "sms" | "email" | "ambos";
type TabType = "contacto" | "faturacao";

// Generate flag emoji from 2-letter country code
const countryCodeToFlag = (code: string) =>
  code.toUpperCase().split("").map(c => String.fromCodePoint(127397 + c.charCodeAt(0))).join("");

// Build full country list from libphonenumber-js with Portuguese names via Intl
const displayNames = new Intl.DisplayNames(["pt"], { type: "region" });

const ALL_COUNTRIES = getCountries().map((code) => ({
  code,
  name: displayNames.of(code) || code,
  dial: `+${getCountryCallingCode(code)}`,
  flag: countryCodeToFlag(code),
}));

// Sort alphabetically in Portuguese, but pin Portugal to top
ALL_COUNTRIES.sort((a, b) => {
  if (a.code === "PT") return -1;
  if (b.code === "PT") return 1;
  return a.name.localeCompare(b.name, "pt");
});

interface AddNewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: {
    name: string;
    phone: string;
    email: string;
    contactMethod: ContactMethod;
    nif?: string;
    fiscalName?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    country?: string;
  }) => void;
}

// Mock NIF lookup data
const mockNifData: Record<string, { name: string; address: string; postalCode: string; city: string; country: string }> = {
  "default": {
    name: "Carbob, Lda.",
    address: "Rua de São Bento 538, 2",
    postalCode: "1250-222",
    city: "Lisboa",
    country: "Portugal",
  },
};

export default function AddNewClientModal({ isOpen, onClose, onAddClient }: AddNewClientModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("contacto");
  const [tabAnimating, setTabAnimating] = useState(true);

  // Contacto fields
  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("sms");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Faturação fields
  const [nif, setNif] = useState("");
  const [fiscalName, setFiscalName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Portugal");
  const [nifLoading, setNifLoading] = useState(false);

  // Modal animation
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      // Focus name input after animation
      setTimeout(() => nameInputRef.current?.focus(), 220);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Reset form on close
        setActiveTab("contacto");
        setName("");
        setContactMethod("sms");
        setPhone("");
        setEmail("");
        setPhoneError("");
        setEmailError("");
        setNif("");
        setFiscalName("");
        setAddress("");
        setPostalCode("");
        setCity("");
        setCountry("Portugal");
        setNifLoading(false);
        setErrorFields(new Set());
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Tab switch animation
  const handleTabSwitch = (tab: TabType) => {
    if (tab === activeTab) return;
    setTabAnimating(false);
    setTimeout(() => {
      setActiveTab(tab);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTabAnimating(true);
        });
      });
    }, 200);
  };

  // NIF search
  const isNifCompany = nif.startsWith("5") && nif.length > 0;

  const handleNifSearch = () => {
    if (!isNifCompany) return;
    setNifLoading(true);
    setTimeout(() => {
      const data = mockNifData[nif] || mockNifData["default"];
      if (data) {
        setFiscalName(data.name);
        setAddress(data.address);
        setPostalCode(data.postalCode);
        setCity(data.city);
      }
      setNifLoading(false);
    }, 800);
  };

  // Validation
  const isPhoneRequired = contactMethod === "sms" || contactMethod === "ambos";
  const isEmailRequired = contactMethod === "email" || contactMethod === "ambos";

  // ── Required-field validation (same pattern as NewItemSheet) ──
  const [errorFields, setErrorFields] = useState<Set<string>>(new Set());

  const clearError = (field: string) => {
    setErrorFields((prev) => {
      if (!prev.has(field)) return prev;
      const next = new Set(prev);
      next.delete(field);
      return next;
    });
  };

  const validate = (): boolean => {
    const errors = new Set<string>();
    if (!name.trim()) errors.add("name");
    if (isPhoneRequired && !phone.trim()) errors.add("phone");
    if (isEmailRequired && !email.trim()) errors.add("email");
    if (phoneError) errors.add("phone");
    if (emailError) errors.add("email");
    setErrorFields(errors);
    if (errors.size > 0) {
      // Switch to contacto tab since all required fields are there
      if (activeTab !== "contacto") {
        setTabAnimating(false);
        setTimeout(() => {
          setActiveTab("contacto");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTabAnimating(true);
              // scroll after tab switch
              setTimeout(() => {
                const first = document.querySelector("[data-client-field]");
                if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 50);
            });
          });
        }, 200);
      } else {
        requestAnimationFrame(() => {
          const firstErr = document.querySelector("[data-client-field]");
          if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      }
      return false;
    }
    return true;
  };

  // Clear errors on tab switch
  useEffect(() => {
    setErrorFields(new Set());
  }, [activeTab]);

  const handleAdd = () => {
    if (!validate()) return;
    const capitalizedName = name.replace(/\S+/g, (word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    onAddClient({
      name: capitalizedName,
      phone,
      email,
      contactMethod,
      nif: nif || undefined,
      fiscalName: fiscalName || undefined,
      address: address || undefined,
      postalCode: postalCode || undefined,
      city: city || undefined,
      country,
    });
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-200 ease-out"
      style={{ opacity: isAnimating ? 1 : 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="bg-[#f4f4f5] flex flex-col gap-[24px] items-start p-[24px] relative rounded-[12px] w-[576px] max-h-[90vh] overflow-auto z-10">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />

        {/* Header */}
        <div className="flex gap-[12px] items-start relative shrink-0 w-full">
          <div className="flex flex-[1_0_0] flex-col gap-[8px] items-center justify-center min-h-px min-w-px relative">
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[16px] w-full whitespace-pre-wrap">Adicionar novo cliente</p>
          </div>
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center max-h-[32px] max-w-[32px] min-h-[32px] min-w-[32px] right-[-8px] rounded-[6px] size-[32px] top-[-8px] cursor-pointer hover:bg-[#e5e5e5] transition-colors duration-200 ease-out"
          >
            <div className="overflow-clip relative shrink-0 size-[16px]">
              <div className="absolute inset-[20.83%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33323 9.33323">
                  <path d={svgPathsContacto.p2bd57f80} fill="#27272A" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => handleTabSwitch(v as TabType)}
          className="flex flex-col gap-[24px] items-start relative w-full"
        >
          <TabsList variant="line">
            <TabsTrigger value="contacto">Contacto</TabsTrigger>
            <TabsTrigger value="faturacao">Faturação</TabsTrigger>
          </TabsList>

          {/* Tab Content with dissolve animation */}
          <div
            className="flex flex-col gap-[16px] items-start relative shrink-0 w-full transition-opacity duration-200 ease-out"
            style={{ opacity: tabAnimating ? 1 : 0 }}
          >
            {activeTab === "contacto" ? (
              <ContactoTab
                name={name}
                setName={setName}
                contactMethod={contactMethod}
                setContactMethod={setContactMethod}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                isPhoneRequired={isPhoneRequired}
                isEmailRequired={isEmailRequired}
                nameInputRef={nameInputRef}
                phoneError={phoneError}
                setPhoneError={setPhoneError}
                emailError={emailError}
                setEmailError={setEmailError}
                errorFields={errorFields}
                clearError={clearError}
              />
            ) : (
              <FaturacaoTab
                nif={nif}
                setNif={setNif}
                fiscalName={fiscalName}
                setFiscalName={setFiscalName}
                address={address}
                setAddress={setAddress}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
                city={city}
                setCity={setCity}
                country={country}
                setCountry={setCountry}
                isNifCompany={isNifCompany}
                nifLoading={nifLoading}
                onNifSearch={handleNifSearch}
              />
            )}
          </div>
        </Tabs>

        {/* Buttons */}
        <div className="flex gap-[8px] items-start justify-end relative shrink-0 w-full">
          <button
            onClick={onClose}
            className="flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0 cursor-pointer bg-transparent border-none hover:bg-[#e5e5e5] transition-colors duration-200 ease-out"
          >
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[#27272a] text-[14px] text-left">Cancelar</p>
          </button>
          <button
            onClick={handleAdd}
            className="bg-[#27272a] flex gap-[8px] items-center justify-center max-h-[40px] min-h-[40px] px-[16px] relative rounded-[8px] shrink-0 border-none cursor-pointer transition-colors duration-200 ease-out hover:bg-[#3f3f46]"
          >
            <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
            <p className="font-medium leading-[1.5] not-italic relative shrink-0 text-[14px] text-white">Adicionar</p>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_black,inset_0px_2px_0px_0px_rgba(255,255,255,0.2)]" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ======================== Contacto Tab ======================== */

function ContactoTab({
  name, setName,
  contactMethod, setContactMethod,
  phone, setPhone,
  email, setEmail,
  isPhoneRequired, isEmailRequired,
  nameInputRef,
  phoneError,
  setPhoneError,
  emailError,
  setEmailError,
  errorFields,
  clearError,
}: {
  name: string; setName: (v: string) => void;
  contactMethod: ContactMethod; setContactMethod: (v: ContactMethod) => void;
  phone: string; setPhone: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  isPhoneRequired: boolean; isEmailRequired: boolean;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  phoneError: string;
  setPhoneError: (v: string) => void;
  emailError: string;
  setEmailError: (v: string) => void;
  errorFields: Set<string>;
  clearError: (field: string) => void;
}) {
  const [selectedCountry, setSelectedCountry] = useState(ALL_COUNTRIES.find(c => c.code === "PT")!); // Portugal
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const countryBtnRef = useRef<HTMLButtonElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredCountries = ALL_COUNTRIES.filter((c) => {
    const q = normalize(countrySearch);
    return normalize(c.name).includes(q) || c.dial.includes(countrySearch);
  });

  const openCountryDropdown = () => {
    setCountrySearch("");
    if (countryBtnRef.current) {
      const rect = countryBtnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 4, left: rect.left });
    }
    setCountryDropdownOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDropdownVisible(true);
        countrySearchRef.current?.focus();
      });
    });
  };

  const closeCountryDropdown = () => {
    setDropdownVisible(false);
    setTimeout(() => setCountryDropdownOpen(false), 200);
  };

  useEffect(() => {
    if (!countryDropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node) &&
        countryBtnRef.current &&
        !countryBtnRef.current.contains(e.target as Node)
      ) {
        closeCountryDropdown();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [countryDropdownOpen]);

  // Re-validate phone when country changes
  useEffect(() => {
    if (phone.length > 0) {
      const parsedNumber = parsePhoneNumberFromString(phone, selectedCountry.code as CountryCode);
      if (!parsedNumber || !parsedNumber.isValid()) {
        setPhoneError("Número de telefone inválido");
      } else {
        setPhoneError("");
      }
    } else {
      setPhoneError("");
    }
  }, [selectedCountry]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setPhone(val);
    if (val.length > 0) {
      const parsedNumber = parsePhoneNumberFromString(val, selectedCountry.code as CountryCode);
      if (!parsedNumber || !parsedNumber.isValid()) {
        setPhoneError("Número de telefone inválido");
      } else {
        setPhoneError("");
      }
    } else {
      setPhoneError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (val.length > 0 && !/\S+@\S+\.\S+/.test(val)) {
      setEmailError("Endereço de email inválido");
    } else {
      setEmailError("");
    }
  };

  return (
    <>
      {/* Nome */}
      <div
        className="flex flex-col gap-[8px] items-start relative shrink-0 w-full"
        {...(errorFields.has("name") ? { "data-client-field": "name" } : {})}
      >
        <Label>Nome</Label>
        <Input
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); clearError("name"); }}
          className={`h-[40px] bg-white${errorFields.has("name") ? " border-[#ef4444] focus-visible:border-[#ef4444] focus-visible:ring-[#ef4444]/20" : ""}`}
        />
        {errorFields.has("name") && <span className="text-[12px] text-[#ef4444] leading-[1.5]">Campo obrigatório</span>}
      </div>

      {/* Método preferencial de contacto */}
      <div className="flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
        <Label>Contacto preferencial</Label>
        <RadioGroup
          value={contactMethod}
          onValueChange={(v) => setContactMethod(v as ContactMethod)}
          className="flex gap-[12px] items-start w-full"
        >
          {([["sms", "SMS"], ["email", "Email"], ["ambos", "Ambos"]] as const).map(([value, label]) => (
            <label
              key={value}
              className={`flex flex-[1_0_0] items-start gap-[12px] p-[16px] relative rounded-[8px] cursor-pointer transition-colors duration-200 ease-out ${contactMethod === value ? "bg-[rgba(39,39,42,0.05)]" : "bg-white"}`}
            >
              <div
                aria-hidden="true"
                className={`absolute border border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors duration-200 ease-out ${contactMethod === value ? "border-[#8270ff]" : "border-[#e5e5e5]"}`}
              />
              <span className="flex-1 font-medium leading-[1.5] text-[#27272a] text-[14px]">{label}</span>
              <RadioGroupItem value={value} className="size-[18px] border-[#e5e5e5] data-[state=checked]:border-[#27272a] data-[state=checked]:bg-[#27272a] data-[state=checked]:text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Número de telefone */}
      <div
        className="flex flex-col gap-[8px] items-start relative shrink-0 w-full"
        {...(errorFields.has("phone") ? { "data-client-field": "phone" } : {})}
      >
        <Label>Número de telefone</Label>
        <div className="flex flex-col gap-[8px] relative w-full">
          <div className={`relative w-full flex rounded-md${phoneError || errorFields.has("phone") ? " ring-1 ring-[#ef4444]" : ""}`}>
            {/* Country code button */}
            <button
              ref={countryBtnRef}
              type="button"
              onClick={() => countryDropdownOpen ? closeCountryDropdown() : openCountryDropdown()}
              className="flex items-center gap-[8px] h-[40px] px-[12px] bg-white border border-[var(--input)] rounded-l-md border-r-0 cursor-pointer hover:bg-[#e5e5e5] transition-colors duration-200 ease-out shrink-0"
            >
              <span className="text-[16px] leading-none">{selectedCountry.flag}</span>
              <span className="text-[14px] text-[#27272a] leading-[1.5]">{selectedCountry.dial}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="ml-[2px]">
                <path d="M1 1L5 5L9 1" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Phone input */}
            <Input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => { handlePhoneChange(e); clearError("phone"); }}
              className="h-[40px] bg-white rounded-l-none flex-1"
            />

          </div>

          {/* Country dropdown — portal */}
          {countryDropdownOpen && dropdownPos && createPortal(
            <div
              ref={countryDropdownRef}
              className="fixed w-[280px] bg-white rounded-[8px] border border-[#e5e5e5] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)] z-[200] flex flex-col transition-opacity duration-200 ease-out overflow-hidden"
              style={{ opacity: dropdownVisible ? 1 : 0, top: dropdownPos.top, left: dropdownPos.left }}
            >
              {/* Search */}
              <div className="flex items-center gap-[8px] px-[12px] py-[8px] border-b border-[#e5e5e5]">
                <Search className="size-4 text-[#71717a] shrink-0" />
                <input
                  ref={countrySearchRef}
                  type="text"
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  placeholder="Pesquisar país..."
                  className="flex-1 text-[14px] text-[#27272a] placeholder:text-[#71717a] outline-none bg-transparent"
                />
              </div>
              {/* List */}
              <div className="max-h-[200px] overflow-y-auto py-[4px]">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(c);
                        closeCountryDropdown();
                      }}
                      className={`flex items-center gap-[12px] w-full px-[12px] py-[8px] cursor-pointer border-none bg-transparent hover:bg-[#f4f4f5] transition-colors duration-200 ease-out ${selectedCountry.code === c.code ? "bg-[rgba(39,39,42,0.05)]" : ""}`}
                    >
                      <span className="text-[16px] leading-none">{c.flag}</span>
                      <span className="text-[14px] text-[#27272a] leading-[1.5] flex-1 text-left">{c.name}</span>
                      <span className="text-[14px] text-[#71717a] leading-[1.5]">{c.dial}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-[12px] py-[8px]">
                    <p className="text-[14px] text-[#71717a] leading-[1.5]">Sem resultados</p>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
          {phoneError && (
            <p className="text-[13px] text-[#ef4444] leading-[1.5]">{phoneError}</p>
          )}
          {!phoneError && errorFields.has("phone") && <span className="text-[12px] text-[#ef4444] leading-[1.5]">Campo obrigatório</span>}
        </div>
      </div>

      {/* Endereço de email */}
      <div
        className="flex flex-col gap-[8px] items-start relative shrink-0 w-full"
        {...(errorFields.has("email") ? { "data-client-field": "email" } : {})}
      >
        <Label>Endereço de email</Label>
        <div className="flex flex-col gap-[8px] relative w-full">
          <Input
            type="email"
            value={email}
            onChange={(e) => { handleEmailChange(e); clearError("email"); }}
            className={`h-[40px] bg-white${emailError || errorFields.has("email") ? " border-[#ef4444] focus-visible:border-[#ef4444] focus-visible:ring-[#ef4444]/20" : ""}`}
          />
          {emailError && (
            <p className="text-[13px] text-[#ef4444] leading-[1.5]">{emailError}</p>
          )}
          {!emailError && errorFields.has("email") && <span className="text-[12px] text-[#ef4444] leading-[1.5]">Campo obrigatório</span>}
        </div>
      </div>
    </>
  );
}

/* ======================== Faturação Tab ======================== */

function FaturacaoTab({
  nif, setNif,
  fiscalName, setFiscalName,
  address, setAddress,
  postalCode, setPostalCode,
  city, setCity,
  country,
  setCountry,
  isNifCompany, nifLoading,
  onNifSearch,
}: {
  nif: string; setNif: (v: string) => void;
  fiscalName: string; setFiscalName: (v: string) => void;
  address: string; setAddress: (v: string) => void;
  postalCode: string; setPostalCode: (v: string) => void;
  city: string; setCity: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  isNifCompany: boolean; nifLoading: boolean;
  onNifSearch: () => void;
}) {
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const countryBtnRef = useRef<HTMLButtonElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countrySearchRef = useRef<HTMLInputElement>(null);

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredCountries = ALL_COUNTRIES.filter((c) => {
    const q = normalize(countrySearch);
    return normalize(c.name).includes(q);
  });

  const selectedCountryObj = ALL_COUNTRIES.find((c) => c.name === country);

  const openCountryDropdown = () => {
    setCountrySearch("");
    if (countryBtnRef.current) {
      const rect = countryBtnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.top - 4, left: rect.left, width: rect.width });
    }
    setCountryDropdownOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDropdownVisible(true);
        countrySearchRef.current?.focus();
      });
    });
  };

  const closeCountryDropdown = () => {
    setDropdownVisible(false);
    setTimeout(() => setCountryDropdownOpen(false), 200);
  };

  useEffect(() => {
    if (!countryDropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node) &&
        countryBtnRef.current &&
        !countryBtnRef.current.contains(e.target as Node)
      ) {
        closeCountryDropdown();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [countryDropdownOpen]);

  return (
    <>
      {/* NIF + Search */}
      <div className="flex gap-[8px] items-end relative shrink-0 w-full">
        <div className="flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
          <Label>NIF</Label>
          <div className="relative w-full">
            <Input
              type="text"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
              className="h-[40px] bg-white"
            />
            {nifLoading && (
              <div className="absolute right-[12px] top-1/2 -translate-y-1/2">
                <svg className="animate-spin shrink-0 size-[16px] text-[#8270ff]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onNifSearch}
          disabled={!isNifCompany || nifLoading}
          className="size-[40px] shrink-0 border-[#e5e5e5] not-disabled:hover:bg-[#e5e5e5]"
        >
          <div className="overflow-clip relative shrink-0 size-[16px]">
            <div className="absolute inset-[8.33%]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3334 13.3332">
                <path d={svgPathsFaturacao.p10f26500} fill="#27272A" />
              </svg>
            </div>
          </div>
        </Button>
      </div>

      {/* Nome */}
      <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <Label>Nome</Label>
        <Input
          type="text"
          value={fiscalName}
          onChange={(e) => setFiscalName(e.target.value)}
          className="h-[40px] bg-white"
        />
      </div>

      {/* Morada */}
      <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <Label>Morada</Label>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="h-[40px] bg-white"
        />
      </div>

      {/* Código postal + Localidade */}
      <div className="flex gap-[16px] items-start relative shrink-0 w-full">
        <div className="flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
          <Label>Código postal</Label>
          <Input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="h-[40px] bg-white"
          />
        </div>
        <div className="flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
          <Label>Localidade</Label>
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-[40px] bg-white"
          />
        </div>
      </div>

      {/* País */}
      <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <Label>País</Label>
        <div className="relative w-full">
          <button
            ref={countryBtnRef}
            type="button"
            onClick={() => countryDropdownOpen ? closeCountryDropdown() : openCountryDropdown()}
            className="flex items-center gap-[8px] h-[40px] w-full px-[12px] bg-white border border-[var(--input)] rounded-md cursor-pointer hover:bg-[#e5e5e5] transition-colors duration-200 ease-out"
          >
            {selectedCountryObj && (
              <span className="text-[16px] leading-none">{selectedCountryObj.flag}</span>
            )}
            <span className="flex-1 text-left text-[14px] text-[#27272a] leading-[1.5]">{country}</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="shrink-0">
              <path d="M1 1L5 5L9 1" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

        </div>

        {/* Country dropdown — portal, opens upward */}
        {countryDropdownOpen && dropdownPos && createPortal(
          <div
            ref={countryDropdownRef}
            className="fixed bg-white rounded-[8px] border border-[#e5e5e5] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)] z-[200] flex flex-col transition-opacity duration-200 ease-out overflow-hidden"
            style={{ opacity: dropdownVisible ? 1 : 0, bottom: `calc(100vh - ${dropdownPos.top}px)`, left: dropdownPos.left, width: dropdownPos.width, maxHeight: "min(280px, calc(100vh - 100px))" }}
          >
            {/* Search */}
            <div className="flex items-center gap-[8px] px-[12px] py-[8px] border-b border-[#e5e5e5] shrink-0">
              <Search className="size-4 text-[#71717a] shrink-0" />
              <input
                ref={countrySearchRef}
                type="text"
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                placeholder="Pesquisar país..."
                className="flex-1 text-[14px] text-[#27272a] placeholder:text-[#71717a] outline-none bg-transparent"
              />
            </div>
            {/* List */}
            <div className="flex-1 overflow-y-auto py-[4px]">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCountry(c.name);
                      closeCountryDropdown();
                    }}
                    className={`flex items-center gap-[12px] w-full px-[12px] py-[8px] cursor-pointer border-none bg-transparent hover:bg-[#f4f4f5] transition-colors duration-200 ease-out ${country === c.name ? "bg-[rgba(39,39,42,0.05)]" : ""}`}
                  >
                    <span className="text-[16px] leading-none">{c.flag}</span>
                    <span className="text-[14px] text-[#27272a] leading-[1.5] flex-1 text-left">{c.name}</span>
                  </button>
                ))
              ) : (
                <div className="px-[12px] py-[8px]">
                  <p className="text-[14px] text-[#71717a] leading-[1.5]">Sem resultados</p>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
      </div>
    </>
  );
}