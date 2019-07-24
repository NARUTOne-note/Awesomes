import React from 'react';
import DocLine from '@/components/DocLine';
import Demo from '@/components/Demo';
import CountDemo from '../Overview/CountDemo';
import CodeAce from '@/components/CodeAce';

function HookState () {
  return (
    <div className="hook-overview">
      <h1>State Hook</h1>
      <p>State Hook 是让在函数中使用、处理state</p>
      <p>拥抱函数式组件，状态复用，非 class 的情况下可以使用更多的 React 特性</p>
      <DocLine type="warn">包含状态，非 无状态组件，所以我们更喜欢叫它”函数组件”。</DocLine>
      <DocLine><a href="https://react.docschina.org/docs/hooks-state.html">使用State Hook</a></DocLine>
      <Demo title="State Hook">
        <CountDemo></CountDemo>
      </Demo>
      <h2>useState</h2>
      <DocLine>参数：初始state; 多个state, 重复使用useState</DocLine>
      <DocLine type="warn">
        <CodeAce code={"const [count, setCount] = useState()"}></CodeAce>
        <ul>
          <li>state: count</li>
          <li>this.setState: setCount</li>
          <li>更新 state 变量总是替换它而不是合并它。</li>
        </ul>
      </DocLine>
    </div>
  );
}

export default HookState;