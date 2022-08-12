import { injectable } from 'inversify';

import { Uuid } from '@utilities/Uuid/Uuid';
import { searchModel } from '@src/BeerModule/models/Search';

import { ISearch } from './entities/ISearch';
import { ISearchRepository } from './interfaces/ISearchRepository';
import { ISaveSearchDTO } from './dto/ISaveSearchDto';

@injectable()
export class SearchMongoRepository implements ISearchRepository {
  constructor(
    private readonly _uuid: Uuid,
    private readonly _database = searchModel,
  ) {}

  async save(search: ISaveSearchDTO): Promise<void | Error> {
    try {
      const newSearch: ISearch | undefined = await this._database.create({
        id: this._uuid.generate(),
        user_id: search.user_id,
        search_term: search.search_term,
        date: new Date(),
      });

      if (newSearch === undefined) {
        return new Error('Error creating new search');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async findAll() {
    return await this._database
      .find({})
      .select('-_id id user_id search_term date')
      .lean();
  }
}
