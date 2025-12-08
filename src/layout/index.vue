<!--
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-06-19 17:17:16
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-05 15:10:06
 * @FilePath: /elk-lowcode-v3/src/layout/index.vue
-->
<template>
  <div class="w-100% h-100vh relative">
    <n-layout has-sider :native-scrollbar="true">
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="64"
        :width="220"
        content-style="padding: 10px;"
        show-trigger="arrow-circle"
        :collapsed="appStore.collapsed"
        :on-update:collapsed="changeCollapsed"
        bordered
      >
        <!-- 侧边导航栏 -->
        <Sidebar />
      </n-layout-sider>
      <n-layout>
        <n-layout-header position="absolute">
          <!-- 1)顶部工具栏 -->
          <Navbar />
          <!-- 2)页面标签栏 -->
          <TagsView />
        </n-layout-header>
        <n-layout-content class="mt-100 mb-100">
          <!-- 3)中心内容区 -->
          <AppMain />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
// 引入naive组件
import { NLayout, NLayoutSider, NLayoutContent, NLayoutHeader } from 'naive-ui'
// 引入AppMain组件
import AppMain from './component/AppMain.vue'
// 引入Sidebar组件
import Sidebar from './component/Sidebar/index.vue'
// 引入Navbar组件
import Navbar from './component/Navbar/index.vue'
// 引入标签导航栏
import TagsView from './component/TagsView/index.vue'

import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
// 监听侧边栏折叠状态变化，动态调整布局
const changeCollapsed = (collapsed: boolean) => {
  appStore.toggleCollapse(collapsed)
}
</script>

<style scoped></style>
