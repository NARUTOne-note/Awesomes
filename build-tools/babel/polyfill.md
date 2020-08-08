# polyfill

> babel polyfill

- [2020， 再谈 Polyfill 最佳实践](https://www.thjiang.com/2020/03/24/2020%EF%BC%8C-%E5%86%8D%E8%B0%88-Polyfill-%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/)

## core-js@3

2019.03.19，`Babel@7.4.0` 正式发布了。在 `Babel@7.4.0` 中，提供了对管道运算符、私有方法、TypeScript 3.4 等的支持，同时，polyfill 开始支持 `core-js@3`。对于 `core-js` ，可能有些人还很陌生，根据 npmtrends 的统计， core-js 事实上已经是目前最流行的 polyfill 方案了，`@babel/polyfill` 就是靠它来转换代码的，只是很多人可能没有留意到其实自己已经在间接使用它了。回想一下执行 `npm install` 的时候，是不是对 `As advertising: the author is looking for a good job -)` 似曾相识？ 这条广告还引发过技术人员能不能在 `npm log` 中为自己打广告的争论， `npm fund` 也是为此而生。

提到这个，顺便想起了前几天在这条 [issue](https://github.com/zloirock/core-js/issues/767) 中看到的一件事， core-js 的作者 `@zloirock` 看起来因交通肇事被判处了 1.5 年的监禁，希望他好好改造重新做人 →_→

## Polyfill

在之前的版本中，如果我们将 babel 的 `useBuiltIns` 属性设置为 `entry` 或 `false`，我们需要在代码中手动引入 `@babel/polyfill`，现在则只需要引入 `regenerator` 和 `core-js` 就可以了。在代码入口文件前引入它们，可以模拟完整的 `ES2015+` 环境（不包含 `< Stage 4` 的提案）。

```js
// before
import "@babel/polyfill";

// after
import "core-js/stable";
import "regenerator-runtime/runtime";

```

而如果我们对构建产物的大小有限制，我们可以继续使用 `useBuiltIns: usage` 来按需导入所需的 polyfill 内容。

```js
// babel.config.json
presets: [
    [
        "@babel/preset-env", {
            "useBuiltIns": "usage"
            "corejs": 3
        }
    ]
]
```

## transform-runtime

之前`transform-runtime` 的方案不支持如 `"foobar".includes("foo")` 这样的实例方法。在 `core-js@3` 中，这个问题得到了解决。

```bash
npm remove @babel/runtime-corejs2
npm install --save @babel/runtime-corejs3

```

```js
// babel.config.json
plugins: [
    [
        "@babel/transform-runtime", {
            "corejs": 3
        }
    ]
];
```

需要支持 Stage < 4 阶段的提案，可以配置 proposals 属性来实现

```js
// babel.config.json
"plugins": [
    [
        "@babel/plugin-transform-runtime", {
            "corejs": {
                "version": 3,
                "proposals": true
            }
        }
    ]
]
```
