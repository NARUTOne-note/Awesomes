# 预设解析

> 代码解析：ES6+、React、Vue、TS等

## @babel/preset-env

> ES语法解析，重点了解以下参数项

- `target` 和 `browserlist` 选其一，针对目标浏览器环境支持, 浏览器不支持语法需要另外使用 plugin 进行支持
- `useBuiltlns`, 主要和polyfill的行为有关，非false时会根据配置的目标环境找出需要的polyfill进行部分引入
  - 默认false, 全部引入
  - entry, 入口文件引入`@babel/polyfill`，转换引入特性模块
  - usage, 针对实际用的特性API针对性自动进行polyfill的引入
- `corejs` 2 | 3, 这个参数项只有useBuiltIns设置为`usage`或`entry`时，才会生效
- `modules` "amd"、"umd" 、 "systemjs" 、 "commonjs" 、"cjs" 、"auto" 、false, 用来设置是否把ES6的模块化语法改成其它模块化语法

在该参数项值是'auto'或不设置的时候，会发现我们转码前的代码里import都被转码成require了
如果我们将参数项改成false，那么就不会对ES6模块化进行更改，还是使用import引入模块
使用ES6模块化语法有什么好处呢。在使用Webpack一类的打包工具，可以进行静态分析，从而可以做tree shaking 等优化措施
