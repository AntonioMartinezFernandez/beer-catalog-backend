import { injectable } from 'inversify';

import jsonwebtoken from 'jsonwebtoken';

import { SECRET_KEY, TOKEN_DURATION } from '@src/_config/environment';

import { IJwt } from './IJwt';

@injectable()
export class JWT implements IJwt {
  public encrypt(payload: Record<string, unknown>): string {
    const token = jsonwebtoken.sign({ payload }, SECRET_KEY, {
      expiresIn: TOKEN_DURATION,
      algorithm: 'HS256',
    });
    return token;
  }

  public decrypt(token: string): Record<string, unknown> {
    let tokenData;
    try {
      tokenData = jsonwebtoken.verify(token, SECRET_KEY);
      if (typeof tokenData === 'string') {
        tokenData = JSON.parse(tokenData);
      }
    } catch (error) {
      tokenData = { error: 'Invalid token' };
    }
    return tokenData;
  }
}
