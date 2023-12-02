const fs = require('fs')
const { resolve } = require('path')
const { Parser, DomHandler, parseDocument } = require('htmlparser2')

const INPUT_CODE = resolve(process.cwd(), './demo/test.html')
const OUTPUT_FOLDER = resolve(process.cwd(), './output')
const CONSOLE_JSON = resolve(process.cwd(), './json')

const code = fs.readFileSync(`${INPUT_CODE}`, 'utf-8')

function getTree(data) {
  return new Promise((resolve) => {
    var handler = new DomHandler(function (error, tree) {
      resolve(tree)
    });
    
    var parser = new Parser(handler);
    parser.parseComplete(data);
  })
}

function createFile (filename, code) {
  fs.writeFileSync(`${OUTPUT_FOLDER}/${filename}.js`, code, 'utf-8')
}

function consoleJson (filename, res, type) {
  fs.writeFileSync(`${CONSOLE_JSON}/${filename}.${type || 'txt'}`, JSON.stringify(res, null, 2), 'utf-8')
}

const ast = parseDocument(code);
consoleJson('html', ast, 'json'); 
// getTree(code).then((ast) => {
//   consoleJson('html', ast, 'json'); 
// })