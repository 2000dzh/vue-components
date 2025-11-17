<template>
	<div style="background-color: black">
		<txPie3d
    v-if="flag"
			style="width: 500px; height: 156px"
			:optionsData="optionsData"
		></txPie3d>


    <button @click="flag = !flag" >关闭</button>
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {
			optionsData: [],
      flag: true
		};
	},
	created() {},
	mounted() {
		setTimeout(() => {
			this.optionsData = [
				{
					name: '设备类',
					value: 30,
					// 各个类型占比
					num2: 30,
					// 整改率
					num3: 45,
					// 未完成数
					num4: 15,
          // h: 30
				},
				{
					name: '管理类',
					value: 70,
					// 各个类型占比
					num2: 30,
					// 整改率
					num3: 45,
					// 未完成数
					num4: 15,
          // h: 30
				},
				{
					name: '环境类',
					value: 30,
					// 各个类型占比
					num2: 30,
					// 整改率
					num3: 45,
					// 未完成数
					num4: 15,
          // h: 30
				},
				{
					name: '人员类',
					value: 70,
					// 各个类型占比
					num2: 30,
					// 整改率
					num3: 45,
					// 未完成数
					num4: 15,
          // h: 30
				},
			];
		}, 100);
	},
	methods: {},
};
</script>

<style></style>
