const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  testEnvironmentOptions: {
    resources: 'usable', // If you need to use the 'resources' option for jsdom, add it here
    features: {
      FetchExternalResources: ['script', 'link'],
    },
    pretendToBeVisual: false,
    url: 'http://localhost',
    runScripts: 'dangerously',
    userAgent: `Mozilla/5.0 (Node.js ${process.version}; ${(process.platform)}) AppleWebKit/537.36 (KHTML, like Gecko) jsdom`,
  },
};

module.exports = createJestConfig(customJestConfig);
