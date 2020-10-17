<template>
  <el-header>
    <div class="collapse-btn" @click="handleTriggerCollapse">
      <i class="el-icon-s-unfold" v-if="isCollapse" />
      <i class="el-icon-s-fold" v-else />
    </div>
    <el-dropdown>
      <el-avatar
        :src="
          userInfo.portrait ||
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        "
        :size="36"
      /><el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'

export default Vue.extend({
  name: 'LayoutHeader',
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      userInfo: {},
    }
  },
  mounted() {
    this.fetchUserInfo()
  },
  methods: {
    async fetchUserInfo() {
      try {
        const { data } = await getUserInfo()

        if (data.state === 1) {
          this.userInfo = data.content
        }
      } catch (err) {
        this.$message.error(err.message)
      }
    },
    handleTriggerCollapse() {
      this.$emit('triggerCollapse', !this.isCollapse)
    },
    logout() {
      this.$confirm('确定退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message.success('退出成功')
        this.$store.commit('setUser', null)
        this.$router.push({
          path: '/login',
        })
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
    background: $black025-color;
  }
}

.el-avatar {
  cursor: pointer;
}
</style>
