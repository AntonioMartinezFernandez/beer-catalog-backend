import { injectable } from 'inversify';
import { IUuid } from './IUuid';

import { v4 as uuidv4 } from 'uuid';

@injectable()
export class Uuid implements IUuid {
  public generate(): string {
    return uuidv4();
  }
}
