import blueimpMd5 from 'blueimp-md5';

const md5Str = (str) => {
  return blueimpMd5(str);
}

console.log(md5Str('main/resources/bdfp-localify/src/main.js_网络异常，请稍后再试!'));
