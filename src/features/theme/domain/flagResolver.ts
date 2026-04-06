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

const SPAIN_SUBDIVISIONS: Record<string, string> = {
  andalucia: "AN",
  andalucía: "AN",
  aragon: "AR",
  aragón: "AR",
  asturias: "AS",
  canarias: "CN",
  "canary islands": "CN",
  cantabria: "CB",
  "castilla y leon": "CL",
  "castilla y león": "CL",
  "castile and leon": "CL",
  "castilla la mancha": "CM",
  "castilla-la mancha": "CM",
  catalonia: "CT",
  catalunya: "CT",
  extremadura: "EX",
  galicia: "GA",
  "balearic islands": "IB",
  "islas baleares": "IB",
  "la rioja": "RI",
  madrid: "MD",
  murcia: "MC",
  navarra: "NC",
  "basque country": "PV",
  "pais vasco": "PV",
  "país vasco": "PV",
  valencia: "VC",
  "valencian community": "VC",
  ceuta: "CE",
  melilla: "ML",
};

const BELGIUM_SUBDIVISIONS: Record<string, string> = {
  antwerp: "VAN",
  antwerpen: "VAN",

  "flemish brabant": "VBR",
  "vlaams brabant": "VBR",

  limburg: "VLI",

  "east flanders": "VOV",
  "oost vlaanderen": "VOV",

  "west flanders": "VWV",
  "west vlaanderen": "VWV",

  "walloon brabant": "WBR",
  "brabant wallon": "WBR",

  hainaut: "WHT",
  liege: "WLG",
  liège: "WLG",

  luxembourg: "WLX", // belgium context
  namur: "WNA",
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
  "north jutland": "81",
  nordjylland: "81",

  "central jutland": "82",
  midtjylland: "82",

  "southern denmark": "83",
  syddanmark: "83",

  "capital region": "84",
  hovedstaden: "84",
  copenhagen: "84",

  zealand: "85",
  sjælland: "85",
};

const LUXEMBOURG_SUBDIVISIONS: Record<string, string> = {
  capellen: "CA",
  clervaux: "CL",
  diekirch: "DI",
  echternach: "EC",
  "esch sur alzette": "ES",
  "esch-sur-alzette": "ES",
  grevenmacher: "GR",
  luxembourg: "LU",
  mersch: "ME",
  redange: "RD",
  remich: "RM",
  vianden: "VD",
  wiltz: "WI",
};

const FINLAND_SUBDIVISIONS: Record<string, string> = {
  aland: "01",
  åland: "01",

  uusimaa: "18",
  helsinki: "18",

  lapland: "10",
  lappi: "10",

  pirkanmaa: "11",
  tampere: "11",

  "south karelia": "02",
  "north karelia": "13",

  "south ostrobothnia": "03",
  "north ostrobothnia": "14",
  ostrobothnia: "12",

  kainuu: "05",
  satakunta: "17",
  "central finland": "08",

  "south savonia": "04",
  "north savonia": "15",

  "paijat hame": "16",
  "päijät häme": "16",

  "kanta hame": "06",
  "kanta häme": "06",

  kymenlaakso: "09",
  "southwest finland": "19",
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
  praha: "10",

  "central bohemia": "20",
  stredocesky: "20",
  středočeský: "20",

  "south bohemia": "31",
  jihocesky: "31",
  jihočeský: "31",

  plzen: "32",
  plzensky: "32",
  plzeňský: "32",

  karlovy: "41",
  karlovarsky: "41",

  usti: "42",
  ustecky: "42",
  ústecký: "42",

  liberec: "51",
  liberecky: "51",

  hradec: "52",
  kralovehradecky: "52",

  pardubice: "53",
  pardubicky: "53",

  vysocina: "63",

  brno: "64",
  jihomoravsky: "64",

  olomouc: "71",
  olomoucky: "71",

  zlin: "72",
  zlinsky: "72",

  ostrava: "80",
  moravskoslezsky: "80",
};

const SLOVAKIA_SUBDIVISIONS: Record<string, string> = {
  bratislava: "BL",
  bratislavsky: "BL",
  bratislavský: "BL",

  trnava: "TA",
  trnavsky: "TA",
  trnavský: "TA",

  trencin: "TC",
  trenčín: "TC",
  trenciansky: "TC",
  trenčiansky: "TC",

  nitra: "NI",
  nitriansky: "NI",
  nitrianský: "NI",

  zilina: "ZI",
  žilina: "ZI",
  zilinsky: "ZI",
  žilinský: "ZI",

  "banska bystrica": "BC",
  banskobystricky: "BC",
  banskobystrický: "BC",

  presov: "PV",
  prešov: "PV",
  presovsky: "PV",
  prešovský: "PV",

  kosice: "KI",
  košice: "KI",
  kosicky: "KI",
  košický: "KI",
};

