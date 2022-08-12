import express from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { JWT } from '@utilities/JWT/jwt';
import { HttpException } from '@http/exceptions/httpException';

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  constructor(private readonly _jwt: JWT) {
    super();
  }
  public handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const authHeader = req.headers.authorization;
    let authToken: string | undefined = undefined;
    let decryptedToken: Record<string, unknown> | undefined = undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      authToken = authHeader.substring(7, authHeader.length);
    }

    if (authToken) {
      decryptedToken = this._jwt.decrypt(authToken);
    }

    if (!decryptedToken || decryptedToken.error) {
      const httpError = new HttpException('Authentication Error', 401);
      res.status(httpError.statusCode).send(httpError.message);
    } else {
      req.body.user = decryptedToken.payload;
      next();
    }
  }
}
