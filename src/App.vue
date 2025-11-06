<!--
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-06 10:56:59
 * @FilePath: \v3-admin-lowcode\src\App.vue
-->
<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { NMessageProvider, NConfigProvider, NLoadingBarProvider } from 'naive-ui'

import { watchEffect } from 'vue'

const route = useRoute()
watchEffect(() => {
  console.log('当前路由对象：', route)
})
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <n-loading-bar-provider>
        <RouterView />
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
