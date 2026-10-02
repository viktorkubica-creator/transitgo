/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    '<rootDir>/backend/services/journey-planning',
    '<rootDir>/backend/services/realtime',
    '<rootDir>/backend/services/identity',
    '<rootDir>/backend/services/payments',
    '<rootDir>/backend/services/ticketing'
  ]
};
