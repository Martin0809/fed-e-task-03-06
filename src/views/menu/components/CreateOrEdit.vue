<template>
  <el-form
    v-loading="isLoading"
    ref="form"
    label-width="100px"
    :model="form"
    :rules="rules"
  >
    <el-form-item label="菜单名称" prop="name">
      <el-input
        v-model="form.name"
        placeholder="请输入"
        :disabled="isSubmiting"
      ></el-input>
    </el-form-item>
    <el-form-item label="菜单路径" prop="href">
      <el-input
        v-model="form.href"
        placeholder="请输入"
        :disabled="isSubmiting"
      ></el-input>
    </el-form-item>
    <el-form-item label="上级菜单" prop="parentId">
      <el-select
        v-model="form.parentId"
        placeholder="请选择"
        :disabled="isSubmiting"
      >
        <el-option label="无上级菜单" :value="-1"></el-option>
        <el-option
          v-for="menu in parentMenus"
          :key="menu.id"
          :label="menu.name"
          :value="menu.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input
        v-model="form.description"
        placeholder="请输入"
        :disabled="isSubmiting"
      ></el-input>
    </el-form-item>
    <el-form-item label="前端图标" prop="icon">
      <el-input
        v-model="form.icon"
        placeholder="请输入"
        :disabled="isSubmiting"
      ></el-input>
    </el-form-item>
    <el-form-item label="是否显示" prop="shown">
      <el-radio-group v-model="form.shown" :disabled="isSubmiting">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序" prop="orderNum">
      <el-input-number
        v-model="form.orderNum"
        placeholder="请输入"
        :min="1"
        :max="10"
        :disabled="isSubmiting"
      ></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="isSubmiting" @click="handleSubmit">
        提交
      </el-button>
      <el-button v-if="!isEdit" :disabled="isSubmiting" @click="handleReset">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getMenuInfo, createOrUpdateMenu } from '@/services/menu'

export default Vue.extend({
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      isSubmiting: false,
      form: {
        name: '',
        href: '',
        parentId: -1,
        description: '',
        icon: '',
        shown: false,
        orderNum: 0,
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
        ],
        icon: [{ required: true, message: '请输入前端图标', trigger: 'blur' }],
      },
      parentMenus: [],
    }
  },
  created() {
    this.fetchMenuInfo()
  },
  methods: {
    async fetchMenuInfo() {
      if (this.isEdit) {
        this.isLoading = true
      }

      try {
        const { data } = await getMenuInfo(this.$route.params.id || -1)

        if (data.code === '000000') {
          const { menuInfo, parentMenuList } = data.data

          if (menuInfo) {
            this.form = menuInfo
          }

          this.parentMenus = parentMenuList
        }
      } finally {
        this.isLoading = false
      }
    },
    async handleSubmit() {
      this.isSubmiting = true

      const { data } = await createOrUpdateMenu(this.form)

      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.back()
      }

      this.isSubmiting = false
    },
    handleReset() {
      ;(this.$refs.form as Form).resetFields()
    },
  },
})
</script>

<style lang="scss" scoped></style>
