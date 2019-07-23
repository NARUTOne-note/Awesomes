import React from 'react';
import DocLine from '@/components/DocLine';
import Demo from '@/components/Demo';
import {Row, Col} from 'antd';
import CountDemo from './CountDemo';
import CountDemo2 from './CountDemo2';

function CustomHook () {
  return (
    <div>
      <h2>自定义Hook</h2>
      <p>通过自定义 Hook，可以将组件逻辑提取到可重用的函数中</p>
      <DocLine><a href="https://react.docschina.org/docs/hooks-custom.html">自定义 Hook</a></DocLine>
      <DocLine type="warn">
        <ul>
          <li>自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook, React检查Hook规则遵守</li>
          <li>自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性</li>
        </ul>
      </DocLine>
      <Demo title="自定义 Hook">
        <Row gutter={16}>
          <Col md={12} xs={24}>
            <CountDemo></CountDemo>
          </Col>
          <Col md={12} xs={24}>
            <CountDemo2></CountDemo2>
          </Col>
        </Row>
      </Demo>
    </div>
  );
}

export default CustomHook;