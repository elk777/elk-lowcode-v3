<!--
 * @Author: elk
 * @Date: 2025-11-13 18:34:22
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-16 16:56:00
 * @FilePath: /elk-lowcode-v3/src/views/system/menu/index.vue
 * @Description: 菜单管理
-->
<template>
  <div class="main-container">
    <!-- 搜索 + 按钮层 -->
    <div class="flex items-center">
      <!-- 搜索层 -->
      <div class="flex">
        <n-input
          style="width: 150px; margin-right: 10px"
          placeholder="请输入菜单名称"
          v-model:value="searchValue"
        />
        <!-- 按钮层 -->
        <n-button type="primary" @click="searchMenu">查询</n-button>
      </div>
      <n-button class="ml-10" type="primary" @click="addMenu">新增</n-button>
    </div>
    <!-- 列表层 使用card 和table 组合-->
    <div class="mt-10">
      <n-card hoverable class="my-n-card">
        <n-data-table
          flex-height
          class="h-100%"
          :on-update:page="onUpdatePage"
          :on-update:page-size="onUpdatePageSize"
          :data="tableData"
          :columns="columns"
          :pagination="pagination"
          :loading="loading"
          :row-key="(row: IForm) => row.menuId"
          :scroll-x="totalWidth"
        />
      </n-card>
    </div>
    <!-- 表单弹框层 -->
    <MenuModal ref="menuModal" @getMenuList="getMenuList" />
  </div>
</template>

<script setup lang="ts">
import { NCheckbox, NButton } from 'naive-ui'
import MenuModal from './MenuModal.vue'
import { ref, h, useTemplateRef, inject } from 'vue'
import { getMenuList, deleteMenu as deleteMenuApi } from '@/apis/system/menu'
import { menuToTree } from '@/libs/utils/common'
import type { IForm } from '@/interfaces/system/menu'
import { useNavTable } from '@/hooks/common/useNavTable'
import SvgIcon from '@/components/SvgIcon/index.vue'
import type { DataTableColumns } from 'naive-ui'
import type { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
// Modal实例
const menuModal = useTemplateRef<InstanceType<typeof MenuModal>>('menuModal')
// 搜索值
const searchValue = ref<string>('')
// 使用naive-ui的dialog组件
const dialog = inject<DialogApiInjection>('$dialog')

// 表格配置项
const createCoumns = (): DataTableColumns<IForm> => {
  return [
    // {
    //   title: '序号',
    //   key: 'key',
    //   render: (_: unknown, index: number) => {
    //     return `${index + 1}`
    //   },
    // },
    {
      title: '菜单名称',
      key: 'menuName',
      resizable: true,
      width: 120,
      fixed: 'left',
    },
    {
      title: '菜单图标',
      key: 'menuIcon',
      resizable: true,
      width: 80,
      render: (row: IForm) => {
        return h(SvgIcon, { name: row.menuIcon || 'default', size: 18 })
      },
    },
    {
      title: '排序',
      key: 'orderNum',
      resizable: true,
      width: 70,
    },
    {
      title: '路由地址',
      key: 'path',
      resizable: true,
      width: 120,
    },
    {
      title: '组件路径',
      key: 'component',
      resizable: true,
      width: 180,
    },
    {
      title: '是否外链',
      key: 'isFrame',
      resizable: true,
      width: 80,
      render: (row: IForm) => {
        return h(NCheckbox, {
          checked: row.isFrame === 0,
        })
      },
    },
    {
      title: '菜单描述',
      key: 'remark',
      resizable: true,
      width: 150,
    },
    {
      title: '操作',
      key: 'operation',
      width: 120,
      resizable: true,
      fixed: 'right',
      render: (row: IForm) => {
        // 返回两个按钮 一个 修改 一个删除
        return h('div', {}, [
          h(
            NButton,
            { type: 'primary', size: 'small', quaternary: true, onClick: () => updateMenu(row) },
            { default: () => '修改' },
          ),
          h(
            NButton,
            {
              type: 'error',
              size: 'small',
              quaternary: true,
              onClick: () => deleteMenu(row),
            },
            { default: () => '删除' },
          ),
        ])
      },
    },
  ]
}
// 菜单管理表格-hooks
const {
  search,
  tableData,
  columns,
  pagination,
  totalWidth,
  loading,
  deleteLoading,
  onUpdatePage,
  onUpdatePageSize,
  deleteSelectedRows,
} = useNavTable<IForm>({
  // API请求函数
  fetchData: getMenuList,
  // 表格配置项
  columns: createCoumns(),
  // 自动加载数据
  autoLoad: true,
  // 删除方法函数
  deleteApi: deleteMenuApi,
  // 数据转换函数
  transformData: menuToTree,
})

/**
 * @description: 新增菜单
 * @return {*}
 */
const addMenu = () => {
  // 通过ref传递打开modal表单
  if (menuModal.value) {
    menuModal.value.show = true
    menuModal.value.title = '新增菜单'
    menuModal.value.reset()
  }
}
/**
 * @description: 修改菜单
 * @return {*}
 */
const updateMenu = (row: IForm) => {
  if (menuModal.value) {
    menuModal.value.show = true
    menuModal.value.title = '修改菜单'
    menuModal.value.formData = row
  }
}
/**
 * @description: 删除菜单
 * @return {*}
 */
const deleteMenu = (row: IForm) => {
  // 确认删除
  dialog?.warning({
    title: '确认删除',
    content: `确定删除菜单 ${row.menuName} 吗？`,
    showIcon: false,
    positiveText: '确定',
    negativeText: '取消',
    loading: deleteLoading.value,
    onPositiveClick: () => {
      deleteSelectedRows([row])
    },
  })
}

/**
 * @description: 查询菜单
 * @return {*}
 */
const searchMenu = async () => {
  try {
    await search({ menuName: searchValue.value })
  } catch (error) {
    console.log(error)
  }
}
</script>
