<!--
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-24 16:54:22
 * @FilePath: /elk-lowcode-v3/src/App.vue
-->
<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { NMessageProvider, NConfigProvider, NLoadingBarProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
import { watchEffect } from 'vue'
import { useAppStore } from '@/stores/app'
import { darkTheme } from 'naive-ui'
const appStore = useAppStore()
const route = useRoute()
watchEffect(() => {
  console.log('当前路由对象：', route)
})
</script>

<template>
  <n-config-provider :theme="appStore.isDarkMode ? darkTheme : null" :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-loading-bar-provider>
        <RouterView />
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
