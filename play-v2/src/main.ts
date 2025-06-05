import 'normalize.css';
import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import ElSelectV2 from 'el-select-v2';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(ElSelectV2);

new Vue({
	el: '#app',
	render: (h) => {
		return h(App);
	},
});
