// Dependencies
import express from 'express';

import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

import { IStoreUserDTO } from './IStoreUserDto';

//Schema
const storeUserSchema: JSONSchemaType<IStoreUserDTO> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      nullable: false,
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 50,
      nullable: false,
    },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

// Validator
const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(storeUserSchema);

// Middleware
@injectable()
export class storeUserDTO extends BaseMiddleware {
  constructor() {
    super();
  }
  public handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const isDTOValid = validate(req.body);

    if (!isDTOValid)
      return res
        .status(400)
        .send(ajv.errorsText(validate.errors, { separator: '\n' }));

    next();
  }
}
