import { interval } from 'rxjs';

/**
 * Subscription (订阅)
 * Subscription 基本上只有一个 unsubscribe() 函数，这个函数用来释放资源或去取消 Observable 执行
 */

const observable = interval(1000); // 生成一个间隔延时1s的观察对象
const subscription = observable.subscribe(x => console.log(x));
subscription.unsubscribe();

// 合并子订阅，取消
const observable1 = interval(400);
const observable2 = interval(300); 
const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
 
subscription.add(childSubscription); // 使用remove(childSubscription) 移除子订阅
setTimeout(() => {
  // subscription 和 childSubscription 都会取消订阅
  subscription.unsubscribe();
}, 1000);

/**
 * 打印
  second: 0
  first: 0
  second: 1
  first: 1
  second: 2
 */
