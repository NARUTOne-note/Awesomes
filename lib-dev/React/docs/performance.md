# 性能优化

> Web 性能在前端领域是一个棘手的问题，一直是一个需要持续性去解决的问题。本篇目前只讲BI-core做了哪些优化措施、方法。

## 组件优化

> React组件无限制渲染，是比较损耗计算内存的，限制一些重复性渲染计算，也就能达到性能优化的目的。**过早的优化是万恶之源，过早的优化是万恶之源，过早的优化是万恶之源。**

- 配合`immutablejs`控制数据变化

### shouldComponentUpdate

采用计算判断，组件内部，前后两次渲染的 `props` 和 `state` 数据异同

```js
import _ from 'lodash';

// function isEqual(source, target) {
//   if (!source) return true;
//   return Object.keys(source).every(key => {
//     let isEqual = true;
//     const prop = source[key];
//     if (typeof prop !== 'function' && target[key] !== source[key]) {
//       isEqual = false;
//     }
//     return isEqual;
//   });
// }

function shouldComponentUpdate(nextProps, nextState) {
  if (nextProps.children) return true;
  return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state));
}

export default shouldComponentUpdate;
```

### React.memo

函数式组件性能优化。 `React.memo` 为高阶组件。它与 `React.PureComponent` 非常相似，但它适用于函数组件，但不适用于 class 组件。

```js
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

**高阶用法**：

```js
function arePropsEqual(prevProps, nextProps) {
  // your code
  return prevProps === nextProps;
}

export default memo(() => {}, arePropsEqual);

```

> 注意：与 shouldComponentUpdate 不同的是，arePropsEqual 返回 true 时，不会触发 render，如果返回 false，则会。而 shouldComponentUpdate 刚好与其相反。

### React.PureComponent

`React.PureComponent` 与 `React.Component` 很相似。两者的区别在于 `React.Component` 并未实现 `shouldComponentUpdate()`，而 `React.PureComponent` 中以浅层对比 `prop` 和 `state` 的方式来实现了该函数。

> `React.PureComponent` 中的 `shouldComponentUpdate()` 仅作对象的浅层比较; 在深层数据结构发生变化时调用 `forceUpdate()` 来确保组件被正确地更新

### 细粒度组件

微服务的核心思想是：以更轻、更小的粒度来纵向拆分应用，各个小应用能够独立选择技术、发展、部署。我们在开发组件的过程中也能用到类似的思想。试想当一个整个页面只有一个组件时，无论哪处改动都会触发整个页面的重新渲染。在对组件进行拆分之后，render 的粒度更加精细，性能也能得到一定的提升。

**stateless function component** 无状态组件

sc 一般被用来当作展示组件，这样做的好处有：

- 没有 state，没有 ref，没有生命周期，React 还可以避免不必要的内存申请及检查，这意味着更高效的渲染，React 会直接调用 createElement 返回 VDOM
- 更短，更少的样本代码可以提高组件的可读性
- 由于 sc 不支持 state，会迫使开发者将逻辑组件与展示组件进一步分离
- 可以作为 render prop 的 prop，或者完成 callback render
- 更方便进行测试
- 和外层的 container 配合，分离数据逻辑与 UI
- 更小的 bundler，Babel 转码后的 rc 体积更小

### 避免props不必要的更改

1、**不要在 render 中重新定义函数**

很多人喜欢在 render 函数中子组件通过构造一个箭头函数来传递给子组件，但是这样有一个问题就是，每次都会声明一个新的箭头函数，因而每次声明的函数都肯定是不同的，所以就会导致如果你用了 PureComponent 也无法阻止 re-render。

```js
render() {
  return (
    <div>
      {this.state.count}
      <Child onClick={() => {
          this.onClick();
        }}
      />
    </div>
  );
}
```

解决方案：在 constructor 中 bind，甚至或者是闭包引用一个 self = this ，或者在类声明中直接定义实例属性**（推荐）**，都可以做到绑定 this。

2、**使用稳定的 key**

在渲染一个列表时最好不要用每个项的 index 去当做他的 key，因为如果其中有一个项被删除或移动，则整个 key 就失去了与原项的对应关系，加大了 diff 的开销。

3、 **最小化变动**

示例： 一个 list 有 10000 个未标记的 Item，点击某一 Item 该 Item 就会变为已标记，再点击就会变为未标记

```js
render() {
  const { items, markItem } = this.props;
  return (
    <div className="main" style={{overflow: 'scroll', height: '600px'}}>
      {items.map(item =>
        <Item key={item.id} id={item.id} marked={item.marked} onClick={markItem} />
      )}
    </div>
  );
}
```

问题就是每次点击派发 action 之后，reducer 都会返回一个新的 state，这个新的 state 会触发 connect 的 App 的 re-render，App 又重新渲染每个 Item，Item 直接 render，导致不必要的 reconciliation。

用 **shouldComponentUpdate** 来避免重渲染
基于上上面的改进，那就对每个 Item 增加一个 shouldComponentUpdate，在每次更新来临的时候拒绝掉这次更新。
shouldComponentUpdate 也是有开销的的，密密麻麻的 shouldComponentUpdate 即使返回 false 也拖慢了整体的时间，而且本例中的 shouldComponentUpdate 相对来说并不复杂，如果遇到更复杂的 model 耗时将会更久。

**让未被修改的组件对改变无感知**, 数据更加细化，要将数据和组件重新组合。为了避免父组件的 re-render，我们将每个 Item 和 redux store 直接连接，将 store 拆分为 ids 和 items，用 ids 给父组件完成 Item 初始化提供一些必要的信息，用 items 对 Item 进行初始化和更新。每次点击的时候 ids 不变，所以父组件不会 re-render，只更新对应的子组件

## React Hooks 性能优化

1. 避免子组件重新渲染：`useMemo` 包裹属性 、`useCallback` 包裹函数
2. 使用`useEffect` 注意state的状态值；清除副作用（setInterval, 监听函数等）
3. 多个state值可以选择使用 `useReduce`