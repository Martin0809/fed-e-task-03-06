<template>
  <el-card v-loading="isLoading" shadow="never">
    <div class="operate-bar">
      <el-button @click="handleAdd">添加分类</el-button>
    </div>
    <el-table :data="categories" border stripe style="width: 100%">
      <el-table-column prop="id" label="编号" align="center" />
      <el-table-column prop="name" label="名称" align="center" />
      <el-table-column prop="createdTime" label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createdTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center" />
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
    <create-or-edit-category-dialog
      :visible.sync="visible"
      :record="record"
      @ok="fetchCategories"
    />
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllCategory, deleteCategory } from '@/services/resource'
import CreateOrEditCategoryDialog from './components/CreateOrEditCategoryDialog.vue'

export default Vue.extend({
  name: 'ResourceCategory',
  components: {
    CreateOrEditCategoryDialog,
  },
  data() {
    return {
      isLoading: false,
      categories: [],
      visible: false,
      record: null,
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      this.isLoading = true

      try {
        const { data } = await getAllCategory()

        if (data.code === '000000') {
          this.categories = data.data
        }
      } finally {
        this.isLoading = false
      }
    },
    handleAdd() {
      this.record = null
      this.visible = true
    },
    handleEdit(record: any) {
      this.record = record
      this.visible = true
    },
    handleDelete(record: any) {
      this.$confirm('确定删除吗？', '删除提示', {}).then(async () => {
        const { data } = await deleteCategory(record.id)

        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.fetchCategories()
        }
      })
    },
  },
})
</script>

<style lang="scss" scoped></style>
