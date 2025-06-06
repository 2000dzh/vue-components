import type { RouteRecordRaw } from 'vue-router';

const demoRoutes: Array<RouteRecordRaw> = [
	{
		path: '/demo',
		redirect: '/demo/ceshi',
	},
	{
		path: '/demo/ceshi',
		component: () => import('@/views/demo/ceshi.vue'),
	},
];

export default demoRoutes;
