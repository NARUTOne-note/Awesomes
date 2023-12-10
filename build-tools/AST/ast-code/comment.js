const fs = require('fs')
const { resolve } = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')

const INPUT_CODE = resolve(process.cwd(), './demo/comment.js')
const OUTPUT_FOLDER = resolve(process.cwd(), './output')
const CONSOLE_JSON = resolve(process.cwd(), './json')

const code = fs.readFileSync(`${INPUT_CODE}`, 'utf-8')
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
})

function createFile (filename, code) {
  fs.writeFileSync(`${OUTPUT_FOLDER}/${filename}.js`, code, 'utf-8')
}

function consoleJson (filename, res, type) {
  fs.writeFileSync(`${CONSOLE_JSON}/${filename}.${type || 'txt'}`, JSON.stringify(res, null, 2), 'utf-8')
}

consoleJson('comment-parse', ast, 'json');

const comments = [];
ast.comments.forEach((comment, i) => {
  comments.push({comment: comment.value, start: comment.start, end: comment.end})
  if (comment.value.indexOf('@i18n-ignore') < 0) {
    comment.value = ` ${i} `
  }
})

consoleJson('ast-comments', comments, 'json');

// 输出新的文件，false删除注释
createFile('comment', generator(ast, {comments: true}).code)