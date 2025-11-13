<!--
 * @Description: 菜单布局
 * @Autor: lyf
 * @Date: 2025-07-09 14:52:11
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-13 15:56:56
 * @FilePath: \v3-admin-lowcode\src\layout\component\Sidebar\components\Menu.vue
-->

<template>
  <div>
    <n-menu
      ref="menuInstRef"
      accordion
      v-model:value="selectedKey"
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
import type { MenuInst } from 'naive-ui'
import { ref, h, watch } from 'vue'
import type { Component } from 'vue'
import type { IRouter } from '@/interfaces/routers'
import { RouterLink, useRoute } from 'vue-router'

import { useAppStore } from '@/stores/app'
import { useRouterStore } from '@/stores/routers'

const menuInstRef = ref<MenuInst | null>(null)
const appStore = useAppStore()
const routerStore = useRouterStore()
const route = useRoute()
const selectedKey = ref(route.name as string)// 渲染图标
function renderIcon(icon: Component | string) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

watch(
  () => route.name,
  (name) => {
    selectedKey.value = name as string
    menuInstRef.value?.showOption(name as string)
  }
)
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

<style scoped></style>
