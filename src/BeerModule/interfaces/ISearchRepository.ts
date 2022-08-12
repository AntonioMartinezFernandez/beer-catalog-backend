import { ISaveSearchDTO } from '../dto/ISaveSearchDto';
import { ISearch } from '../entities/ISearch';

export interface ISearchRepository {
  save(search: ISaveSearchDTO): void;
  findAll(): Promise<ISearch[]>;
}
