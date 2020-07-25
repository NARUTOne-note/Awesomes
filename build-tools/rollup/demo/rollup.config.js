// rollup.config.js
import json from '@rollup/plugin-json'; // 处理json信息获取
import nodeResolve from '@rollup/plugin-node-resolve'; // 处理npm依赖
import commonjs from '@rollup/plugin-commonjs'; // 处理 CommonJS 转换成 ES2015 模块
import babel from '@rollup/plugin-babel'; // 配合babel, 处理新特性兼容

export default {
  input: 'src/main.js',
  output: [{
    file: 'lib/demo.js',
    format: 'cjs'
  }, {
    file: 'lib/demo.es.js',
    format: 'es'
  }],
  plugins: [ 
    json(),
    nodeResolve(),
    commonjs(),
    babel({ babelHelpers: 'runtime' })
  ],
  // 指出应将哪些模块视为外部模块
  // external: ['lodash']
  external: id => /lodash/.test(id), // 处理 `import _merge from 'lodash/merge';`
};