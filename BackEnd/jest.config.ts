module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest', // Transform TypeScript files
    },
    moduleFileExtensions: ['ts', 'js'],
  };
  