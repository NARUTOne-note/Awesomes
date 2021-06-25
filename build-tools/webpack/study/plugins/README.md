# weppack 插件

> webpack 插件可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量等扩展webpack能力

- ![webpack plugin API](https://webpack.docschina.org/api/plugins/)
- ![webpack writing plugin ](https://webpack.docschina.org/contribute/writing-a-plugin/)

## 创建步骤

- 声明一个js函数或class类（大驼峰命名）
- 定义一个原型方法apply，apply方法接收一个`compiler对象`，我们可以在apply方法中调用compiler对象的hooks事件。使用`compilation`操纵修改 webpack 内部实例特定数据。
- 在功能完成后调用 webpack 提供的回调。

```js
// A JavaScript class.
class MyExampleWebpackPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.emit.tapAsync(
      'MyExampleWebpackPlugin',
      (compilation, callback) => {
        console.log('This is an example plugin!');
        console.log(
          'Here’s the `compilation` object which represents a single build of assets:',
          compilation
        );

        // Manipulate the build using the plugin API provided by webpack
        compilation.addModule(/* ... */);

        callback();
      }
    );
  }
}
```

### Compiler

`Compiler`是 `webpack` 的主要引擎，它通过 CLI（通常我们在`webpack.config.js`配置的参数） 传递的所有选项， 或者 Node API，创建出一个 `compilation` 实例。它扩展自 `Tapable` 类，用来注册和调用插件。

![compiler hooks](https://webpack.docschina.org/api/compiler-hooks/)

### Compilation

`compilation`模块会被`compiler`用来创建新的 `compilation` 对象。
`compilation`实例能够访问所有的模块和它们的依赖，它会对应用程序的依赖图中所有模块， 进行字面上的编译，在编译阶段，模块会被`加载(load)、封存(seal)、优化(optimize)、 分块(chunk)、哈希(hash)和重新创建(restore)`。

![compilation hooks](https://webpack.docschina.org/api/compilation-hooks/)
