# RxJS

> 使用 Observables 的响应式编程的库，它使编写异步或基于事件回调的代码更容易

ReactiveX 结合了 **观察者模式、迭代器模式 和 使用集合的函数式编程**，以满足以一种理想方式来管理事件序列所需要的一切

- `Observable` (可观察对象): 表示一个概念，这个概念是一个可调用的未来值或事件的集合。
- `Observer` (观察者): 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
- `Subscription` (订阅): 表示 Observable 的执行，主要用于取消 Observable 的执行。
- `Operators` (操作符): 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。
- `Subject` (主体): 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
- `Schedulers` (调度器): 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他

## 拉取 (Pull) vs. 推送 (Push)

      生产者                       消费者
拉取  被动的: 当被请求时产生数据     主动的: 决定何时请求数据
推送  主动的: 按自己的节奏产生数据   被动的: 对收到的数据做出反应

**拉取**和**推送**是两种不同的协议，用来描述数据**生产者 (Producer)**如何与数据**消费者 (Consumer)**进行通信的。

**什么是拉取？** - 在拉取体系中，由消费者来决定何时从生产者那里接收数据。生产者本身不知道数据是何时交付到消费者手中的。

每个 JavaScript **函数都是拉取体系**。函数是数据的生产者，调用该函数的代码通过从函数调用中“取出”一个**单个返回值**来对该函数进行消费。
ES2015 引入了 **generator 函数和 iterators (function*)**，这是另外一种类型的拉取体系。调用 iterator.next() 的代码是消费者，它会从 **iterator(生产者)** 那“取出”**多个值**。

**什么是推送？** - 在推送体系中，由生产者来决定何时把数据发送给消费者。消费者本身不知道何时会接收到数据。

在当今的 JavaScript 世界中，**Promises 是最常见的推送体系类型**。Promise(生产者) 将一个解析过的值传递给已注册的回调函数(消费者)，但不同于函数的是，由 Promise 来决定何时把值“推送”给回调函数。
RxJS 引入了 **Observables**，一个新的 JavaScript 推送体系。Observable 是多个值的生产者，并将值“推送”给观察者(消费者)。

- Function 是惰性的评估运算，调用时会同步地返回一个单一值。
- Generator 是惰性的评估运算，调用时会同步地返回零到(有可能的)无限多个值。
- Promise 是最终可能(或可能不)返回单个值的运算。
- Observable 是惰性的评估运算，它可以从它被调用的时刻起同步或异步地返回零到(有可能的)无限多个值。

## 创建操作符

**指南**：

- 操作符应该永远返回一个 Observable 。正在对一个未知的集合执行操作以创建一个新的集合。只有返回一个新的集合才有意义。如果你创建 了一个返回非 Observable 的方法，那么它就不是一个操作符
- 确保对你的操作符返回的 Observalbe 内部所创建的 subscriptions 进行管理。你的操作符需要订阅返回 Observable 中的源(或 this)， 确保它是作为取消订阅处理方法或 subscription 的一部分返回的。
- 确保处理传入函数中的异常。如果你实现的操作符接收函数作为参数，当你调用它时，你会想要将其包裹在 try/catch 中并发送 错误到 observable 的 error() 路径。
- 确保在返回的 Observable 的取消订阅处理方法中释放稀缺资源。如果你设置了事件处理方法，或 web socket，或一些其他类似的，取消订阅 方法是移除事件处理方法和关闭 socket 的好地方。

```js
function mySimpleOperator(someCallback) {
   // 纯函数操作符
   return (source) => new Observable(subscriber => {
     // 保存我们的内部 subscription
     var subscription = source.subscribe(value => {
       // 重点：从用户提供的回调函数中捕获错误
       try {
         subscriber.next(someCallback(value));
       } catch(err) {
         subscriber.error(err);
       }
     },
     // 确保处理错误，然后视情况而定进行完成并发送它们
     err => subscriber.error(err),
     () => subscriber.complete());

     // 现在返回
     return subscription;
   });
}
```

## 参考

- [rxjs API](https://rxjs.dev/api)
