import { injectable } from 'inversify';
import { IUserService } from './interfaces/IUserService';
import { IStoreUserDTO } from './dto/IStoreUserDto';
import { UserMongoRepository } from './userMongoRepository';
import { Bcrypt } from '@utilities/Bcrypt/bcrypt';
import { JWT } from '@utilities/JWT/jwt';

@injectable()
export class UserService implements IUserService {
  constructor(
    private readonly _UserRepository: UserMongoRepository,
    private readonly _crypto: Bcrypt,
    private readonly _jwt: JWT,
  ) {}

  async signup(user: IStoreUserDTO) {
    const repeatedEmail = await this._UserRepository.findByEmail(user.email);

    if (!repeatedEmail) {
      user.password = await this._crypto.encrypt(user.password);
      return await this._UserRepository.save(user);
    }

    return new Error('Invalid email');
  }

  async login(email: string, password: string) {
    const user = await this._UserRepository.findByEmail(email);

    if (user === undefined) return undefined;

    const matchPassword = await this._crypto.match(password, user.password);

    if (matchPassword) {
      return {
        token: await this._jwt.encrypt({
          id: user.id,
          email: user.email,
        }),
      };
    } else {
      return undefined;
    }
  }

  async deleteAllUsers() {
    return await this._UserRepository.deleteAll();
  }

  async findUser(id: string) {
    const user = await this._UserRepository.findById(id);
    if (user !== null) return user;
    return undefined;
  }
}
