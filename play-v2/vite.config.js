import path from 'node:path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

// vite-plugin-vue2 已经进入维护模式，仅支持 Vue 2.6 或更早版本

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'dl-svg-v2': path.resolve(__dirname, '../packages/svg-v2/src/index.ts')
    }
  },
  plugins: [createVuePlugin()],
});