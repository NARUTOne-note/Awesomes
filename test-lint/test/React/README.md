# React Test

> 测试其他 JavaScript 代码类似的方式测试 React 组件

- [React 测试技巧](https://react.docschina.org/docs/testing-recipes.html)
- [jest](https://jestjs.io/zh-Hans/)
- [React test library](https://testing-library.com/docs/react-testing-library/intro)
- [enzyme](https://enzymejs.github.io/enzyme/)

## 比较

- `enzyme` 用于保证 React 组件的输入输出结构
- `testing-library` 的特性
  - 不面向具体组件代码进行测试
  - 面向最终 DOM 进行测试（Query）
  - 模拟用户的交互方式（fireEvent）
  - 也支持除了 React 以外的其他 UI 框架
  
## 参考

- [testing-library/react 进行单元测试](https://segmentfault.com/a/1190000022054307)
- [React Testing Library使用总结](https://juejin.cn/post/6907052045262389255)
