'use strict';

const babelJest = require('babel-jest').default;

module.exports = babelJest.createTransformer({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    require.resolve('@babel/preset-react'),
    require.resolve("@babel/preset-typescript"),
  ],
  babelrc: false,
  configFile: false,
});
