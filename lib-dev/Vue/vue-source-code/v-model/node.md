# Vue 双向数据绑定

> ⏳ 模拟类 v-model双向数据绑定

[Vue实现极简双向绑定[详细注释]](https://segmentfault.com/a/1190000015375217)

## mvvm

- 实现数据监听器Observer，用```Object.defineProperty()```**重写数据的get、set，值更新就在set中通知订阅者更新数据**
- 实现模板编译Compile，深度遍历dom树，对每个元素节点的指令模板进行: **替换数据以及订阅数据**
- **实现Watch用于连接Observer和Compile**，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
- mvvm整合


![mvvm-vue](https://raw.githubusercontent.com/NARUTOne/resources-github/master/imgs/vue/mvvm.jpg)