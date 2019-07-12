import React, { PureComponent, Component } from 'react';
import {Button} from 'antd';
import Demo from '@/components/Demo';
import DocLine from '@/components/DocLine';

/**
 * PureComponent
 * React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较
 * 浅层对比 prop 和 state 的方式来实现了该函数提高性能
 */

interface countInterface {
  count: number,
  words: Array<string>
}

interface Props extends countInterface {}

interface States extends countInterface {}

class PureComt extends PureComponent<Props, {}> {
  render() {
    const {count, words} = this.props;
    return (
      <div>
        <p>点击了 {count} 次 </p>
        <p>words: {words.join(',')}</p>
      </div>
    );
  }
}

class PureDemo extends Component<{}, States> {
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
        <h1>React.PureComponent</h1>
        <p>React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。</p>
        <p>如果赋予 React 组件相同的 props 和 state，render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能。</p>
        <Demo title="React.PureComponent">
          <div>
            <h3>测试words</h3>
            <PureComt count={0} words={this.state.words}></PureComt>
            <h3>测试count与words</h3>
            <PureComt count={this.state.count} words={this.state.words}></PureComt>
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
        <DocLine><a href="https://react.docschina.org/docs/react-api.html#reactpurecomponent">React.PureComponent文档</a></DocLine>   
      </div>      
    );
  }
}

export default PureDemo;