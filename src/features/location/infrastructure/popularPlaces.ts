import type { SearchResult } from "../domain/types";

export interface PopularPlace {
  id: string;
  label: string;
  city: string;
  country: string;
  countryCode: string;
  continent: string;
  lat: number;
  lon: number;
  aliases?: string[];
  popularity?: number;
}

export const POPULAR_PLACES: PopularPlace[] = [
  {
    id: "eiffel-tower-paris-fr",
    label: "Eiffel Tower, Paris, France",
    lat: 48.85837,
    lon: 2.294481,
    city: "Paris",
    country: "France",
    countryCode: "FR",
    continent: "Europe",
    aliases: ["eiffel tower", "tour eiffel", "paris tower"],
    popularity: 100,
  },
  {
    id: "times-square-new-york-us",
    label: "Times Square, New York, United States",
    lat: 40.758,
    lon: -73.9855,
    city: "New York",
    country: "United States",
    countryCode: "US",
    continent: "North America",
    aliases: ["times square", "nyc times square"],
    popularity: 98,
  },
  {
  id: "kyoto-jp",
  label: "Kyoto, Kyoto, Japan",
  city: "Kyoto",
  country: "Japan",
  countryCode: "JP",
  continent: "Asia",
  lat: 35.0116,
  lon: 135.7681,
  aliases: ["kyoto", "kyoto japan"],
  popularity: 94,
},
{
  id: "fukuoka-jp",
  label: "Fukuoka, Fukuoka, Japan",
  city: "Fukuoka",
  country: "Japan",
  countryCode: "JP",
  continent: "Asia",
  lat: 33.5902,
  lon: 130.4017,
  aliases: ["fukuoka", "fukuoka japan"],
  popularity: 90,
},
{
  id: "tokyo-jp",
  label: "Tokyo, Tokyo, Japan",
  city: "Tokyo",
  country: "Japan",
  countryCode: "JP",
  continent: "Asia",
  lat: 35.6762,
  lon: 139.6503,
  aliases: ["tokyo", "tokyo japan"],
  popularity: 100,
},
{
  id: "osaka-jp",
  label: "Osaka, Osaka, Japan",
  city: "Osaka",
  country: "Japan",
  countryCode: "JP",
  continent: "Asia",
  lat: 34.6937,
  lon: 135.5023,
  aliases: ["osaka", "osaka japan"],
  popularity: 95,
},
{
  id: "sapporo-jp",
  label: "Sapporo, Hokkaido, Japan",
  city: "Sapporo",
  country: "Japan",
  countryCode: "JP",
  continent: "Asia",
  lat: 43.0618,
  lon: 141.3545,
  aliases: ["sapporo", "sapporo japan"],
  popularity: 84,
},
{
  id: "nagoya-jp",
  label: "Nagoya, Aichi, Japan",
  city: "Nagoya",
  country: "Japan",
  countryCode: "JP",
  continent: "Asia",
  lat: 35.1815,
  lon: 136.9066,
  aliases: ["nagoya", "nagoya japan"],
  popularity: 83,
},
{
  id: "hiroshima-jp",
  label: "Hiroshima, Hiroshima, Japan",
  city: "Hiroshima",
  country: "Japan",
  countryCode: "JP",
  continent: "Asia",
  lat: 34.3853,
  lon: 132.4553,
  aliases: ["hiroshima", "hiroshima japan"],
  popularity: 82,
},
{
  id: "yokohama-jp",
  label: "Yokohama, Kanagawa, Japan",
  city: "Yokohama",
  country: "Japan",
  countryCode: "JP",
  continent: "Asia",
  lat: 35.4437,
  lon: 139.638,
  aliases: ["yokohama", "yokohama japan"],
  popularity: 88,
},
{
  id: "shibuya-crossing-tokyo-jp",
  label: "Shibuya Crossing, Tokyo, Japan",
  city: "Tokyo",
  country: "Japan",
  countryCode: "JP",
  continent: "Asia",
  lat: 35.6595,
  lon: 139.7005,
  aliases: ["shibuya", "shibuya crossing", "tokyo crossing"],
  popularity: 97,
},
{
  id: "marina-bay-sands-sg",
  label: "Marina Bay Sands, Singapore",
  city: "Singapore",
  country: "Singapore",
  countryCode: "SG",
  continent: "Asia",
  lat: 1.2834,
  lon: 103.8607,
  aliases: ["marina bay sands", "mbs singapore"],
  popularity: 91,
},
{
  id: "colosseum-rome-it",
  label: "Colosseum, Rome, Italy",
  city: "Rome",
  country: "Italy",
  countryCode: "IT",
  continent: "Europe",
  lat: 41.8902,
  lon: 12.4922,
  aliases: ["colosseum", "colosseo", "rome colosseum"],
  popularity: 96,
},
{
  id: "central-park-new-york-us",
  label: "Central Park, New York, United States",
  city: "New York",
  country: "United States",
  countryCode: "US",
  continent: "North America",
  lat: 40.7829,
  lon: -73.9654,
  aliases: ["central park", "new york park"],
  popularity: 95,
},
{
  id: "big-ben-london-gb",
  label: "Big Ben, London, United Kingdom",
  city: "London",
  country: "United Kingdom",
  countryCode: "GB",
  continent: "Europe",
  lat: 51.5007,
  lon: -0.1246,
  aliases: ["big ben", "elizabeth tower", "london clock tower"],
  popularity: 94,
},
{
  id: "bondi-beach-sydney-au",
  label: "Bondi Beach, Sydney, Australia",
  city: "Sydney",
  country: "Australia",
  countryCode: "AU",
  continent: "Oceania",
  lat: -33.8908,
  lon: 151.2743,
  aliases: ["bondi", "bondi beach", "sydney beach"],
  popularity: 89,
},
{
  id: "waikiki-honolulu-us",
  label: "Waikiki, Honolulu, United States",
  city: "Honolulu",
  country: "United States",
  countryCode: "US",
  continent: "North America",
  lat: 21.2767,
  lon: -157.8275,
  aliases: ["waikiki", "waikiki beach", "honolulu beach"],
  popularity: 90,
}
];


export function searchPopularPlaces(
  query: string,
  limit = 6,
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  return POPULAR_PLACES
    .map((place) => {
      const haystacks = [
        place.label.toLowerCase(),
        place.city.toLowerCase(),
        place.country.toLowerCase(),
        ...(place.aliases ?? []).map((a) => a.toLowerCase()),
      ];

      let score = 0;

      for (const text of haystacks) {
        if (text === q) score = Math.max(score, 1000);
        else if (text.startsWith(q)) score = Math.max(score, 700);
        else if (text.includes(q)) score = Math.max(score, 400);
      }

      score += place.popularity ?? 0;

      return { place, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(
      (item): SearchResult => ({
        id: item.place.id,
        label: item.place.label,
        city: item.place.city,
        country: item.place.country,
        countryCode: item.place.countryCode,
        continent: item.place.continent,
        lat: item.place.lat,
        lon: item.place.lon,
      }),
    );
}