import { Observable, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';
/**
 * scheduler 调度器
 * 调度器控制着何时启动 subscription 和何时发送通知
调度器是一种数据结构。 它知道如何根据优先级或其他标准来存储任务和将任务进行排序。
调度器是执行上下文。 它表示在何时何地执行任务(举例来说，立即的，或另一种回调函数机制(比如 setTimeout 或 process.nextTick)，或动画帧)。
调度器有一个(虚拟的)时钟。 调度器功能通过它的 getter 方法 now() 提供了“时间”的概念。在具体调度器上安排的任务将严格遵循该时钟所表示的时间
调度器可以让你规定 Observable 在什么样的执行上下文中发送通知给它的观察者

@link https://rxjs.dev/guide/scheduler#scheduler-types 调度类型
 */

// 同步地发出值1、2、3，并使用操作符 observeOn 来指定 async 调度器发送这些值
const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}).pipe(
  observeOn(asyncScheduler) 
  /**
   * 转变observer
   * const observer = {
      next(val) {
        asyncScheduler.schedule(
          (x) => finalObserver.next(x),
          0, // delay
          val, // will be the x for the function above 
        );
      },
      // ...
    }
   */
);
 
console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x)
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
     console.log('done');
  }
});
console.log('just after subscribe');

/**
 * 打印
just before subscribe
just after subscribe
got value 1
got value 2
got value 3
done
 */