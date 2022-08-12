import { ISaveSearchDTO } from '../dto/ISaveSearchDto';
import { IBeer } from '../entities/IBeer';
import { ISearch } from '../entities/ISearch';

export interface IBeerService {
  findBeers(): Promise<IBeer[]>;
  findById(id: string): Promise<IBeer | null>;
  searchCoincidentTerms(term: string): Promise<string[]>;
  searchByTerm(term: string): Promise<IBeer[]>;
  topTenIngredients(): Promise<{ name: string; count: number }[]>;
  saveSearch(search: ISaveSearchDTO): void;
  findSearches(): Promise<ISearch[]>;
}
