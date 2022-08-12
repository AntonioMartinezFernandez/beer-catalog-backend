export default {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/test/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@config/(.*)$': '<rootDir>/src/_config/$1',
    '^@database/(.*)$': '<rootDir>/src/_database/$1',
    '^@http/(.*)$': '<rootDir>/src/_http/$1',
    '^@utilities/(.*)$': '<rootDir>/src/_utilities/$1',
  },
};
