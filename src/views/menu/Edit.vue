<template>
  <el-card header="编辑菜单">
    <create-or-edit :isEdit="true" />
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuEdit',
  components: {
    CreateOrEdit,
  },
  data() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
