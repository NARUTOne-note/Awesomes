import React from 'react';
import DocLine from '@/components/DocLine';
import Demo from '@/components/Demo';

function HookRule () {
  return (
    <div className="hook-rule">
      <h2>Hook Rule</h2>
      <p>Hook 本质就是 JavaScript 函数</p>
      <DocLine type="warn">
        <h3>只在最顶层使用 Hook</h3>
        <ul>
          <li>不要在循环，条件或嵌套函数中调用 Hook</li>
          <li>确保总是在你的 React 函数的最顶层调用他们, 就能确保 Hook 在每一次渲染中都按照同样的顺序被调用</li>
        </ul>
        <h3>不要在普通的 JavaScript 函数中调用 Hook</h3>
        <ul>
          <li>在 React 的函数组件中调用 Hook</li>
          <li>在自定义 Hook 中调用其他 Hook</li>
        </ul>
      </DocLine>
      <DocLine type="error">
        <ul>
          <li>只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联</li>
          <li>这就是为什么 Hook 需要在我们组件的最顶层调用。如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的内部</li>
        </ul>
      </DocLine>
      <DocLine><a href="https://react.docschina.org/docs/hooks-rules.html">Hook 规则</a></DocLine>
      <Demo title="Hook Rule">
        <DocLine>
          <pre>
            {
              `
                function Form() {
                  // 1. Use the name state variable
                  const [name, setName] = useState('Mary');

                  // 2. Use an effect for persisting the form
                  useEffect(function persistForm() {
                    localStorage.setItem('formData', name);
                  });

                  // 3. Use the surname state variable
                  const [surname, setSurname] = useState('Poppins');

                  // 4. Use an effect for updating the title
                  useEffect(function updateTitle() {
                    document.title = name + ' ' + surname;
                  });

                  // ...
                }
              `
           }
          </pre>
          <pre>
            {
              `
                // ------------
                // 首次渲染
                // ------------
                useState('Mary')           // 1. 使用 'Mary' 初始化变量名为 name 的 state
                useEffect(persistForm)     // 2. 添加 effect 以保存 form 操作
                useState('Poppins')        // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
                useEffect(updateTitle)     // 4. 添加 effect 以更新标题

                // -------------
                // 二次渲染
                // -------------
                useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
                useEffect(persistForm)     // 2. 替换保存 form 的 effect
                useState('Poppins')        // 3. 读取变量名为 surname 的 state（参数被忽略）
                useEffect(updateTitle)     // 4. 替换更新标题的 effect

                // ...
              `
            }
          </pre>
        </DocLine>
      </Demo>
    </div>
  );
}

export default HookRule;