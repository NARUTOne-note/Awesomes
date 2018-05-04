/**
 * Vue 学习
 */

/** 数据方法  **/

// 我们的数据对象
var data = { a: 1 }
// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})
// 他们引用相同的对象！
vm.a === data.a // => true
// 设置属性也会影响到原始数据
vm.a = 2
data.a // => 2
// ... 反之亦然
data.a = 3
vm.a // => 3


// Vue 暴露的属性方法 前缀$，区分

var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // => true
vm.$el === document.getElementById('example') // => true
// $watch 是一个实例方法， 监听事件
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})


/**
 * 生命周期  beforeCreate ——》 created ——》beforeMount ——》mounted ——》beforeUpdate ——》 updated
 * ——》beforeDestory ——》 destoryed
 */

new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"

// v-once 该节点一次性插值，不再变化更新

// <span v-once>这个将不会改变: {{ msg }}</span>