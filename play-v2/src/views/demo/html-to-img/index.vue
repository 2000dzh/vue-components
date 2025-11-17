<template>
	<div class="html-to-img-box">
		<div ref="Card" class="card">测试元素</div>

		<div>
			<button @click="to1">SnapDOM</button>
			<button @click="to2">html2canvas</button>
		</div>
	</div>
</template>

<script>
import html2canvas from 'html2canvas';
import { snapdom } from '@zumer/snapdom';

export default {
	name: 'htmlToImg',
	data() {
		return {};
	},
	methods: {
		async to1() {
			const cardRef = this.$refs.Card;

			const blob = await snapdom.toBlob(cardRef, {
				format: 'svg',
				backgroundColor: '#fff',
			});
			console.log(blob);

			this.download(blob);

			return;

			const image = await snapdom(cardRef);
			console.log(image);

			// 下载
			await image.download({
				filename: 'ceshi',
			});
		},

		async to2() {
			const cardRef = this.$refs.Card;

			const canvas = await html2canvas(cardRef);

			const iamge = canvas.toDataURL('image/jpeg', 1.0);

			console.log(iamge);
		},

		download(blob) {
			if (!(blob instanceof Blob)) {
				return;
			}
			const link = document.createElement('a');
			const url = window.URL.createObjectURL(blob);
			link.style.display = 'none';
			link.href = url;
			link.download = '测试文件名称';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(blob);
		},
	},
};
</script>

<style scoped lang="scss">
.html-to-img-box {
	.card {
		background: linear-gradient(145deg, #ffffff, #e3f0ff);
		padding: 1.5em;
		border-left: 5px solid #ff7043;
		border-radius: 16px;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
		margin-bottom: 2em;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		text-align: center;
		max-width: 300px;
		padding: 20px;
		&::before {
			content: '★ ';
			color: gold;
			font-size: 1.2em;
		}
		&::after {
			content: ' ✨';
			color: violet;
			font-size: 1.2em;
		}
	}
}
</style>
