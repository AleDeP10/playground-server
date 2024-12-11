module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Pattern per i file di test
  testPathIgnorePatterns: ['/node_modules/'], // Ignora i file nella cartella node_modules
  moduleFileExtensions: ['js', 'jsx', 'cjs'], // Includi anche i file .cjs
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js'
  }
};
