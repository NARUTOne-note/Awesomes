# Hooks

> Hook 使你在非 class 的情况下可以使用更多的 React 特性，组件间复用更易实现

[hook 简介](https://zh-hans.reactjs.org/docs/hooks-intro.html)

## useState

> 简单实现

```js
// useState
const React = (function() {
  let hooks = [];
  let idx = 0;
  return {
    render(Component) {
      const C = Component();
      C.render();
      idx = 0; // reset for next render
      return C;
    },
    useState(initVal) {
      const state = hooks[idx] || initVal;
      const _idx = idx;
      const setState = newVal => {
        hooks[_idx] = newVal;
      };
      idx++;
      return [state, setState];
    }
  }
})();

const {useState, render} = React;
function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('apple');
  return {
    render() {
      console.log(`text: ${text}, count: ${count}`);
    },
    click() {
      setCount(count + 1);
    },
    type(type) {
      setText(type)
    }
  }
}

// run render
const counter = render(counter);
counter.click();
render(Counter); // apple, 1
counter.type('pear');
render(Counter); // pear, 1
```

## useEffect

> hooks 副作用

```js
const React = (function() {
  let hooks = [];
  let idx = 0;
  return {
    render(Component) {
      const C = Component();
      C.render();
      idx = 0; // reset for next render
      return C;
    },
    useState(initVal) {
      const state = hooks[idx] || initVal;
      const _idx = idx;
      const setState = newVal => {
        hooks[_idx] = newVal;
      };
      idx++;
      return [state, setState];
    },
    useEffect(cb, depArray) {
      const hasNoDeps = !depArray;
      hooks[idx] = hooks[idx] || {};
      const {deps, cleanup} = hooks[idx]; // undefined when first render
      const hasChanged = deps ? 
        !depArray.every((el, i) => el === deps[i]) : 
        return;

      if (hasNoDeps || hasChanged) {
        cleanup && cleanup();
        hooks[idx].cleanup = cb();
        hooks[idx].deps = depArray;
      }

      idx++;
    }
  }
})();
```
