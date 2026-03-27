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