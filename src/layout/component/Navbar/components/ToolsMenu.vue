<!--
 * @Description: 顶部工具栏导航
 * @Autor: lyf
 * @Date: 2025-11-07 14:30:30
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-07 16:55:48
 * @FilePath: \v3-admin-lowcode\src\layout\component\Navbar\components\ToolsMenu.vue
-->
<template>
  <div class="flex items-center">
    <!-- 搜索框 -->
    <div>
      <n-input placeholder="搜索" round>
        <template #prefix>
          <n-icon>
            <SearchOutline />
          </n-icon>
        </template>
      </n-input>
    </div>
    <!-- 明亮/暗色切换 -->
    <n-icon :size="25">
      <SearchOutline />
    </n-icon>
    <!-- 全屏模式 -->
    <n-icon :size="25">
      <SearchOutline />
    </n-icon>
    <!-- 通知 -->
    <n-icon :size="25">
      <SearchOutline />
    </n-icon>
    <!-- 配置 -->
    <n-icon :size="25">
      <SearchOutline />
    </n-icon>
    <!-- 头像信息 -->
  </div>
</template>

<script setup lang="ts">
import { NInput, NIcon } from "naive-ui";
import { SearchOutline } from "@/libs/utils/icons";
// import { SearchOutline } from "@vicons/ionicons5";
</script>

<style scoped></style>
