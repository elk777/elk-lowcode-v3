<!--
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-01 14:08:15
 * @FilePath: /elk-lowcode-v3/src/App.vue
-->
<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { NMessageProvider, NConfigProvider, useLoadingBar } from 'naive-ui'

import { watchEffect } from 'vue'

const route = useRoute()
watchEffect(() => {
  console.log('当前路由对象：', route)
})
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <n-loading-bar>
        <RouterView />
      </n-loading-bar>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
