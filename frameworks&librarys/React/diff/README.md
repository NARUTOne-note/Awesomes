# diff 算法

> 解析diff算法

- [传统diff、react优化diff、vue优化diff](https://www.jianshu.com/p/398e63dc1969)
- [官网 —— diff 介绍](https://zh-hans.reactjs.org/docs/reconciliation.html#the-diffing-algorithm)

一个DOM节点在某一时刻最多会有4个节点和他相关:

- `current Fiber`。如果该DOM节点已在页面中，current Fiber代表该DOM节点对应的Fiber节点。

- `workInProgress Fiber`。如果该DOM节点将在本次更新中渲染到页面中，workInProgress Fiber代表该DOM节点对应的Fiber节点。

- `DOM节点本身`。

- `JSX对象`。即ClassComponent的render方法的返回结果，或FunctionComponent的调用结果。JSX对象中包含描述DOM节点的信息。

**Diff算法的本质是对比1和4，生成2**。

## Diff的瓶颈以及React如何应对

> 由于Diff操作本身也会带来性能损耗，React文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中n是树中元素的数量。如果在React中使用了该算法，那么展示1000个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。

React的diff会预设三个限制: 降低算法复杂度

- 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。
- 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。
- 开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定

### 单节点diff

```js
// 更新前
<div>
  <p key="ka">ka</p>
  <h3 key="song">song</h3>
</div>

// 更新后
<div>
  <h3 key="song">song</h3>
  <p key="ka">ka</p>
</div>
```

如果没有key，React会认为div的第一个子节点由p变为h3，第二个子节点由h3变为p。这符合限制2的设定，会销毁并新建。
但是当我们用key指明了节点前后对应关系后，React知道key === "ka"的p在更新后还存在，所以DOM节点可以复用，只是需要交换下顺序。

可以从同级的节点数量将Diff分为两类：

- 当newChild类型为object、number、string，代表同级只有一个节点
- 当newChild类型为Array，同级有多个节点

判断DOM节点是否可以复用：

- 当key相同且type不同时，代表我们已经找到本次更新的p对应的上次的fiber，type不同，不能复用。既然唯一的可能性已经不能复用，则剩下的fiber都没有机会了，所以都需要标记删除。
- 当key不同时只代表遍历到的该fiber不能被复用，后面还有兄弟fiber还没有遍历到。所以仅仅标记该fiber删除。

```js
// 习题1 更新前
<div>ka song</div>
// 更新后
<p>ka song</p>

// 未设置key prop默认 key = null;，所以更新前后key相同，都为null，但是更新前type为div，更新后为p，type改变则不能复用

// 习题2 更新前
<div key="xxx">ka song</div>
// 更新后
<div key="ooo">ka song</div>

// 更新前后key改变，不需要再判断type，不能复用。

// 习题3 更新前
<div key="xxx">ka song</div>
// 更新后
<p key="ooo">ka song</p>

// 更新前后key改变，不需要再判断type，不能复用。

// 习题4 更新前
<div key="xxx">ka song</div>
// 更新后
<div key="xxx">xiao bei</div>

// 更新前后key与type都未改变，可以复用。children变化，DOM的子元素需要更新。
```

### 多节点Diff

```js
function List () {
  return (
    <ul>
      <li key="0">0</li>
      <li key="1">1</li>
      <li key="2">2</li>
      <li key="3">3</li>
    </ul>
  )
}

// =>

{
  $$typeof: Symbol(react.element),
  key: null,
  props: {
    children: [
      {$$typeof: Symbol(react.element), type: "li", key: "0", ref: null, props: {…}, …}
      {$$typeof: Symbol(react.element), type: "li", key: "1", ref: null, props: {…}, …}
      {$$typeof: Symbol(react.element), type: "li", key: "2", ref: null, props: {…}, …}
      {$$typeof: Symbol(react.element), type: "li", key: "3", ref: null, props: {…}, …}
    ]
  },
  ref: null,
  type: "ul"
}
```

React团队发现，在日常开发中，相较于新增和删除，更新组件发生的频率更高。所以Diff会优先判断当前节点是否属于更新

newChildren中每个组件进行比较的是current fiber，同级的Fiber节点是由sibling指针链接形成的单链表，即不支持双指针遍历。
即 newChildren[0]与fiber比较，newChildren[1]与fiber.sibling比较。
所以无法使用双指针优化。

Diff算法的整体逻辑会经历两轮遍历：

第一轮遍历：处理更新的节点。
第二轮遍历：处理剩下的不属于更新的节点。
