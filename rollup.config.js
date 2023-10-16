
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/main.tsx',
    output: {
        file: 'public/bundle.js',
        format: 'cjs'
    },
    plugins: [typescript()]
};
