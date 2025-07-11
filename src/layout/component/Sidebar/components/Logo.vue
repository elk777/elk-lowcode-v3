<!--
 * @Description: 侧边栏logo
 * @Autor: lyf
 * @Date: 2025-07-09 14:52:03
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-10 16:32:52
 * @FilePath: \v3-admin-lowcode\src\layout\component\Sidebar\components\Logo.vue
-->
<template>
  <div class="flex items-center gap-2">
    <n-icon :size="40" color="#0e7a0d">
      <ColorFilterSharp />
    </n-icon>
    <span
      v-show="appStore.collapse"
      class="text-xl font-semibold overflow-hidden whitespace-nowrap"
      >{{ name }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { ColorFilterSharp } from '@/libs/utils/icons'
import { useAppStore } from '@/stores/app'

const name = import.meta.env.VITE_APP_NAME

const appStore = useAppStore()
</script>

<style scoped>
</style>