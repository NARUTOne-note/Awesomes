import React from 'react';
import DocLine from '@/components/DocLine';
import Demo from '@/components/Demo';
import CountDemo from '../Overview/CountDemo';

function HookEffect () {
  return (
    <div className="hook-overview">
      <h1>Effect Hook</h1>
      <p>Effect Hook 可以让你在函数组件中执行副作用操作</p>
      <p>数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用</p>
      <DocLine type="warn">
        <p>如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合</p>
        <p>在 React 组件中有两种常见副作用操作：需要清除的和不需要清除的</p>
      </DocLine>
      <DocLine><a href="https://react.docschina.org/docs/hooks-effect.html">使用Effect Hook</a></DocLine>
      <Demo title="Effect Hook">
        <CountDemo></CountDemo>
      </Demo>
      <h2>useEffect</h2>
      <DocLine type="warn">
        <ul>
          <li>函数组件初始化，DOM每次更新后，都会执行effect</li>
          <li>React 保证了每次运行 effect 的同时，DOM 都已经更新完毕</li>
          <li>effect 中获取最新的 count 的值，而不用担心其过期的原因。每次我们重新渲染，都会生成新的 effect，替换掉之前的，对上一个 effect 进行清除。
            某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染</li>
          <li>如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它; 将添加副作用，与清除副作用放一起，逻辑绑定</li>
          <li>Hook 允许我们按照代码的用途分离他们，而不是像生命周期函数那样。React 将按照 effect 声明的顺序依次调用组件中的每一个 effect。</li>
        </ul>
      </DocLine>
      <DocLine type="warn">
        <ul>
          <li>
            <pre>
              {`useEffect(() => {
                document.title = "You clicked times";
              }, [count]); // 仅在 count 更改时更新`}
            </pre>
            性能优化，避免无限制的每次渲染都调用
          </li>
          <li>确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量</li>
          <li>React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得额外操作很方便</li>
          <li>如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数, effect 内部的 props 和 state 就会一直拥有其初始值</li>
        </ul>
      </DocLine>
      <DocLine type="error">未来版本，可能会在构建时自动添加第二个参数</DocLine>
    </div>
  );
}

export default HookEffect;