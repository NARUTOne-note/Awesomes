# react-scaffold

>搭建日志

## 写在前面

> 开始时间`2018-09-04`
本日志仅为[FireLeaf-React-Scaffold 2.x](https://github.com/NARUTOne/FireLeaf-React-Scaffold)搭建过程.
`node`下载最新版

**部分技术选择**：

- React
- React-router
- Redux
- axios
- webpack ^4.17.2

**UI**:

- antd
- less

**规范**：

- eslint
- stylelint

## init

```sh
# 创建项目
mkdir project-name && cd project-name

# init
npm init
```

创建项目需要文件夹

```sh
# build-tools
mkdir build

# products-config
mkdir config

# script
mkdir script

# main-src

mkdir src

# static

mkdir static

```

## webpack

> [https://www.webpackjs.com/](https://www.webpackjs.com/) 4.x

```sh
# npm install --save-dev webpack@<version>
npm install --save-dev webpack
npm install --save-dev webpack-cli
# merge
npm install --save-dev webpack-merge

```

webpack 配置`build/`

- webpack.base.config.js: 基础配置
- webpack.dev.config.js: dev模式配置
- webpack.prod.config.js: prod模式配置

## Babel

> Babel 是一个 JavaScript 编译器, 进行语法转换，可按需加载插件。

[babel 中文](https://babeljs.cn/)
[Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)

### 开始

```sh
npm i babel-loader babel-core --save-dev
```

- babel-loader: 这个包允许使用babel和webpack来转换JavaScript文件。
- babel-core: 如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。

```sh
npm install babel-preset-env babel-preset-stage-0 babel-preset-react --save-dev
```

- babel-preset-react 用于解析 JSX
- babel-preset-stage-0 用于解析 ES7 提案

- babel-preset-env: babel常用的转义器：相当于 es2015 ，es2016 ，es2017 及最新版本。
- stage-x:
  - Stage 0 - 稻草人: 只是一个想法，可能是 babel 插件。
  - Stage 1 - 提案: 初步尝试。
  - Stage 2 - 初稿: 完成初步规范。
  - Stage 3 - 候选: 完成规范和浏览器初步实现。
  - Stage 4 - 完成: 将被添加到下一年度发布。

```sh
npm install babel-plugin-transform-runtime --save-dev
```

- babel-plugin-transform-runtime: 类babel-polyfill, 按需polyfill

### .babelrc 配置

```json
{
  "presets": [
  ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "es2015",
    "react",
    "stage-0"
  ],
  "plugins": [
    "transform-runtime"
  ]
}
```

## 资源处理

> img、fonts、media

```sh
npm i url-loader file-loader --save-dev
```

[url-loader](https://www.npmjs.com/package/url-loader)
[file-loader](https://www.npmjs.com/package/file-loader)

## 编译css

```sh
npm install css-loader style-loader --save-dev
```

css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能；

style-loader将所有的计算后的样式加入页面中； 二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

### 使用less

> 这里使用less, 其他预编译样式配置类似

```sh
npm i less less-loader --save-dev
```

### 样式兼容

```sh
npm i autoprefixer postcss-loader --save-dev
```

配置 `postcss.config.js`

```js
module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    })
  ]
};
```

### 样式文件拆分

```sh
npm install --save-dev mini-css-extract-plugin
```

`webpack.base.config.js`配置

```js
{
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
  ]
},
{
  test: /\.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'less-loader'
  ]
}
...
plugins: [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    chunkFilename: "[id].css"
  })
]
```

## webpack-config

### webpack-dev

> dev模式下webpack配置

```sh
npm i --save-dev html-webpack-plugin open-browser-webpack-plugin
```

### webpack-prod

> prod模式下webpack配置

```sh
npm i --save-dev optimize-css-assets-webpack-plugin
```

### webpack-server

> webpack 开发下的 server配置, 主要有下面两种方式

#### webpack-dev-server

> [https://www.webpackjs.com/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-server](https://www.webpackjs.com/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-server)

```sh
npm i --save-dev webpack-dev-server
```

#### express + + webpack-dev-middleware

> express 服务（node）+ webpack-dev-middleware + webpack-hot-middleware

```sh
npm i --save-dev webpack-dev-middleware webpack-hot-middleware eventsource-polyfill express

# server log
npm i --save-dev rimraf

```

### webpack-build-prod

```sh
# 终端 spinner
npm i --save-dev ora rimraf chalk
```

### webpack 其他配置

1、copy静态资源 static

```sh
npm i --save-dev copy-webpack-plugin
```

2、压缩打包文件

```sh
npm i --save-dev zip-webpack-plugin
```
