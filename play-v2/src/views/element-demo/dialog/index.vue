<template>
	<div>
		<el-button @click="openPop">打开弹框</el-button>

		<Pop v-if="popVisible" ref="PopRef" @closeForm="closePop" />
	</div>
</template>

<script>
import Pop from './pop.vue';

export default {
	name: 'dialogDemo',
	components: {
		Pop,
	},
	data() {
		return {
			popVisible: false,
		};
	},
	created() {},
	methods: {
		async openPop() {
			this.popVisible = true;
			await this.$nextTick();
			const PopRef = this.$refs.PopRef;
			PopRef.open('', {});
		},
		closePop() {
			this.popVisible = false;
		},
	},
};
</script>

<style></style>
