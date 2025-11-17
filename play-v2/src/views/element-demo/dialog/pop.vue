<template>
  <el-dialog
    width="90%"
    class="dl-pop"
    :title="title"
    :visible.sync="dialogFormVisible"
    @closed="closed"
  >
    <div class="dl-pop-body">
      <el-row>
        <el-form
          ref="FormRef"
          :model="form"
          :rules="rules"
          :label-width="formLabelWidth"
          size="medium"
        >
          <el-col :span="8">
            <el-form-item
              label="输入框"
              prop="name1"
            >
              <el-input
                v-model="form.name1"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="下拉框"
              prop="name2"
            >
              <el-select
                v-model="form.name2"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in nameList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
                <!-- <el-option value="1" label="选项1" />
								<el-option value="2" label="选项2" /> -->
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="动态添加校验规则"
              prop="name3"
              :rules="rules.dName"
            >
              <el-input
                v-model="form.name3"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              class="d-name4"
              prop="name4"
            >
              <template slot="label">
                文字换行<br>
                需要改变行高
              </template>
              <el-input
                v-model="form.name4"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item
              label="备注"
              prop="remarks"
            >
              <el-input
                v-model="form.remarks"
                type="textarea"
                :rows="3"
                :resize="'none'"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>

    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel">
        取消
      </el-button>
      <el-button
        type="primary"
        :loading="loadingSubmit"
        @click="submit"
      >
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { to as _to } from '@/utils/common';

export default {
	name: 'DemoPop',
	data() {
		return {
			title: '示例弹框',
			dialogFormVisible: false,
			formLabelWidth: '150px',
			form: {},
			rules: {
				name1: [
					{
						required: true,
						message: '请输入',
						trigger: 'blur',
					},
				],
				name2: [
					{
						required: true,
						message: '请选中',
						trigger: 'change',
					},
				],
				remarks: [
					{
						required: true,
						message: '请输入备注',
						trigger: 'blur',
					},
					{
						min: 1,
						max: 2,
						message: '长度在 1 到 2 个字符',
						trigger: 'blur',
					},
				],

				dName: [
					{
						required: true,
						message: '请输入动态添加校验规则',
						trigger: 'blur',
					},
				],
			},
			nameList: [
				{
					value: '1',
					label: '选项1',
				},
				{
					value: '2',
					label: '选项2',
				},
			],
			loadingSubmit: false,
		};
	},
	created() {},
	methods: {
		open(name, formData = {}) {
			this.title = name || this.title;

			this.form = {
				timeList: [],
				...formData,
			};

			this.dialogFormVisible = true;
		},
		/**
		 * @description: 提交
		 */
		async submit() {
			this.loadingSubmit = true;
			const cancelLoading = () => (this.loadingSubmit = false);

			const FormRef = this.$refs.FormRef;
			const errInfo = {
				message: '请填写完整',
			};
			const [verifyErr] = await _to(FormRef.validate(), errInfo);
			if (verifyErr) {
				cancelLoading();
				return;
			}

			const params = {};

			const [err, res] = await _to(Promise.resolve(params));

			if (err) {
				cancelLoading();
				return;
			}

			const { flag } = res || {};

			if (flag) {
				//
				this.cancel();
				this.$emit('refreshPage');
			}

			cancelLoading();
		},
		/**
		 * @description: 取消回调
		 */
		cancel() {
			this.dialogFormVisible = false;
		},
    /**
		 * @description: 弹框关闭动画结束时的回调
		 */
		closed() {
			this.$emit('closeForm');
		},
	},
};
</script>

<style scoped lang="scss">
.dl-pop {
	.dl-pop-body {
		max-height: 425px;
		padding-right: 40px;
		overflow: auto;
		.d-name4 {
			::v-deep {
				.el-form-item__label {
					line-height: 19px;
				}
			}
		}
	}
}
</style>
