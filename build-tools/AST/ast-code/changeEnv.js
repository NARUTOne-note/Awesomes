const fs = require('fs')
const { resolve } = require('path')

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const ct = require('@babel/types')

const INPUT_CODE = resolve(__dirname, './demo/env.js')
const OUTPUT_FOLDER = resolve(__dirname, './output')

const code = fs.readFileSync(`${INPUT_CODE}`, 'utf-8')
const ast = parser.parse(code, {
  sourceType: 'module'
})

const envis =  process.argv.slice(2)[0] || 'prod';
const envOrigin = {
  'test': ['http://workbench.modelhub.100credit.cn', 'http://modelhub-test.100credit.cn'],
  'pre': ['http://workbench-modelhub-pre.100credit.cn', 'http://modelhub-pre.100credit.cn'],
  'prod': ['http://workbench-modelhub.100credit.cn', 'http://modelhub.100credit.cn'],
}

console.log(envOrigin[envis])

function createFile (filename, code) {
  fs.writeFileSync(`${OUTPUT_FOLDER}/${filename}.js`, code, 'utf-8')
}

// 转换
traverse(ast, {
  VariableDeclarator ({node}) {
    if (node.id.type === 'Identifier') {
      const {name} = node.id;
      if (name === 'iframeOrigin') {
        const v1 = ct.stringLiteral(envOrigin[envis][0]);
        const v2 = ct.stringLiteral(envOrigin[envis][1]);
        const arrayExpre = ct.arrayExpression([v1, v2]);
        node.init = arrayExpre;
      }
    }
  }
});

// 输出新的文件
createFile('es6code', generator(ast).code)

