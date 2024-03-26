/* eslint-disable import/no-anonymous-default-export */
import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

export default {
    input: "src/index.js",
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'esm' }
    ],
    plugins: [
        external(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled' 
        }),
        del({ targets: ['dist/*'] }),
        typescript({
          exclude: ["**/*.test.ts", "**/*.test.tsx"],
        }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};

// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import typescript from '@rollup/plugin-typescript';

// const config = {
//   input: "src/index.js",
//   output: {
//     file: "dist/index.esm.js",
//     format: "esm",
//   },
//   external: [/@babel\/runtime/, "react", "react-dom"],
// //   plugins: [
// //     babel({
// //       babelHelpers: "runtime",
// //       plugins: ["@babel/plugin-transform-runtime"],
// //     }),
// //   ],
//   plugins: [nodeResolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
// };

// export default config;