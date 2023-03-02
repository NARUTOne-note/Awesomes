# 闭包陷进

```ts
import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import { Button } from 'antd';

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const handleBtnClick = () => {
    setCount(count + 1);
  };
  const clickCb = () => {
    console.log("clickCb countRef.current", countRef.current);
  };
  useLayoutEffect(() => {       // +
    countRef.current = count;   // + 这里是每当count改变自动同步更新countRef的值，在click前执行
  }, [count]);                  // +
  useEffect(() => {
    document.addEventListener("click", clickCb);
    return () => document.removeEventListener("click", clickCb);
  }, []);
  return (
    <>
      <button onClick={handleBtnClick}>+1</button>
      <span>count:{count}</span>
      <span>countRef:{countRef.current}</span>
    </>
  );
}

const Child = (props: any) => {
  const [count, setCount] = useState(0);
  const eventClick = useLatest(props.onEvent);

  const onAdd = () => {
    setCount(count + 1);
  }

  const test = () => {
    eventClick.current.click(count);
    props.onClick(count);
  }

  useEffect(() => {
    document.getElementById('child')?.addEventListener('click', () => {
      test()
    })
  }, [])
  return (
    <div>
      <Button onClick={onAdd}>{count}</Button>
      <div id="child">child</div>
    </div>
  );
}

const Demo = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useLayoutEffect(() => {
    countRef.current = count
  }, [count])

  const onAdd = () => {
    setCount(count + 1);
  }

  const onEventClick = (n: number) => {
    console.log('event', count, n);
    setCount(count - 1);
  }

  const onChildClick = (n: number) => {
    console.log('child', count, n);
  }

  return (
    <div>
      {countRef.current}
      <App />
      <Button onClick={onAdd}>{count}</Button>
      <Child onEvent={{click: onEventClick}} onClick={onChildClick}/>
    </div>
  );
};

export default Demo;
```