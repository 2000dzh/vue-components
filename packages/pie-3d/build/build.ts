import path from 'node:path';
import { rollup } from 'rollup';
import vuePlugin from 'rollup-plugin-vue';
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { pathPie, pathPieOutput } from 'dl-utils';
import { emptyDir } from 'fs-extra';

(async () => {
  const buildFullEntry = async (minify: boolean) => {
    const bundle = await rollup({
      input: path.resolve(pathPie, './src/index.js'),
      external: ['vue'],
      plugins: [
        postcss({
          extensions: ['.css'],
        }),
        vuePlugin(),
        // 帮助 Rollup 解析 node_modules 中的模块
        nodeResolve({
          extensions: ['.mjs', '.js', '.json', '.vue'],
          preferBuiltins: true,
        }),
        commonjs(),
        // 使用 esbuild 执行代码转换和压缩
        esbuild({
          sourceMap: true,
          target: 'es2018',
          loaders: {
            '.vue': 'ts',
          },
          treeShaking: true,
        }),

        minify
          ? minifyPlugin({
            target: 'es2018',
            sourceMap: true,
          })
          : null,
      ],
    });

    await Promise.all([
      bundle.write({
        format: 'esm',
        file: path.resolve(
          pathPieOutput,
          `index${minify ? '.min' : ''}.js`
        ),
        sourcemap: minify,
      }),
      bundle.write({
        format: 'umd',
        file: path.resolve(
          pathPieOutput,
          `index-umd${minify ? '.min' : ''}.js`
        ),
        name: 'TxPie3d',
        globals: {
          vue: 'Vue',
          'element-ui': 'ElementUI',
        },
        sourcemap: minify,
      }),
    ]);
  };

  // 删除 dist 目录中的所有文件和子目录，但保留目录本身
  await emptyDir(pathPieOutput);
  await Promise.all([buildFullEntry(true), buildFullEntry(false)]);
})();
