<!--
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-06-19 17:17:16
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-11 09:51:31
 * @FilePath: \v3-admin-lowcode\src\layout\index.vue
-->
<template>
  <div class="w-full h-screen">
    <n-layout has-sider class="h-screen">
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="64"
        :width="220"
        content-style="padding: 10px;"
        show-trigger="arrow-circle"
        :on-update:collapsed="changeCollapsed"
        bordered
      >
        <!-- 侧边导航栏 -->
        <Sidebar />
      </n-layout-sider>
      <n-layout-content content-style="padding: 12px;">
        <!-- 右侧内容栏 -->
        <!-- 顶部工具栏 -->
        <!-- 页面标签栏 -->
        <!-- 中心内容区 -->
        <AppMain />
        <!-- 侧边抽屉 -->
        <!-- 全局搜索 -->
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
// 引入naive组件
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
// 引入AppMain组件
import AppMain from './component/AppMain.vue'
// 引入Sidebar组件
import Sidebar from './component/Sidebar/index.vue'

import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const changeCollapsed = (collapsed: boolean) => {
  console.log('🚀 ~ constchangeCollapsed ~ collapsed:', collapsed)
  appStore.toggleCollapse()
}
</script>

<style scoped>
</style>