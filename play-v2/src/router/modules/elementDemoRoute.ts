import type { RouteConfig } from 'vue-router';

const elementDemoRoutes: Array<RouteConfig> = [
	{
		path: '/element-demo/dialog',
		component: () => import('@/views/element-demo/dialog/index.vue'),
	},
];

export default elementDemoRoutes;
