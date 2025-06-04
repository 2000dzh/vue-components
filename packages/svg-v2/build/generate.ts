import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { consola } from 'consola';
import chalk from 'chalk';
import { emptyDir, ensureDir } from 'fs-extra';
import glob from 'fast-glob';
import camelcase from 'camelcase';
import { format } from 'prettier';
import { pathSvgComV2, pathSvgFile } from 'dl-utils';
import type { BuiltInParserName } from 'prettier';

(async () => {
	consola.info(chalk.blue('generating svg-vue2 components'));
	// 创建 pathSvgComV2 目录及其所有必要的父目录
	await ensureDir(pathSvgComV2);
	// 删除 pathSvgComV2 目录中的所有文件和子目录，但保留目录本身
	await emptyDir(pathSvgComV2);
	// 查找 svg 目录及其子目录中所有扩展名为 .svg 的文件
	const files = await glob(['**/*.svg'], {
		cwd: pathSvgFile,
		absolute: true,

		ignore: [
			'svg-v3/**', // 排除 svg-v2 目录及其子目录中的所有文件
		],
	});

	consola.info(chalk.blue('generating svg-vue2 files'));
	await Promise.all(files.map(transformToVueComponent));

	generateEntry(files);

	function getFileName(filePath: string) {
		const filename = path.basename(filePath).replace('.svg', '');
		const componentName = camelcase(filename, { pascalCase: true });

		return {
			filename,
			componentName,
		};
	}

	function formatCode(
		code: string,
		parser: BuiltInParserName = 'typescript'
	) {
		return format(code, {
			parser,
			semi: false,
			singleQuote: true,
		});
	}

	async function transformToVueComponent(filePath: string) {
		const content = await readFile(filePath, 'utf-8');
		const { filename, componentName } = getFileName(filePath);
		const vue = await formatCode(
			`
<template>
${content}
</template>
<script>
export default {
  name: ${JSON.stringify(componentName)}
}
</script>`,
			'vue'
		);

		writeFile(path.resolve(pathSvgComV2, `${filename}.vue`), vue, 'utf-8');
		return '';
	}

	async function generateEntry(files: Array<string>) {
		const content = await formatCode(
			files
				.map((file) => {
					const { filename, componentName } = getFileName(file);
					return `export { default as ${componentName} } from './${filename}.vue'`;
				})
				.join('\n')
		);

		await writeFile(
			path.resolve(pathSvgComV2, 'index.ts'),
			content,
			'utf-8'
		);
	}
})();
