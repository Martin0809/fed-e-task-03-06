<template>
  <el-dialog
    destroy-on-close
    :title="`${record ? '编辑' : '添加'}资源分类`"
    :visible="visible"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-form v-loading="isLoading" ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="20">
          <el-form-item
            label="分类名称"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="请输入"
              :disabled="isSubmiting"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort" :label-width="formLabelWidth">
            <el-input-number
              v-model="form.sort"
              :disabled="isSubmiting"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button :disabled="isSubmiting" @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="isSubmiting" @click="handleSubmit">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { createOrSaveCategory } from '@/services/resource'

export default Vue.extend({
  name: 'CreateOrEditCategoryDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    record: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      isLoading: false,
      isSubmiting: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        sort: 0,
      },
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await (this.$refs.form as Form).validate()

        this.isSubmiting = true

        const { data } = await createOrSaveCategory(this.form)

        if (data.code === '000000') {
          this.$message.success(`${this.record ? '编辑' : '添加'}成功`)
          this.$emit('ok')
          this.handleClose()
        }
      } catch (error) {
        console.error('表单提交失败', error)
      } finally {
        this.isSubmiting = false
      }
    },
    handleOpen() {
      this.form = this.record || {
        name: '',
        sort: 0,
      }
    },
    handleClose() {
      ;(this.$refs.form as Form).resetFields()
      this.$emit('update:visible', false)
    },
  },
})
</script>

<style lang="scss" scoped></style>
