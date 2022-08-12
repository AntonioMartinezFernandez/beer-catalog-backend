import 'reflect-metadata';

import { BeerService } from '@src/BeerModule/beerService';
import { BeerMongoRepository } from '@src/BeerModule/beerMongoRepository';
import { SearchMongoRepository } from '@src/BeerModule/searchMongoRepository';

// Beer Repository Mocked
const mockedBeerRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  searchCoincidentTerms: jest.fn(),
  searchByTerm: jest.fn(),
  topTenIngredients: jest.fn(),
};

// Search Repository Mocked
const mockedSearchRepository = {
  save: jest.fn(),
  findAll: jest.fn(),
};

// SuT
const sut = new BeerService(
  mockedBeerRepository as unknown as BeerMongoRepository,
  mockedSearchRepository as unknown as SearchMongoRepository,
);

// Unit Tests Suite
describe('Beer Service Unit Tests', () => {
  it('should call findAll beer repository method', () => {
    sut.findBeers();

    expect(mockedBeerRepository.findAll).toHaveBeenCalledTimes(1);
  });

  test('should call findById beer repository method with id parameter', () => {
    sut.findById('id');

    expect(mockedBeerRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockedBeerRepository.findById).toHaveBeenCalledWith('id');
  });

  test('should call searchCoincidentTerms beer repository method with term parameter', () => {
    sut.searchCoincidentTerms('term');

    expect(mockedBeerRepository.searchCoincidentTerms).toHaveBeenCalledTimes(1);
    expect(mockedBeerRepository.searchCoincidentTerms).toHaveBeenCalledWith(
      'term',
    );
  });

  test('should call searchByTerm beer repository method with term parameter', () => {
    sut.searchByTerm('term');

    expect(mockedBeerRepository.searchByTerm).toHaveBeenCalledTimes(1);
    expect(mockedBeerRepository.searchByTerm).toHaveBeenCalledWith('term');
  });

  it('should call topTenIngredients beer repository method', () => {
    sut.topTenIngredients();

    expect(mockedBeerRepository.topTenIngredients).toHaveBeenCalledTimes(1);
  });

  test('should call save search repository method with user_id and search_term parameters', () => {
    sut.saveSearch({ user_id: 'user_id', search_term: 'search_term' });

    expect(mockedSearchRepository.save).toHaveBeenCalledTimes(1);
    expect(mockedSearchRepository.save).toHaveBeenCalledWith({
      user_id: 'user_id',
      search_term: 'search_term',
    });
  });

  it('should call findAll search repository method', () => {
    sut.findSearches();

    expect(mockedSearchRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
