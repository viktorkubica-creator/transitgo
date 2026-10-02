import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@transitgo/common$': '<rootDir>/../../packages/common/src/index.ts'
  }
};

export default config;
