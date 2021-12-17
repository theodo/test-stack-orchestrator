const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

export default {
  preset: 'ts-jest',
  testRegex: TEST_REGEX,
  runner: 'groups',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    '^@libs(.*)$': '<rootDir>/libs$1',
    '^@functions(.*)$': '<rootDir>/functions$1',
    '^@resources(.*)$': '<rootDir>/resources$1',
  },
  testEnvironment: 'node',
  coverageReporters: ['json', ['lcov', { projectRoot: './' }]],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  clearMocks: true,
};
