import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

import { version } from './package.json'
console.log('\n 📦  - running rollup..\n')

const banner = '/* simple-json-patch ' + version + ' MIT */'

export default [
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/simple-json-patch.mjs', format: 'esm' }],
    plugins: [resolve(), commonjs(), terser()],
  },
  {
    input: 'src/index.js',
    output: [
      { banner: banner, file: 'builds/simple-json-patch.js', format: 'umd', sourcemap: false, name: 'simpleJsonPatch' },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
    ],
  },
  {
    input: 'src/index.js',
    output: [{ file: 'builds/simple-json-patch.min.js', format: 'umd', name: 'simpleJsonPatch' }],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      terser(),
    ],
  },
  // seperate json-pointer get library
  {
    input: 'src/get.js',
    output: [
      { banner: banner, file: 'builds/json-pointer-get.js', format: 'umd', sourcemap: false, name: 'jsonPointerGet' },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
      }),
      terser(),
    ],
  },
]
