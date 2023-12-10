/* 0 */
import _ from "lodash";

// 1 
let tips = ["Click on any AST node with a '+' to expand it", "Hovering over a node highlights the \
   corresponding location in the source code", "Shift click on an AST node to expand the whole subtree"];
// 2 
function printTips(s) {
  // 3 
  tips.forEach((tip, i) => console.log(`Tip ${i}:` + tip, s)); // 4 
}

// @i18n-ignore
printTips("参数");

// 6 
const sv = 123;
const stp = `前缀${sv}
后缀${sv + 10}最后234`;