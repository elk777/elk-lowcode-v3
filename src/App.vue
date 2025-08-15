<!--
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: lyf
 * @LastEditTime: 2025-08-15 16:26:27
 * @FilePath: \v3-admin-lowcode\src\App.vue
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NMessageProvider, NConfigProvider, useLoadingBar } from 'naive-ui'


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

<style scoped>
</style>
