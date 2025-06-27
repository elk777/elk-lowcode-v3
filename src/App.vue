<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NMessageProvider, NConfigProvider } from 'naive-ui'
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
