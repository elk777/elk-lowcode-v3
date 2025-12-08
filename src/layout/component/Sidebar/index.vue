<!--
 * @Description: 侧边导航栏
 * @Autor: lyf
 * @Date: 2025-07-09 14:51:50
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-24 16:49:30
 * @FilePath: /elk-lowcode-v3/src/layout/component/Sidebar/index.vue
-->
<template>
  <div class="h-100vh">
    <Logo />
    <Menu />
  </div>
</template>

<script setup lang="ts">
import Logo from './components/Logo.vue'
import Menu from './components/Menu.vue'
</script>
<style scoped>
</style>