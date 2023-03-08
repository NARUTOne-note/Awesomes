# 巧用children

> 避免不必要的重复多余渲染

```js
import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();

export function ChildNonTheme() {
  console.log("不关心皮肤的子组件渲染了");
  return <div>我不关心皮肤，皮肤改变的时候别让我重新渲染！</div>;
}

export function ChildWithTheme() {
  const theme = useContext(ThemeContext);
  return <div>我是有皮肤的哦~ {theme}</div>;
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const onChangeTheme = () => setTheme(theme === "light" ? "dark" : "light");
  // <ChildNonTheme /> 这样的代码会被 babel 翻译成 React.createElement(ChildNonTheme) 这样的函数调用，
  // React官方经常强调 props 是immutable 的，所以在每次调用函数式组件的时候，都会生成一份新的 props 引用
  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={onChangeTheme}>改变皮肤</button>
      <ChildWithTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
    </ThemeContext.Provider>
  );
}

```

优化为：

```js
import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();

function ChildNonTheme() {
  console.log("不关心皮肤的子组件渲染了");
  return <div>我不关心皮肤，皮肤改变的时候别让我重新渲染！</div>;
}

function ChildWithTheme() {
  const theme = useContext(ThemeContext);
  return <div>我是有皮肤的哦~ {theme}</div>;
}

function ThemeApp({ children }) {
  const [theme, setTheme] = useState("light");
  const onChangeTheme = () => setTheme(theme === "light" ? "dark" : "light");
  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={onChangeTheme}>改变皮肤</button>
      {children}
    </ThemeContext.Provider>
  );
}

export default function App() {
  return (
    <ThemeApp>
      <ChildWithTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
      <ChildNonTheme />
    </ThemeApp>
  );
}

```

作为 children 传递给 ThemeApp，ThemeApp 内部的更新完全不会触发外部的 React.createElement，所以会直接复用之前的 element 结果：

```js
// 完全复用，props 也不会改变。
const childNonThemeElement = {
  type: ChildNonTheme,
  props: {}
}
```

**总结下来**，就是要把渲染比较费时，但是不需要关心状态的子组件提升到「有状态组件」的外部，作为 children 或者props传递进去直接使用，防止被带着一起渲染。
当然，这个优化也一样可以用 React.memo 包裹子组件来做，不过相对的增加维护成本，根据场景权衡选择吧。
