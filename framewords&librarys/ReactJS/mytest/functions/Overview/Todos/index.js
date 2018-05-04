import React, { Component } from 'react'
import update from 'react-update'
import Input from 'bfd/Input'
import Button from 'bfd/Button'
import List from './List'
import './index.less'

class Todos extends Component {

  constructor() {
    super()
    this.update = update.bind(this)
    this.state = {
      list: [],
      count:0
    }
  }

  handleListChange(type, value) {
    this.update(type, 'list', value)
  }

  handelStateClick() {
    // 第二个参数, 回调函数获取最新state
    let count = this.state.count + 1
    this.setState({count: count}, () => {
      console.log(this.state.count)
    }) 
  }

  render() {
    const { update, state } = this
    const { text, list } = state
    return (
      <div className="todos">
        <Input onChange={e => update('set', 'text', e.target.value)} />
        <Button onClick={() => update('push', 'list', text)}>添加</Button>
        <List data={list} onChange={::this.handleListChange} />

        <Button onClick={::this.handelStateClick}>测试state</Button>
      </div>
    )
  }
}

export default Todos