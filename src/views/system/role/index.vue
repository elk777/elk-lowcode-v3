<!--
 * @Description: 角色管理
 * @Autor: lyf
 * @Date: 2025-11-13 11:02:01
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-09 16:13:08
 * @FilePath: /elk-lowcode-v3/src/views/system/role/index.vue
-->
<template>
  <div class="main-container">
    <!-- 搜索 + 按钮层 -->
    <div class="flex items-center">
      <!-- 搜索层 -->
      <div class="flex">
        <n-input
          style="width: 150px; margin-right: 10px"
          placeholder="请输入角色名称"
          v-model:value="searchValue"
        />
        <!-- 按钮层 -->
        <n-button type="primary" @click="handleSearch">查询</n-button>
      </div>
      <n-button class="ml-10" type="primary" @click="addRole">新增</n-button>
    </div>
    <!-- 列表层 使用card 和table 组合-->
    <div class="mt-10">
      <n-card hoverable class="my-n-card">
        <n-data-table
          class="h-100% overflow-auto"
          :on-update:page="onUpdatePage"
          :on-update:page-size="onUpdatePageSize"
          :data="tableData"
          :columns="columns"
          :pagination="pagination"
          :loading="loading"
          :row-key="(row: IRole) => row.roleId"
        />
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { useNavTable } from '@/hooks/common/useNavTable'
import { getRoleList } from '@/apis/system/role'
import { NButton } from 'naive-ui'
import type { IRole } from '@/interfaces/system/role'

const searchValue = ref<string>('')
const createRoleColumns = () => {
  return [
    {
      title: '角色名称',
      key: 'roleName',
      resizable: true,
    },
    {
      title: '角色描述',
      key: 'remark',
      resizable: true,
    },
    {
      title: '操作',
      key: 'operation',
      width: 120,
      resizable: true,
      render: () => {
        // 返回两个按钮 一个 修改 一个删除
        return h('div', {}, [
          h(
            NButton,
            {
              type: 'primary',
              size: 'small',
              quaternary: true,
              onClick: (row: IRole) => handleEdit(row),
            },
            {
              default: () => '修改',
            },
          ),
          h(
            NButton,
            {
              type: 'error',
              size: 'small',
              quaternary: true,
              onClick: (row: IRole) => handleDelete(row),
            },
            {
              default: () => '删除',
            },
          ),
        ])
      },
    },
  ]
}
// 角色管理表格-hooks
const { search, tableData, columns, pagination, loading, onUpdatePage, onUpdatePageSize } =
  useNavTable<IRole>({
    // API请求函数
    fetchData: getRoleList,
    // 表格配置项
    columns: createRoleColumns(),
    autoLoad: true,
  })
// 处理查询事件
const handleSearch = () => {
  // 调用搜索函数
  search({ roleName: searchValue.value })
}

/**
 * @description: 新增角色
 * @return {*}
 */
const addRole = () => {
  // 新增角色
}
/**
 * @description: 处理编辑事件
 * @param {IRole} row 角色对象
 * @return {*}  
 */
// 处理编辑事件
const handleEdit = (row: IRole) => {
  console.log("🚀 ~ handleEdit ~ row:", row)
}
/**
 * @description: 处理删除事件
 * @param {IRole} row 角色对象
 * @return {*}  
 */
const handleDelete = (row: IRole) => {
  console.log("🚀 ~ handleDelete ~ row:", row)
  // 删除角色
}
</script>
