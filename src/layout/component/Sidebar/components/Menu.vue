<!--
 * @Description: 菜单布局
 * @Autor: lyf
 * @Date: 2025-07-09 14:52:11
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-04 17:23:28
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
import { RouterLink } from 'vue-router'
import { DashboardOutlined } from '@/libs/utils/icons'

import { useAppStore } from '@/stores/app'
import { useRouterStore } from '@/stores/routers'

const appStore = useAppStore()
const routerStore = useRouterStore()
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const sidebarRouter = routerStore.sidebarRouter
console.log('🚀 ~ routerStore-sidebarRouter:', sidebarRouter)
const menuOptions = ref([])

// 处理菜单数据-改造成n-menu
const formatMenuData = (data) => {
  return data.map((item) => {
    const { meta, children } = item
    if (children && children.length > 0) {
      return {
        label: meta.title,
        key: item.name,
        icon: renderIcon(meta.icon),
        children: formatMenuData(children),
      }
    } else {
      return {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: item.name,
                path: item.path,
              },
            },
            { default: () => meta.title }
          ),
        key: item.name,
      }
    }
  })
}
menuOptions.value = formatMenuData(sidebarRouter)
console.log('🚀 ~ menuOptions.value:', menuOptions.value)
</script>

<style scoped>
</style>