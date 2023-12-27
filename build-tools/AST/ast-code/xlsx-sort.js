const fs = require('fs')
const { resolve } = require('path')
const nodeXlsx = require('node-xlsx').default

const OUTPUT1_CODE = resolve(process.cwd(), './json/xlsx-1220.json')
const OUTPUT2_CODE = resolve(process.cwd(), './json/xlsx-1227.json')
const INPUT1_XLSX = resolve(process.cwd(), './demo/web-bdfp-map_1220.xlsx')
const INPUT2_XLSX = resolve(process.cwd(), './demo/web-bdfp-map_1227.xlsx')
const OUTPUT_FOLDER = resolve(process.cwd(), './output')
const CONSOLE_JSON = resolve(process.cwd(), './json')

function createFile (filename, code) {
  fs.writeFileSync(`${OUTPUT_FOLDER}/${filename}.xlsx`, code, 'utf-8')
}

function consoleJson (filename, res, type) {
  fs.writeFileSync(`${CONSOLE_JSON}/${filename}.${type || 'txt'}`, JSON.stringify(res, null, 2), 'utf-8')
}

const sheetData1 = nodeXlsx.parse(INPUT1_XLSX)
const sheetData2 = nodeXlsx.parse(INPUT2_XLSX)
consoleJson('xlsx-1220', JSON.parse(JSON.stringify(sheetData1)), 'json')
consoleJson('xlsx-1227', JSON.parse(JSON.stringify(sheetData2)), 'json')

const jsonCode1 = fs.readFileSync(`${OUTPUT1_CODE}`, 'utf-8')
const jsonCode2 = fs.readFileSync(`${OUTPUT2_CODE}`, 'utf-8')

const xlsxData1 = jsonCode1 ? JSON.parse(jsonCode1) : []
const xlsxData2 = jsonCode1 ? JSON.parse(jsonCode2) : []

const nsheetData = xlsxData1.map((item, index) => {
  const name = item.name;
  const keys = item.data[0];
  const sheets = item.data.slice(1);
  const displayNameIndex = keys.indexOf('displayName');
  const sheetsDisplayName = sheets.map((col) => col[displayNameIndex]);

  const currentSheet = xlsxData2.find((sheet) => sheet.name === name);

  if (!currentSheet) {
    return item;
  }

  const currentKeys = currentSheet.data[0];
  const currentSheets = currentSheet.data.slice(1);
  const currentDisplayNameIndex = currentKeys.indexOf('displayName');
  const currentCnIndex = currentKeys.indexOf('zh_CN');
  const currentEnIndex = currentKeys.indexOf('en_US');
  const currentTwIndex = currentKeys.indexOf('zh_TW');
  const currentSheetsObj = {};
  currentSheets.forEach((col) => {
    currentSheetsObj[col[currentDisplayNameIndex]] = {
      zh_CN: col[currentCnIndex],
      en_US: col[currentEnIndex],
      zh_TW: col[currentTwIndex],
    };
  });

  const result = sheetsDisplayName.map((displayName) => {
    return [
      displayName,
      currentSheetsObj[displayName] ? currentSheetsObj[displayName].zh_CN : '',
      currentSheetsObj[displayName] ? currentSheetsObj[displayName].en_US : '',
      currentSheetsObj[displayName] ? currentSheetsObj[displayName].zh_TW : '',
    ];
  });

  return {
    name,
    data: [["displayName", "zh_CN", "en_US", "zh_TW"], ...result],
  };
})

const buffer = nodeXlsx.build(nsheetData, {sheetOptions: {'!cols': [{wch: 20}, {wch: 30}]}});
createFile('web-bdfp-map_last', buffer)