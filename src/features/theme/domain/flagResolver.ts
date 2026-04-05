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

  germany: "DE",
  deutschland: "DE",
  de: "DE",

  france: "FR",
  fr: "FR",

  italy: "IT",
  italia: "IT",
  it: "IT",

  spain: "ES",
  espana: "ES",
  españa: "ES",
  es: "ES",

  portugal: "PT",
  pt: "PT",

  ireland: "IE",
  ie: "IE",

  greece: "GR",
  gr: "GR",

  bulgaria: "BG",
  bg: "BG",

  romania: "RO",
  ro: "RO",

  hungary: "HU",
  hu: "HU",

  slovakia: "SK",
  sk: "SK",

  "czech republic": "CZ",
  czechia: "CZ",
  cz: "CZ",

  poland: "PL",
  pl: "PL",

  iceland: "IS",
  is: "IS",

  finland: "FI",
  fi: "FI",

  denmark: "DK",
  dk: "DK",

  luxembourg: "LU",
  lu: "LU",

  belgium: "BE",
  be: "BE",

  netherlands: "NL",
  holland: "NL",
  nl: "NL",

  sweden: "SE",
  se: "SE",

  norway: "NO",
  no: "NO",

  estonia: "EE",
  ee: "EE",

  latvia: "LV",
  lv: "LV",

  lithuania: "LT",
  lt: "LT",

  "united kingdom": "GB",
  britain: "GB",
  "great britain": "GB",
  uk: "GB",
  gb: "GB",
  england: "GB",
  scotland: "GB",
  wales: "GB",
  "northern ireland": "GB",

  "european union": "EU",
  eu: "EU",
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
const GERMANY_SUBDIVISIONS: Record<string, string> = {
  "baden wurttemberg": "BW",
  "baden-wurttemberg": "BW",
  "baden-württemberg": "BW",
  bavaria: "BY",
  bayern: "BY",
  berlin: "BE",
  brandenburg: "BB",
  bremen: "HB",
  hamburg: "HH",
  hesse: "HE",
  hessen: "HE",
  "lower saxony": "NI",
  niedersachsen: "NI",
  "mecklenburg western pomerania": "MV",
  "mecklenburg-vorpommern": "MV",
  "north rhine westphalia": "NW",
  "north rhine-westphalia": "NW",
  nordrheinwestfalen: "NW",
  "rhineland palatinate": "RP",
  "rhineland-palatinate": "RP",
  rheinlandpfalz: "RP",
  saarland: "SL",
  saxony: "SN",
  sachsen: "SN",
  "saxony anhalt": "ST",
  "saxony-anhalt": "ST",
  sachsenanhalt: "ST",
  "schleswig holstein": "SH",
  "schleswig-holstein": "SH",
  thuringia: "TH",
  thuringen: "TH",
  thüringen: "TH",
};

const UK_SUBDIVISIONS: Record<string, string> = {
  england: "ENG",
  scotland: "SCT",
  wales: "WLS",
  "northern ireland": "NIR",
};

const FRANCE_SUBDIVISIONS: Record<string, string> = {
  "ile de france": "IDF",
  "île de france": "IDF",
  idf: "IDF",
  "nouvelle aquitaine": "NAQ",
  occitanie: "OCC",
  "provence alpes cote dazur": "PAC",
  "provence-alpes-cote d'azur": "PAC",
  "provence alpes cote d azur": "PAC",
  "provence-alpes-côte d'azur": "PAC",
  "auvergne rhone alpes": "ARA",
  "auvergne-rhone-alpes": "ARA",
  "auvergne-rhône-alpes": "ARA",
};

const ITALY_SUBDIVISIONS: Record<string, string> = {
  lazio: "LAZ",
  lombardy: "LOM",
  lombardia: "LOM",
  sicily: "SIC",
  sicilia: "SIC",
  tuscany: "TOS",
  toscana: "TOS",
  veneto: "VEN",
};

