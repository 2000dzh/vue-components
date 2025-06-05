import path from 'node:path';
import { rollup } from 'rollup';
import vuePlugin from 'rollup-plugin-vue';
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { pathSelectV2, pathSelectOutputV2 } from 'dl-utils';
import { emptyDir } from 'fs-extra';

(async () => {
	const buildFullEntry = async (minify: boolean) => {
		const bundle = await rollup({
			input: path.resolve(pathSelectV2, './src/index.js'),
			external: ['vue', 'element-ui'],
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
					pathSelectOutputV2,
					`index${minify ? '.min' : ''}.js`
				),
				sourcemap: minify,
			}),
			bundle.write({
				format: 'umd',
				file: path.resolve(
					pathSelectOutputV2,
					`index-umd${minify ? '.min' : ''}.js`
				),
				name: 'ElSelectV2',
				globals: {
					vue: 'Vue',
					'element-ui': 'ElementUI',
				},
				sourcemap: minify,
			}),
		]);
	};

	// 删除 dist 目录中的所有文件和子目录，但保留目录本身
	await emptyDir(pathSelectOutputV2);
	await Promise.all([buildFullEntry(true), buildFullEntry(false)]);
})();
