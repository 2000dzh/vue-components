<template>
	<div class="demo-container">
		<div ref="demoContent" class="demo-content">
			<el-row :gutter="20">
				<el-col :span="span">
					<p class="title">基础用法</p>
					<p class="description">适用广泛的基础选择器</p>
					<el-select-v2
						v-model="form.value1"
						:options="options"
						:size="form.size"
					/>
				</el-col>
				<el-col :span="span">
					<p class="title">有禁用选项</p>
					<p class="description">
						在 options 中，设定 disabled 值为 true，即可禁用该选项
					</p>
					<el-select-v2
						v-model="form.value2"
						:options="disabledOptions"
						:size="form.size"
					/>
				</el-col>
				<el-col :span="span">
					<p class="title">禁用状态</p>
					<p class="description">选择器不可用状态</p>
					<el-select-v2
						v-model="form.value3"
						:options="options"
						:size="form.size"
						disabled
					/>
				</el-col>
				<el-col :span="span">
					<p class="title">可清空单选</p>
					<p class="description">
						包含清空按钮，可将选择器清空为初始状态
					</p>
					<el-select-v2
						v-model="form.value4"
						:options="options"
						:size="form.size"
						clearable
					/>
				</el-col>
				<el-col :span="span">
					<p class="title">基础多选</p>
					<p class="description">基础多选</p>
					<el-select-v2
						v-model="form.value5"
						:options="options"
						:size="form.size"
						multiple
					/>
				</el-col>
				<el-col :span="span">
					<p class="title">自定义模板</p>
					<p class="description">可以自定义备选项</p>
					<el-select-v2
						v-model="form.value6"
						:options="options"
						:size="form.size"
					>
						<template #default="{ item }">
							<span>{{ item.label }}</span>
							<span
								style="
									color: var(--info-color);
									margin-left: 10px;
								"
								>{{ item.value }}</span
							>
						</template>
					</el-select-v2>
				</el-col>
				<el-col :span="span">
					<p class="title">可搜索</p>
					<p class="description">可以利用搜索功能快速查找选项</p>
					<el-select-v2
						v-model="form.value7"
						:options="options"
						:size="form.size"
						filterable
					/>
				</el-col>
				<el-col :span="span">
					<p class="title">远程搜索</p>
					<p class="description">
						从服务器搜索数据，输入关键字进行查找
					</p>
					<el-select-v2
						v-model="form.value8"
						:options="remoteOptions"
						:size="form.size"
						remote
						:remote-method="remoteMethod"
						:loading="loading"
						filterable
					/>
				</el-col>
				<el-col :span="span">
					<p class="title">创建条目</p>
					<p class="description">可以创建并选中选项中不存在的条目</p>
					<el-select-v2
						v-model="form.value9"
						:options="options"
						:size="form.size"
						multiple
						filterable
						allow-create
						default-first-option
					/>
				</el-col>
				<el-col :span="span">
					<p class="title">自适应菜单宽度</p>
					<p class="description">
						计算每一项的宽度，选择最大的作为下拉菜单宽度
					</p>
					<el-select-v2
						v-model="form.value10"
						:options="longOptions"
						:size="form.size"
						:fit-input-width="false"
						filterable
					/>
				</el-col>
				<el-col :span="span">
					<p class="title">将选项进行分组</p>
					<p class="description">
						你可以为选项进行分组来区分不同的选项
					</p>
					<el-select-v2
						v-model="form.value11"
						:options="groupOptions"
						:size="form.size"
						:fit-input-width="false"
						filterable
					/>
				</el-col>
				<el-col :span="span">
					<p class="title">下拉菜单的头部和底部</p>
					<p class="description">您可以自定义下拉菜单的头部和底部</p>
					<el-select-v2
						v-model="form.value12"
						:options="options"
						:size="form.size"
						multiple
						collapse-tags
					>
						<template #header>
							<el-checkbox
								v-model="checkAll"
								:indeterminate="indeterminate"
								@change="selectMany"
							>
								选择前 20 项
							</el-checkbox>
						</template>
						<template #footer>
							<el-button type="primary" size="mini"
								>底部按钮</el-button
							>
						</template>
					</el-select-v2>
				</el-col>
				<el-col :span="span">
					<p class="title">绑定对象值</p>
					<p class="description">使用 value-key 绑定对象值</p>
					<el-select-v2
						v-model="form.value13"
						:options="objectOptions"
						value-key="name"
						:size="form.size"
					/>
				</el-col>
			</el-row>
		</div>
		<div class="form">
			<div class="form-header">
				<div class="form-title">
					<span>Select V2 虚拟列表选择器</span>
				</div>
				<div class="form-description">
					<span
						>不论你的数据量多大，虚拟列表都能毫无压力地处理。</span
					>
				</div>
			</div>

			<div class="form-main">
				<el-form :model="form" label-width="auto" size="small">
					<el-form-item label="尺寸">
						<el-radio-group v-model="form.size">
							<el-radio-button label="">默认</el-radio-button>
							<el-radio-button label="medium"
								>中等</el-radio-button
							>
							<el-radio-button label="small"
								>小型</el-radio-button
							>
							<el-radio-button label="mini">超小</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-form>

				<div class="button-group">
					<el-button type="primary" size="small" @click="randomSelect"
						>随机选择</el-button
					>
					<el-button plain size="small" @click="insertOption"
						>插入第一个选择器</el-button
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Demo',
	data() {
		return {
			loading: false,
			span: 6,
			options: [],
			disabledOptions: [],
			remoteOptions: [],
			longOptions: [],
			groupOptions: [],
			objectOptions: [],
			form: {
				value1: '',
				value2: '',
				value3: '',
				value4: '',
				value5: [],
				value6: '',
				value7: '',
				value8: '',
				value9: [],
				value10: '',
				value11: '',
				value12: [],
				value13: '',
				size: 'small',
			},
			checkAll: false,
			indeterminate: false,
		};
	},
	created() {
		for (let i = 0; i < 10000; i++) {
			this.options.push({
				value: `value ${i + 1}`,
				label: `label ${i + 1}`,
			});
			this.disabledOptions.push({
				value: `value ${i + 1}`,
				label: `label ${i + 1}`,
				disabled: i % 2 === 0,
			});
			this.longOptions.push({
				value: `value ${i + 1}`,
				label: `long long long long long long long label ${i + 1}`,
			});
			this.objectOptions.push({
				value: {
					name: `name ${i + 1}`,
				},
				label: `label ${i + 1}`,
			});
		}
		this.groupOptions = Array.from({ length: 1000 }).map((_, idx) => {
			const label = idx;
			return {
				value: `group ${label + 1}`,
				label: `group ${label + 1}`,
				options: Array.from({ length: 10 }).map((_, idx) => ({
					value: `value ${idx + 1 + 10 * label}`,
					label: `label ${idx + 1 + 10 * label}`,
				})),
			};
		});
	},
	methods: {
		setSpan(formWidth) {
			if (formWidth > 360 * 4) {
				this.span = 6;
			} else if (formWidth > 360 * 3) {
				this.span = 8;
			} else if (formWidth > 360 * 2) {
				this.span = 12;
			} else {
				this.span = 24;
			}
		},
		remoteMethod(query) {
			if (query) {
				this.loading = true;
				setTimeout(() => {
					this.remoteOptions = this.options.filter((item) =>
						item.label.includes(query)
					);
					this.loading = false;
				}, 200);
			} else {
				this.remoteOptions = [];
			}
		},
		randomSelect() {
			Object.keys(this.form).forEach((key) => {
				if (key.startsWith('value')) {
					const index = Math.floor(
						Math.random() * this.options.length
					);
					this.form[key] = Array.isArray(this.form[key])
						? [this.options[index].value]
						: this.options[index].value;
					this.form.value13 = JSON.parse(
						JSON.stringify(this.objectOptions[index].value)
					);
				}
			});
		},
		insertOption() {
			const timestamp = new Date().getTime();
			this.options.push({
				value: `value ${timestamp}`,
				label: `label ${timestamp}`,
			});
			this.form.value1 = `value ${timestamp}`;
		},
		selectMany(val) {
			this.indeterminate = false;
			if (val) {
				this.form.value12 = this.options
					.slice(0, 20)
					.map((_) => _.value);
			} else {
				this.form.value12 = [];
			}
		},
	},
	watch: {
		'form.value12'(val) {
			if (val.length === 0) {
				this.checkAll = false;
				this.indeterminate = false;
			} else if (val.length === this.options.length) {
				this.checkAll = true;
				this.indeterminate = false;
			} else {
				this.indeterminate = true;
			}
		},
	},
};
</script>

