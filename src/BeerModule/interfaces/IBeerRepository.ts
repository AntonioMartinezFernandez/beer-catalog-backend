import { IBeer } from '../entities/IBeer';

export interface IBeerRepository {
  findAll(): Promise<IBeer[]>;
  findById(id: string): Promise<IBeer | null>;
  searchCoincidentTerms(term: string): Promise<string[]>;
  searchByTerm(term: string): Promise<IBeer[]>;
  topTenIngredients(): Promise<{ name: string; count: number }[]>;
}
