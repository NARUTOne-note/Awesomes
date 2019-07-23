import React from 'react';
import { Button } from 'antd';
import useAlertHook from '../Overview/AlertHook';
import useCount from './useCount';

function CountDemo2 () {
  const AlertHookNode = useAlertHook({title: 'Demo2 Count'})
  const [count, setCount] = useCount(0, 'count2')

  return (
    <div>
      {AlertHookNode}
      <p>State Hook: You clicked {count} times</p>
      <p id="count2"></p>
      <Button onClick={() => setCount(count + 1)} icon="plus" type="primary">
        add count
      </Button>
    </div>
  );
}

export default CountDemo2;
