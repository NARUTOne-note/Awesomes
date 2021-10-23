/**
 * Hello RxJS
 */

import { fromEvent } from 'rxjs';
import { throttleTime, map, scan } from 'rxjs/operators'; // 操作符

const appEle = document.getElementById('app');

// 监听click
fromEvent(appEle, 'click')
  .pipe( // 管道执行，注意顺序
    throttleTime(1000), // 节流 1s执行一次
    map(event => event.clientX), // 返回产生的值 clientX
    scan((count, clientX) => count + clientX, 0) // 类似reduce
  ) 
  .subscribe(() => console.log(`Clicked ${count} times`));
