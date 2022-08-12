import { controller, httpMethod, response } from 'inversify-express-utils';
import { Response } from 'express';
import { BaseController } from './BaseController';

@controller('/')
export class UnavailableController extends BaseController {
  constructor() {
    super();
  }

  @httpMethod('get', '*')
  unavailableGet(@response() res: Response) {
    this.notFound(res);
  }

  @httpMethod('post', '*')
  unavailablePost(@response() res: Response) {
    this.notFound(res);
  }
}
