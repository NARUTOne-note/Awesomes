const fs = require('fs')
const { resolve } = require('path')

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')

const INPUT_CODE = resolve(__dirname, './demo/es5code.js')
const OUTPUT_FOLDER = resolve(__dirname, './output')

const code = fs.readFileSync(`${INPUT_CODE}`, 'utf-8')
const ast = parser.parse(code)

function createFile (filename, code) {
  fs.writeFileSync(`${OUTPUT_FOLDER}/${filename}.js`, code, 'utf-8')
}

function createImportDeclaration (funcName) {
  return t.importDeclaration([t.importDefaultSpecifier(t.identifier(funcName))], t.stringLiteral(`./${funcName}`))
}

traverse(ast, {
  AssignmentExpression ({ node }) {
    const { left, right } = node
    if (left.type === 'MemberExpression' && right.type === 'FunctionExpression') {
      const { object, property } = left
      if (object.property.name === 'prototype') {    
        // 获取左侧节点的方法名
        const funcName = property.name
        // 获取右侧节点对应的 JS 代码
        const { code: funcCode } = generator(right)
        // 右侧节点改为 Identifier
        const replacedNode = t.identifier(funcName)
        node.right = replacedNode
       
        // 借助 `fs.writeFileSync()` 把右侧节点的 JS 代码写入外部文件
        createFile(funcName, 'export default ' + funcCode)

        // 在文件头部引入抽离的文件
        ast.program.body.unshift(createImportDeclaration(funcName))
      }
    }
  }
})
