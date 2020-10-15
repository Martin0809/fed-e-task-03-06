<template>
  <el-aside>
    <div class="logo">
      <img alt="Vue logo" src="@/assets/logo.png" />
    </div>
    <el-menu
      default-active="/course"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="authority">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">角色列表</el-menu-item>
        <el-menu-item index="/menu">菜单列表</el-menu-item>
        <el-menu-item index="/resource">资源列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-menu"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="advert">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">广告列表</el-menu-item>
        <el-menu-item index="/advert-space">广告位列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutAside',
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleOpen(key: string, keyPath: string) {
      console.log(key, keyPath)
    },
    handleClose(key: string, keyPath: string) {
      console.log(key, keyPath)
    },
  },
})
</script>

<style lang="scss" scoped>
.el-aside {
  display: flex;
  flex-direction: column;
  width: auto !important;
  background-color: $aside-bg-color;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  img {
    width: 36px;
    height: 36px;
  }
}

.el-menu {
  flex: 1;
  border-right: none;

  &:not(.el-menu--collapse) {
    width: 256px;
  }
}
</style>
