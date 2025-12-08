<!--
 * @Author: elk
 * @Date: 2025-11-13 18:34:22
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-08 17:04:45
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
      <n-card hoverable :style="{ height: 'calc(100vh - 170px)' }">
        <n-data-table
          class="h-100% overflow-auto"
          :on-update:page="onUpdatePage"
          :on-update:page-size="onUpdatePageSize"
          :data="tableData"
          :columns="columns"
          :pagination="pagination"
          :loading="loading"
          :row-key="(row: IForm) => row.menuId"
          />
      </n-card>
    </div>
    <!-- 表单弹框层 -->
    <MenuModal ref="menuModal" @getList="getList" />
  </div>
</template>

<script setup lang="ts">
import { NCheckbox, NButton } from 'naive-ui'
import type { DataTableColumn } from 'naive-ui'
import MenuModal from './MenuModal.vue'
import { ref, h, useTemplateRef, onMounted } from 'vue'
import { getMenuList } from '@/apis/system/menu'
import { menuToTree } from '@/libs/utils/common'
import type { IForm } from '@/interfaces/system/menu'

// 加载状态
const loading = ref<boolean>(false)
// Modal实例
const menuModal = useTemplateRef<InstanceType<typeof MenuModal>>('menuModal')

// 搜索值
const searchValue = ref<string>('')
// 分页配置
const pagination = ref({
  itemCount: 200,
  pageCount: 10,
  pageSize: 10,
  pageSizes: [10, 20, 30, 40, 50],
  page: 1,
  showSizePicker: true,
  showQuickJumper: true,
})
// 分页更新
const onUpdatePage = (page: number) => {
  pagination.value.page = page
}
// 分页大小更新
const onUpdatePageSize = (pageSize: number) => {
  pagination.value.pageSize = pageSize
}
// 表格数据
const tableData = ref<IForm[]>()

// 表格配置项
const createCoumns = () => {
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
    },
    {
      title: '菜单图标',
      key: 'menuIcon',
      resizable: true,
    },
    {
      title: '排序',
      key: 'orderNum',
      resizable: true,
    },
    {
      title: '路由地址',
      key: 'path',
      resizable: true,
    },
    {
      title: '组件路径',
      key: 'component',
      resizable: true,
    },
    {
      title: '是否外链',
      key: 'isFrame',
      resizable: true,
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
    },
    {
      title: '操作',
      key: 'operation',
      resizable: true,
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
            { type: 'error', size: 'small', quaternary: true, onClick: () => deleteMenu(row) },
            { default: () => '删除' },
          ),
        ])
      },
    },
  ]
}
// 表格列配置
const columns = ref<DataTableColumn[]>(createCoumns())

// 生命周期 - onMounted
onMounted(async () => {
  console.log("🚀 ~ tableData:", tableData)
  await getList()
})
/**
 * @description: 获取菜单列表
 * @return {*}
 */
const getList = async () => {
  try {
    loading.value = true
    const res = await getMenuList()
    if (res.code === 200) {
      loading.value = false
      tableData.value = menuToTree(res.data as IForm[])
    }
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}
/**
 * @description: 新增菜单
 * @return {*}
 */
const addMenu = () => {
  // 通过ref传递打开modal表单
  if (menuModal.value) {
    menuModal.value.show = true
    menuModal.value.title = '新增菜单'
    menuModal.value.resetForm()
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
    menuModal.value.form = row
  }
}
/**
 * @description: 删除菜单
 * @return {*}
 */
const deleteMenu = (row: IForm) => {
  console.log('🚀 ~ deleteMenu ~ row:', row)
}

/**
 * @description: 查询菜单
 * @return {*}
 */
const searchMenu = async () => {
  try {
    await getList()
  } catch (error) {
    console.log(error)
  }
}
</script>
