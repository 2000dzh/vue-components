import { createRouter, createWebHashHistory } from 'vue-router';
import demoRoutes from './modules/demoRoute';

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			redirect: '/demo',
		},
		...demoRoutes,
	],
	scrollBehavior: () => ({ left: 0, top: 0 }),
});
