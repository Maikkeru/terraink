export interface Location {
  id: string;
  label: string;
  primaryName?: string;
  city: string;
  country: string;
  countryCode: string;
  region?: string;
  regionCode?: string;
  continent?: string;
  lat: number;
  lon: number;
  importance?: number;
}

export interface SearchResult extends Location {}
