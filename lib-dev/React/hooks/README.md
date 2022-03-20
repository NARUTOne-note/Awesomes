# Hooks

> Hook 使你在非 class 的情况下可以使用更多的 React 特性，组件间复用更易实现

React Hooks 组件其实可以简单地理解成一个 render 函数。这个 render 函数本身即组件。他通过 useState 和 useEffect 两个函数来实现函数的“状态化”，即获得对 state 和生命周期的注册和访问能力

- [Hooks 简介](https://zh-hans.reactjs.org/docs/hooks-intro.html)
- [Hooks 规则](https://react.docschina.org/docs/hooks-rules.html)

![react-hooks原理](./hooks.jpg)

## 最佳实践

记录一些最佳实践写法风格

### 基于变更

Hooks 适合通过「基于变更」的声明风格来书写，而非「基于回调」的命令式方式来书写.

- 专注于「变」与「不变」的管理，而不是「调」与「不调」的管理上
- 基于变更的写法的关键在于把「 动作」转换成「 状态」

```js
const Demo: React.FC = () => {
  const [state, setState] = useState({
    keyword: '',
  });
  const handleKeywordChange = useCallback((e: React.InputEvent) =>
    {
      const nextKeyword = e.target.value;
      setState(prev => ({ ...prev, keyword: nextKeyword }))
    }, []);
  
  // 基于state变更触发
  useEffect(() => {
    // query
  }, [state]);

  return // view
}
```

### 抽离变化，减少依赖

```js
// 事件监听
const Demo: FC = () => {
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight
    ] as const);
    useEffect(() => {
        const handleResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // ...
    useEffect(() => {}, [windowSize]);
    return // view
};
```
