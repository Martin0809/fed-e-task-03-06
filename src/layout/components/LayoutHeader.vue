<template>
  <el-header>
    <div class="collapse-btn" @click="handleTriggerCollapse">
      <i class="el-icon-s-unfold" v-if="isCollapse" />
      <i class="el-icon-s-fold" v-else />
    </div>
    <el-dropdown>
      <el-avatar
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        :size="36"
      />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>马马马赛克</el-dropdown-item>
        <div @click="logout">
          <el-dropdown-item divided>退出登陆</el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutHeader',
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleTriggerCollapse() {
      this.$emit('triggerCollapse', !this.isCollapse)
    },
    logout() {
      this.$router.push({
        path: '/login',
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  border-bottom: 1px solid #f0f0f0;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.collapse-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 100%;
  font-size: 24px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}

.el-avatar {
  cursor: pointer;
}
</style>
