# Welcome to use ReactJS

- [ReactJS](https://facebook.github.io/react/)
- [react china](https://doc.react-china.org/)
- [React-router](https://github.com/ReactTraining/react-router)
- [关于react-router的几种配置方式](https://segmentfault.com/a/1190000010318444)
- [react-router2.x 学习笔记](http://www.cnblogs.com/chenliyang/p/6547825.html)

## react

![react-life](https://raw.githubusercontent.com/NARUTOne/resources-github/master/imgs/react/react-life.png)

- [React组件的生命周期](https://github.com/chemdemo/chemdemo.github.io/issues/14)
- [React 应用架构设计](https://mp.weixin.qq.com/s/cI26iodw302vyRzl3XGyGQ)
- [React 性能优化大挑战：一次理解 Immutable data 跟 shouldComponentUpdate](http://web.jobbole.com/93614/)
- [传统diff、react优化diff、vue优化diff](https://www.jianshu.com/p/398e63dc1969)

### 组件通信

![react_coonect](https://raw.githubusercontent.com/NARUTOne/resources-github/master/imgs/react/react_connect.jpg)

### 高阶组件HOC

- [react进阶之高阶组件](https://github.com/sunyongjian/blog/issues/25)

## redux

createStore方法的一个简单实现，可以了解一下 Store 是怎么生成的。

```js
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

- [探究redux源码-衍生-中间件思想](https://github.com/sunyongjian/blog/issues/21)

### 小记

- [ReactJS 技术栈学习小记](https://github.com/iuap-design/blog/issues/178)
- [react 权限](http://blog.hypers.io/2017/07/22/react-permission/)
- [react-router 4.x 升级小记](http://mp.weixin.qq.com/s/5j1Bd5hazOo6jqOuAiWsGA)
- [Redux 异步数据流方案对比](https://juejin.im/post/59e6cd68f265da43163c2821#heading-3)

## 源码学习

- [React技术理念揭秘](https://github.com/BetaSu/just-react)

- [build-your-own-react](https://pomb.us/build-your-own-react/)

- [极简useState实现](https://react.iamkasong.com/hooks/create.html)

- [架构篇](https://react.iamkasong.com/process/reconciler.html)

- [状态更新](https://react.iamkasong.com/state/prepare.html)

- [架构篇](https://react.iamkasong.com/process/reconciler.html)

- [Diff算法](https://react.iamkasong.com/diff/prepare.html)
