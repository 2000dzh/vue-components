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
  {
		path: '/demo/html-to-img',
		component: () => import('@/views/demo/html-to-img/index.vue'),
	},
   {
		path: '/demo/pie-3d',
		component: () => import('@/views/demo/pie-3d/index.vue'),
	},
];

export default demoRoutes;
