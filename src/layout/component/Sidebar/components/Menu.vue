<!--
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-07-09 14:52:11
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-11 09:52:50
 * @FilePath: \v3-admin-lowcode\src\layout\component\Sidebar\components\Menu.vue
-->
<!--
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-07-09 14:52:11
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-10 14:11:35
 * @FilePath: \v3-admin-lowcode\src\layout\component\Sidebar\components\Menu.vue
-->

<template>
  <div>
    <n-menu
      accordion
      :indent="12"
      :options="menuOptions"
      :collapsed="appStore.collapsed"
      :collapsed-icon-size="25"
      :collapsed-width="40"
    >
    </n-menu>
  </div>
</template>

<script setup lang="ts">
import { NMenu, NIcon } from 'naive-ui'
import { ref, h } from 'vue'
import type { Component } from 'vue'
import { DashboardOutlined } from '@/libs/utils/icons'

import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = ref([
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: renderIcon(DashboardOutlined),
    children: [
      {
        label: '分析页',
        key: 'analysis',
      },
      {
        label: '监控页',
        key: 'monitor',
      },
      {
        label: '工作台',
        key: 'workplace',
      },
    ],
  },
])
</script>

<style scoped>
</style>