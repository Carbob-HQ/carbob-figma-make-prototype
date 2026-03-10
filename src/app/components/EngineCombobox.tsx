import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { useDropdownPosition } from "./useDropdownPosition";

interface EngineEntry {
  name: string;
  fuel: string;
  cc?: number; // explicit displacement override (for entries where it can't be parsed from name)
}

// ---------------------------------------------------------------------------
// Liter-to-CC mapping for precise values
// ---------------------------------------------------------------------------
const LITER_TO_CC: Record<string, number> = {
  "0.9": 898, "1.0": 999, "1.2": 1199, "1.3": 1332, "1.33": 1329,
  "1.4": 1390, "1.5": 1461, "1.6": 1598, "1.8": 1798, "1.9": 1870,
  "2.0": 1998, "2.3": 2261, "2.5": 2497,
};

/**
 * Parse displacement (cc) from engine name. Falls back to entry.cc override.
 * Pattern 1: name starts with "X.X" or "X.XX" (e.g., "1.5 dCi 90cv" → 1461)
 * Pattern 2: entry has explicit cc value (for BMW/Mercedes/Audi/Tesla naming)
 */
function resolveCC(entry: EngineEntry): number {
  if (entry.cc !== undefined) return entry.cc;
  const match = entry.name.match(/^(\d+\.\d+)/);
  if (match) {
    const liters = match[1];
    if (LITER_TO_CC[liters]) return LITER_TO_CC[liters];
    return Math.round(parseFloat(liters) * 1000);
  }
  return 0;
}

/**
 * Parse power (cv) from engine name.
 * Pattern: "XXXcv" anywhere in the name
 */
