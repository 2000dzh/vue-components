import type { RouteConfig } from 'vue-router';

const elementDemoRoutes: Array<RouteConfig> = [
	{
		path: '/element-demo/dialog',
		component: () => import('@/views/element-demo/dialog/index.vue'),
	},
	{
		path: '/element-demo/table',
		component: () => import('@/views/element-demo/table/index.vue'),
	},
];

export default elementDemoRoutes;
