import { Observable, of, from, fromEvent, fromFetch, bindCallback, bindNodeCallback } from 'rxjs';

/**
 * Observables 是多个值的惰性推送集合
 * Observables 像是没有参数, 但可以泛化为多个值的函数
 * EventEmitters 共享副作用并且无论是否存在订阅者都会尽早执行，Observables 与之相反，不会共享副作用并且是延迟执行
 * Observables 传递值可以是同步的，也可以是异步的
 * 在 Observable 执行中, 可能会发送零个到无穷多个 "Next" 通知。如果发送的是 "Error" 或 "Complete" 通知的话，那么之后不会再发送任何通知了
 * 
 */

const observable = new Observable(subscriber => {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  } catch (err) {
    subscriber.error(err)
  } 
});

console.log('just before subscribe');
observable.subscribe({
  next(x) { console.log('got value ' + x); }, // "Next" 通知： 发送一个值，比如数字、字符串、对象，等等
  error(err) { console.error('something wrong occurred: ' + err); }, // "Error" 通知： 发送一个 JavaScript 错误 或 异常。
  complete() { console.log('done'); } // "Complete" 通知： 不再发送任何值。
});
console.log('just after subscribe');

/* 打印
just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done
*/

// 订阅 Observable 像是调用函数, 并提供接收数据的回调函数
observable.subscribe(x => console.log(x));

// 可观察对象
const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42); // 发送一个值，通知给订阅者（观察者）
  subscriber.next(100); // “返回”另外一个值
  subscriber.next(200); // 还可以再“返回”值
  setTimeout(() => {
    subscriber.next(300); // 异步执行
  }, 1000);
});

// 订阅调用，接收回调数据
foo.subscribe(x => {
  console.log(x);
  /**
   * Hello
   * 42
   * 100
   * 200
   * ... 1s..
   * 300
   */
});

// 返回 Subscription (订阅)
const fooSubscription = foo.subscribe(y => {
  console.log(y);
   /**
   * Hello
   * 42
   * 100
   * 200
   * ... 1s..
   * 300
   */
});

// 清理Observable执行
fooSubscription.unsubscribe();

// ! 创建observable方式 举例

// 一个或多个值
of(1, 2)

// 数组
from([1, 2])

// 事件
fromEvent(document.getElementById('btn'), 'click')

// 请求
fromFetch('/users');

// 回调函数 
// fs.exists = (path, cb(exists))
const exists = bindCallback(fs.exists)
exists('test.txt').subscribe(ex => console.log('file exist?', ex))

// fs.rename = (pathA, pathB, cb(err, result))
const rename = bindNodeCallback(fs.rename);
rename('file.txt', 'else.txt').subscribe(() => console.log('Renamed!'));