const HUNGARY_SUBDIVISIONS: Record<string, string> = {
  budapest: "BU",

  baranya: "BA",
  "bacs kiskun": "BK",
  "bács kiskun": "BK",

  bekes: "BE",
  békés: "BE",

  borsod: "BZ",
  "borsod abauj zemplen": "BZ",
  "borsod-abaúj-zemplén": "BZ",

  csongrad: "CS",
  "csongrad csanad": "CS",
  "csongrád-csanád": "CS",

  fejer: "FE",
  fejér: "FE",

  gyor: "GS",
  győr: "GS",
  "gyor moson sopron": "GS",

  hajdu: "HB",
  "hajdú bihar": "HB",

  heves: "HE",

  jasz: "JN",
  "jász nagykun szolnok": "JN",

  komarom: "KE",
  "komárom esztergom": "KE",

  nograd: "NO",
  nógrád: "NO",

  pest: "PE",

  somogy: "SO",

  szabolcs: "SZ",
  "szabolcs szatmar bereg": "SZ",

  tolna: "TO",
  vas: "VA",
  veszprem: "VE",
  veszprém: "VE",
  zala: "ZA",
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

const FRANCE_SUBDIVISIONS: Record<string, string> = {
  "auvergne rhone alpes": "ARA",
  "auvergne-rhone-alpes": "ARA",
  "auvergne-rhône-alpes": "ARA",
  "bourgogne franche comte": "BFC",
  "bourgogne-franche-comte": "BFC",
  "bourgogne-franche-comté": "BFC",
  bretagne: "BRE",
  brittany: "BRE",
  "centre val de loire": "CVL",
  "centre-val de loire": "CVL",
  corse: "COR",
  corsica: "COR",
  "grand est": "GES",
  "hauts de france": "HDF",
  "hauts-de-france": "HDF",
  "ile de france": "IDF",
  "île de france": "IDF",
  idf: "IDF",
  normandie: "NOR",
  normandy: "NOR",
  "nouvelle aquitaine": "NAQ",
  "nouvelle-aquitaine": "NAQ",
  occitanie: "OCC",
  "pays de la loire": "PDL",
  "provence alpes cote dazur": "PAC",
  "provence-alpes-cote d'azur": "PAC",
  "provence alpes cote d azur": "PAC",
  "provence-alpes-côte d'azur": "PAC",

  guadeloupe: "GP",
  guyane: "GF",
  "french guiana": "GF",
  martinique: "MQ",
  mayotte: "MT",
  reunion: "RE",
  "la reunion": "RE",
  "la réunion": "RE",
  "saint barthelemy": "BL",
  "saint barthélemy": "BL",
  "saint martin": "MF",
  "french polynesia": "PF",
  "polynesie francaise": "PF",
  "polynésie française": "PF",
  "new caledonia": "NC",
  "nouvelle caledonie": "NC",
  "nouvelle-calédonie": "NC",
  "saint pierre and miquelon": "PM",
  "saint-pierre-et-miquelon": "PM",
  "french southern territories": "TF",
  "terres australes francaises": "TF",
  "terres australes françaises": "TF",
  "wallis and futuna": "WF",
  "wallis-et-futuna": "WF",
  clipperton: "CP",
};

const ITALY_SUBDIVISIONS: Record<string, string> = {
  piedmont: "21",
  piemonte: "21",
  "aosta valley": "23",
  "valle daosta": "23",
  "valle d'aosta": "23",
  lombardy: "25",
  lombardia: "25",
  "trentino south tyrol": "32",
  "trentino-south tyrol": "32",
  "trentino alto adige": "32",
  "trentino-alto adige": "32",
  veneto: "34",
  "friuli venezia giulia": "36",
  liguria: "42",
  "emilia romagna": "45",
  "emilia-romagna": "45",
  tuscany: "52",
  toscana: "52",
  umbria: "55",
  marche: "57",
  lazio: "62",
  abruzzo: "65",
  molise: "67",
  campania: "72",
  apulia: "75",
  puglia: "75",
  basilicata: "77",
  calabria: "78",
  sicily: "82",
  sicilia: "82",
  sardinia: "88",
  sardegna: "88",
};
const JAPAN_SUBDIVISIONS: Record<string, string> = {
  hokkaido: "01",
  "hokkaido prefecture": "01",

  aomori: "02",
  "aomori prefecture": "02",

  iwate: "03",
  "iwate prefecture": "03",

  miyagi: "04",
  "miyagi prefecture": "04",

  akita: "05",
  "akita prefecture": "05",

  yamagata: "06",
  "yamagata prefecture": "06",

  fukushima: "07",
  "fukushima prefecture": "07",

  ibaraki: "08",
  "ibaraki prefecture": "08",

  tochigi: "09",
  "tochigi prefecture": "09",

  gunma: "10",
  "gunma prefecture": "10",

  saitama: "11",
  "saitama prefecture": "11",

  chiba: "12",
  "chiba prefecture": "12",

  tokyo: "13",
  "tokyo metropolis": "13",
  "tokyo prefecture": "13",
  "tokyo to": "13",

  kanagawa: "14",
  "kanagawa prefecture": "14",

  niigata: "15",
  "niigata prefecture": "15",

  toyama: "16",
  "toyama prefecture": "16",

  ishikawa: "17",
  "ishikawa prefecture": "17",

  fukui: "18",
  "fukui prefecture": "18",

  yamanashi: "19",
  "yamanashi prefecture": "19",

  nagano: "20",
  "nagano prefecture": "20",

  gifu: "21",
  "gifu prefecture": "21",

  shizuoka: "22",
  "shizuoka prefecture": "22",

  aichi: "23",
  "aichi prefecture": "23",

  mie: "24",
  "mie prefecture": "24",

  shiga: "25",
  "shiga prefecture": "25",

  kyoto: "26",
  "kyoto prefecture": "26",

  osaka: "27",
  "osaka prefecture": "27",

  hyogo: "28",
  hyōgo: "28",
  "hyogo prefecture": "28",

  nara: "29",
  "nara prefecture": "29",

  wakayama: "30",
  "wakayama prefecture": "30",

  tottori: "31",
  "tottori prefecture": "31",

  shimane: "32",
  "shimane prefecture": "32",

  okayama: "33",
  "okayama prefecture": "33",

  hiroshima: "34",
  "hiroshima prefecture": "34",

  yamaguchi: "35",
  "yamaguchi prefecture": "35",

  tokushima: "36",
  "tokushima prefecture": "36",

  kagawa: "37",
  "kagawa prefecture": "37",

  ehime: "38",
  "ehime prefecture": "38",

  kochi: "39",
  kōchi: "39",
  "kochi prefecture": "39",

  fukuoka: "40",
  "fukuoka prefecture": "40",

  saga: "41",
  "saga prefecture": "41",

  nagasaki: "42",
  "nagasaki prefecture": "42",

  kumamoto: "43",
  "kumamoto prefecture": "43",

  oita: "44",
  ōita: "44",
  "oita prefecture": "44",

  miyazaki: "45",
  "miyazaki prefecture": "45",

  kagoshima: "46",
  "kagoshima prefecture": "46",

  okinawa: "47",
  "okinawa prefecture": "47",
};

const KOREA_SUBDIVISIONS: Record<string, string> = {
  seoul: "11",
  busan: "26",
  daegu: "27",
  incheon: "28",
  gwangju: "29",
  daejeon: "30",
  ulsan: "31",
  sejong: "50",

  gyeonggi: "41",
  gangwon: "42",
  chungbuk: "43",
  chungnam: "44",
  jeonbuk: "45",
  jeonnam: "46",
  gyeongbuk: "47",
  gyeongnam: "48",
  jeju: "49",
};

const TAIWAN_SUBDIVISIONS: Record<string, string> = {
  taiwan: "TW",
  tw: "TW",
  "republic of china": "TW",
  "republic of china taiwan": "TW",
  changhua: "CHA",
  "changhua county": "CHA",

  chiayi: "CYQ",
  "chiayi county": "CYQ",
  "chiayi city": "CYI",

  hsinchu: "HSQ",
  "hsinchu county": "HSQ",
  "hsinchu city": "HSZ",

  hualien: "HUA",
  "hualien county": "HUA",

  yilan: "ILA",
  ilan: "ILA",
  "yilan county": "ILA",
  "ilan county": "ILA",

  keelung: "KEE",
  "keelung city": "KEE",

  kaohsiung: "KHH",
  "kaohsiung city": "KHH",

  kinmen: "KIN",
  "kinmen county": "KIN",

  lienchiang: "LIE",
  matsu: "LIE",
  "lienchiang county": "LIE",
  "matsu islands": "LIE",

  miaoli: "MIA",
  "miaoli county": "MIA",

  nantou: "NAN",
  "nantou county": "NAN",

  "new taipei": "NWT",
  "new taipei city": "NWT",

  penghu: "PEN",
  "penghu county": "PEN",

  pingtung: "PIF",
  "pingtung county": "PIF",

  taoyuan: "TAO",
  "taoyuan city": "TAO",

  tainan: "TNN",
  "tainan city": "TNN",

  taipei: "TPE",
  "taipei city": "TPE",

  taitung: "TTT",
  "taitung county": "TTT",

  taichung: "TXG",
  "taichung city": "TXG",

  yunlin: "YUN",
  "yunlin county": "YUN",
};

const CHINA_SUBDIVISIONS: Record<string, string> = {
  beijing: "BJ",
  shanghai: "SH",
  tianjin: "TJ",
  chongqing: "CQ",

  guangdong: "GD",
  guangxi: "GX",
  guizhou: "GZ",
  fujian: "FJ",
  zhejiang: "ZJ",
  jiangsu: "JS",
  jiangxi: "JX",

  shandong: "SD",
  henan: "HA",
  hebei: "HE",
  hubei: "HB",
  hunan: "HN",

  shanxi: "SX",
  shaanxi: "SN",

  liaoning: "LN",
  jilin: "JL",
  heilongjiang: "HL",

  sichuan: "SC",
  yunnan: "YN",
  qinghai: "QH",
  gansu: "GS",

  hainan: "HI",
  anhui: "AH",

  xinjiang: "XJ",
  tibet: "XZ",
  xizang: "XZ",

  "inner mongolia": "NM",
  ningxia: "NX",

  "hong kong": "HK",
  macau: "MO",
  macao: "MO",
};

const INDIA_SUBDIVISIONS: Record<string, string> = {
  "andaman and nicobar islands": "AN",
  "andhra pradesh": "AP",
  "arunachal pradesh": "AR",
  assam: "AS",
  bihar: "BR",
  chandigarh: "CH",
  chhattisgarh: "CG",
  "dadra and nagar haveli and daman and diu": "DH",
  delhi: "DL",
  "new delhi": "DL",
  goa: "GA",
  gujarat: "GJ",
  "himachal pradesh": "HP",
  haryana: "HR",
  jharkhand: "JH",
  "jammu and kashmir": "JK",
  karnataka: "KA",
  kerala: "KL",
  ladakh: "LA",
  lakshadweep: "LD",
  maharashtra: "MH",
  meghalaya: "ML",
  manipur: "MN",
  "madhya pradesh": "MP",
  mizoram: "MZ",
  nagaland: "NL",
  odisha: "OD",
  orissa: "OD",
  punjab: "PB",
  puducherry: "PY",
  pondicherry: "PY",
  rajasthan: "RJ",
  sikkim: "SK",
  "tamil nadu": "TN",
  tripura: "TR",
  telangana: "TS",
  uttarakhand: "UK",
  uttaranchal: "UK",
  "uttar pradesh": "UP",
  "west bengal": "WB",
};

const BRUNEI_SUBDIVISIONS: Record<string, string> = {
  belait: "BE",
  "brunei muara": "BM",
  "brunei-muara": "BM",
  temburong: "TE",
  tutong: "TU",
};

const THAILAND_SUBDIVISIONS: Record<string, string> = {
  bangkok: "10",
  krabi: "81",
  kanchanaburi: "71",
  kalasin: "46",
  "kamphaeng phet": "62",
  "khon kaen": "40",
  chanthaburi: "22",
  chachoengsao: "24",
  chonburi: "20",
  "chai nat": "18",
  chaiyaphum: "36",
  chumphon: "86",
  "chiang rai": "57",
  "chiang mai": "50",
  trang: "92",
  trat: "23",
  tak: "63",
  "nakhon nayok": "26",
  "nakhon pathom": "73",
  "nakhon phanom": "48",
  "nakhon ratchasima": "30",
  "nakhon si thammarat": "80",
  "nakhon sawan": "60",
  nonthaburi: "12",
  narathiwat: "96",
  nan: "55",
  "bueng kan": "38",
  buriram: "31",
  "pathum thani": "13",
  "prachuap khiri khan": "77",
  prachinburi: "25",
  pattani: "94",
  phayao: "56",
  "phra nakhon si ayutthaya": "14",
  "phang nga": "82",
  phatthalung: "93",
  phichit: "66",
  phitsanulok: "65",
  phetchaburi: "76",
  phetchabun: "67",
  phrae: "54",
  phuket: "83",
  "maha sarakham": "44",
  mukdahan: "49",
  "mae hong son": "58",
  yasothon: "35",
  yala: "95",
  "roi et": "45",
  ranong: "85",
  rayong: "21",
  ratchaburi: "70",
  lopburi: "16",
  lampang: "52",
  lamphun: "51",
  loei: "42",
  "si sa ket": "33",
  sisaket: "33",
  "sakon nakhon": "47",
  songkhla: "90",
  satun: "91",
  "samut prakan": "11",
  "samut songkhram": "75",
  "samut sakhon": "74",
  "sa kaeo": "27",
  saraburi: "19",
  "sing buri": "17",
  sukhothai: "64",
  "suphan buri": "72",
  "surat thani": "84",
  surin: "32",
  "nong khai": "43",
  "nong bua lamphu": "39",
  "ang thong": "15",
  "amnat charoen": "37",
  "udon thani": "41",
  uttaradit: "53",
  "uthai thani": "61",
  "ubon ratchathani": "34",
};

const VIETNAM_SUBDIVISIONS: Record<string, string> = {
  "ha noi": "HN",
  hanoi: "HN",

  "ho chi minh city": "HCM",
  "ho chi minh": "HCM",
  hcmc: "HCM",
  saigon: "HCM",

  "hai phong": "HP",
  haiphong: "HP",

  "da nang": "DN",
  danang: "DN",

  "can tho": "CT",
  cantho: "CT",

  hue: "HUE",
  huế: "HUE",

  "an giang": "AG",
  "bac ninh": "BN",
  "ca mau": "CM",
  "cao bang": "CB",
  "dak lak": "DL",
  "dien bien": "DB",
  "dong nai": "DNA",
  "dong thap": "DT",
  "gia lai": "GL",
  "ha tinh": "HT",
  "hung yen": "HY",
  "khanh hoa": "KH",
  "lai chau": "LC",
  "lang son": "LS",
  "lao cai": "LCA",
  "lam dong": "LD",
  "nghe an": "NA",
  "ninh binh": "NB",
  "phu tho": "PT",
  "quang ngai": "QNG",
  "quang ninh": "QNI",
  "quang tri": "QT",
  "son la": "SL",
  "tay ninh": "TN",
  "thai nguyen": "TNG",
  "thanh hoa": "TH",
  "tuyen quang": "TQ",
  "vinh long": "VL",
};

const PHILIPPINES_SUBDIVISIONS: Record<string, string> = {
  "metro manila": "NCR",
  ncr: "NCR",
  manila: "NCR",
  cebu: "CEB",
  davao: "DAV",
  "davao del sur": "DAV",
  iloilo: "ILO",
  pangasinan: "PAN",
  bulacan: "BUL",
  laguna: "LAG",
  batangas: "BAT",
};

const MALAYSIA_SUBDIVISIONS: Record<string, string> = {
  johor: "JHR",
  kedah: "KDH",
  kelantan: "KTN",
  malacca: "MLK",
  melaka: "MLK",
  "negeri sembilan": "NSN",
  pahang: "PHG",
  perak: "PRK",
  perlis: "PLS",
  penang: "PNG",
  "pulau pinang": "PNG",
  selangor: "SGR",
  terengganu: "TRG",
  sabah: "SAB",
  sarawak: "SWK",
  "kuala lumpur": "KUL",
  labuan: "LBN",
  putrajaya: "PJY",
};

const INDONESIA_SUBDIVISIONS: Record<string, string> = {
  jakarta: "JK",
  bali: "BA",
  "west java": "JB",
  "east java": "JI",
  "central java": "JT",
  sumatra: "SM",
  papua: "PA",
};

const MYANMAR_SUBDIVISIONS: Record<string, string> = {
  yangon: "YG",
  mandalay: "MDY",
  naypyidaw: "NP",
  shan: "SH",
  kachin: "KC",
  karen: "KN",
  rakhine: "RK",
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

  // If Nominatim already gave us a valid ISO code, use it directly
  if (rawCountryCode.length === 2) {
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
    LU: LUXEMBOURG_SUBDIVISIONS,
    JP: JAPAN_SUBDIVISIONS,
    KR: KOREA_SUBDIVISIONS,
    TW: TAIWAN_SUBDIVISIONS,
    CN: CHINA_SUBDIVISIONS,
    IN: INDIA_SUBDIVISIONS,
    BN: BRUNEI_SUBDIVISIONS,
    TH: THAILAND_SUBDIVISIONS,
    PH: PHILIPPINES_SUBDIVISIONS,
    MY: MALAYSIA_SUBDIVISIONS,
    ID: INDONESIA_SUBDIVISIONS,
    MM: MYANMAR_SUBDIVISIONS,
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
