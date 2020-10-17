<template>
  <el-card v-loading="isLoading" shadow="never">
    <div class="operate-bar">
      <el-button size="mini" @click="addMenu">添加菜单</el-button>
    </div>
    <el-table :data="menus" border stripe style="width: 100%">
      <el-table-column prop="id" label="编号" align="center" />
      <el-table-column prop="name" label="菜单名称" align="center" />
      <el-table-column prop="level" label="菜单级数" align="center">
        <template slot-scope="scope">
          {{ scope.row.level | level2word }}
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="前端图标" align="center">
        <template slot-scope="scope">
          <i :class="`el-icon-${scope.row.icon}`"></i>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenu, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data() {
    return {
      isLoading: false,
      menus: [],
    }
  },
  mounted() {
    this.fetchMenus()
  },
  methods: {
    async fetchMenus() {
      this.isLoading = true

      const { data } = await getAllMenu()

      if (data.code === '000000') {
        this.menus = data.data
      }

      this.isLoading = false
    },
    addMenu() {
      this.$router.push({
        path: '/menu/add',
      })
    },
    handleEdit(record: any) {
      this.$router.push({
        path: `/menu/${record.id}/edit`,
      })
    },
    handleDelete(record: any) {
      this.$confirm('确定删除吗？', '删除提示', {}).then(async () => {
        const { data } = await deleteMenu(record.id)

        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.fetchMenus()
        }
      })
    },
  },
})
</script>

<style lang="scss" scoped></style>