const SPAIN_SUBDIVISIONS: Record<string, string> = {
  andalusia: "AN",
  andalucia: "AN",
  andalucía: "AN",
  catalonia: "CT",
  catalunya: "CT",
  cataluña: "CT",
  madrid: "MD",
  valencia: "VC",
  "comunitat valenciana": "VC",
  "comunidad valenciana": "VC",
  galicia: "GA",
};

const BELGIUM_SUBDIVISIONS: Record<string, string> = {
  flanders: "VLG",
  vlaanderen: "VLG",
  wallonia: "WAL",
  wallonie: "WAL",
  brussels: "BRU",
  "brussels capital region": "BRU",
  "brussels-capital region": "BRU",
};

const NETHERLANDS_SUBDIVISIONS: Record<string, string> = {
  drenthe: "DR",
  flevoland: "FL",
  friesland: "FR",
  gelderland: "GE",
  groningen: "GR",
  limburg: "LI",
  "north brabant": "NB",
  "noord brabant": "NB",
  "north holland": "NH",
  "noord holland": "NH",
  overijssel: "OV",
  utrecht: "UT",
  zeeland: "ZE",
  "south holland": "ZH",
  "zuid holland": "ZH",
};

const SWEDEN_SUBDIVISIONS: Record<string, string> = {
  stockholm: "AB",
  "stockholm county": "AB",
  västerbotten: "AC",
  vasterbotten: "AC",
  norrbotten: "BD",
  uppsala: "C",
  sodermanland: "D",
  södermanland: "D",
  ostergotland: "E",
  östergötland: "E",
  jonkoping: "F",
  jönköping: "F",
  kronoberg: "G",
  kalmar: "H",
  gotland: "I",
  blekinge: "K",
  skane: "M",
  skåne: "M",
  halland: "N",
  "vastra gotaland": "O",
  "västra götaland": "O",
  varmland: "S",
  värmland: "S",
  orebro: "T",
  örebro: "T",
  vastmanland: "U",
  västmanland: "U",
  dalarna: "W",
  gavleborg: "X",
  gävleborg: "X",
  vasternorrland: "Y",
  västernorrland: "Y",
  jamtland: "Z",
  jämtland: "Z",
};

const NORWAY_SUBDIVISIONS: Record<string, string> = {
  oslo: "03",
  rogaland: "11",
  "more og romsdal": "15",
  "møre og romsdal": "15",
  nordland: "18",
  viken: "30",
  innlandet: "34",
  "vestfold og telemark": "38",
  agder: "42",
  vestland: "46",
  trondelag: "50",
  trøndelag: "50",
  "troms og finnmark": "54",
};

const DENMARK_SUBDIVISIONS: Record<string, string> = {
  "capital region of denmark": "84",
  hovedstaden: "84",
  "central denmark region": "82",
  midtjylland: "82",
  "region of southern denmark": "83",
  syddanmark: "83",
};

const FINLAND_SUBDIVISIONS: Record<string, string> = {
  uusimaa: "18",
  åland: "1",
  aland: "1",
  "southwest finland": "19",
  "varsinais suomi": "19",
  "varsinais-suomi": "19",
};

const ICELAND_SUBDIVISIONS: Record<string, string> = {};

const POLAND_SUBDIVISIONS: Record<string, string> = {
  "lower silesian": "DS",
  "kuyavian pomeranian": "KP",
  lubusz: "LU",
  lodz: "LD",
  łódź: "LD",
  "lesser poland": "MA",
  masovian: "MZ",
  opole: "OP",
  subcarpathian: "PK",
  podlaskie: "PD",
  pomeranian: "PM",
  silesian: "SL",
  swietokrzyskie: "SK",
  świętokrzyskie: "SK",
  "warmian masurian": "WN",
  "greater poland": "WP",
  "west pomeranian": "ZP",
};

