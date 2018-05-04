### Welcome to use ReactJS

- [ReactJS](https://facebook.github.io/react/)
- [react china](https://doc.react-china.org/)
- [React-router](https://github.com/ReactTraining/react-router)
- [关于react-router的几种配置方式](https://segmentfault.com/a/1190000010318444)
- [react-router2.x 学习笔记](http://www.cnblogs.com/chenliyang/p/6547825.html)

## react

![](https://raw.githubusercontent.com/NARUTOne/resources-github/master/imgs/react/react-life.png)

- [React组件的生命周期](https://github.com/chemdemo/chemdemo.github.io/issues/14)

### 组件通信

![](https://raw.githubusercontent.com/NARUTOne/resources-github/master/imgs/react/react_connect.jpg)

### 高阶组件HOC

- [react进阶之高阶组件 ](https://github.com/sunyongjian/blog/issues/25)

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