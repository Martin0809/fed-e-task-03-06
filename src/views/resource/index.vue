<template>
  <div>
    <el-card shadow="never">
      <el-form v-loading="isLoading" ref="form" :inline="true" :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="资源名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资源路径" prop="url">
              <el-input v-model="form.url" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资源分类" prop="categoryId">
              <el-select
                v-model="form.categoryId"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="category in categories"
                  :key="category.id"
                  :label="category.name"
                  :value="String(category.id)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="search-operator" :span="24">
            <el-form-item>
              <el-button @click="handleReset">重置</el-button>
              <el-button type="primary" @click="handleSubmit">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-loading="isLoading" shadow="never">
      <div class="operate-bar">
        <el-button @click="handleAdd">添加资源</el-button>
        <router-link to="/resource/category">
          <el-button>资源分类</el-button>
        </router-link>
      </div>
      <el-table border stripe style="width: 100%" :data="resources">
        <el-table-column prop="id" label="编号" align="center" />
        <el-table-column prop="name" label="资源名称" align="center" />
        <el-table-column prop="url" label="资源路径" align="center" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column prop="createdTime" label="添加时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createdTime | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="Number(form.current)"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="Number(form.size)"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <create-or-edit-resource-dialog
      :visible.sync="visible"
      :id="id"
      :categories="categories"
      @ok="fetchResources"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import qs from 'qs'
import { Form } from 'element-ui'
import {
  getAllResource,
  getAllCategory,
  deleteResource,
} from '@/services/resource'
import CreateOrEditResourceDialog from './components/CreateOrEditResourceDialog.vue'

export default Vue.extend({
  name: 'ResourceIndex',
  components: {
    CreateOrEditResourceDialog,
  },
  data() {
    return {
      isLoading: false,
      form: {
        name: undefined,
        url: undefined,
        categoryId: undefined,
        current: 1,
        size: 10,
      },
      categories: [],
      resources: [],
      total: 0,
      visible: false,
      id: 0,
    }
  },
  mounted() {
    this.fetchResources()
    this.fetchCategories()
  },
  watch: {
    $route: 'fetchResources',
  },
  methods: {
    async fetchResources() {
      this.isLoading = true
      this.form = {
        ...this.form,
        ...this.$route.query,
      }

      try {
        const { data } = await getAllResource(this.form)

        if (data.code === '000000') {
          this.resources = data.data.records
          this.total = data.data.total
        }
      } finally {
        this.isLoading = false
      }
    },
    async fetchCategories() {
      const { data } = await getAllCategory()

      if (data.code === '000000') {
        this.categories = data.data
      }
    },
    handleJumpLink() {
      const link = `/resource?${qs.stringify(this.form)}`

      if (this.$route.fullPath === link) return

      this.$router.push(link)
    },
    handleReset() {
      ;(this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.form.size = 10

      this.handleJumpLink()
    },
    handleSubmit() {
      this.form.current = 1

      this.handleJumpLink()
    },
    handleSizeChange(val: number) {
      this.form.size = val
      this.form.current = 1

      this.handleJumpLink()
    },
    handleCurrentChange(val: number) {
      this.form.current = val

      this.handleJumpLink()
    },
    handleAdd() {
      this.id = 0
      this.visible = true
    },
    handleEdit(record: any) {
      this.id = record.id
      this.visible = true
    },
    handleDelete(record: any) {
      this.$confirm('确定删除吗？', '删除提示').then(async () => {
        const { data } = await deleteResource(record.id)

        if (data.code === '000000') {
          this.fetchResources()
        }
      })
    },
  },
})
</script>

<style lang="scss" scoped></style>
