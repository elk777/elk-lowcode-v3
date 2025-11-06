<!--
 * @Description: 中心区域内容
 * @Autor: lyf
 * @Date: 2025-07-08 16:13:48
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-06 11:02:21
 * @FilePath: \v3-admin-lowcode\src\layout\component\AppMain.vue
-->
<template>
  <div class="w-100 h-100">
    <!-- 新版写法 -->
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <!-- 旧版写法 -->
    <!-- <transition>
      <keep-alive>
        <RouterView />
      </keep-alive>
    </transition> -->
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
</style>