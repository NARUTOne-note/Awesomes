import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/index.ts',
  output: [
    {
      name: 'demo',
      format: 'umd',
      file: 'dist/demo.js',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDom',
      },
    },
    {
      format: 'es',
      file: 'dist/demo-es.js',
    },
    {
      format: 'cjs',
      file: 'dist/demo-cjs.js',
    }
  ],
  external: ['react', 'react-dom', 'antd', '@ant-design/icons', 'classnames'],
  plugins: [
    typescript({ declaration: false }),
    resolve(),
    commonjs(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    terser(),
    filesize(),
    // autoExternal(),
    postcss({
      minimize: true,
      sourceMap: false,
      extensions: ['.less', '.css'],
      use: [['less', { javascriptEnabled: true }]],
      extract: 'demo.css'
    }),
  ],
};
