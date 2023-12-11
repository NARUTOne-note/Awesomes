import xlsx from 'xlsx';

let arrayData = [
  ['name', 'age'],
  ['zhangsan', 20],
  ['lisi', 21],
  ['wangwu', 22],
  ['zhaoliu', 23],
  ['sunqi', 24],
];

let jsonData = [{
  name: "zhangsan1",
  age: 30
}, {
  name: "lisi1",
  age: 31
}, {
  name: "wangwu1",
  age: 32
}, {
  name: "zhaoliu1",
  age: 33
}, {
  name: "sunqi1",
  age: 34,
  length: "hello"
}];

// 将数据转成workSheet
let jsonWorkSheet = xlsx.utils.json_to_sheet(jsonData);
// console.log(arrayWorkSheet);
// console.log(jsonWorkSheet);
// 构造workBook
let workBook = {
  SheetNames: ['jsonWorkSheet'],
  Sheets: {
    'jsonWorkSheet': jsonWorkSheet,
  }
};
// 将workBook写入文件
xlsx.writeFile(workBook, "./aa.xlsx");


// 读取
let workbook = xlsx.readFile('./aa.xlsx');
let sheetNames = workbook.SheetNames;
// 获取第一个workSheet
let sheet1 = workbook.Sheets[sheetNames[0]];
// console.log(sheet1);

let range = xlsx.utils.decode_range(sheet1['!ref']);

//循环获取单元格值
for (let R = range.s.r; R <= range.e.r; ++R) {
  let row_value = '';
  for (let C = range.s.c; C <= range.e.c; ++C) {
    let cell_address = {c: C, r: R}; //获取单元格地址
    let cell = xlsx.utils.encode_cell(cell_address); //根据单元格地址获取单元格
    //获取单元格值
    if (sheet1[cell]) {
      // 如果出现乱码可以使用iconv-lite进行转码
      // row_value += iconv.decode(sheet1[cell].v, 'gbk') + ", ";
      row_value += sheet1[cell].v + ", ";
    } else {
      row_value += ", ";
    }
  }
  console.log(row_value);
}
