import 'reflect-metadata';

import { UserService } from '@src/UserModule/userService';
import { UserMongoRepository } from '@src/UserModule/userMongoRepository';
import { JWT } from '@utilities/JWT/jwt';

// Uuid regex
const hashedPasswordRegex = /^.{60}$/;

// UserMemoryRepository Mocked
const mockedRepository = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  save: jest.fn(),
  deleteAll: jest.fn(),
};

const mockedBcrypt = {
  async encrypt() {
    return '$2b$10$R7G2YPBZ9/ZQzJCel50NVOnB19/aU5Sjffvy4yHonh61.3NoZc9DS';
  },
  async match() {
    return true;
  },
};

const mockedJwt = {
  async encrypt() {
    return 'encrypted';
  },
  async decrypt() {
    return 'decrypted';
  },
};

// SuT
const sut = new UserService(
  mockedRepository as unknown as UserMongoRepository,
  mockedBcrypt,
  mockedJwt as unknown as JWT,
);

// Unit Tests Suite
describe('User Service Unit Tests', () => {
  it('should call save repository method with "email", "name" and encrypted "password"', async () => {
    await sut.signup({
      email: 'hola@mundo.com',
      password: 'mypassword',
    });

    expect(mockedRepository.save).toHaveBeenCalledTimes(1);
    expect(mockedRepository.save).toHaveBeenCalledWith({
      email: 'hola@mundo.com',
      password: expect.stringMatching(hashedPasswordRegex),
    });
  });

  it('should call findById repository method with "id" parameter', async () => {
    await sut.findUser('user_id');

    expect(mockedRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockedRepository.findById).toHaveBeenCalledWith('user_id');
  });

  it('should call findByEmail repository method with "email" parameter', async () => {
    await sut.login('email@email.com', 'mypassword');

    expect(mockedRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockedRepository.findByEmail).toHaveBeenCalledWith(
      'email@email.com',
    );
  });

  it('should call delete repository method with "id" parameter', async () => {
    await sut.deleteAllUsers();

    expect(mockedRepository.deleteAll).toHaveBeenCalledTimes(1);
  });
});
