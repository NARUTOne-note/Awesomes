const fs = require('fs')
const { resolve } = require('path')
const { Buffer } =  require('buffer')
const nodeXlsx = require('node-xlsx').default
const iconv = require('iconv-lite');
iconv.skipDecodeWarning = true;

const INPUT_CODE = resolve(process.cwd(), './demo/xlsx.json')
const INPUT_XLSX = resolve(process.cwd(), './demo/test.xlsx')
const OUTPUT_FOLDER = resolve(process.cwd(), './output')
const CONSOLE_JSON = resolve(process.cwd(), './json')

const jsonCode = fs.readFileSync(`${INPUT_CODE}`, 'utf-8')

function createFile (filename, code) {
  fs.writeFileSync(`${OUTPUT_FOLDER}/${filename}.xlsx`, code, 'utf-8')
}

function consoleJson (filename, res, type) {
  fs.writeFileSync(`${CONSOLE_JSON}/${filename}.${type || 'txt'}`, JSON.stringify(res, null, 2), 'utf-8')
}

let arrayData = [
  ['name', 'age'],
  ['zhangsan', 20],
  ['lisi', 21],
  ['wangwu', 22],
  ['zhaoliu', 23],
  ['sunqi', '山东高速搭嘎是否'],
];

const buffer = nodeXlsx.build([
  {
    name: 'sheet1',
    data: arrayData
  }
], {sheetOptions: {'!cols': [{wch: 20}, {wch: 30}]}});
createFile('xlsx-export', buffer)

const sheetData = nodeXlsx.parse(INPUT_XLSX)

consoleJson('xlsx-parse', JSON.parse(iconv.decode(JSON.stringify(sheetData), 'utf8')), 'json')
consoleJson('xlsx-json', JSON.parse(jsonCode), 'json')