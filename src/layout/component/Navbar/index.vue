<!--
 * @Description: 顶部导航栏
 * @Autor: lyf
 * @Date: 2025-11-07 14:18:57
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-07 15:21:36
 * @FilePath: \v3-admin-lowcode\src\layout\component\Navbar\index.vue
-->

<template>
  <div
    class="w-100% h-50 flex items-center bg-white shadow-[0px_1px_4px_rgba(0,21,41,0.08)]"
  >
    <!-- 面包屑 -->
    <Breadcrumb />
    <!-- 工具栏 -->
    <ToolsMenu />
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "./components/Breadcrumb.vue";
import ToolsMenu from "./components/ToolsMenu.vue";
</script>

<style scoped></style>
