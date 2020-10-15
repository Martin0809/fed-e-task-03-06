<template>
  <div class="login">
    <el-form
      label-position="top"
      label-width="80px"
      ref="form"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input :disabled="isLoading" v-model="form.phone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          :disabled="isLoading"
          v-model="form.password"
        />
      </el-form-item>
    </el-form>
    <el-button type="primary" :loading="isLoading" @click="handleSubmit"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      isLoading: false,
      form: {
        phone: '18631142258',
        password: '111111',
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入6到18位字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await (this.$refs.form as Form).validate()

        this.isLoading = true

        const { data } = await login(this.form)

        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          this.$message.success('登录成功')
          this.$router.push({
            path: '/',
          })
        }
      } catch (err) {
        console.log('登录失败', err)
      }

      this.isLoading = false
    },
  },
})
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 400px;
  padding: 24px;
  border: 1px solid $black025-color;
  border-radius: 4px;
  background: $white-color;
  transform: translateX(-50%);
}

.el-form {
  margin-bottom: 48px;
}

.el-button {
  width: 100%;
}
</style>