function resolvePower(name: string): number {
  const match = name.match(/(\d+)cv/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Exported lookup: given version + engine name, return { fuel, power, cc }
 */
export function getEngineData(
  version: string,
  engineName: string
): { fuel: string; power: number; cc: number } | null {
  const entries = ENGINES_BY_VERSION[version];
  if (!entries) return null;
  const entry = entries.find((e) => e.name === engineName);
  if (!entry) return null;
  return {
    fuel: entry.fuel,
    power: resolvePower(entry.name),
    cc: resolveCC(entry),
  };
}

const ENGINES_BY_VERSION: Record<string, EngineEntry[]> = {
  // Renault Clio
  "Clio IV": [
    { name: "0.9 TCe 75 76cv", fuel: "Gasolina" },
    { name: "0.9 TCe 90cv", fuel: "Gasolina" },
    { name: "1.0 Campus Flex 80cv", fuel: "Gasolina" },
    { name: "1.2 16V 73cv", fuel: "Gasolina" },
    { name: "1.2 16V 75cv", fuel: "Gasolina" },
    { name: "1.2 TCe 120 118cv", fuel: "Gasolina" },
    { name: "1.2 TCe 120cv", fuel: "Gasolina" },
    { name: "1.6 RS 200cv", fuel: "Gasolina" },
    { name: "1.6 RS Trophy 220cv", fuel: "Gasolina" },
    { name: "1.5 dCi 115cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 75cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 84cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 86cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 90cv", fuel: "Gasóleo" },
    { name: "0.9 TCe 90 GPL 90cv", fuel: "GPL" },
    { name: "1.2 GPL 16V 90cv", fuel: "GPL" },
    { name: "1.2 GPL 72cv", fuel: "GPL" },
  ],
  "Clio IV Sport Tourer": [
    { name: "0.9 TCe 90cv", fuel: "Gasolina" },
    { name: "1.2 16V 75cv", fuel: "Gasolina" },
    { name: "1.2 TCe 120cv", fuel: "Gasolina" },
    { name: "1.5 dCi 75cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 90cv", fuel: "Gasóleo" },
  ],
  "Clio V": [
    { name: "1.0 TCe 100cv", fuel: "Gasolina" },
    { name: "1.0 TCe 90cv", fuel: "Gasolina" },
    { name: "1.0 SCe 65cv", fuel: "Gasolina" },
    { name: "1.0 SCe 75cv", fuel: "Gasolina" },
    { name: "1.6 E-Tech 145cv", fuel: "Híbrido" },
    { name: "1.0 TCe 100 GPL 100cv", fuel: "GPL" },
  ],
  "Clio III": [
    { name: "1.2 16V 75cv", fuel: "Gasolina" },
    { name: "1.4 16V 98cv", fuel: "Gasolina" },
    { name: "1.6 16V 112cv", fuel: "Gasolina" },
    { name: "2.0 RS 197cv", fuel: "Gasolina" },
    { name: "2.0 RS 200cv", fuel: "Gasolina" },
    { name: "1.5 dCi 68cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 86cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 105cv", fuel: "Gasóleo" },
  ],
  "Clio III Sport Tourer": [
    { name: "1.2 16V 75cv", fuel: "Gasolina" },
    { name: "1.2 TCe 100cv", fuel: "Gasolina" },
    { name: "1.5 dCi 86cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 105cv", fuel: "Gasóleo" },
  ],
  "Clio II": [
    { name: "1.2 8V 58cv", fuel: "Gasolina" },
    { name: "1.2 16V 75cv", fuel: "Gasolina" },
    { name: "1.4 16V 98cv", fuel: "Gasolina" },
    { name: "1.6 16V 110cv", fuel: "Gasolina" },
    { name: "2.0 RS 169cv", fuel: "Gasolina" },
    { name: "1.5 dCi 65cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 82cv", fuel: "Gasóleo" },
    { name: "1.9 D 64cv", fuel: "Gasóleo" },
  ],
  "Clio II Phase 2": [
    { name: "1.2 16V 75cv", fuel: "Gasolina" },
    { name: "1.4 16V 98cv", fuel: "Gasolina" },
    { name: "2.0 RS 182cv", fuel: "Gasolina" },
    { name: "1.5 dCi 65cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 82cv", fuel: "Gasóleo" },
  ],
  "Clio I": [
    { name: "1.2 60cv", fuel: "Gasolina" },
    { name: "1.4 75cv", fuel: "Gasolina" },
    { name: "1.8 16V 135cv", fuel: "Gasolina" },
    { name: "2.0 Williams 150cv", fuel: "Gasolina" },
    { name: "1.9 D 65cv", fuel: "Gasóleo" },
  ],
  // Renault Captur
  "Captur I": [
    { name: "0.9 TCe 90cv", fuel: "Gasolina" },
    { name: "1.2 TCe 120cv", fuel: "Gasolina" },
    { name: "1.5 dCi 90cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 110cv", fuel: "Gasóleo" },
  ],
  "Captur II": [
    { name: "1.0 TCe 100cv", fuel: "Gasolina" },
    { name: "1.3 TCe 130cv", fuel: "Gasolina" },
    { name: "1.3 TCe 155cv", fuel: "Gasolina" },
    { name: "1.6 E-Tech 145cv", fuel: "Híbrido" },
    { name: "1.5 Blue dCi 95cv", fuel: "Gasóleo" },
    { name: "1.5 Blue dCi 115cv", fuel: "Gasóleo" },
  ],
  // Renault Megane
  "Megane IV": [
    { name: "1.3 TCe 115cv", fuel: "Gasolina" },
    { name: "1.3 TCe 140cv", fuel: "Gasolina" },
    { name: "1.3 TCe 160cv", fuel: "Gasolina" },
    { name: "1.8 RS 280cv", fuel: "Gasolina" },
    { name: "1.8 RS Trophy 300cv", fuel: "Gasolina" },
    { name: "1.5 Blue dCi 95cv", fuel: "Gasóleo" },
    { name: "1.5 Blue dCi 115cv", fuel: "Gasóleo" },
    { name: "1.6 E-Tech 160cv", fuel: "Híbrido" },
  ],
  "Megane III": [
    { name: "1.2 TCe 115cv", fuel: "Gasolina" },
    { name: "1.6 16V 110cv", fuel: "Gasolina" },
    { name: "2.0 RS 250cv", fuel: "Gasolina" },
    { name: "2.0 RS Trophy 265cv", fuel: "Gasolina" },
    { name: "1.5 dCi 90cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 110cv", fuel: "Gasóleo" },
    { name: "1.6 dCi 130cv", fuel: "Gasóleo" },
  ],
  "Megane E-Tech": [
    { name: "EV40 130cv", fuel: "Elétrico", cc: 0 },
    { name: "EV60 220cv", fuel: "Elétrico", cc: 0 },
    { name: "EV60 Iconic 220cv", fuel: "Elétrico", cc: 0 },
  ],
  // BMW Série 3
  "Série 3 (G20)": [
    { name: "318i 156cv", fuel: "Gasolina", cc: 1998 },
    { name: "320i 184cv", fuel: "Gasolina", cc: 1998 },
    { name: "330i 258cv", fuel: "Gasolina", cc: 1998 },
    { name: "M340i xDrive 374cv", fuel: "Gasolina", cc: 2998 },
    { name: "318d 150cv", fuel: "Gasóleo", cc: 1995 },
    { name: "320d 190cv", fuel: "Gasóleo", cc: 1995 },
    { name: "330d xDrive 286cv", fuel: "Gasóleo", cc: 2993 },
    { name: "330e 292cv", fuel: "Híbrido", cc: 1998 },
  ],
  "Série 3 (F30)": [
    { name: "316i 136cv", fuel: "Gasolina", cc: 1598 },
    { name: "318i 136cv", fuel: "Gasolina", cc: 1499 },
    { name: "320i 184cv", fuel: "Gasolina", cc: 1998 },
    { name: "330i 252cv", fuel: "Gasolina", cc: 1998 },
    { name: "340i 326cv", fuel: "Gasolina", cc: 2998 },
    { name: "316d 116cv", fuel: "Gasóleo", cc: 1598 },
    { name: "318d 150cv", fuel: "Gasóleo", cc: 1995 },
    { name: "320d 190cv", fuel: "Gasóleo", cc: 1995 },
    { name: "325d 218cv", fuel: "Gasóleo", cc: 1995 },
    { name: "330d 258cv", fuel: "Gasóleo", cc: 2993 },
    { name: "330e 252cv", fuel: "Híbrido", cc: 1998 },
  ],
  "Série 3 (E90)": [
    { name: "316i 122cv", fuel: "Gasolina", cc: 1598 },
    { name: "318i 143cv", fuel: "Gasolina", cc: 1995 },
    { name: "320i 170cv", fuel: "Gasolina", cc: 1995 },
    { name: "325i 218cv", fuel: "Gasolina", cc: 2497 },
    { name: "330i 272cv", fuel: "Gasolina", cc: 2996 },
    { name: "318d 143cv", fuel: "Gasóleo", cc: 1995 },
    { name: "320d 177cv", fuel: "Gasóleo", cc: 1995 },
    { name: "325d 197cv", fuel: "Gasóleo", cc: 2993 },
    { name: "330d 231cv", fuel: "Gasóleo", cc: 2993 },
  ],
  // BMW Série 1
  "Série 1 (F40)": [
    { name: "116i 109cv", fuel: "Gasolina", cc: 1499 },
    { name: "118i 140cv", fuel: "Gasolina", cc: 1499 },
    { name: "128ti 265cv", fuel: "Gasolina", cc: 1998 },
    { name: "M135i xDrive 306cv", fuel: "Gasolina", cc: 1998 },
    { name: "116d 116cv", fuel: "Gasóleo", cc: 1496 },
    { name: "118d 150cv", fuel: "Gasóleo", cc: 1995 },
    { name: "120d xDrive 190cv", fuel: "Gasóleo", cc: 1995 },
  ],
  "Série 1 (F20)": [
    { name: "114i 102cv", fuel: "Gasolina", cc: 1598 },
    { name: "116i 136cv", fuel: "Gasolina", cc: 1598 },
    { name: "118i 170cv", fuel: "Gasolina", cc: 1598 },
    { name: "120i 184cv", fuel: "Gasolina", cc: 1998 },
    { name: "M135i 326cv", fuel: "Gasolina", cc: 2979 },
    { name: "116d 116cv", fuel: "Gasóleo", cc: 1496 },
    { name: "118d 150cv", fuel: "Gasóleo", cc: 1995 },
    { name: "120d 190cv", fuel: "Gasóleo", cc: 1995 },
  ],
  // BMW Série 5
  "Série 5 (G30)": [
    { name: "520i 184cv", fuel: "Gasolina", cc: 1998 },
    { name: "530i 252cv", fuel: "Gasolina", cc: 1998 },
    { name: "540i xDrive 340cv", fuel: "Gasolina", cc: 2998 },
    { name: "M550i xDrive 530cv", fuel: "Gasolina", cc: 4395 },
    { name: "520d 190cv", fuel: "Gasóleo", cc: 1995 },
    { name: "525d 231cv", fuel: "Gasóleo", cc: 1995 },
    { name: "530d xDrive 286cv", fuel: "Gasóleo", cc: 2993 },
    { name: "530e 252cv", fuel: "Híbrido", cc: 1998 },
    { name: "530e xDrive 292cv", fuel: "Híbrido", cc: 1998 },
    { name: "545e xDrive 394cv", fuel: "Híbrido", cc: 2998 },
  ],
  "Série 5 (G60)": [
    { name: "520i 208cv", fuel: "Gasolina", cc: 1998 },
    { name: "530e 299cv", fuel: "Híbrido", cc: 1998 },
    { name: "550e xDrive 489cv", fuel: "Híbrido", cc: 2998 },
    { name: "i5 eDrive40 340cv", fuel: "Elétrico", cc: 0 },
    { name: "i5 M60 xDrive 601cv", fuel: "Elétrico", cc: 0 },
  ],
  // VW Golf
  "Golf VII": [
    { name: "1.0 TSI 85cv", fuel: "Gasolina" },
    { name: "1.0 TSI 110cv", fuel: "Gasolina" },
    { name: "1.4 TSI 125cv", fuel: "Gasolina" },
    { name: "1.4 TSI 150cv", fuel: "Gasolina" },
    { name: "2.0 TSI GTI 230cv", fuel: "Gasolina" },
    { name: "2.0 TSI R 310cv", fuel: "Gasolina" },
    { name: "1.6 TDI 90cv", fuel: "Gasóleo" },
    { name: "1.6 TDI 115cv", fuel: "Gasóleo" },
    { name: "2.0 TDI 150cv", fuel: "Gasóleo" },
    { name: "2.0 TDI GTD 184cv", fuel: "Gasóleo" },
    { name: "1.4 TSI GTE 204cv", fuel: "Híbrido" },
  ],
  "Golf VIII": [
    { name: "1.0 TSI 110cv", fuel: "Gasolina" },
    { name: "1.5 TSI 130cv", fuel: "Gasolina" },
    { name: "1.5 TSI 150cv", fuel: "Gasolina" },
    { name: "2.0 TSI GTI 245cv", fuel: "Gasolina" },
    { name: "2.0 TSI R 320cv", fuel: "Gasolina" },
    { name: "2.0 TDI 115cv", fuel: "Gasóleo" },
    { name: "2.0 TDI 150cv", fuel: "Gasóleo" },
    { name: "1.4 eHybrid GTE 245cv", fuel: "Híbrido" },
  ],
  "Golf VI": [
    { name: "1.2 TSI 85cv", fuel: "Gasolina" },
    { name: "1.4 TSI 122cv", fuel: "Gasolina" },
    { name: "1.4 TSI 160cv", fuel: "Gasolina" },
    { name: "2.0 TSI GTI 210cv", fuel: "Gasolina" },
    { name: "2.0 TSI R 270cv", fuel: "Gasolina" },
    { name: "1.6 TDI 90cv", fuel: "Gasóleo" },
    { name: "1.6 TDI 105cv", fuel: "Gasóleo" },
    { name: "2.0 TDI 140cv", fuel: "Gasóleo" },
    { name: "2.0 TDI GTD 170cv", fuel: "Gasóleo" },
  ],
  // VW Polo
  "Polo VI (AW)": [
    { name: "1.0 MPI 65cv", fuel: "Gasolina" },
    { name: "1.0 MPI 80cv", fuel: "Gasolina" },
    { name: "1.0 TSI 95cv", fuel: "Gasolina" },
    { name: "1.0 TSI 110cv", fuel: "Gasolina" },
    { name: "1.5 TSI 150cv", fuel: "Gasolina" },
    { name: "2.0 TSI GTI 200cv", fuel: "Gasolina" },
    { name: "1.0 TGI 90cv", fuel: "GPL" },
  ],
  "Polo V (6R/6C)": [
    { name: "1.0 MPI 60cv", fuel: "Gasolina" },
    { name: "1.0 MPI 75cv", fuel: "Gasolina" },
    { name: "1.2 TSI 90cv", fuel: "Gasolina" },
    { name: "1.2 TSI 110cv", fuel: "Gasolina" },
    { name: "1.4 TSI GTI 192cv", fuel: "Gasolina" },
    { name: "1.4 TDI 75cv", fuel: "Gasóleo" },
    { name: "1.4 TDI 90cv", fuel: "Gasóleo" },
    { name: "1.6 TDI 90cv", fuel: "Gasóleo" },
  ],
  // Peugeot 208
  "208 II": [
    { name: "1.2 PureTech 75cv", fuel: "Gasolina" },
    { name: "1.2 PureTech 100cv", fuel: "Gasolina" },
    { name: "1.2 PureTech 130cv", fuel: "Gasolina" },
    { name: "1.5 BlueHDi 100cv", fuel: "Gasóleo" },
    { name: "e-208 136cv", fuel: "Elétrico", cc: 0 },
    { name: "e-208 156cv", fuel: "Elétrico", cc: 0 },
  ],
  "208 I": [
    { name: "1.0 VTi 68cv", fuel: "Gasolina" },
    { name: "1.2 PureTech 82cv", fuel: "Gasolina" },
    { name: "1.2 PureTech 110cv", fuel: "Gasolina" },
    { name: "1.6 THP GTi 208cv", fuel: "Gasolina" },
    { name: "1.4 HDi 68cv", fuel: "Gasóleo" },
    { name: "1.6 BlueHDi 75cv", fuel: "Gasóleo" },
    { name: "1.6 BlueHDi 100cv", fuel: "Gasóleo" },
  ],
  // Peugeot 308
  "308 III (P5)": [
    { name: "1.2 PureTech 110cv", fuel: "Gasolina" },
    { name: "1.2 PureTech 130cv", fuel: "Gasolina" },
    { name: "1.6 Hybrid 180cv", fuel: "Híbrido" },
    { name: "1.6 Hybrid 225cv", fuel: "Híbrido" },
    { name: "1.5 BlueHDi 130cv", fuel: "Gasóleo" },
    { name: "e-308 156cv", fuel: "Elétrico", cc: 0 },
  ],
  "308 II (T9)": [
    { name: "1.2 PureTech 110cv", fuel: "Gasolina" },
    { name: "1.2 PureTech 130cv", fuel: "Gasolina" },
    { name: "1.6 THP 205cv", fuel: "Gasolina" },
    { name: "1.6 THP 270cv", fuel: "Gasolina" },
    { name: "1.5 BlueHDi 100cv", fuel: "Gasóleo" },
    { name: "1.5 BlueHDi 130cv", fuel: "Gasóleo" },
    { name: "2.0 BlueHDi 150cv", fuel: "Gasóleo" },
    { name: "2.0 BlueHDi 180cv", fuel: "Gasóleo" },
  ],
  // Peugeot 3008
  "3008 II": [
    { name: "1.2 PureTech 130cv", fuel: "Gasolina" },
    { name: "1.6 PureTech 180cv", fuel: "Gasolina" },
    { name: "1.6 Hybrid 225cv", fuel: "Híbrido" },
    { name: "1.6 Hybrid4 300cv", fuel: "Híbrido" },
    { name: "1.5 BlueHDi 130cv", fuel: "Gasóleo" },
    { name: "2.0 BlueHDi 180cv", fuel: "Gasóleo" },
  ],
  // Audi A3
  "A3 (8Y)": [
    { name: "30 TFSI 110cv", fuel: "Gasolina", cc: 999 },
    { name: "35 TFSI 150cv", fuel: "Gasolina", cc: 1498 },
    { name: "40 TFSI e 204cv", fuel: "Híbrido", cc: 1395 },
    { name: "45 TFSI e 245cv", fuel: "Híbrido", cc: 1395 },
    { name: "30 TDI 116cv", fuel: "Gasóleo", cc: 1968 },
    { name: "35 TDI 150cv", fuel: "Gasóleo", cc: 1968 },
    { name: "RS3 400cv", fuel: "Gasolina", cc: 2480 },
  ],
  "A3 (8V)": [
    { name: "1.0 TFSI 116cv", fuel: "Gasolina" },
    { name: "1.4 TFSI 125cv", fuel: "Gasolina" },
    { name: "1.4 TFSI 150cv", fuel: "Gasolina" },
    { name: "2.0 TFSI 190cv", fuel: "Gasolina" },
    { name: "RS3 400cv", fuel: "Gasolina", cc: 2480 },
    { name: "1.6 TDI 110cv", fuel: "Gasóleo" },
    { name: "2.0 TDI 150cv", fuel: "Gasóleo" },
    { name: "1.4 TFSI e-tron 204cv", fuel: "Híbrido" },
  ],
  // Tesla
  "Model 3": [
    { name: "Standard Range Plus 283cv", fuel: "Elétrico", cc: 0 },
    { name: "Long Range AWD 346cv", fuel: "Elétrico", cc: 0 },
    { name: "Performance 462cv", fuel: "Elétrico", cc: 0 },
  ],
  "Model 3 Highland": [
    { name: "Standard Range RWD 283cv", fuel: "Elétrico", cc: 0 },
    { name: "Long Range AWD 366cv", fuel: "Elétrico", cc: 0 },
    { name: "Long Range RWD 299cv", fuel: "Elétrico", cc: 0 },
  ],
  "Model Y": [
    { name: "Standard Range RWD 299cv", fuel: "Elétrico", cc: 0 },
    { name: "Long Range AWD 351cv", fuel: "Elétrico", cc: 0 },
    { name: "Performance AWD 462cv", fuel: "Elétrico", cc: 0 },
  ],
  "Model Y Juniper": [
    { name: "RWD 299cv", fuel: "Elétrico", cc: 0 },
    { name: "Long Range AWD 351cv", fuel: "Elétrico", cc: 0 },
    { name: "Launch Edition AWD 351cv", fuel: "Elétrico", cc: 0 },
  ],
  // Toyota Corolla
  "Corolla (E210)": [
    { name: "1.8 Hybrid 122cv", fuel: "Híbrido" },
    { name: "2.0 Hybrid 184cv", fuel: "Híbrido" },
  ],
  "Corolla Touring Sports": [
    { name: "1.8 Hybrid 122cv", fuel: "Híbrido" },
    { name: "2.0 Hybrid 184cv", fuel: "Híbrido" },
  ],
  // Toyota Yaris
  "Yaris IV": [
    { name: "1.0 VVT-i 72cv", fuel: "Gasolina" },
    { name: "1.5 Hybrid 116cv", fuel: "Híbrido" },
  ],
  "Yaris III": [
    { name: "1.0 VVT-i 69cv", fuel: "Gasolina" },
    { name: "1.33 VVT-i 99cv", fuel: "Gasolina" },
    { name: "1.5 VVT-iE 111cv", fuel: "Gasolina" },
    { name: "1.5 Hybrid 100cv", fuel: "Híbrido" },
    { name: "1.4 D-4D 90cv", fuel: "Gasóleo" },
  ],
  // Dacia Sandero
  "Sandero III": [
    { name: "1.0 SCe 65cv", fuel: "Gasolina" },
    { name: "1.0 TCe 90cv", fuel: "Gasolina" },
    { name: "1.0 TCe 100cv Bi-Fuel", fuel: "GPL" },
    { name: "1.0 TCe 110cv", fuel: "Gasolina" },
  ],
  "Sandero II": [
    { name: "0.9 TCe 90cv", fuel: "Gasolina" },
    { name: "1.0 SCe 73cv", fuel: "Gasolina" },
    { name: "1.5 dCi 75cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 90cv", fuel: "Gasóleo" },
    { name: "0.9 TCe 90cv Bi-Fuel", fuel: "GPL" },
  ],
  // Dacia Duster
  "Duster II": [
    { name: "1.0 TCe 100cv", fuel: "Gasolina" },
    { name: "1.3 TCe 130cv", fuel: "Gasolina" },
    { name: "1.3 TCe 150cv", fuel: "Gasolina" },
    { name: "1.5 Blue dCi 115cv", fuel: "Gasóleo" },
    { name: "1.0 TCe 100cv Bi-Fuel", fuel: "GPL" },
  ],
  "Duster I": [
    { name: "1.6 16V 105cv", fuel: "Gasolina" },
    { name: "1.2 TCe 125cv", fuel: "Gasolina" },
    { name: "1.5 dCi 85cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 90cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 110cv", fuel: "Gasóleo" },
  ],
  // Nissan Qashqai
  "Qashqai (J12)": [
    { name: "1.3 DIG-T Mild Hybrid 140cv", fuel: "Híbrido" },
    { name: "1.3 DIG-T Mild Hybrid 158cv", fuel: "Híbrido" },
    { name: "1.5 e-POWER 190cv", fuel: "Híbrido" },
  ],
  "Qashqai (J11)": [
    { name: "1.2 DIG-T 115cv", fuel: "Gasolina" },
    { name: "1.3 DIG-T 140cv", fuel: "Gasolina" },
    { name: "1.3 DIG-T 160cv", fuel: "Gasolina" },
    { name: "1.5 dCi 110cv", fuel: "Gasóleo" },
    { name: "1.5 dCi 115cv", fuel: "Gasóleo" },
    { name: "1.6 dCi 130cv", fuel: "Gasóleo" },
  ],
  // Honda Civic
  "Civic XI": [
    { name: "2.0 e:HEV 184cv", fuel: "Híbrido" },
  ],
  "Civic X": [
    { name: "1.0 VTEC Turbo 129cv", fuel: "Gasolina" },
    { name: "1.5 VTEC Turbo 182cv", fuel: "Gasolina" },
    { name: "2.0 Type R 320cv", fuel: "Gasolina" },
    { name: "1.6 i-DTEC 120cv", fuel: "Gasóleo" },
  ],
  // Hyundai Tucson
  "Tucson (NX4)": [
    { name: "1.6 T-GDi 150cv", fuel: "Gasolina" },
    { name: "1.6 T-GDi Hybrid 230cv", fuel: "Híbrido" },
    { name: "1.6 T-GDi PHEV 265cv", fuel: "Híbrido" },
    { name: "1.6 CRDi 115cv", fuel: "Gasóleo" },
    { name: "1.6 CRDi 136cv", fuel: "Gasóleo" },
    { name: "1.6 CRDi Mild Hybrid 136cv", fuel: "Híbrido" },
  ],
  "Tucson (TL)": [
    { name: "1.6 GDi 132cv", fuel: "Gasolina" },
    { name: "1.6 T-GDi 177cv", fuel: "Gasolina" },
    { name: "1.6 CRDi 115cv", fuel: "Gasóleo" },
    { name: "1.6 CRDi 136cv", fuel: "Gasóleo" },
    { name: "2.0 CRDi 136cv", fuel: "Gasóleo" },
    { name: "2.0 CRDi 185cv", fuel: "Gasóleo" },
  ],
  // Mercedes Classe A
  "Classe A (W177)": [
    { name: "A180 136cv", fuel: "Gasolina", cc: 1332 },
    { name: "A200 163cv", fuel: "Gasolina", cc: 1332 },
    { name: "A250 224cv", fuel: "Gasolina", cc: 1991 },
    { name: "A35 AMG 306cv", fuel: "Gasolina", cc: 1991 },
    { name: "A45 S AMG 421cv", fuel: "Gasolina", cc: 1991 },
    { name: "A180d 116cv", fuel: "Gasóleo", cc: 1461 },
    { name: "A200d 150cv", fuel: "Gasóleo", cc: 1950 },
    { name: "A220d 190cv", fuel: "Gasóleo", cc: 1950 },
    { name: "A250e 218cv", fuel: "Híbrido", cc: 1332 },
  ],
  // Ford Focus
  "Focus IV": [
    { name: "1.0 EcoBoost 100cv", fuel: "Gasolina" },
    { name: "1.0 EcoBoost 125cv", fuel: "Gasolina" },
    { name: "1.0 EcoBoost Hybrid 125cv", fuel: "Híbrido" },
    { name: "1.0 EcoBoost Hybrid 155cv", fuel: "Híbrido" },
    { name: "1.5 EcoBoost 150cv", fuel: "Gasolina" },
    { name: "2.3 EcoBoost ST 280cv", fuel: "Gasolina" },
    { name: "1.5 EcoBlue 95cv", fuel: "Gasóleo" },
    { name: "1.5 EcoBlue 120cv", fuel: "Gasóleo" },
    { name: "2.0 EcoBlue 150cv", fuel: "Gasóleo" },
  ],
  // Opel Corsa
  "Corsa F": [
    { name: "1.2 75cv", fuel: "Gasolina" },
    { name: "1.2 Turbo 100cv", fuel: "Gasolina" },
    { name: "1.2 Turbo 130cv", fuel: "Gasolina" },
    { name: "1.5 Diesel 100cv", fuel: "Gasóleo" },
    { name: "Corsa-e 136cv", fuel: "Elétrico", cc: 0 },
  ],
  "Corsa E": [
    { name: "1.0 Turbo 90cv", fuel: "Gasolina" },
    { name: "1.0 Turbo 115cv", fuel: "Gasolina" },
    { name: "1.4 75cv", fuel: "Gasolina" },
    { name: "1.4 90cv", fuel: "Gasolina" },
    { name: "1.3 CDTi 75cv", fuel: "Gasóleo" },
    { name: "1.3 CDTi 95cv", fuel: "Gasóleo" },
  ],
  // Kia Sportage
  "Sportage V (NQ5)": [
    { name: "1.6 T-GDi 150cv", fuel: "Gasolina" },
    { name: "1.6 T-GDi HEV 230cv", fuel: "Híbrido" },
    { name: "1.6 T-GDi PHEV 265cv", fuel: "Híbrido" },
    { name: "1.6 CRDi 115cv", fuel: "Gasóleo" },
    { name: "1.6 CRDi 136cv", fuel: "Gasóleo" },
    { name: "1.6 CRDi MHEV 136cv", fuel: "Híbrido" },
  ],
  "Sportage IV (QL)": [
    { name: "1.6 GDi 132cv", fuel: "Gasolina" },
    { name: "1.6 T-GDi 177cv", fuel: "Gasolina" },
    { name: "1.6 CRDi 115cv", fuel: "Gasóleo" },
    { name: "1.6 CRDi 136cv", fuel: "Gasóleo" },
    { name: "2.0 CRDi 136cv", fuel: "Gasóleo" },
    { name: "2.0 CRDi 185cv", fuel: "Gasóleo" },
  ],
};

const FUEL_ORDER = ["Gasolina", "Gasóleo", "Híbrido", "Elétrico", "GPL"];

function normalize(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

interface EngineComboboxProps {
  value: string;
  onChange: (value: string) => void;
  version: string;
  disabled?: boolean;
  label?: string;
  error?: boolean;
}

export function EngineCombobox({ value, onChange, version, disabled, label, error }: EngineComboboxProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { flipUp, maxHeight } = useDropdownPosition(triggerRef, open, 41);

  const allEngines = ENGINES_BY_VERSION[version] || [];

  const grouped = useMemo(() => {
    const filtered = search
      ? allEngines.filter((e) => normalize(e.name).includes(normalize(search)))
      : allEngines;

    const groups: Record<string, string[]> = {};
    for (const e of filtered) {
      if (!groups[e.fuel]) groups[e.fuel] = [];
      groups[e.fuel].push(e.name);
    }

    return FUEL_ORDER
      .filter((fuel) => groups[fuel] && groups[fuel].length > 0)
      .map((fuel) => ({ fuel, engines: groups[fuel] }));
  }, [allEngines, search]);

  const hasResults = grouped.length > 0;

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const handleSelect = useCallback(
    (engine: string) => {
      onChange(engine === value ? "" : engine);
      setOpen(false);
    },
    [onChange, value]
  );

  const handleToggle = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-[8px] items-start relative shrink-0" ref={containerRef}>
      <p className="font-medium leading-[1.5] not-italic text-[#27272a] text-[14px]">{label ?? "Motorização"}</p>

      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={`flex items-center justify-between w-full min-h-[40px] h-[40px] bg-white rounded-[8px] border px-[12px] text-[14px] font-normal transition-colors duration-200 ease-out not-disabled:hover:bg-[#e5e5e5] ${
          disabled ? "opacity-50 cursor-default border-[#e5e5e5]" : "cursor-pointer"
        } ${error && !disabled ? "border-[#ef4444]" : "border-[#e5e5e5]"}`}
      >
        <span className={`truncate ${value ? "text-[#27272a]" : "text-[#71717a]"}`}>
          {value || "Motorização do veículo"}
        </span>
        <ChevronDown className="size-4 text-[#71717a] shrink-0" />
      </button>
      {error && !disabled && <span className="text-[12px] text-[#ef4444] leading-[1.5]">Campo obrigatório</span>}

      {open && (
        <div
          className="absolute left-0 right-0 bg-white border border-[#e5e5e5] rounded-[8px] shadow-md z-[200] overflow-hidden"
          style={{
            ...(flipUp
              ? { bottom: "100%", marginBottom: 4 }
              : { top: "100%", marginTop: 4 }),
            opacity: visible ? 1 : 0,
            transition: "opacity 200ms ease-out",
          }}
        >
          {/* Search */}
          <div className="flex items-center gap-[8px] px-[12px] py-[8px] border-b border-[#e5e5e5]">
            <Search className="size-4 text-[#71717a] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar motorização..."
              className="flex-1 text-[14px] text-[#27272a] placeholder:text-[#71717a] outline-none bg-transparent"
            />
          </div>

          {/* List */}
          <div className="overflow-y-auto" style={{ maxHeight }}>
            {!hasResults && (
              <div className="py-[16px] text-center text-[14px] text-[#71717a]">
                Nenhuma motorização encontrada
              </div>
            )}

            {grouped.map((group, groupIdx) => (
              <div key={group.fuel}>
                {/* Separator between sections */}
                {groupIdx > 0 && (
                  <div className="h-px bg-[#e5e5e5] mx-[12px]" />
                )}

                {/* Fuel type heading */}
                <div className="px-[12px] py-[8px] text-[12px] font-medium text-[#71717a]">
                  {group.fuel}
                </div>

                {/* Engine items */}
                {group.engines.map((engine) => (
                  <button
                    key={engine}
                    type="button"
                    onClick={() => handleSelect(engine)}
                    className="flex items-center gap-[8px] w-full px-[12px] py-[8px] text-[14px] text-[#27272a] hover:bg-[#f4f4f5] cursor-pointer transition-colors duration-200 ease-out"
                  >
                    <Check
                      className={`size-4 shrink-0 transition-opacity duration-200 ease-out ${
                        value === engine ? "opacity-100 text-[#27272a]" : "opacity-0"
                      }`}
                    />
                    {engine}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}