// webpack production config

const webpack = require('webpack');
var path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //能够删除未引用代码(dead code)的压缩工具(minifier)
const merge = require('webpack-merge'); // 为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具
const config = require('./webpack.base.config.js');

module.exports = merge(config, {
	devtool: 'source-map', // 生成.map文件
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
})
