import React from 'react';
import { Tabs } from 'antd';
import CodeAce from '@/components/CodeAce';
import DocLine from '@/components/DocLine';

const { TabPane } = Tabs;

const demoCode = `
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
`

const demoCode2 = `
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>

        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}

`

function UseReducerAPI () {
  return (
    <div className="hook-api-useReducer">
      <h3>useReducer</h3>
      <p>useState 的替代方案</p>
      <DocLine type="warn">它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法</DocLine>
      <CodeAce code={"const [state, dispatch] = useReducer(reducer, initialArg, init);"}></CodeAce>
      <Tabs>
        <TabPane tab="示例" key="1">
          <p>React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。
            这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch</p>
          <CodeAce code={demoCode}></CodeAce>
        </TabPane>
        <TabPane tab="指定初始 state" key="2">
          <ul>
            <li>state 作为第二个参数传入 useReducer </li>
            <li>
              <CodeAce code={`
const [state, dispatch] = useReducer(
  reducer,
  {count: initialCount}
);
`}></CodeAce>
            </li>
            <li>惰性初始化: state 作为第三个参数传入 useReducer </li>
            <li>
              <CodeAce code={demoCode2}></CodeAce>
            </li>
          </ul>
        </TabPane>
        <TabPane tab="跳过 dispatch" key="3">
          <p>如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 Object.is 比较算法 来比较 state。）</p>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default UseReducerAPI;