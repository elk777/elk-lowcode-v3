<!--
 * @Author: elk
 * @Date: 2025-12-17 14:22:07
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-18 15:08:28
 * @FilePath: /elk-lowcode-v3/src/views/system/user/index.vue
 * @Description: 用户管理页面
-->
<template>
  <div class="main-container">
    <!-- 搜索框和按钮 -->
    <div class="flex items-center">
      <!-- 搜索层 -->
      <div class="flex">
        <n-input
          style="width: 150px; margin-right: 10px"
          placeholder="请输入用户名"
          v-model:value="searchValue"
        />
        <!-- 按钮层 -->
        <n-button type="primary" @click="handleSearch">查询</n-button>
      </div>
      <n-button class="ml-10" type="primary" @click="addUser">新增</n-button>
    </div>
    <!-- 列表层 使用card 和table 组合-->
    <div class="mt-10">
      <n-card hoverable class="my-n-card">
        <n-data-table
          flex-height
          class="h-100% overflow-auto"
          :on-update:page="onUpdatePage"
          :on-update:page-size="onUpdatePageSize"
          :data="tableData"
          :columns="columns"
          :pagination="pagination"
          :loading="loading"
          :row-key="(row: IUser) => row.userId"
          @update:checked-row-keys="setSelectedRows"
          :scroll-x="totalWidth"
        />
      </n-card>
    </div>
    <!-- 用户管理弹窗 -->
    <UserModal ref="userModalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, h, useTemplateRef, inject } from 'vue'
import { NButton, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { IUser } from '@/interfaces/system/user'
import type { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'

import { useNavTable } from '@/hooks/common/useNavTable'
import { getUserList, deleteUser } from '@/apis/system/user'

import UserModal from './UserModal.vue'

const searchValue = ref<string>('')
const dialog = inject<DialogApiInjection>('$dialog')
// modal 弹窗引用
const userModalRef = useTemplateRef<InstanceType<typeof UserModal>>('userModalRef')
const createUserColumns = (): DataTableColumns<IUser> => {
  return [
    {
      type: 'selection',
      disabled: (row: IUser) => row.userName === 'admin',
      width: 60,
    },
    {
      title: '用户名称',
      key: 'userName',
      resizable: true,
      width: 120,
    },
    {
      title: '用户昵称',
      key: 'nickName',
      resizable: true,
      width: 120,
    },
    {
      title: '关联角色',
      key: 'roles',
      resizable: true,
      width: 120,
    },
    {
      title: '手机号',
      key: 'phone',
      resizable: true,
      width: 120,
    },
    {
      title: '用户状态',
      key: 'status',
      resizable: true,
      width: 120,
      render: (row: IUser) => {
        return h(
          NTag,
          {
            type: row.status === '1' ? 'success' : 'default',
            bordered: false,
          },
          {
            default: () => (row.status === '1' ? '正常' : '停用'),
          },
        )
      },
    },
    {
      title: '用户描述',
      key: 'remark',
      resizable: true,
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      resizable: true,
      width: 120,
      fixed: 'right',
      render: (row: IUser) => {
        return h('div', {}, [
          h(
            NButton,
            {
              type: 'primary',
              size: 'small',
              quaternary: true,
              disabled: row.userName === 'admin',
              onClick: () => handleEdit(row),
            },
            { default: () => '修改' },
          ),
          h(
            NButton,
            {
              type: 'error',
              size: 'small',
              disabled: row.userName === 'admin',
              quaternary: true,
              onClick: () => handleDelete(row),
            },
            { default: () => '删除' },
          ),
        ])
      },
    },
  ]
}
// 用户管理表格hooks函数
const {
  tableData,
  columns,
  pagination,
  loading,
  deleteLoading,
  totalWidth,
  search,
  onUpdatePage,
  onUpdatePageSize,
  setSelectedRows,
  deleteSelectedRows,
} = useNavTable({
  fetchData: getUserList,
  columns: createUserColumns(),
  autoLoad: true,
  deleteApi: deleteUser,
})

// 处理查询事件
const handleSearch = () => {
  // 调用搜索函数
  search({ roleName: searchValue.value })
}
/**
 * @description: 新增用户
 * @return {*}
 */
const addUser = () => {
  // 调用新增用户弹窗函数
  if (userModalRef.value) {
    userModalRef.value.show = true
    userModalRef.value.title = '新增用户'
  }
}
/**
 * @description: 编辑用户
 * @param {IUser} row 用户对象
 * @return {*}
 */
const handleEdit = (row: IUser) => {
  // 调用编辑用户弹窗函数
  if (userModalRef.value) {
    userModalRef.value.show = true
    userModalRef.value.title = '编辑用户'
    userModalRef.value.formData = row
  }
}
/**
 * @description: 删除用户
 * @param {IUser} row 用户对象
 * @return {*}
 */
const handleDelete = (row: IUser) => {
  // 调用删除用户弹窗函数
  dialog?.warning({
    title: '删除用户',
    content: `确定删除用户 ${row.userName} 吗？`,
    showIcon: false,
    positiveText: '确定',
    negativeText: '取消',
    loading: deleteLoading.value,
    onPositiveClick: async () => {
      await deleteSelectedRows([row])
    },
  })
}
</script>

<style scoped></style>
