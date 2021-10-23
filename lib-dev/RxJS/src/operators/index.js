import { Observable, of, from, interval } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * 操作符 Operators
 * 操作符是允许复杂的异步代码以声明式的方式进行轻松组合的基础代码单元
 * 操作符是函数，它基于当前的 Observable 创建一个新的 Observable。这是一个无副作用的操作：前面的 Observable 保持不变
 * 操作符有着不同的用途，它们可作如下分类：创建、转换、过滤、组合、错误处理、工具，等等
 * @link https://rxjs.dev/guide/operators#categories-of-operators
 */

// 自定义操作符 multiplyByTen
// 订阅 output 会导致 input Observable 也被订阅。我们称之为“操作符订阅链”
function multiplyByTen(input) {
  var output = new Observable(subscriber => {
    input.subscribe({
      next: (v) => subscriber.next(10 * v),
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete()
    });
  });
  return output;
}

var input = from([1, 2, 3, 4]);
var output = multiplyByTen(input);
output.subscribe(x => console.log(x)); // 10 20 30 40


// ? 静态操作符
const fromObservable = from([1, 2, 3]);
const intervalObservable = interval(500);

// ? 实例操作符
// pipe: 例obs.pipe(op1(), op2(), op3(), op4()); => op4()(op3()(op2()(op1()(obs))))
fromObservable.pipe(map(x => x * 2)).subscribe((v) => console.log(`value: ${v}`));

// 自定义delay操作符
function delay(delayInMillis) {
  return (observable) =>
    new Observable((subscriber) => {
      // this function will be called each time this
      // Observable is subscribed to.
      const allTimerIDs = new Set();
      let hasCompleted = false;
      // 先执行
      const subscription = observable.subscribe({
        next(value) {
          // Start a timer to delay the next value
          // from being pushed.
          const timerID = setTimeout(() => {
            subscriber.next(value);
            // after we push the value, we need to clean up the timer timerID
            allTimerIDs.delete(timerID);
            // If the source has completed, and there are no more timers running,
            // we can complete the resulting observable.
            if (hasCompleted && allTimerIDs.size === 0) {
              subscriber.complete();
            }
          }, delayInMillis);
 
          allTimerIDs.add(timerID);
        },
        error(err) {
          // We need to make sure we're propagating our errors through.
          subscriber.error(err);
        },
        complete() {
          hasCompleted = true;
          // If we still have timers running, we don't want to yet.
          if (allTimerIDs.size === 0) {
            subscriber.complete();
          }
        },
      });
 
      // Return the teardown logic. This will be invoked when
      // the result errors, completes, or is unsubscribed.
      // 外界Observable 取消、错误、完成时执行
      return () => {
        subscription.unsubscribe();
        // Clean up our timers.
        for (const timerID of allTimerIDs) {
          clearTimeout(timerID);
        }
      };
    });
}
 
// Try it out!
of(1, 2, 3).pipe(delay(1000)).subscribe(console.log);