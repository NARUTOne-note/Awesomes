/**
 * 把 == 改为全等 ===
 */
/**
 * @example before.js
function fun1(opt) {
  if (opt.status == 1) {
      console.log('1');
  }
}
function fun2(age) {
  if (parseInt(age) >= 18) {
      console.log('2');
  }
}
*/


const esprima = require('esprima');//JS语法树模块
const estraverse = require('estraverse');//JS语法树遍历各节点
const escodegen = require('escodegen');//JS语法树反编译模块
const fs = require('fs');//读写文件

const before = fs.readFileSync('./before.js', 'utf8');
const ast = esprima.parseScript(before);

estraverse.traverse(ast, {
  enter: (node) => {
    toEqual(node);//把 == 改为全等 ===
    setParseInt(node); //把 parseInt(a) 改为 parseInt(a,10)
  }
});

function toEqual(node) {
  if (node.operator === '==') { // 获取操作符
    node.operator = '===';
  }
}

function setParseInt(node) {
  //判断节点类型，方法名称，方法的参数的数量，数量为1就增加第二个参数
  if (node.type === 'CallExpression' && node.callee.name === 'parseInt' && node.arguments.length === 1) {
    node.arguments.push({//增加参数，其实就是数组操作
      "type": "Literal",
      "value": 10,
      "raw": "10"
    });
  }
}

//生成目标代码
const code = escodegen.generate(ast);

//写入文件
fs.existsSync('./after.js') && fs.unlinkSync('./after.js');
fs.writeFileSync('./after.js', code, 'utf8');
