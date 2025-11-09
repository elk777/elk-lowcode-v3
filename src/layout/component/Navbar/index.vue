<!--
 * @Description: 顶部导航栏
 * @Autor: lyf
 * @Date: 2025-11-07 14:18:57
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-08 15:23:19
 * @FilePath: /elk-lowcode-v3/src/layout/component/Navbar/index.vue
-->

<template>
  <div
    class="w-100% h-50 flex items-center justify-between bg-white shadow-[0px_1px_4px_rgba(0,21,41,0.08)]"
  >
    <!-- 面包屑 -->
    <Breadcrumb />
    <!-- 工具栏 -->
    <ToolsMenu />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb.vue'
import ToolsMenu from './components/ToolsMenu.vue'
</script>

<style scoped></style>
