import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import postcss from 'rollup-plugin-postcss'

export default {
    input: 'src/index.tsx',
    output: [
        {
            file: 'public/bundle.js',
            name: 'app',
            sourcemap: 'inline',
            format: 'es',
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve({
            browser: true,
            dedupe: ['react', 'react-dom'],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true,
        }),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json',
            sourceMap: true,
            inlineSources: true,
        }),
        css({ output: 'dist/style.css' }),
        postcss({
            modules: true,
            extract: 'style.css'
        }),
    ],
};

/*
import typescript from '@rollup/plugin-typescript';
import nodeResolve from "@rollup/plugin-node-resolve";
import css from 'rollup-plugin-import-css';
export default {
    input: 'src/main.tsx',
    output: {
        file: 'public/bundle.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: [typescript(), nodeResolve({
        browser: true,
    }), css()]
};

// rollup.config.js

const postcss = require('rollup-plugin-postcss');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
    input: 'src/main.tsx',
    output: {
        file: 'public/bundle.js',
        format: 'iife',
        sourcemap: true,
        name: 'bundle',
    },
    plugins: [
        peerDepsExternal(),
        resolve(),
        typescript(),
        commonjs(),
        postcss({
            modules: true,
        }),
    ],
};
*/
