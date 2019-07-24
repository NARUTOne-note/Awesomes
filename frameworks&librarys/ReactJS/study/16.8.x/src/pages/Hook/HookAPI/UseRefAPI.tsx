import React from 'react';
import { Tabs } from 'antd';
import CodeAce from '@/components/CodeAce';
import DocLine from '@/components/DocLine';

const { TabPane } = Tabs;

const refCode = `
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // current 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
`

function UseRefAPI () {
  return (
    <div className="hook-api-useRef">
      <h3>useRef</h3>
      <p>useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变</p>
      <DocLine type="warn">本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”</DocLine>
      <CodeAce code={refCode}></CodeAce>
    </div>
  );
}

export default UseRefAPI;