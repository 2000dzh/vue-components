import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

// vite-plugin-vue2 已经进入维护模式，仅支持 Vue 2.6 或更早版本

export default defineConfig({
  plugins: [createVuePlugin()],
});