module.exports = {
  "roots": [
    "<rootDir>/src",
    "<rootDir>/tests/"
  ],
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  "globals": {
    "ts-jest": {
      // 编译 Typescript 所依赖的配置
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
    'testVar': 'testVar12'
  },
  "setupFilesAfterEnv": [
    "<rootDir>/tests/setupTests.ts"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.css$": "<rootDir>/configs/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/configs/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|less|sass|scss)$"
  ],
  "moduleNameMapper": {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.svg$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif)$": "<rootDir>/configs/jest/fileMock.ts",
    "antd/es/(.*)": "antd/lib/$1",
  },
  "moduleFileExtensions": [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  "resetMocks": true
};

exports.globals = { "testVar": 'testVar' }
