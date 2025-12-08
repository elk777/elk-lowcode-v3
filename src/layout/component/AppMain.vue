<!--
 * @Description: 中心区域内容
 * @Autor: lyf
 * @Date: 2025-07-08 16:13:48
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-05 15:11:52
 * @FilePath: /elk-lowcode-v3/src/layout/component/AppMain.vue
-->
<template>
  <div class="w-100% h-100vh overflow-auto">
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