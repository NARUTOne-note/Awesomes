const fs = require('fs')
const { resolve } = require('path')
const { Buffer } =  require('buffer')
const nodeXlsx = require('node-xlsx').default
const iconv = require('iconv-lite');
const XLSX = require('xlsx');
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
// 读取Excel文件  
const workbook = XLSX.readFile(INPUT_XLSX, { encoding: 'utf8' });
// 获取第一个工作表  
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
// 解析工作表内容为JSON对象数组  
const data = XLSX.utils.sheet_to_json(worksheet);
// 将乱码数据转换为 UTF-8 编码 
let utf8Data = [];
data.forEach(item => {
  let temp = {};
  for (let key in item) {
    // console.log(key, item[key])
    const ck = iconv.decode(key, 'utf8');
    const cv = item[key] ? iconv.decode(item[key] + '', 'utf8') : ''
    temp[ck] = cv;
  }
  utf8Data.push(temp);
})

consoleJson('xlsx-parse-2', utf8Data, 'json')
consoleJson('xlsx-parse', JSON.parse(iconv.decode(JSON.stringify(sheetData), 'utf8')), 'json')
consoleJson('xlsx-json', JSON.parse(jsonCode), 'json')