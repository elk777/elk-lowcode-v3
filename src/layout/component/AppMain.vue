<!--
 * @Description: 中心区域内容
 * @Autor: lyf
 * @Date: 2025-07-08 16:13:48
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-08 16:53:08
 * @FilePath: \v3-admin-lowcode\src\layout\component\AppMain.vue
-->
<template>
  <div class="w-100 h-100">
    <transition>
      <keep-alive>
        <RouterView />
      </keep-alive>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
</style>