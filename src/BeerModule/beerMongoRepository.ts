import { injectable } from 'inversify';

import { Uuid } from '@utilities/Uuid/Uuid';
import { beerModel } from '@src/BeerModule/models/Beer';

import { IBeerRepository } from './interfaces/IBeerRepository';

@injectable()
export class BeerMongoRepository implements IBeerRepository {
  constructor(
    private readonly _uuid: Uuid,
    private readonly _database = beerModel,
  ) {}

  async findAll() {
    return await this._database
      .find({})
      .select(
        '-_id id name tagline first_brewed description image_url ingredients',
      )
      .lean();
  }

  async findById(id: string) {
    return await this._database
      .findOne({ id: id })
      .select(
        '-_id id name tagline first_brewed description image_url ingredients',
      )
      .lean();
  }

  async searchCoincidentTerms(term: string) {
    // Regular Expression: Should contains term string and is case insensitive
    const regex = new RegExp('^.*' + term.toLowerCase() + '.*', 'i');

    const regexFilteredTerm = {
      $regex: regex,
    };

    let maltIngredients = await this._database.distinct(
      'ingredients.malt.name',
    );

    maltIngredients = maltIngredients.filter((name) => {
      return regex.test(name);
    });

    let hopsIngredients = await this._database.distinct(
      'ingredients.hops.name',
    );

    hopsIngredients = hopsIngredients.filter((name) => {
      return regex.test(name);
    });

    const names = await this._database.distinct('name', {
      name: regexFilteredTerm,
    });

    const terms = [...maltIngredients, ...hopsIngredients, ...names];

    terms.sort();

    return terms;
  }

  async searchByTerm(term: string) {
    // Escape parenthesis characters
    term = term.replace(/\(/g, '\\(');
    term = term.replace(/\)/g, '\\)');

    // Regular Expression: Should contains term string and is case insensitive
    const regex = new RegExp('^.*' + term.toLowerCase() + '.*', 'i');

    const regexFilteredTerm = {
      $regex: regex,
    };

    return await this._database
      .find({
        $or: [
          {
            name: regexFilteredTerm,
          },
          {
            'ingredients.malt.name': regexFilteredTerm,
          },
          {
            'ingredients.hops.name': regexFilteredTerm,
          },
        ],
      })
      .select(
        '-_id id name tagline first_brewed description image_url ingredients',
      )
      .lean();
  }

  async topTenIngredients() {
    const ingredients: { name: string; count: number }[] = [];

    const maltIngredients = await this._database.distinct(
      'ingredients.malt.name',
    );

    for (const ingredient of maltIngredients) {
      const count = await this._database.count({
        ['ingredients.malt.name']: ingredient,
      });
      ingredients.push({ name: ingredient, count: count });
    }

    const hopsIngredients = await this._database.distinct(
      'ingredients.hops.name',
    );

    for (const ingredient of hopsIngredients) {
      const count = await this._database.count({
        ['ingredients.hops.name']: ingredient,
      });
      ingredients.push({ name: ingredient, count: count });
    }

    ingredients.sort((a, b) => {
      return b.count - a.count;
    });

    return ingredients.slice(0, 10);
  }
}
