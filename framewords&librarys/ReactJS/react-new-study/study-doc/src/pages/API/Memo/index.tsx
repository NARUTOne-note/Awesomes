import React, { Component } from 'react';
import {Button} from 'antd';
import Demo from '@/components/Demo';
import DocLine from '@/components/DocLine';

/**
 * React.memo
 * React.memo 为高阶组件。它与 React.PureComponent 非常相似，但它适用于函数组件，但不适用于 class 组件。
 */

interface countInterface {
  count: number,
  words: Array<string>
}

interface Props extends countInterface {}

interface States extends countInterface {}

function memoComt (props: Props):JSX.Element {
  const {count, words} = props;
  return (
    <div>
      <p>点击了 {count} 次 </p>
      <p>words: {words.join(',')}</p>
    </div>
  );
}

/*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
*/
/* function areEqual(prevProps, nextProps) {}
  React.memo(MyComponent, areEqual);
*/

const MemoComt = React.memo(memoComt);

class MemoDemo extends Component<{}, States> {
  state = {
    count: 0,
    words: ['marklar']
  };

  onAdd = () => {
    this.setState(({count}) => {
      return {
        count: count + 1
      }
    });
  }

  onReduce = () => {
    this.setState(({count}) => {
      return {
        count: count - 1
      }
    });
  }

  onWords = () => {
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }
  
  render() {
    return (
      <div>
        <h1>React.memo</h1>
        <p>React.memo 为高阶组件。它与 React.PureComponent 非常相似，但它适用于函数组件，但不适用于 class 组件</p>
        <Demo title="React.memo">
          <div>
            <h3>测试words</h3>
            <MemoComt count={0} words={this.state.words}></MemoComt>
            <h3>测试count与words</h3>
            <MemoComt count={this.state.count} words={this.state.words}></MemoComt>
            <h3>实际情况</h3>
            <p>实际点击次数：{this.state.count}</p>
            <p>实际words: {this.state.words.join(',')}</p>
            <div className="btns-margin" style={{marginTop: 16}}>
              <Button type="primary" icon="plus" onClick={this.onAdd}>点击增加</Button>
              <Button icon="minus" onClick={this.onReduce}>点击减少</Button>
              <Button icon="code" onClick={this.onWords}>words</Button>
            </div>
          </div>
        </Demo>
        <DocLine><a href="https://react.docschina.org/docs/react-api.html#reactmemo">React.memo文档</a></DocLine>    
      </div>      
    );
  }
}

export default MemoDemo;