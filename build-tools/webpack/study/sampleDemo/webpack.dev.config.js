// webpack development config

const webpack = require('webpack');
var path = require('path');

const merge = require('webpack-merge'); // 为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具
const config = require('./webpack.base.config.js');

module.exports = merge(config, {
	devtool: 'inline-source-map', // 用于开发阶段的debug
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    hot: true,
    port: 9000
  },
  plugins: [
		new webpack.HashedModuleIdsPlugin(),
  ]
})
