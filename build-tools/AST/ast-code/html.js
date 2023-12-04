const fs = require('fs')
const { resolve } = require('path')
const { Parser, DomHandler, parseDocument } = require('htmlparser2')
const { parser } = require('posthtml-parser')

const INPUT_CODE = resolve(process.cwd(), './demo/test.html')
const OUTPUT_FOLDER = resolve(process.cwd(), './output')
const CONSOLE_JSON = resolve(process.cwd(), './json')

const code = fs.readFileSync(`${INPUT_CODE}`, 'utf-8')

function getTree(data) {
  return new Promise((resolve) => {
    var handler = new DomHandler(function (error, tree) {
      resolve(tree)
    });
    
    var cparser = new Parser(handler);
    cparser.parseComplete(data);
  })
}

function updateTestContent (ast) {
  return ast.map(a => {
    if (a.tag) {
      if (a.tag === 'p') {
        a.content = [
          "\n",
          {
            tag: 'span',
            content: [
              "测试内容",
              "\n",
              {
                tag: 'span',
                content: 'hello world'
              }
            ]
          }
        ]
      } else if (Array.isArray(a.content)) {
        a.content = updateTestContent(a.content)
      }
    }
    return a;
  });
}

function generateHtml(ast) {
  return ast.map(a => {
    if (a.tag) {
      if (Array.isArray(a.content)) {
        a.content = generateHtml(a.content)
      }
      const atts = a.attrs ? Object.keys(a.attrs).map(key => `${key}="${a.attrs[key]}"`).join(' ') : ''
      return `<${a.tag} ${atts}>${typeof a.content === 'string' ? a.content : a.content?.join('')}</${a.tag}>`
    }
    return a;
  }).join('')
}

function createFile (filename, code) {
  fs.writeFileSync(`${OUTPUT_FOLDER}/${filename}.html`, code, 'utf-8')
}

function consoleJson (filename, res, type) {
  fs.writeFileSync(`${CONSOLE_JSON}/${filename}.${type || 'txt'}`, res, 'utf-8')
}

const htmlAst = parseDocument(code);
console.log(htmlAst)
getTree(code).then((ast) => {
  console.log(ast)
})

const parserCode = parser(code);
consoleJson('html', JSON.stringify(parserCode, null, 2), 'json')
const updateCode = updateTestContent(parserCode);
createFile('test', generateHtml(updateCode))