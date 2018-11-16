module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  resolver: 'jest-webpack-resolver',
  testRegex: '^.+\\.spec\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  collectCoverage: true,
  globals: {
    'ts-jest': {tsConfig: 'src/client/tsconfig.json'}
  },
  automock: false
}
