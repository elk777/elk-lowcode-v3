<!--
 * @Description: 菜单布局
 * @Autor: lyf
 * @Date: 2025-07-09 14:52:11
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-06 14:39:56
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
import { NMenu, NIcon, type MenuOption } from 'naive-ui'
import { ref, h } from 'vue'
import type { Component } from 'vue'
import type { IRouter } from '@/interfaces/routers'
import { RouterLink } from 'vue-router'

import { useAppStore } from '@/stores/app'
import { useRouterStore } from '@/stores/routers'

const appStore = useAppStore()
const routerStore = useRouterStore()
// 渲染图标
function renderIcon(icon: Component | string) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
// 侧边栏路由
const sidebarRouter = routerStore.sidebarRouter
// 菜单数据
const menuOptions = ref<MenuOption[]>([])

// 处理菜单数据-改造成n-menu
const formatMenuData = (data: IRouter[]): MenuOption[] => {
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
              to: item.path,
            },
            { default: () => meta.title }
          ),
        key: item.name,
      }
    }
  })
}
menuOptions.value = formatMenuData(sidebarRouter)
</script>

<style scoped>
</style>