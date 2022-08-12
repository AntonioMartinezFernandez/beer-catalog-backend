import { injectable } from 'inversify';

import { Uuid } from '@utilities/Uuid/Uuid';
import { userModel } from '@src/UserModule/models/User';

import { IUser } from './entities/IUser';
import { IStoreUserDTO } from './dto/IStoreUserDto';
import { IUserRepository } from './interfaces/IUserRepository';
import { IUserBasicInfo } from './dto/IUserBasicInfo';

@injectable()
export class UserMongoRepository implements IUserRepository {
  constructor(
    private readonly _uuid: Uuid,
    private readonly _database = userModel,
  ) {}

  async findById(id: string): Promise<IUser | undefined> {
    return await this._database.findOne({ id: id }).lean();
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this._database.findOne({ email: email }).lean();

    if (user) {
      return user as unknown as IUser;
    } else {
      return undefined;
    }
  }

  async save(user: IStoreUserDTO): Promise<IUserBasicInfo | Error> {
    try {
      const newUser: IUser | undefined = await this._database.create({
        id: this._uuid.generate(),
        email: user.email,
        rol: 'user',
        password: user.password,
        created_at: new Date(),
      });

      if (newUser !== undefined) {
        const createdUser: IUserBasicInfo = {
          id: newUser.id,
          email: newUser.email,
          rol: newUser.rol,
        };

        return createdUser;
      } else {
        return new Error('Error creating new user');
      }
    } catch {
      return new Error('Error creating new user');
    }
  }

  async deleteAll(): Promise<undefined> {
    try {
      await this._database.deleteMany({});
      return undefined;
    } catch (error) {
      console.log(error);
    }
  }
}
