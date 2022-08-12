import {
  controller,
  httpMethod,
  request,
  response,
} from 'inversify-express-utils';
import { Request, Response } from 'express';
import { BaseController } from '@http/controllers/BaseController';
import { BeerService } from './beerService';
import { AuthMiddleware } from '@http/middleware/authMiddleware';
//import { storeBeerDTO } from './dto/storeBeerDto';

@controller('/api/v1/beer')
export class BeerController extends BaseController {
  constructor(private readonly _beerService: BeerService) {
    super();
  }

  @httpMethod('get', '/status')
  async status(@response() res: Response) {
    const response = { Status: 'OK' };
    this.ok(res, response);
  }

  @httpMethod('get', '/', AuthMiddleware)
  async allBeers(@response() res: Response) {
    const response = await this._beerService.findBeers();
    if (response instanceof Error || response === undefined) {
      this.notFound(res);
    } else {
      this.ok(res, response);
    }
  }

  @httpMethod('get', '/id/:id', AuthMiddleware)
  async findBeer(@request() req: Request, @response() res: Response) {
    const response = await this._beerService.findById(req.params.id);
    if (response instanceof Error || response === undefined) {
      this.notFound(res);
    } else {
      this.ok(res, response);
    }
  }

  @httpMethod('get', '/autocomplete', AuthMiddleware)
  async findTerms(@request() req: Request, @response() res: Response) {
    const results = await this._beerService.searchCoincidentTerms(
      req.query.term as string,
    );
    if (results instanceof Error || results === undefined) {
      this.notFound(res);
    } else {
      this.ok(res, results);
    }
  }

  @httpMethod('get', '/search', AuthMiddleware)
  async searchBeer(@request() req: Request, @response() res: Response) {
    const userId: string = req.body.user.id as string;
    const searchTerm: string = req.query.term as string;
    this._beerService.saveSearch({
      user_id: userId,
      search_term: searchTerm,
    });

    const results = await this._beerService.searchByTerm(searchTerm);
    if (results instanceof Error || results === undefined) {
      this.notFound(res);
    } else {
      this.ok(res, results);
    }
  }

  @httpMethod('get', '/searches', AuthMiddleware)
  async viewSearches(@response() res: Response) {
    const response = await this._beerService.findSearches();
    if (response instanceof Error || response === undefined) {
      this.notFound(res);
    } else {
      this.ok(res, response);
    }
  }

  @httpMethod('get', '/top_ten_ingredients', AuthMiddleware)
  async topIngredients(@response() res: Response) {
    const response = await this._beerService.topTenIngredients();
    if (response instanceof Error || response === undefined) {
      this.notFound(res);
    } else {
      this.ok(res, response);
    }
  }
}
