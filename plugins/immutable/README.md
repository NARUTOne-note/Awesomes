# immutable

> 不可变数据

## 背景

JS 里面的变量类型可以分为 基本类型 和 引用类型 。

在使用过程中，引用类型经常会产生一些无法意识到的副作用，所以在现代 JS 开发过程中，有经验的开发者都会在特定位置有意识的写下断开引用的不可变数据类型。

```js
// 因为引用所带来的副作用：
var a = [{ val: 1 }]
var b = a.map(item => item.val = 2)

// 期望：b 的每一个元素的 val 值变为 2，但最终 a 里面每个元素的 val 也变为了 2
console.log(a[0].val) // 2
```

**断掉引用**:

> Object.assign 或者 ... 对对象进行解构

```js
var a = [{ val: 1 }]
var b = a.map(item => ({ ...item, val: 2 }))

console.log(a[0].val) // 1
console.log(b[0].val) // 2
```

针对深处引用，对象嵌套就不管用了。

**深拷贝**:

```js
// 一个简单的深拷贝函数，只做了简单的判断
// 用户态这里输入的 obj 一定是一个 Plain Object，并且所有 value 也是 Plain Object
function deepClone(obj) {
  const keys = Object.keys(obj)
  return keys.reduce((memo, current) => {
    const value = obj[current]
    if (typeof value === 'object') {
      // 如果当前结果是一个对象，那我们就继续递归这个结果
      return {
        ...memo,
        [current]: deepClone(value),
      }
    }
    return {
      ...memo,
      [current]: value,
    }
  }, {})
}

var a = {
  val: 1,
  desc: {
    text: 'a',
  },
}
var b = deepClone(a)

b.val = 2
console.log(a.val) // 1
console.log(b.val) // 2

b.desc.text = 'b'
console.log(a.desc.text) // 'a'
console.log(b.desc.text) // 'b'

```

上面的这个 deepClone 可以满足简单的需求，但是真正在生产工作中，我们需要考虑非常多的因素。
举例来说：

- key 里面 getter，setter 以及原型链上的内容如何处理？
- value 是一个 Symbol 如何处理？
- value 是其他非 Plain Object 如何处理？
- value 内部出现了一些循环引用如何处理？

因为有太多不确定因素，所以在真正的工程实践中，还是推荐大家使用大型开源项目里面的工具函数。比较常用的为大家所熟知的就是 lodash.cloneDeep，无论是安全性还是效果都有所保障。

## 不可变数据

这种去除引用数据类型副作用的数据的概念我们称作 immutable，意为不可变的数据，其实理解为不可变关系更为恰当。每当我们创建一个被 deepClone 过的数据，新的数据进行有副作用 (side effect) 的操作都不会影响到之前的数据，这也就是 immutable 的精髓和本质。

数组操作：

**no-immutable**: `push、pop、splice`
**immutable**: `slice、map`

deepClone 这种函数虽然断绝了引用关系实现了 immutable，但是相对来说开销太大（因为他相当于完全创建了一个新的对象出来，有时候有些 value 我们不会进行赋值操作，所以即使保持引用也没关系）。
所以在 2014 年，facebook 的 immutable-js 横空出世，即保证了数据间的 immutable ，在运行时判断数据间的引用情况，又兼顾了性能。

### immutable-js

[immutable-js.github.io](https://immutable-js.github.io/immutable-js/)

```js
const { fromJS } = require('immutable')
const data = {
  content: {
    time: '2018-02-01',
    val: 'Hello World',
  },
  desc: {
    text: 'a',
  },
}

// 把 data 转化为 immutable-js 中的内置对象
const a = fromJS(data)
const b = a.setIn(['desc', 'text'], 'b')
console.log(b.get('desc') === a.get('desc'))       // false
// content 的值没有改动过，所以 a 和 b 的 content 还保持着引用
console.log(b.get('content') === a.get('content')) // true

// 将 immutable-js 的内置对象又转化为 JS 原生的内容
const c = a.toJS()
const d = b.toJS()

// 这时我们发现所有的引用都断开了
console.log(c.desc === d.desc)       // false
console.log(c.content === d.content) // false

```

## immer

> immer 的作者同时也是 mobx 的作者。mobx 又像是把 Vue 的一套东西融合进了 React，已经在社区取得了不错的反响。immer 则是他在 immutable 方面所做的另一个实践。

与 immutable-js 最大的不同，immer 是使用原生数据结构的 API 而不是像 immutable-js 那样转化为内置对象之后使用内置的 API

所有具有副作用的操作，都可以放入 produce 函数的第二个参数内进行

```js
// 最终返回的结果并不影响原来的数据
const newState = produce(state, (draft) => {
draft.done = true
})
console.log(state.done)    // false
console.log(newState.done) // true
```

通过上面的例子我们能发现，所有具有副作用的逻辑都可以放进 `produce` 的第二个参数的函数内部进行处理。在这个函数内部对原来的数据进行任何操作，都不会对原对象产生任何影响。
这里我们可以在函数中进行任何操作，例如 `push splice`  等非 immutable 的 API，最终结果与原来的数据互不影响。

Immer 最大的好处就在这里，我们的学习没有太多成本，因为它的 API 很少，无非就是把我们之前的操作放置到 produce 函数的第二参数函数中去执行。

### 原理

> Proxy

immer 的做法就是维护一份 state 在内部，劫持所有操作，内部来判断是否有变化从而最终决定如何返回。下面这个例子就是一个构造函数，如果将它的实例传入 Proxy 对象作为第一个参数，就能够后面的处理对象中使用其中的方法：

```js
class Store {
  constructor(state) {
    this.modified = false
    this.source = state
    this.copy = null
  }
  get(key) {
    if (!this.modified) return this.source[key]
    return this.copy[key]
  }
  set(key, value) {
    if (!this.modified) this.modifing()
    return this.copy[key] = value
  }
  modifing() {
    if (this.modified) return
    this.modified = true
    // 这里使用原生的 API 实现一层 immutable，
    // 数组使用 slice 则会创建一个新数组。对象则使用解构
    this.copy = Array.isArray(this.source)
      ? this.source.slice()
      : { ...this.source }
  }
}

```

当然，Proxy 作为一个新的 API，并不是所有环境都支持，Proxy 也无法 polyfill，所以 immer 在不支持 Proxy 的环境中，使用 Object.defineProperty 来进行一个兼容。
