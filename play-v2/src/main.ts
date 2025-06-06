import 'normalize.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import ElSelectV2 from 'el-select-v2';
import router from '@/router/index'
import '@/styles/index.scss'
import App from './App.vue';
import type { PluginObject } from 'vue';

Vue.config.productionTip = false;

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(ElSelectV2 as unknown as PluginObject<unknown>);

new Vue({
	el: '#app',
	render: (h) => {
		return h(App);
	},
  router
});
