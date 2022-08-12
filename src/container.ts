import { Container } from 'inversify';

import { UserService } from './UserModule/userService';
import { BeerService } from './BeerModule/beerService';

import { UserMongoRepository } from './UserModule/userMongoRepository';
import { BeerMongoRepository } from './BeerModule/beerMongoRepository';
import { SearchMongoRepository } from './BeerModule/searchMongoRepository';

import { AuthMiddleware } from '@http/middleware/authMiddleware';

import { storeUserDTO } from './UserModule/dto/storeUserDto';

import { Uuid } from '@utilities/Uuid/Uuid';
import { JWT } from '@utilities/JWT/jwt';
import { Bcrypt } from '@utilities/Bcrypt/bcrypt';

const container = new Container({ defaultScope: 'Singleton' });

// Services
container.bind(UserService).toSelf();
container.bind(BeerService).toSelf();

// Repositories
container.bind(UserMongoRepository).toSelf();
container.bind(BeerMongoRepository).toSelf();
container.bind(SearchMongoRepository).toSelf();

// Middlewares
container.bind(AuthMiddleware).toSelf();

// DTOs
container.bind(storeUserDTO).toSelf();

// Utils
container.bind(Uuid).toSelf();
container.bind(JWT).toSelf();
container.bind(Bcrypt).toSelf();

export default container;
