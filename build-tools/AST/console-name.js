/**
 * console.log("name", xxx)
 * @example
// 源代码
function getData() {
  console.log("data")
}

// --------------------

// 转化后代码
function getData() {
  console.log("getData", "data");
}
 */

/**
 * function getData() {
    console.log("data")
  }
 * @return AST
{
  "type": "CallExpression",
  "start": 24,
  "end": 43,
  "loc": {
    "start": { "line": 3, "column": 2 },
    "end": { "line": 3, "column": 21 }
  },
  "callee": {
    "type": "MemberExpression",
    "start": 24,
    "end": 35,
    "loc": {
      "start": { "line": 3, "column": 2 },
      "end": { "line": 3, "column": 13 }
    },
    "object": {
      "type": "Identifier",
      "start": 24,
      "end": 31,
      "loc": {
        "start": { "line": 3, "column": 2 },
        "end": { "line": 3, "column": 9 },
        "identifierName": "console"
      },
      "name": "console"
    },
    "property": {
      "type": "Identifier",
      "start": 32,
      "end": 35,
      "loc": {
        "start": { "line": 3, "column": 10 },
        "end": { "line": 3, "column": 13 },
        "identifierName": "log"
      },
      "name": "log"
    },
    "computed": false
  },
  "arguments": [
    {
      "type": "StringLiteral",
      "start": 36,
      "end": 42,
      "loc": {
        "start": { "line": 3, "column": 14 },
        "end": { "line": 3, "column": 20 }
      },
      "extra": { "rawValue": "data", "raw": "'data'" },
      "value": "data"
    }
  ]
}
 */

const generator = require("@babel/generator"); // AST 抽象语法树 ------->>> 新的 js 代码；
const parser = require("@babel/parser"); // 将 js 代码 ------->>> AST 抽象语法树；
const traverse = require("@babel/traverse"); // 对 AST 节点进行递归遍历；
const types = require("@babel/types"); // 对具体的 AST 节点进行进行修改；

function compile(code) {
  // 1.parse 将代码解析为抽象语法树（AST）
  const ast = parser.parse(code);

  // 2,traverse 转换代码
  const visitor = {
    CallExpression(path) {
      // 拿到 callee 数据
      const { callee } = path.node;
      // 判断是否是调用了 console.log 方法
      // 1. 判断是否是成员表达式节点，上面截图有详细介绍
      // 2. 判断是否是 console 对象
      // 3. 判断对象的属性是否是 log
      const isConsoleLog =
        types.isMemberExpression(callee) &&
        callee.object.name === "console" &&
        callee.property.name === "log";
      if (isConsoleLog) {
        // 如果是 console.log 的调用 找到上一个父节点是函数
        const funcPath = path.findParent(p => {
          return p.isFunctionDeclaration();
        });
        // 取函数的名称
        const funcName = funcPath.node.id.name;
        // 将名称通过 types 来放到函数的参数前面去
        path.node.arguments.unshift(types.stringLiteral(funcName));
      }
    }
  };
  // traverse 转换代码
  traverse.default(ast, visitor);

  // 3. generator 将 AST 转回成代码
  return generator.default(ast, {}, code);
}

const code = `
function getData() {
  console.log("data")
}
`;
const newCode = compile(code)
