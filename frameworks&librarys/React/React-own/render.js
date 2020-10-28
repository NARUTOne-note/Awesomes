/**
 * render
 * ReactDOM.render(element, container)
 */

function render(element, container) {
  const dom = element.type == "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(element.type);

  // 添加属性
  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

  // 子级节点render
  element.props.children.forEach(child =>
    render(child, dom)
  );
​
  container.appendChild(dom);
}
