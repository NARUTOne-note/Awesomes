import { Observable } from 'rxjs';

/**
 * 观察者是由 Observable 发送的值的消费者。观察者只是一组回调函数的集合，每个回调函数对应一种 Observable 发送的通知类型：next、error 和 complete
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

// 观察者
const observer = {
  next(x) { console.log('got value ' + x); }, // "Next" 通知： 发送一个值，比如数字、字符串、对象，等等
  error(err) { console.error('something wrong occurred: ' + err); }, // "Error" 通知： 发送一个 JavaScript 错误 或 异常。
  complete() { console.log('done'); } // "Complete" 通知： 不再发送任何值。
};

console.log('just before subscribe');
observable.subscribe(observer);
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

// 不监听complete回调函数的观察者
var observer2 = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
};
observable.subscribe(observer2);

// 只提供回调函数模式
observable.subscribe(x => console.log('Observer got a next value: ' + x));
// => 内部处理成 next 通知，类似下面的形式
/**
 * observable.subscribe(
    x => console.log('Observer got a next value: ' + x),
    err => console.error('Observer got an error: ' + err),
    () => console.log('Observer got a complete notification')
  );
 */