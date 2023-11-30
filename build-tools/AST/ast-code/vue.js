const fs = require('fs')
const { resolve } = require('path')
const { parse } = require('@vue/compiler-sfc')

const INPUT_CODE = resolve(process.cwd(), './demo/test.vue')
const OUTPUT_FOLDER = resolve(process.cwd(), './output')
const CONSOLE_JSON = resolve(process.cwd(), './json')

const code = fs.readFileSync(`${INPUT_CODE}`, 'utf-8')
const ast = parse(code)

function createFile (filename, code) {
  fs.writeFileSync(`${OUTPUT_FOLDER}/${filename}.vue`, code, 'utf-8')
}

function consoleJson (filename, res, type) {
  fs.writeFileSync(`${CONSOLE_JSON}/${filename}.${type || 'txt'}`, JSON.stringify(res, null, 2), 'utf-8')
}

function generateSfc(descriptor) {
  let result = '';
  const {
    template, script, scriptSetup, styles, customBlocks
  } = descriptor;
  [template, script, scriptSetup, styles?.[0], customBlocks?.[0]].forEach(
    (block) => {
      if (block?.type) result += `<${block.type}${Object.entries(block.attrs).reduce(
          (attrCode, [attrName, attrValue]) => {
            if (attrValue === true) attrCode += ` ${attrName}`;
            else attrCode += ` ${attrName}="${attrValue}"`;

            return attrCode;
          },
          ' '
        )}>${block.content}</${block.type}>\n`;
    }
  );
  consoleJson('vue-res', result, 'json');
  return result;
}

consoleJson('vue-parse', ast, 'json');

// 输出新的文件，false删除注释
createFile('test', generateSfc(ast.descriptor))