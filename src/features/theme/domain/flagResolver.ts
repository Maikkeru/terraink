import flagPalettes from "../data/flagPalettes.json";

type NominatimAddress = Record<string, string | undefined>;

const COUNTRY_ALIASES: Record<string, string> = {
  "united states of america": "US",
  usa: "US",
  us: "US",

  canada: "CA",
  ca: "CA",

  mexico: "MX",
  méxico: "MX",
  mx: "MX",
};

const US_SUBDIVISIONS: Record<string, string> = {
  alabama: "AL",
  alaska: "AK",
  arizona: "AZ",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  "new hampshire": "NH",
  "new jersey": "NJ",
  "new mexico": "NM",
  "new york": "NY",
  "north carolina": "NC",
  "north dakota": "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  "rhode island": "RI",
  "south carolina": "SC",
  "south dakota": "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  "west virginia": "WV",
  wisconsin: "WI",
  wyoming: "WY",
  "district of columbia": "DC",
  dc: "DC",
};

const CANADA_SUBDIVISIONS: Record<string, string> = {
  alberta: "AB",
  "british columbia": "BC",
  manitoba: "MB",
  "new brunswick": "NB",
  "newfoundland and labrador": "NL",
  "newfoundland & labrador": "NL",
  "nova scotia": "NS",
  ontario: "ON",
  "prince edward island": "PE",
  quebec: "QC",
  québec: "QC",
  saskatchewan: "SK",
  "northwest territories": "NT",
  nunavut: "NU",
  yukon: "YT",
};

const MEXICO_SUBDIVISIONS: Record<string, string> = {
  aguascalientes: "AG",
  "baja california": "BC",
  "baja california sur": "BS",
  campeche: "CM",
  chiapas: "CS",
  chihuahua: "CH",
  coahuila: "CO",
  "coahuila de zaragoza": "CO",
  colima: "CL",
  durango: "DG",
  guanajuato: "GT",
  guerrero: "GR",
  hidalgo: "HG",
  jalisco: "JA",
  "estado de mexico": "MX",
  "méxico state": "MX",
  "mexico state": "MX",
  "estado de méxico": "MX",
  "ciudad de mexico": "CX",
  "ciudad de méxico": "CX",
  "mexico city": "CX",
  michoacan: "MI",
  michoacán: "MI",
  morelos: "MO",
  nayarit: "NA",
  "nuevo leon": "NL",
  "nuevo león": "NL",
  oaxaca: "OA",
  puebla: "PU",
  queretaro: "QT",
  querétaro: "QT",
  "quintana roo": "QR",
  "san luis potosi": "SL",
  "san luis potosí": "SL",
  sinaloa: "SI",
  sonora: "SO",
  tabasco: "TB",
  tamaulipas: "TM",
  tlaxcala: "TL",
  veracruz: "VE",
  "veracruz de ignacio de la llave": "VE",
  yucatan: "YU",
  yucatán: "YU",
  zacatecas: "ZA",
};

function normalizeLookupValue(value?: string): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.&']/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getCountryCode(address?: NominatimAddress): string {
  const rawCountryCode = (address?.country_code ?? "").trim().toUpperCase();
  if (
    rawCountryCode === "US" ||
    rawCountryCode === "CA" ||
    rawCountryCode === "MX"
  ) {
    return rawCountryCode;
  }

  const rawCountry = normalizeLookupValue(address?.country);
  return COUNTRY_ALIASES[rawCountry] ?? "";
}

function getSubdivisionCandidates(address?: NominatimAddress): string[] {
  return [
    address?.state,
    address?.province,
    address?.region,
    address?.county,
    address?.state_district,
    address?.ISO3166_2_lvl4,
    address?.ISO3166_2_lvl5,
  ]
    .filter(Boolean)
    .map((v) => String(v));
}

function extractIsoSubdivisionCode(
  value?: string,
  countryCode?: string,
): string {
  const raw = (value ?? "").trim().toUpperCase();
  if (!raw) return "";

  // Examples: US-TX, CA-ON, MX-JAL
  if (countryCode && raw.startsWith(`${countryCode}-`)) {
    const part = raw.slice(countryCode.length + 1).trim();
    return part;
  }

  return "";
}

function mapSubdivisionToAbbr(countryCode: string, rawValue?: string): string {
  const normalized = normalizeLookupValue(rawValue);
  if (!normalized) return "";

  if (countryCode === "US") {
    if (/^[a-z]{2}$/i.test(normalized)) return normalized.toUpperCase();
    return US_SUBDIVISIONS[normalized] ?? "";
  }

  if (countryCode === "CA") {
    if (/^[a-z]{2}$/i.test(normalized)) return normalized.toUpperCase();
    return CANADA_SUBDIVISIONS[normalized] ?? "";
  }

  if (countryCode === "MX") {
    if (/^[a-z]{2}$/i.test(normalized)) return normalized.toUpperCase();
    return MEXICO_SUBDIVISIONS[normalized] ?? "";
  }

  return "";
}

export function resolveFlagPaletteKey(
  address?: NominatimAddress,
  availableKeys?: Record<string, unknown>,
): string | null {
  const countryCode = getCountryCode(address);
  if (!countryCode) return null;

  const candidates = getSubdivisionCandidates(address);

  for (const candidate of candidates) {
    const abbr = mapSubdivisionToAbbr(countryCode, candidate);
    if (!abbr) continue;

    const key = `${countryCode}-${abbr}`;
    if (!availableKeys || key in availableKeys) {
      return key;
    }
  }

  // Try ISO subdivision strings if Nominatim exposes them.
  for (const candidate of candidates) {
    const isoPart = extractIsoSubdivisionCode(candidate, countryCode);
    if (!isoPart) continue;

    // Normal case: already 2-letter code like TX or ON.
    if (isoPart.length === 2) {
      const key = `${countryCode}-${isoPart}`;
      if (!availableKeys || key in availableKeys) {
        return key;
      }
    }
  }

  // Country fallback.
  if (!availableKeys || countryCode in availableKeys) {
    return countryCode;
  }

  return null;
}
