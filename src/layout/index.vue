<template>
  <el-container>
    <layout-aside :isCollapse="isCollapse" />
    <el-container direction="vertical">
      <layout-header
        :isCollapse="isCollapse"
        @triggerCollapse="handleTriggerCollapse"
      />
      <el-main>
        <div class="container">
          <router-view />
        </div>
        <layout-footer />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutAside from './components/LayoutAside.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'

export default Vue.extend({
  name: 'Layout',
  components: {
    LayoutAside,
    LayoutHeader,
    LayoutFooter,
  },
  data() {
    return {
      isCollapse: false,
    }
  },
  methods: {
    handleTriggerCollapse(collapse: boolean) {
      this.isCollapse = collapse
    },
  },
})
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}

.el-main {
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
}

.container {
  flex: 1;
}
</style>
