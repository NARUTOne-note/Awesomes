# MVVM

[mvvc-vue](https://zhuanlan.zhihu.com/p/38296857)

## Model

- 1.现实世界中对事物的抽象结果，就是建模。
- 2.我们可以把Model称为数据层，因为它仅仅关注数据本身，不关心任何行为

## View

- 1.用户操作界面
- 2.当ViewModel对Model进行更新的时候，会通过数据绑定更新到View

## ViewModel

- 1.业务逻辑层，View需要什么数据，ViewModel要提供这个数据；View有某些操作，ViewModel就要响应这些操作，所以可以说它是Model for View.
- 2.MVVM模式的重点就在View和ViewModel的交互，View和ViewModel有两种交互方式：
双向传递数据--数据属性和data binding， 单向传递操作--命令属性。
- 3.由于ViewModel中的双向数据绑定，当Model发生变化，ViewModel就会自动更新；ViewModel变化，Model也会更新
