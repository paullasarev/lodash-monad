import typescript from '@rollup/plugin-typescript';
// import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import dts from "rollup-plugin-dts";

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/lodash-monad.esm.js',
        format: 'esm',
      },
      {
        file: 'dist/lodash-monad.esm.min.js',
        format: 'esm',
      }
    ],
    plugins: [
      typescript({
        // exclude: ['**/*.spec.ts'],
      }),
      terser({
        include: [/^.+\.min\.js$/],
      }),
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/lodash-monad.d.ts',
      format: 'es'
    },
    plugins: [dts({
      noEmitOnError: false,
    })],
  }
];
