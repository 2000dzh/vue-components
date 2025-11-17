<template>
  <div>
    <el-button @click="openPop">
      打开弹框
    </el-button>
    <d-icon>
      <Add />
    </d-icon>

    <d-icon>
      <Del />
    </d-icon>
    <Pop
      v-if="popVisible"
      ref="PopRef"
      @closeForm="closePop"
    />
  </div>
</template>

<script>
import { Add } from 'dl-svg-v2';
import Pop from './pop.vue';

export default {
	name: 'DialogDemo',
	components: {
		Pop,
		Add
	},
	data() {
		return {
			popVisible: false,
		};
	},
	created() {
		console.log(Add);
	},
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
