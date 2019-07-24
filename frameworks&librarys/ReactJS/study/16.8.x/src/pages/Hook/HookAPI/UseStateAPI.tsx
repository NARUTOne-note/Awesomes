import React from 'react';
import { Tabs } from 'antd';
import CodeAce from '@/components/CodeAce';
import DocLine from '@/components/DocLine';

const { TabPane } = Tabs;

function UseStateAPI () {
  return (
    <div className="hook-api-useState">
      <h3>useState</h3>
      <p>返回state, 设置更新state，更新方式有一下几种</p>
      <DocLine type="warn">React 使用 Object.is 比较算法 来比较 state。</DocLine>
      <CodeAce code={"const [state, setState] = useState(initialState);"}></CodeAce>
      <Tabs>
        <TabPane tab="基本更新" key="1">
          <CodeAce code={"setState(newState);"}></CodeAce>
        </TabPane>
        <TabPane tab="函数式更新" key="2">
          <CodeAce code={`setState(prevState => {
  // 也可以使用 Object.assign
  return {...prevState, ...updatedValues};
});`}></CodeAce>
        </TabPane>
        <TabPane tab="惰性初始化" key="3">
          <p>initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。
            如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用</p>
          <CodeAce code={`const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
`}></CodeAce>
        </TabPane>
        <TabPane tab="跳过更新" key="4">
          <p>调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行</p>
        </TabPane>
      </Tabs> 
    </div>
  );
}

export default UseStateAPI;