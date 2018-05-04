/**
 * webpack-dev-server 下nodeJS  API配置方式
 *
 * 社区还有许多其他 loader 和示例，可以使 HMR 与各种框架和库(library)平滑地进行交互……
 */

const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: config.output.publicPath,
  hot: true
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, () => {
  console.log('dev server listening on port 5000');
});