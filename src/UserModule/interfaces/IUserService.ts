import { IStoreUserDTO } from '../dto/IStoreUserDto';
import { IUserBasicInfo } from '../dto/IUserBasicInfo';
import { IAuthToken } from '../entities/IAuthToken';
import { IUser } from '../entities/IUser';

export interface IUserService {
  signup(user: IStoreUserDTO): Promise<IUserBasicInfo | Error>;
  login(email: string, password: string): Promise<IAuthToken | undefined>;
  deleteAllUsers(): Promise<undefined>;
  findUser(id: string): Promise<IUser | undefined>;
}
