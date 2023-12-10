/**
 * 顶部注释
 * 注释描述
 */
import _ from "lodash";

// 注释0
let tips = [
  "Click on any AST node with a '+' to expand it",

  "Hovering over a node highlights the \
   corresponding location in the source code",

  "Shift click on an AST node to expand the whole subtree"
];
// 注释1
function printTips(s) {
  // 注释2
  tips.forEach((tip, i) => console.log(`Tip ${i}:` + tip, s)); // 注释3
}

// @i18n-ignore
printTips("参数");

// 模版测试
const sv = 123;
const stp = `前缀${sv}
后缀${sv + 10}最后234`