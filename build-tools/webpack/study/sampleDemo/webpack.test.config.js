// webpack config  of study test

const webpack = require('webpack');
var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //能够删除未引用代码(dead code)的压缩工具(minifier)
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_PATH = 'dist_test'


module.exports = {
  entry:{
    app: './test/index.js',
    // print: './test/print.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist_test'),
    filename: '[name].bundle.js',
    publicPath: '/' + BUILD_PATH + '/'  // 由于项目index.html在publicPath中，查看 http://localhost:3000/dist_test/
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  devtool: 'inline-source-map', // 用于开发阶段的debug
  resolve: {
    extensions: ['.js'],
    alias: {
      public: path.resolve(__dirname, './public'),
    }
  },
  plugins: [ 
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist_test']), // 清除 测试dist
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: path.resolve(__dirname, 'template.html'),
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist_test"),
    compress: true,
    hot: true,
    port: 9000
  }
};
