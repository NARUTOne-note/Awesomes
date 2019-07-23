import React, { useState, useEffect } from 'react';

function useCount (defaultCount: number = 0, id?: string) {
  // 声明一个叫 “count” 的 state 变量, 初始值 0
  const [count, setCount] = useState(defaultCount);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    const title = `Effect Hook:  You clicked ${count} times`;
    const countP = document.getElementById(id || "countTitle");
    countP && (countP.innerHTML = title);
  });

  return [count, setCount];
}

export default useCount