# JSX

> JSX作为描述组件内容的数据结构，为JS赋予了更多视觉表现力。React赋予了它更多功能，大量使用它。

❓ 疑问

- JSX和Fiber节点是同一个东西么？
- React Component、React Element是同一个东西么，他们和JSX有什么关系？

## 简介

> [官网介绍](https://zh-hans.reactjs.org/docs/introducing-jsx.html)

这个**有趣的标签语法既不是字符串也不是 HTML**。

它被称为 JSX，**是一个 JavaScript 的语法扩展**。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。

JSX在编译时会被Babel编译为React.createElement方法。

这也是为什么在每个使用JSX的JS文件中，你必须显式的声明 `import React from 'react';`。

- 嵌入 表达式、组件、文本等
- 本身也是个表达式
- 特定属性插入
- 指定子元素
- 防止注入攻击：进行转义
- 表示对象

## React Component、React Element是同一个东西么，他们和JSX有什么关系

- React.createElement 最终会调用ReactElement方法返回一个包含组件数据的对象，该对象有个参数$$typeof: REACT_ELEMENT_TYPE标记了该对象是个React Element

```js
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
```

`$$typeof === REACT_ELEMENT_TYPE`的非null对象就是一个合法的React Element。换言之，在React中，所有JSX在运行时的返回结果（即React.createElement()的返回值）都是React Element。

- React Component = ClassComponent + FunctionComponent

由于

```js
AppClass instanceof Function === true;
AppFunc instanceof Function === true;
```

所以无法通过引用类型区分ClassComponent和FunctionComponent。React通过ClassComponent实例原型上的`isReactComponent`变量判断是否是ClassComponent。
`ClassComponent.prototype.isReactComponent = {};`

## JSX与Fiber节点

从上面的内容我们可以发现，JSX是一种描述当前组件内容的数据结构，他不包含组件schedule、reconcile、render所需的相关信息。

比如如下信息就不包括在JSX中：

组件在更新中的优先级
组件的state
组件被打上的用于Renderer的标记
这些内容都包含在Fiber节点中。

所以，在组件mount时，Reconciler根据JSX描述的组件内容生成组件对应的Fiber节点。

在update时，Reconciler将JSX与Fiber节点保存的数据对比，生成组件对应的Fiber节点，并根据对比结果为Fiber节点打上标记。
