import { resolve } from 'node:path';

const projRoot = resolve(__dirname, '..', '..');

const pathPac = resolve(projRoot, './packages');
export const svgV3 = resolve(projRoot, './svg');

export const pathSvgV3 = resolve(pathPac, './svg-v3');
export const pathSvgOutputV3 = resolve(pathSvgV3, './dist/dl-svg-v3');
export const pathSvgComV3 = resolve(pathSvgV3, './components');
// const pathSvgV2 = resolve(pathPac, './svg-v2');
