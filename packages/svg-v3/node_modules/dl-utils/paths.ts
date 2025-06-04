import { resolve } from 'node:path';

const projRoot = resolve(__dirname, '..', '..');

const pathPac = resolve(projRoot, './packages');
export const pathSvgFile = resolve(projRoot, './svg');

export const pathSvgV3 = resolve(pathPac, './svg-v3');
export const pathSvgOutputV3 = resolve(pathSvgV3, './dist/dl-svg-v3');
export const pathSvgComV3 = resolve(pathSvgV3, './components');
export const pathSvgV2 = resolve(pathPac, './svg-v2');
export const pathSvgOutputV2 = resolve(pathSvgV2, './dist/dl-svg-v2');
export const pathSvgComV2 = resolve(pathSvgV2, './components');