const CZECH_SUBDIVISIONS: Record<string, string> = {
  prague: "10",
  "central bohemian": "20",
};

const SLOVAKIA_SUBDIVISIONS: Record<string, string> = {
  bratislava: "BL",
  kosice: "KI",
  košice: "KI",
};

const HUNGARY_SUBDIVISIONS: Record<string, string> = {
  budapest: "BU",
  pest: "PE",
};

const ROMANIA_SUBDIVISIONS: Record<string, string> = {
  alba: "AB",
  arad: "AR",
  arges: "AG",
  argeș: "AG",
  bacau: "BC",
  băcău: "BC",
  bihor: "BH",
  "bistrita nasaud": "BN",
  "bistrița năsăud": "BN",
  botosani: "BT",
  botoșani: "BT",
  braila: "BR",
  brăila: "BR",
  brasov: "BV",
  brașov: "BV",
  bucharest: "B",
  bucaresti: "B",
  bucuresti: "B",
  bucurești: "B",
  buzau: "BZ",
  buzău: "BZ",
  "caras severin": "CS",
  "caraș severin": "CS",
  calarasi: "CL",
  călărași: "CL",
  cluj: "CJ",
  constanta: "CT",
  constanța: "CT",
  covasna: "CV",
  dambovita: "DB",
  dâmbovița: "DB",
  dolj: "DJ",
  galati: "GL",
  galați: "GL",
  giurgiu: "GR",
  gorj: "GJ",
  harghita: "HR",
  hunedoara: "HD",
  ialomita: "IL",
  ialomița: "IL",
  iasi: "IS",
  iași: "IS",
  ilfov: "IF",
  maramures: "MM",
  maramureș: "MM",
  mehedinti: "MH",
  mehedinți: "MH",
  mures: "MS",
  mureș: "MS",
  neamt: "NT",
  neamț: "NT",
  olt: "OT",
  prahova: "PH",
  "satu mare": "SM",
  salaj: "SJ",
  sălaj: "SJ",
  sibiu: "SB",
  suceava: "SV",
  teleorman: "TR",
  timis: "TM",
  timiș: "TM",
  tulcea: "TL",
  valcea: "VL",
  vâlcea: "VL",
  vaslui: "VS",
  vrancea: "VN",
};

const BULGARIA_SUBDIVISIONS: Record<string, string> = {
  blagoevgrad: "01",
  burgas: "02",
  varna: "03",
  "veliko tarnovo": "04",
  vidin: "05",
  vratsa: "06",
  gabrovo: "07",
  dobrich: "08",
  kardzhali: "09",
  kyustendil: "10",
  lovech: "11",
  montana: "12",
  pazardzhik: "13",
  pernik: "14",
  pleven: "15",
  plovdiv: "16",
  razgrad: "17",
  ruse: "18",
  silistra: "19",
  sliven: "20",
  smolyan: "21",
  "sofia city": "22",
  sofia: "22",
  "sofia province": "23",
  "sofia oblast": "23",
  "stara zagora": "24",
  targovishte: "25",
  haskovo: "26",
  shumen: "27",
  yambol: "28",
};

const GREECE_SUBDIVISIONS: Record<string, string> = {
  "east macedonia and thrace": "A",
  "central macedonia": "B",
  "west macedonia": "C",
  epirus: "D",
  thessaly: "E",
  "ionian islands": "F",
  "west greece": "G",
  "central greece": "H",
  attica: "I",
  peloponnese: "J",
  "north aegean": "K",
  "south aegean": "L",
  crete: "M",
};

const IRELAND_SUBDIVISIONS: Record<string, string> = {
  connacht: "C",
  leinster: "L",
  munster: "M",
  ulster: "U",
};

