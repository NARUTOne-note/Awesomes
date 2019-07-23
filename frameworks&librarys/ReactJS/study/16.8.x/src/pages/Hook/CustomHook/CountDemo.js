import React from 'react';
import { Button } from 'antd';
import useAlertHook from '../Overview/AlertHook';
import useCount from './useCount';

function CountDemo () {
  const AlertHookNode = useAlertHook({title: 'Demo1 Count'})
  const [count, setCount] = useCount(0, 'count1')

  return (
    <div>
      {AlertHookNode}
      <p>State Hook: You clicked {count} times</p>
      <p id="count1"></p>
      <Button onClick={() => setCount(count + 1)} icon="plus" type="primary">
        add count
      </Button>
    </div>
  );
}

export default CountDemo;
