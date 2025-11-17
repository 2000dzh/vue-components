<template>
  <div class="element-demo-table-demo1">
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      height="360"
      :border="true"
      :row-key="tableRowKeyName"
      @select="selectChange"
      @select-all="selectAllChange"
    >
      <el-table-column
        type="selection"
        reserve-selection
        width="55"
      />
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        :align="'center'"
        prop="name"
        label="数据名称"
      />
      <el-table-column :align="'center'">
        <template slot="header">
          <div>表格文字</div>
          <div>换行</div>
        </template>

        <span> {{ 1 }}</span>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page.pageNow"
      :page-size="page.pageSize"
      :page-sizes="page.pageSizeOptions"
      layout="prev,pager,next,total,sizes,jumper"
      :total="page.total"
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
			tableData: [],
			loading: false,
			page: {
				pageNow: 1,
				pageSize: 10,
				pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
				total: DEFAULT_TOTAL,
			},
			tableRowKeyName: 'id',
			checkLiist: new Set(),
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.getTableData();
		},
		async getTableData() {
			this.loading = true;
			const cancelLoading = () => {
				this.loading = false;
			};

			const params = {
				data: {},
				pageNow: this.page.pageNow,
				pageSize: this.page.pageSize,
			};

			await new Promise((resolve) => setTimeout(resolve, 1000));

			const { pageNow, pageSize, total } = this.page;
			const start = (pageNow - 1) * pageSize + 1;
			const end = Math.min(pageNow * pageSize, total);
			this.tableData = Array.from(
				{ length: end - start + 1 },
				(_, i) => ({
					id: start + i,
					name: `测试数据 ${start + i}`,
				})
			);

			cancelLoading();
		},
		/**
		 * @description 表格选中数据change事件
		 */
		selectChange(selection, row) {
			const isCheck = selection.findIndex(
				(item) =>
					item[this.tableRowKeyName] === row[this.tableRowKeyName]
			);

			if (isCheck !== -1) {
				// 选中
				console.log('单条数据选中');
				this.checkLiist.add(row[this.tableRowKeyName]);
			} else {
				// 取消选中
				console.log('单条数据取消选中');
				this.checkLiist.delete(row[this.tableRowKeyName]);
			}
		},
		/**
		 * @description 表格全选change事件
		 */
		selectAllChange(selection) {
			const isCheck = this.tableData.findIndex((item) => {
				const flag = selection.find(
					(obj) =>
						obj[this.tableRowKeyName] === item[this.tableRowKeyName]
				);
				if (!flag) {
					return item;
				}
			});

			if (isCheck === -1) {
				// 当前页全选
				console.log('当前页全选');
				this.tableData.forEach((item) => {
					this.checkLiist.add(item[this.tableRowKeyName]);
				});
			} else {
				// 当前页取消全选
				console.log('当前页取消全选');
				this.tableData.forEach((item) => {
					this.checkLiist.delete(item[this.tableRowKeyName]);
				});
			}
		},
		handleSizeChange(size) {
			this.page.pageNow = 1;
			this.page.pageSize = size;
			this.getTableData();
		},
		handleCurrentChange(page) {
			this.page.pageNow = page;
			this.getTableData();
		},
	},
};
</script>

<style scoped lang="scss">
.element-demo-table-demo1 {
	width: 100%;
	height: 100%;
}
</style>
