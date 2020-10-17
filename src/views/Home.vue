<template>
  <el-card shadow="never">
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default Vue.extend({
  name: 'Home',
  components: {
    HelloWorld,
  },
})
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
}
</style>
