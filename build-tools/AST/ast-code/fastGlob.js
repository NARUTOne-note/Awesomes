const glob = require('fast-glob');

const cwd = process.cwd();
const res = glob.globSync('demo/**/*.{js,vue}', {
  cwd,
  absolute: false,
  onlyFiles: true,
  dot: true,
  ignore: []
});
console.log(cwd, res);