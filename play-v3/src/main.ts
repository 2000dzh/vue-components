import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import DlELemet from 'dl-element'
import { router } from '@/router/index';
import App from './App.vue';

console.log(DlELemet)

createApp(App).use(router).use(ElementPlus).mount('#app');
