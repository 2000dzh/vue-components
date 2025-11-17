<template>
	<div class="element-demo-table-demo1">
		<el-button @click="validateInputs">触发输入框校验</el-button>

		<el-table
			ref="tableRef"
			:data="tableDataProxy"
			style="width: 100%"
			height="360"
			:border="true"
		>
			<el-table-column :align="'center'" prop="id" label="输入框">
				<template slot-scope="{ row }">
					<el-input
						v-model="row.num"
						size="medium"
						:class="{
							'input-error': row.inputErrorFlag,
						}"
					/>
				</template>
			</el-table-column>
			<el-table-column :align="'center'" prop="name" label="数据名称" />

			<el-table-column width="80" label="操作" fixed="right">
				<template slot-scope="{ row }">
					<el-link @click="deleteVal(row)" type="primary">
						删除
					</el-link>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			:current-page="page.pageNow"
			:page-size="page.pageSize"
			:page-sizes="page.pageSizeOptions"
			layout="prev,pager,next,total,sizes,jumper"
			:total="totalProxy"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script>
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 40];
const DEFAULT_TOTAL = 100;

export default {
	name: 'ElementDemoTableDemo1',
	data() {
		return {
			tableData: Array.from({ length: DEFAULT_TOTAL }, (_, index) => {
				return {
					num: null,
					id: index + 1,
					name: `测试数据 ${index + 1}`,
					inputErrorFlag: false,
				};
			}),
			page: {
				pageNow: 1,
				pageSize: 10,
				pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
				total: DEFAULT_TOTAL,
			},
			delList: [],
			tableRowKeyName: 'id',
		};
	},
	computed: {
		tableDataProxy() {
			const data = this.tableData.filter(
				(item) => !this.delList.includes(item[this.tableRowKeyName])
			);
			return data.slice(
				(this.page.pageNow - 1) * this.page.pageSize,
				this.page.pageNow * this.page.pageSize
			);
		},
		totalProxy() {
			const len = this.delList.length;
			return this.page.total - len || 0;
		},
	},
	methods: {
		/**
		 * 删除当前行
		 */
		deleteVal(row) {
			this.delList.push(row[this.tableRowKeyName]);
			if (this.tableDataProxy.length === 0) {
				this.page.pageNow = 1;
			}
		},
		/**
		 * 校验当前页输入框
		 */
		validateInputs() {
			let hasError = false;
			this.tableDataProxy.forEach((item) => {
				const inputFlag = !!item.num;

				if (!inputFlag) {
					hasError = true;
					this.$set(item, 'num', '请填写数据');
				}

				this.$set(item, 'inputErrorFlag', !inputFlag);
			});
			if (hasError) {
				this.$message.warning('请填写所有输入框');
			}
		},
		fn1() {
			let flag = false;

			this.fn((item) => {
				const numFlag = !!item.num;
				if (numFlag === false) {
					flag = true;
					this.$set(item, 'num', '请填写数据');
				}
			});
		},
		fn(callback) {
			this.tableDataProxy.forEach((item) => {
				const val = this.tableData.find(
					(k) =>
						k[this.tableRowKeyName] === item[this.tableRowKeyName]
				);
				callback(val);
			});
		},
		handleSizeChange(size) {
			this.page.pageNow = 1;
			this.page.pageSize = size;
		},
		handleCurrentChange(page) {
			this.page.pageNow = page;
		},
	},
};
</script>

<style scoped lang="scss">
.element-demo-table-demo1 {
	width: 100%;
	height: 100%;
	.input-error {
		::v-deep {
			.el-input__inner {
				border-color: #f56c6c;
			}
		}
	}
}
</style>
