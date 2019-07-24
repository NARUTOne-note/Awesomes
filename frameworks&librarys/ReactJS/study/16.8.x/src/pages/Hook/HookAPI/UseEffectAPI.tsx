import React from 'react';
import { Tabs } from 'antd';
import CodeAce from '@/components/CodeAce';
import DocLine from '@/components/DocLine';

const { TabPane } = Tabs;

function UseEfffectAPI () {
  return (
    <div className="hook-api-useEffect">
      <h3>useEffect</h3>
      <p>该 Hook 接收一个包含命令式、且可能有副作用代码的函数</p>
      <DocLine type="warn">默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它 在只有某些值改变的时候 才执行</DocLine>
      <CodeAce code={"useEffect(didUpdate);"}></CodeAce>
      <Tabs>
        <TabPane tab="清除effect" key="1">
          <p>为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除</p>
          <CodeAce code={`useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // 清除订阅
    subscription.unsubscribe();
  };
});`}></CodeAce>
        </TabPane>
        <TabPane tab="effect 的执行时机" key="2">
          <p>在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如如设置订阅和事件处理等情况，
            因此不应在函数中执行阻塞浏览器更新屏幕的操作</p>
          <p>然而，并非所有 effect 都可以被延迟执行, React 为此提供了一个额外的 useLayoutEffect Hook 来处理这类 effect。它和 useEffect 的结构相同，区别只是调用时机不同</p>
          <DocLine type="warn">虽然 useEffect 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。React 将在组件更新前刷新上一轮渲染的 effect</DocLine>
        </TabPane>
        <TabPane tab="effect 的条件执行" key="3">
          <p>可以给 useEffect 传递第二个参数，它是 effect 所依赖的值数组</p>
          <DocLine type="warn">
            <ul>
              <li>请确保数组中包含了所有外部作用域中会发生变化且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量</li>
              <li>只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）,effect 内部的 props 和 state 就会一直拥有其初始值</li>
            </ul>
          </DocLine>
          <CodeAce code={`useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);`}></CodeAce>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default UseEfffectAPI;