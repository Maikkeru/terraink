import type { Location, SearchResult } from "../domain/types";

interface NominatimEntry {
  lat?: number | string;
  lon?: number | string;
  display_name?: string;
  label?: string;
  place_id?: number | string;
  city?: string;
  country?: string;
  address?: Record<string, string>;
  importance?: number | string;
}

function inferContinentFromCoordinates(lat: number, lon: number): string {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return "";
  if (lat <= -60) return "Antarctica";
  if (lat >= 5 && lat <= 82 && lon >= -170 && lon <= -20) return "North America";
  if (lat <= 15 && lat >= -60 && lon >= -92 && lon <= -30) return "South America";
  if (lat >= 35 && lon >= -25 && lon <= 60) return "Europe";
  if (lat >= -35 && lat <= 37 && lon >= -20 && lon <= 55) return "Africa";
  if (lat >= -10 && lon >= 110 && lon <= 180) return "Oceania";
  if (lat >= -50 && lon >= 110 && lon <= 180) return "Oceania";
  if (lon >= 25 && lon <= 180) return "Asia";
  return "";
}

function pickFirstAddressValue(
  address: Record<string, string>,
  keys: string[],
): string {
  for (const key of keys) {
    const value = address[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function inferContinentFromCountryCode(countryCode: string): string {
  const code = countryCode.toUpperCase();

  if (
    [
      "US", "CA", "MX", "GT", "BZ", "SV", "HN", "NI", "CR", "PA",
      "CU", "JM", "HT", "DO", "BS", "BB", "TT",
    ].includes(code)
  ) return "North America";

  if (
    [
      "BR", "AR", "CL", "PE", "CO", "VE", "UY", "PY", "BO", "EC", "GY", "SR",
    ].includes(code)
  ) return "South America";

  if (
    [
      "GB", "IE", "FR", "DE", "ES", "PT", "IT", "NL", "BE", "LU", "CH", "AT",
      "DK", "NO", "SE", "FI", "IS", "PL", "CZ", "SK", "HU", "RO", "BG", "GR",
      "HR", "SI", "BA", "RS", "ME", "MK", "AL", "MD", "UA", "BY", "LT", "LV",
      "EE",
    ].includes(code)
  ) return "Europe";

  if (
    [
      "JP", "CN", "KR", "KP", "TW", "HK", "MO", "VN", "TH", "KH", "LA", "MM",
      "MY", "SG", "ID", "PH", "BN", "IN", "PK", "BD", "LK", "NP", "BT", "MN",
      "KZ", "UZ", "TM", "KG", "TJ", "AF", "IR", "IQ", "SY", "JO", "LB", "IL",
      "SA", "AE", "QA", "KW", "OM", "YE", "TR", "GE", "AM", "AZ",
    ].includes(code)
  ) return "Asia";

  if (
    [
      "ZA", "NG", "EG", "DZ", "MA", "TN", "LY", "SD", "ET", "KE", "UG", "TZ",
      "GH", "CI", "SN", "CM", "AO", "ZM", "ZW", "BW", "NA", "MZ", "MG",
    ].includes(code)
  ) return "Africa";

  if (
    [
      "AU", "NZ", "PG", "FJ", "SB", "VU", "NC", "WS", "TO",
    ].includes(code)
  ) return "Oceania";

  if (code === "AQ") return "Antarctica";

  return "";
}

function pickBestLocality(
  address: Record<string, string>,
  entry?: { city?: string },
): string {
  return (
    pickFirstAddressValue(address, [
      "city",
      "town",
      "village",
      "municipality",
      "suburb",
      "city_district",
      "district",
      "borough",
      "county",
      "state_district",
      "province",
      "state",
      "region",
      "prefecture",
      "oblast",
      "voivodeship",
      "governorate",
      "department",
      "canton",
      "hamlet",
    ]) ||
    String(entry?.city ?? "").trim()
  );
}

function extractPrimaryName(label: string): string {
  return label.split(",")[0]?.trim() ?? "";
}
export function normalizeLocationResult(
  entry: NominatimEntry | null | undefined,
  fallbackLabel = "",
): SearchResult | null {
  if (!entry || typeof entry !== "object") {
    
    return null;
  }

  const lat = Number(entry.lat);
  const lon = Number(entry.lon);
  
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  const label = String(
    entry.display_name ?? entry.label ?? fallbackLabel,
  ).trim();
  if (!label) {
    return null;
  }

  const address = entry.address ?? {};
  const primaryName = extractPrimaryName(label);

  const city = pickBestLocality(address, entry);
  const country =
    pickFirstAddressValue(address, ["country"]) ||
    String(entry.country ?? "").trim();

  const rawCountryCode = pickFirstAddressValue(address, ["country_code"]);
  const countryCode = rawCountryCode ? rawCountryCode.toUpperCase() : "";

  const continent =
    pickFirstAddressValue(address, ["continent"]) ||
    inferContinentFromCountryCode(countryCode) ||
    inferContinentFromCoordinates(lat, lon);

  return {
    id: String(entry.place_id ?? label),
    label,
    primaryName,
    city,
    country,
    countryCode,
    continent,
    lat,
    lon,
    importance: Number(entry.importance ?? 0),
  };
}

export function parseLocationResponseItems(
  payload: unknown,
  query: string
): SearchResult[] {
  const entries = Array.isArray(payload) ? (payload as NominatimEntry[]) : [];
  const suggestions: SearchResult[] = [];
  const seenKeys = new Set<string>();


  for (const entry of entries) {
    const normalized = normalizeLocationResult(entry,);
    
    if (!normalized) {

      
      continue;
    }

const resultKey =
  `${normalized.label}|${normalized.lat}|${normalized.lon}`.toLowerCase();

if (seenKeys.has(resultKey)) {
  continue;
}

seenKeys.add(resultKey);
    suggestions.push(normalized);
  }

const q = query.trim().toLowerCase();

suggestions.sort((a, b) => {
  const score = (item: SearchResult) => {
  let s = 0;

  const label = item.label.toLowerCase();
  const city = (item.city || "").toLowerCase();

  // Primary name match
  if (label.split(",")[0] === q) s += 150;

  // Strong intent matching
  if (label === q) s += 200;
  else if (label.startsWith(q)) s += 120;
  else if (label.includes(q)) s += 80;

  if (city === q) s += 100;
  else if (city.startsWith(q)) s += 70;

  // Data quality
  if (item.countryCode) s += 10;

   if (typeof item.importance === "number") {
    s += item.importance * 100;
  }

  // Prefer cleaner labels
  s -= label.length * 0.1;

  return s;
};

  return score(b) - score(a);
});

  return suggestions;
}
