# 开发优选

> 列举一些React开发中优秀的处理数据、管理组件通信、生命周期调用等方式

## common 通用

- 组件细分、嵌套：[巧用children](./demo/dev-code/children.md)

## hooks

- `useEffect` 依赖尽量使用基础类型，避免对象，数组结构的引用类型，造成浅比较多次更新

```js
// 深比较useEffect
import { isEqual } from 'lodash';
export function useDeepCompareEffect(fn, deps) {
  const trigger = useRef(0);
  const prevDeps = useRef(deps);
  if (!isEqual(prevDeps.current, deps)) {
    trigger.current++;
  }
  prevDeps.current = deps;
  return useEffect(fn, [trigger.current]);
}

```

## context

- 操作分离，避免不必要的渲染

```js
import React, { useContext, useState } from "react";
import "./styles.css";

const LogStateContext = React.createContext();
const LogDispatcherContext = React.createContext();

function LogProvider({ children }) {
  const [logs, setLogs] = useState([]);
  const addLog = useCallback((log) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  }, []);
  return (
    <LogDispatcherContext.Provider value={addLog}>
      <LogStateContext.Provider value={logs}>
        {children}
      </LogStateContext.Provider>
    </LogDispatcherContext.Provider>
  );
}

function Logger1() {
  const { addLog } = useContext(LogDispatcherContext);
  console.log('Logger1 render')
  return (
    <>
      <p>一个能发日志的组件1</p>
      <button onClick={() => addLog("logger1")}>发日志</button>
    </>
  );
}

function Logger2() {
  const { addLog } = useContext(LogDispatcherContext);
  console.log('Logger2 render')
  return (
    <>
      <p>一个能发日志的组件2</p>
      <button onClick={() => addLog("logger2")}>发日志</button>
    </>
  );
}

function LogsPanel() {
  const { logs } = useContext(LogStateContext);
  return logs.map((log, index) => <p key={index}>{log}</p>);
}

export default function App() {
  return (
    <LogProvider>
      {/* 写日志 */}
      <Logger1 />
      <Logger2 />
      {/* 读日志 */}
      <LogsPanel />
      </div>
    </LogProvider>
  );
}

```

- 组合context, 灵活利用hooks

```js
import React from 'react'

const LogStateContext = React.createContext();
const LogDispatcherContext = React.createContext();

export function useLogState() {
  const context = React.useContext(LogStateContext)
  if (context === undefined) {
    throw new Error('useLogState must be used within a LogStateProvider')
  }
  return context
}

export function useLogDispatcher() {
  const context = React.useContext(LogDispatcherContext)
  if (context === undefined) {
    throw new Error('useLogDispatcher must be used within a LogDispatcherContext')
  }
  return context
}

// 组合起来使用
export function useLogs() {
  return [useLogState(), useLogDispatcher()]
}

export function App() {
  const [logs, addLogs] = useLogs()
  // ...
}

```

- 组合 Providers，解决嵌套地狱

```js
const StateProviders = ({ children }) => (
  <LogProvider>
    <UserProvider>
      <MenuProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </MenuProvider>
    </UserProvider>
  </LogProvider>
)

function App() {
  return (
    <StateProviders>
      <Main />
    </StateProviders>
  )
}

```

优化：参考 redux 中的 compose 方法，自己写一个 composeProvider 方法：

```js
function composeProviders(...providers) {
  return ({ children }) =>
    providers.reduce(
      (prev, Provider) => <Provider>{prev}</Provider>,
      children,
    )
}

const StateProviders = composeProviders(
  LogProvider,
  UserProvider,
  MenuProvider,
  AppProvider,
)

function App() {
  return (
    <StateProvider>
      <Main />
    </StateProvider>
  )
}

```
