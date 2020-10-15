<template>
  <el-footer style="height: auto;">
    Copyright &copy; {{ year }} 马赛克
  </el-footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutFooter',
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
})
</script>

<style lang="scss" scoped>
.el-footer {
  margin: 48px 0 24px;
  text-align: center;
  color: $black45-color;
  background: $bg-color;
}
</style>
