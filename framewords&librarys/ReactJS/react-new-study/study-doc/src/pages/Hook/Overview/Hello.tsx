import React, { useState } from 'react';
import AlertHook from './AlertHook';

export interface HelloProps {
  name: string
}

function Hello(props: HelloProps) {
  const [color, setColor] = useState("red");
  const AlertHookNode = AlertHook({title: 'Hello World!', type: 'success'})

  function handleClick() {
    const currColor = color == 'red' ? 'blue' : 'red';
    setColor(currColor);
  }

  return (
    <>
      {AlertHookNode}
      <h2 style={{color}} onClick={handleClick}>Hello, {props.name}</h2>
    </>
  );
}

export default Hello;