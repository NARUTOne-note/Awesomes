# useEffect

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
