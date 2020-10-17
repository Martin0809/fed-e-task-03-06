<template>
  <el-aside>
    <div class="logo">
      <img alt="Vue logo" src="@/assets/logo.png" />
    </div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :default-active="$route.path"
      :collapse="isCollapse"
    >
      <template v-for="menu in menus">
        <el-submenu
          v-if="
            menu.subMenuList &&
              menu.subMenuList.filter((item) => item.shown).length
          "
          :key="menu.id"
          :index="`${menu.id}`"
        >
          <template slot="title">
            <i :class="`el-icon-${menu.icon}`"></i>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="subMenu in menu.subMenuList.filter((item) => item.shown)"
            :key="subMenu.id"
            :index="subMenu.href | formatUrl"
          >
            <template slot="title">
              <i :class="`el-icon-${subMenu.icon}`"></i>
              <span>{{ subMenu.name }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :key="menu.id"
          :index="`/${menu.href.toLowerCase()}`"
        >
          <i :class="`el-icon-${menu.icon}`"></i>
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList } from '@/services/menu'

export default Vue.extend({
  name: 'LayoutAside',
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      menus: [],
    }
  },
  created() {
    this.fetchMenu()
  },
  methods: {
    async fetchMenu() {
      const { data } = await getMenuNodeList()

      if (data.code === '000000') {
        this.menus = data.data
      }
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
