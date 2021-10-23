import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject, from, interval } from 'rxjs';
import { multicast } from 'rxjs/operators';

/**
 * Subject 观察者主体
 * Subject 是一种特殊类型的 Observable，它允许将值多播给多个观察者，所以 Subject 是多播的，而普通的 Observables 是单播的(每个已订阅的观察者都拥有 Observable 的独立执行)
 * 每个 Subject 都是 Observable ，从观察者的角度而言，它无法判断 Observable 执行是来自普通的 Observable 还是 Subject 
 * 每个 Subject 都是观察者。 - Subject 是一个有如下方法的对象： next(v)、error(e) 和 complete() 
 * 要给 Subject 提供新值，只要任意地方调用 next(theValue)，它会将值多播给已注册监听该 Subject 的观察者们
 * 多播 Observable 在底层是通过使用 Subject 使得多个观察者可以看见同一个 Observable 执行
 */

const subject = new Subject();
 
// 观察者
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

// 通知所有观察者执行
subject.next(1);
subject.next(2);
// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2

const observable = from([1, 2, 3]);
observable.subscribe(subject); // 因为 Subject 是观察者，可以提供一个 Subject 进行订阅， 还是多播
/**
 * 打印
observerA: 1
observerB: 1
observerA: 2
observerB: 2
observerA: 3
observerB: 3
 */

// ? 多播的 Observables
// multicast 操作符的工作原理：观察者订阅一个基础的 Subject，然后 Subject 订阅源 Observable
const source = from([1, 2, 3]);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
 
// These are, under the hood, `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
multicasted.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
// This is, under the hood, `source.subscribe(subject)`:
multicasted.connect();

/**
 * 一个略微复杂示例
 *  
 * */ 
const source = interval(500); // 间隔500一次调用
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
let subscription1, subscription2, subscriptionConnect;
 
subscription1 = multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
// 显示调用connect, 保证 subscription1订阅者可以获取消费值
subscriptionConnect = multicasted.connect();
 
setTimeout(() => {
  // 加入第二个订阅者
  subscription2 = multicasted.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
}, 600);
 
setTimeout(() => {
  // 第一个订阅者取消订阅
  subscription1.unsubscribe();
}, 1200);
 
// 这里我们应该取消共享的 Observable 执行的订阅，
// 因为此后 `multicasted` 将不再有订阅者 
setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe(); // for the shared Observable execution
}, 2000);

/**
 * 上面示例使用 refCount 自动判断订阅者数量进行自动启动执行，而当最后一个订阅者离开时，多播 Observable 会自动地停止执行
 * refCount() 只存在于 ConnectableObservable，它返回的是 Observable，而不是另一个 ConnectableObservable 
 */
const source = interval(500);
const subject = new Subject();
const refCounted = source.pipe(multicast(subject), refCount());
let subscription1, subscription2;
 
// 自动执行 This calls `connect()`, because
// it is the first subscriber to `refCounted`
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
 
setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
}, 600);
 
setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);
 
// 这里共享的 Observable 执行会停止，
// 因为此后 `refCounted` 将不再有订阅者
setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);
 
// Logs
// observerA subscribed
// observerA: 0
// observerB subscribed
// observerA: 1
// observerB: 1
// observerA unsubscribed
// observerB: 2
// observerB unsubscribed

/**
 * ! BehaviorSubject
 * Subject 的其中一个变体就是 BehaviorSubject，它有一个“当前值”的概念。它保存了发送给消费者的最新值。并且当有新的观察者订阅时，会立即从 BehaviorSubject 那接收到“当前值”。
 * BehaviorSubjects 适合用来表示“随时间推移的值”。举例来说，生日的流是一个 Subject，但年龄的流应该是一个 BehaviorSubject
 */

const subject = new BehaviorSubject(0); // 0 is the initial value
 
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
 
subject.next(1);
subject.next(2);

// 立即接受当前值
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
subject.next(3);
 
// Logs
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3

/**
 * ! ReplaySubject
 *  类似于 BehaviorSubject，它可以发送旧值给新的订阅者，但它还可以记录 Observable 执行的一部分
 *  ReplaySubject 记录 Observable 执行中的多个值并将其回放给新的订阅者, 可以指定回放多少个值
 */

const subject = new ReplaySubject(3); // 为新的订阅者缓冲3个值
 
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
 
subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);
 
// 立即回放缓存值
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
subject.next(5);
 
// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5

// 定义多少时间内的缓存数据数量
const subjectTime = new ReplaySubject(100, 500 /* windowTime  ms */);
 
subjectTime.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
 
let i = 1;
setInterval(() => subjectTime.next(i++), 200);
 
setTimeout(() => {
  subjectTime.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
}, 1000);
 
// Logs
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerA: 5
// observerB: 3
// observerB: 4
// observerB: 5
// observerA: 6
// observerB: 6
// ...

/**
 * ! AsyncSubject
 * AsyncSubject 是另一个 Subject 变体，只有当 Observable 执行完成时(执行 complete())，它才会将执行的最后一个值发送给观察者
 */
const asyncSubject = new AsyncSubject();
 
asyncSubject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
 
asyncSubject.next(1);
asyncSubject.next(2);
asyncSubject.next(3);
asyncSubject.next(4);
 
asyncSubject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
 
asyncSubject.next(5);
asyncSubject.complete();
 
// Logs:
// observerA: 5
// observerB: 5
