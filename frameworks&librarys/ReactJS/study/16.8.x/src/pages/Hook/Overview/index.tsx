import * as React from 'react';
import DocLine from '@/components/DocLine';
import Demo from '@/components/Demo';
import CountDemo from './CountDemo';
import Hello from './Hello';

class HookOverview extends React.Component<{}, {}> {
  render () {
    return (
      <div className="hook-overview">
        <h1>React Hook</h1>
        <p>Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数</p>
        <p>拥抱函数式，状态复用，非 class 的情况下可以使用更多的 React 特性</p>
        <DocLine type="warn">Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React</DocLine>
        <DocLine type="warn">Hook 使用了 JavaScript 的闭包机制</DocLine>
        <DocLine><a href="https://react.docschina.org/docs/hooks-intro.html">React.Hook简介</a></DocLine>
        <DocLine><a href="https://react.docschina.org/docs/hooks-overview.html">React.Hook概览</a></DocLine>
        <Demo title="React Hook">
          <Hello name="React Hook"></Hello>
          <CountDemo></CountDemo>
        </Demo>
      </div>
    );
  }
}

export default HookOverview;