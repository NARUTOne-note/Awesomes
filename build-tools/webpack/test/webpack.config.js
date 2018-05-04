var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry:[
      'babel-polyfill',
    	'webpack/hot/dev-server',
    	'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/main.js')
    ] ,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
      loaders: [{
        test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
        'loader':'babel-loader',
        exclude:[
          //在node_modules的文件不被babel理会
          path.resolve(__dirname,'node_modules')
        ],
        include:[
          //指定app这个文件里面的采用babel
          path.resolve(__dirname,'app')
        ],
        query:{
          //loader中的参数
          plugins:['transform-runtime'],
          presets:['es2015','stage-0','react']
  	    }
        }, {
          test: /\.css$/, // Only .css files
          loader: 'style!css!postcss' // Run loaders
        },{
          test: /\.less$/,
          loader: 'style!css!less'
        },{
          test: /\.(png|jpg)$/,
          loader: 'url?limit=25000'
        },{
          test: /\.(eot|woff|woff2|ttf|svg)(\?v=[\d\.]+)?$/,
          loader: 'file?name=files/[hash].[ext]'
      }]
    },
    postcss:[autoprefixer({browsers:['last 2 versions']})]
};
