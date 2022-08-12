import { injectable } from 'inversify';
import { IBeerService } from './interfaces/IBeerService';
import { BeerMongoRepository } from './beerMongoRepository';
import { SearchMongoRepository } from './searchMongoRepository';
import { ISaveSearchDTO } from './dto/ISaveSearchDto';

@injectable()
export class BeerService implements IBeerService {
  constructor(
    private readonly _BeerRepository: BeerMongoRepository,
    private readonly _SearchRepository: SearchMongoRepository,
  ) {}

  async findBeers() {
    const beers = await this._BeerRepository.findAll();
    return beers;
  }

  async findById(id: string) {
    const beer = await this._BeerRepository.findById(id);
    return beer;
  }

  async searchCoincidentTerms(term: string) {
    return await this._BeerRepository.searchCoincidentTerms(term);
  }

  async searchByTerm(term: string) {
    const beers = this._BeerRepository.searchByTerm(term);
    return beers;
  }

  async topTenIngredients() {
    const ingredients = this._BeerRepository.topTenIngredients();
    return ingredients;
  }

  async saveSearch(search: ISaveSearchDTO) {
    await this._SearchRepository.save(search);
  }

  async findSearches() {
    return await this._SearchRepository.findAll();
  }
}
