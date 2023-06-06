# Pinia

> 替代vuex，适配vue3的响应式状态库

## 核心步骤

- 创建 `store`：新建 `store` 目录并在其下面基于 `createPinia()` 创建 `index.ts`，导出 `store`；
- 定义 `state`：基于 `defineStore()` 定义 `state` 的数据结构；
- 读写 `state`：用好 `getter`，`setter`，`action` 三个方法
- 使用 `state`：可以用 `useStore()`或者 `computed()`的方式调用，默认对 `state` 解构会使其失去响应式，可以用 `storeToRefs` 进行优化处理；
