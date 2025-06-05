import type { RouteConfig } from 'vue-router';

const demoRoutes: Array<RouteConfig> = [
	{
		path: '/demo',
		redirect: '/demo/select-v2',
	},
	{
		path: '/demo/select-v2',
		component: () => import('@/views/demo/el-select-v2-demo/demo.vue'),
	},
];

export default demoRoutes;
