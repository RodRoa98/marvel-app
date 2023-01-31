export interface Heroe {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface HeroeData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Heroe[];
}

export interface ListHeroes {
  code: number;
  attributionText: string;
  data: HeroeData;
}