<style lang="scss">
:root {
	--default-font-family:
		'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
		'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
	--primary-color: #409eff;
	--success-color: #67c23a;
	--warning-color: #e6a23c;
	--danger-color: #f56c6c;
	--main-color: #303133;
	--normal-color: #606266;
	--info-color: #909399;
	--placeholder-color: #c0c4cc;
	--border-color: #dcdfe6;
}

// dialog样式
.el-dialog {
	.el-dialog__body {
		padding: 10px 20px;
	}
}

.el-image {
	.el-image__inner {
		opacity: 1;
	}

	.el-image__placeholder {
		background: none;
	}
}

.el-form {
	.el-form-item {
		& > .el-input,
		.el-cascader,
		.el-select,
		.el-date-editor,
		.el-autocomplete {
			width: 100%;
		}

		.el-row {
			flex-grow: 1;
		}
	}
}

.el-row {
	display: flex;
	flex-wrap: wrap;
}
</style>

<style lang="scss" scoped>
.demo-container {
	height: 100vh;
	display: flex;
	overflow: hidden;

	.demo-content {
		overflow: auto;
		flex-grow: 1;
		position: relative;
		padding: 20px;

		.title {
			color: var(--normal-color);
			font-weight: bold;
			font-size: 24px;
		}

		.description {
			color: var(--main-color);
			font-size: 16px;
		}

		.el-select {
			width: 240px;
		}
	}

	.form {
		height: 100%;
		overflow: auto;
		width: 400px;
		flex-shrink: 0;
		border-left: 1px solid var(--border-color);

		.form-header {
			padding: 30px 20px;
			font-size: 18px;
			font-weight: bold;
			border-bottom: 1px solid var(--border-color);

			.form-title {
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				.github-icon {
					margin-left: 5px;
					cursor: pointer;
				}
			}

			.form-description {
				margin-top: 20px;
				font-size: 12px;
				font-weight: normal;
				color: var(--info-color);
			}
		}

		.form-main {
			padding: 20px;

			.button-group {
				margin-top: 20px;
				display: flex;
				flex-wrap: wrap;
				gap: 20px;

				.el-button {
					width: 100%;
					margin: 0;
				}
			}
		}
	}
}
</style>
