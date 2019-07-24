import React from 'react';
import DocLine from '@/components/DocLine';
import Demo from '@/components/Demo';
import UseStateAPI from './UseStateAPI';
import UseEffectAPI from './UseEffectAPI';
import UseReducerAPI from './UseReducerAPI';
import UseRefAPI from './UseRefAPI';

function HookAPI () {
  return (
    <div className="hook-api">
      <h2>Hook API</h2>
      <p>Hook 内置的一些Hook API，辅助开发</p>
      <DocLine><a href="https://react.docschina.org/docs/hooks-reference.html">Hook API 索引</a></DocLine>
      <DocLine type="warn">
        <ul>
          <li>基础Hook
            <ul>
              <li><a href="https://react.docschina.org/docs/hooks-reference.html#usestate">useState</a></li>
              <li><a href="https://react.docschina.org/docs/hooks-reference.html#useeffect">useEfffect</a></li>
              <li><a href="https://react.docschina.org/docs/hooks-reference.html#usecontext">useContext</a></li>
            </ul>
          </li>
          <li>额外Hook
            <ul>
              <li><a href="https://react.docschina.org/docs/hooks-reference.html#usereducer">useReducer</a></li>
              <li><a href="https://react.docschina.org/docs/hooks-reference.html#usecallback">useCallback</a></li>
              <li><a href="https://react.docschina.org/docs/hooks-reference.html#usememo">useMemo</a></li>
              <li><a href="https://react.docschina.org/docs/hooks-reference.html#useref">useRef</a></li>
              <li><a href="https://react.docschina.org/docs/hooks-reference.html#useimperativehandle">useImperativeHandle</a></li>
              <li><a href="https://react.docschina.org/docs/hooks-reference.html#uselayouteffect">useLayoutEffect</a></li>
              <li><a href="https://react.docschina.org/docs/hooks-reference.html#usedebugvalue">useDebugValue</a></li>
            </ul>
          </li>
        </ul>
      </DocLine>
      <Demo title="Hook API">
        <UseStateAPI></UseStateAPI>
        <UseEffectAPI></UseEffectAPI>
        <UseReducerAPI></UseReducerAPI>
        <UseRefAPI></UseRefAPI>
      </Demo>
    </div>
  );
}

export default HookAPI;
