# React-Events

> [React 事件系统](https://mp.weixin.qq.com/s/NLJlcdhMcPPgrS8KrnmQ9A)

- `事件委托`。React 利用了事件委托，将事件都绑定在 document 之上。
- DOM 事件模型。分成`捕获、目标、冒泡`阶段。
- `addEventListener` 第三个参数是指定是否在捕获阶段触发事件相应函数，默认 false
- `e.stopImmediatePropagation()`，该方法是加强版的 `stopPropagation`，不仅可以阻止向其他元素扩散，也可以在本元素内部阻止扩散
- `constructor` 函数先于 React 事件绑定

```jsx
export default class App extends React.Component {
  constructor(props) {
    super(props)
    document.addEventListener('click', () => {
      console.log('R: native document click')
    })
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      console.log('r: native document click')
    })
  }

  innerClick = (e) => {
    console.log('A: react inner click.')
    e.stopPropagation()
  }

  outerClick = () => {
    console.log('B: react outer click.')
  }

  componentDidMount() {
    document.getElementById('outer').addEventListener('click', () => {
      console.log('C: native outer click')
    })
    document.getElementById('inner').addEventListener('click', () => {
      console.log('D: native inner click')
    })
  }

  render() {
    return (
      <div id='outer' onClick={this.outerClick}>
        <button id='inner' onClick={this.innerClick}>
          BUTTON
        </button>
      </div>
    )
  }
}

// 点击button
// D C R A
```
