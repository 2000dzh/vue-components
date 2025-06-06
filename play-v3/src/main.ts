import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { router } from '@/router/index';
import App from './App.vue';

createApp(App).use(router).use(ElementPlus).mount('#app');
