import VueRouter from 'vue-router';
import demoRoutes from './modules/demoRoute';
import elementDemoRoute from './modules/elementDemoRoute';

const router = new VueRouter({
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
		{
			path: '/',
			redirect: '/demo',
		},
		...demoRoutes,
		...elementDemoRoute,
	],
});

export default router;
