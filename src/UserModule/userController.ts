import {
  controller,
  httpMethod,
  request,
  response,
} from 'inversify-express-utils';
import { Request, Response } from 'express';
import { BaseController } from '@http/controllers/BaseController';
import { UserService } from './userService';
import { AuthMiddleware } from '@http/middleware/authMiddleware';
import { storeUserDTO } from './dto/storeUserDto';

@controller('/auth')
export class UserController extends BaseController {
  constructor(private readonly _userService: UserService) {
    super();
  }

  @httpMethod('get', '/status')
  async index(@response() res: Response) {
    const response = { Status: 'OK' };
    this.ok(res, response);
  }

  @httpMethod('post', '/signup', storeUserDTO)
  async signup(@request() req: Request, @response() res: Response) {
    const response = await this._userService.signup(req.body);
    if (response instanceof Error) {
      this.notCreated(res);
    } else {
      this.created(res, response);
    }
  }

  @httpMethod('post', '/login')
  async login(@request() req: Request, @response() res: Response) {
    const { email, password } = req.body;
    const response = await this._userService.login(email, password);
    if (response === undefined) {
      this.unauthorized(res);
    } else {
      this.ok(res, response);
    }
  }

  @httpMethod('get', '/private', AuthMiddleware)
  async private(@request() req: Request, @response() res: Response) {
    const response = { Status: 'OK', UserID: req.body.user.id };
    this.ok(res, response);
  }
}
