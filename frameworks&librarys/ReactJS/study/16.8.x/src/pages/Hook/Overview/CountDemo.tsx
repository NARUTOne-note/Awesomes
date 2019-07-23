import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import useAlertHook from './AlertHook';

function CountDemo () {
  // 声明一个叫 “count” 的 state 变量, 初始值 0
  const [count, setCount] = useState(0);
  const AlertHookNode = useAlertHook({title: '点击次数统计'})

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    const title = `Effect Hook:  You clicked ${count} times`;
    const countP = document.getElementById('countTitle');
    countP && (countP.innerHTML = title);
  });

  return (
    <div>
      {AlertHookNode}
      <p>State Hook: You clicked {count} times</p>
      <p id="countTitle"></p>
      <Button onClick={() => setCount(count + 1)} icon="plus" type="primary">
        add count
      </Button>
    </div>
  );
}

export default CountDemo;
