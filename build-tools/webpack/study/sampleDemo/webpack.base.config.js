// webpack config

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_PATH = 'dist'

// function configFun(env) {

//   console.log('NODE_ENV: ', env.NODE_ENV) // 'local'
//   console.log('Production: ', env.production) // true
  
  const config = {
    entry:{
      app: './app/index.js', 
      // test: './app/test.js',
      // print: './test/print.js',
      polyfills: './app/polyfills.js',
      vendor: [
        'lodash'
      ] // 抽出公共部分代码进行缓存
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
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
        {
          test: require.resolve('./app/globals.js'), // 使用exports-loader，将该全局变量导出为常规模块导出
          use: 'exports-loader?file,parse=helpers.parse'
        }
      ]
    },  
    resolve: {
      extensions: ['.js'],
      alias: {
        public: path.resolve(__dirname, './public'),
      }
    }, 
    plugins: [ 
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(['dist']), // 清除 测试dist
      new HtmlWebpackPlugin({
        title: 'Output Management',
        template: path.resolve(__dirname, 'template.html'),
      }),
      new webpack.optimize.CommonsChunkPlugin({ //缓存
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({ //模块分离到单独的文件
        name: 'runtime'
      }),
      new webpack.ProvidePlugin({ // 全局对象，不需import引入
        lodash: 'lodash',
        // join: ['lodash', 'join'] // ProvidePlugin“阵列路径”（例如[module, child, ...children?]）配置模块来公开模块的单个导出。
      })
    ]
  }

  // 动态替换 index.html 入口 js src 地址
  // config.plugins.push(function() {
  //   this.plugin('done', function(statsData) {
  //     var stats = statsData.toJson()
  //     var html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
  //     var distPath = config.output.publicPath + 'app.' + (stats.hash + '.') + 'js'
  //     html = html.replace(/(<script src=").*?(")/, '$1' + distPath + '$2')
  //     fs.writeFileSync(path.join(__dirname, 'index.html'), html)
  //   })
  // })
  
//   return config
// }



module.exports = config
