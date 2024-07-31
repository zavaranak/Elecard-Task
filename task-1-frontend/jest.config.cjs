module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@store(.*)$': '<rootDir>/src/store$1',
    '^@styles(.*)$': '<rootDir>/src/styles$1',
    '^@icons(.*)$': '<rootDir>/src/icons$1',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  setupFilesAfterEnv: ['./src/setupTests.js'],
};
