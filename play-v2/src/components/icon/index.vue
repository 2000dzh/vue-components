<template>
	<i class="d-icon-box" :style="style" v-bind="$attrs">
		<slot />
	</i>
</template>

<script>
export default {
	name: 'Icon',
	props: {
		size: {
			type: [Number, String],
			default: 20,
		},
		color: {
			type: String,
		},
	},
	computed: {
		style() {
			return {
				fontSize: this.size ? `${this.size}px` : undefined,
				color: this.color,
			};
		},
	},
};
</script>

<style lang="scss">
.d-icon-box {
	height: 1em;
	width: 1em;
	line-height: 1em;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	position: relative;
	fill: currentColor;
	svg {
		width: 1em;
		height: 1em;
	}
}
</style>
