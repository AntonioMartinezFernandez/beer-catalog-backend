import { IUser } from '@src/UserModule/entities/IUser';
import { IStoreUserDTO } from '../dto/IStoreUserDto';
import { IUserBasicInfo } from '../dto/IUserBasicInfo';

export interface IUserRepository {
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  save(user: IStoreUserDTO): Promise<IUserBasicInfo | Error>;
  deleteAll(): Promise<undefined>;
}
