<template>
	<div class="table-container">
		<el-card>
			<div slot="header" class="clearfix">
				<span>表格选中前端解决方案</span>
			</div>
			<Demo1 />
		</el-card>

		<el-card>
			<div slot="header" class="clearfix">
				<span>表格校验</span>
			</div>
			<Demo2 />
		</el-card>
	</div>
</template>

<script>
import Demo1 from './demo1.vue';
import Demo2 from './demo2.vue';

export default {
	name: 'ElementDemoTable',
	components: {
		Demo1,
    Demo2
	},
	data() {
		return {};
	},
};
</script>

<style scoped lang="scss">
.table-container {
	width: 100%;
	height: 100%;
	padding: 10px;
	::v-deep {
		.el-card {
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0px;
			}
		}
	}
}
</style>