const PORTUGAL_SUBDIVISIONS: Record<string, string> = {
  aveiro: "01",
  beja: "02",
  braga: "03",
  braganca: "04",
  bragança: "04",
  "castelo branco": "05",
  coimbra: "06",
  evora: "07",
  évora: "07",
  faro: "08",
  guarda: "09",
  leiria: "10",
  lisbon: "11",
  lisboa: "11",
  portalegre: "12",
  porto: "13",
  santarem: "14",
  santarém: "14",
  setubal: "15",
  setúbal: "15",
  "viana do castelo": "16",
  "vila real": "17",
  viseu: "18",
};

const ESTONIA_SUBDIVISIONS: Record<string, string> = {
  harju: "37",
  hiiumaa: "39",
  "ida viru": "44",
  "ida-viru": "44",
  jogeva: "49",
  jõgeva: "49",
  jarva: "51",
  järva: "51",
  laane: "57",
  lääne: "57",
  "laane viru": "59",
  "lääne viru": "59",
  polva: "65",
  põlva: "65",
  parnu: "67",
  pärnu: "67",
  rapla: "70",
  saare: "74",
  tartu: "78",
  valga: "82",
  viljandi: "84",
  voru: "86",
  võru: "86",
};

const LATVIA_SUBDIVISIONS: Record<string, string> = {
  riga: "RIX",
};

const LITHUANIA_SUBDIVISIONS: Record<string, string> = {
  alytus: "AL",
  klaipeda: "KL",
  klaipėda: "KL",
  kaunas: "KU",
  marijampole: "MR",
  marijampolė: "MR",
  panevezys: "PN",
  panevėžys: "PN",
  siauliai: "SA",
  šiauliai: "SA",
  taurage: "TA",
  tauragė: "TA",
  telsiai: "TE",
  telšiai: "TE",
  utena: "UT",
  vilnius: "VL",
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

  const byCountry: Record<string, Record<string, string>> = {
    US: US_SUBDIVISIONS,
    CA: CANADA_SUBDIVISIONS,
    MX: MEXICO_SUBDIVISIONS,
    DE: GERMANY_SUBDIVISIONS,
    GB: UK_SUBDIVISIONS,
    FR: FRANCE_SUBDIVISIONS,
    IT: ITALY_SUBDIVISIONS,
    ES: SPAIN_SUBDIVISIONS,
    BE: BELGIUM_SUBDIVISIONS,
    NL: NETHERLANDS_SUBDIVISIONS,
    SE: SWEDEN_SUBDIVISIONS,
    NO: NORWAY_SUBDIVISIONS,
    DK: DENMARK_SUBDIVISIONS,
    FI: FINLAND_SUBDIVISIONS,
    PL: POLAND_SUBDIVISIONS,
    CZ: CZECH_SUBDIVISIONS,
    SK: SLOVAKIA_SUBDIVISIONS,
    HU: HUNGARY_SUBDIVISIONS,
    RO: ROMANIA_SUBDIVISIONS,
    BG: BULGARIA_SUBDIVISIONS,
    GR: GREECE_SUBDIVISIONS,
    IE: IRELAND_SUBDIVISIONS,
    PT: PORTUGAL_SUBDIVISIONS,
    EE: ESTONIA_SUBDIVISIONS,
    LV: LATVIA_SUBDIVISIONS,
    LT: LITHUANIA_SUBDIVISIONS,
  };

  const table = byCountry[countryCode];
  if (!table) return "";

  if (/^[A-Z0-9]{1,3}$/i.test(normalized)) {
    return normalized.toUpperCase();
  }

  return table[normalized] ?? "";
}

export function resolveFlagPaletteKey(
  address?: NominatimAddress,
  availableKeys: Record<string, unknown> = flagPalettes as Record<
    string,
    unknown
  >,
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
    const key = `${countryCode}-${isoPart}`;
    if (!availableKeys || key in availableKeys) {
      return key;
    }
  }
  // Country fallback.
  if (!availableKeys || countryCode in availableKeys) {
    return countryCode;
  }

  return null;
}
