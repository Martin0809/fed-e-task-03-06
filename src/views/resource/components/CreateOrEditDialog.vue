<template>
  <el-dialog
    destroy-on-close
    :title="`${id ? '编辑' : '添加'}资源`"
    :visible="visible"
    @close="handleCancel"
  >
    <el-form ref="form" style="width: 80%" :model="form" :rules="rules">
      <el-form-item label="资源名称" prop="name" :label-width="formLabelWidth">
        <el-input
          v-model="form.name"
          autocomplete="off"
          placeholder="请输入"
          :disabled="isSubmiting"
        ></el-input>
      </el-form-item>
      <el-form-item label="资源路径" prop="url" :label-width="formLabelWidth">
        <el-input
          v-model="form.url"
          autocomplete="off"
          placeholder="请输入"
          :disabled="isSubmiting"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="资源分类"
        prop="categoryId"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="form.categoryId"
          clearable
          placeholder="请选择"
          :disabled="isSubmiting"
        >
          <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="description"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.description"
          type="textarea"
          autocomplete="off"
          placeholder="请输入"
          :rows="3"
          :disabled="isSubmiting"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button :disabled="isSubmiting" @click="handleCancel">取 消</el-button>
      <el-button type="primary" :loading="isSubmiting" @click="handleSubmit">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { createOrSaveResource } from '@/services/resource'

export default Vue.extend({
  name: 'CreateOrEditDialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    id: Number,
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isSubmiting: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        url: '',
        categoryId: undefined,
        description: '',
      },
      rules: {
        name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入资源路径', trigger: 'blur' }],
        categoryId: [
          { required: true, message: '请输入资源分类', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleCancel() {
      this.$emit('update:visible', false)
    },
    async handleSubmit() {
      try {
        await (this.$refs.form as Form).validate()

        this.isSubmiting = true

        const { data } = await createOrSaveResource(this.form)

        if (data.code === '000000') {
          this.$message.success(`${this.id ? '编辑' : '添加'}成功`)
          this.$emit('ok')
          this.handleCancel()
        }
      } catch (error) {
        console.error('表单提交失败', error)
      } finally {
        this.isSubmiting = false
      }
    },
  },
})
</script>

<style lang="scss" scoped></style>
