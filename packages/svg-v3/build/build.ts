import path from 'node:path';
import { copyFile } from 'node:fs/promises';
import { rollup } from 'rollup';
import vuePlugin from 'rollup-plugin-vue';
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild';
import { emptyDir } from 'fs-extra';
import { pathSvgV3, pathSvgOutputV3 } from 'dl-utils';

(async () => {
	const buildFullEntry = async (minify: boolean) => {
		const bundle = await rollup({
			input: path.resolve(pathSvgV3, './src/index.ts'),
			external: ['vue'],
			plugins: [
				vuePlugin(),
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
			]
		});

		await Promise.all([
			bundle.write({
				format: 'esm',
				file: path.resolve(
					pathSvgOutputV3,
					`index${minify ? '.min' : ''}.js`
				),
				sourcemap: minify,
			}),
			bundle.write({
				format: 'cjs',
				file: path.resolve(
					pathSvgOutputV3,
					`index${minify ? '.min' : ''}.cjs`
				),
				sourcemap: minify,
			}),
			bundle.write({
				format: 'iife',
				file: path.resolve(
					pathSvgOutputV3,
					`index.iife${minify ? '.min' : ''}.js`
				),
				sourcemap: minify,
        name: "DlElementIconsVue3",
        globals: {
          vue: 'Vue',
        }
			}),
		]);
	};

	// 删除 dist 目录中的所有文件和子目录，但保留目录本身
	await emptyDir(path.resolve(pathSvgV3, './dist'));
	await Promise.all([buildFullEntry(true), buildFullEntry(false)]);
	await Promise.all([
		copyFile(
			path.resolve(pathSvgV3, 'package.json'),
			path.resolve(pathSvgOutputV3, 'package.json')
		),
	]);
})();
