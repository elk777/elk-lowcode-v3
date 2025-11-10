<!--
 * @Author: elk
 * @Date: 2025-11-08 14:01:59
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-10 20:48:40
 * @FilePath: /elk-lowcode-v3/src/layout/component/Navbar/components/Breadcrumb.vue
 * @Description: 面包屑导航
-->
<template>
  <div>
    <n-breadcrumb separator="/">
      <n-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
        <span v-if="item.redirect || index === breadcrumb.length - 1">{{ item.meta.title }}</span>
        <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationMatched } from 'vue-router'
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
const route = useRoute()

const breadcrumb = ref<RouteLocationMatched[]>([]) 
/** 
 * @description: 获取面包屑导航
 * @return {*}
 */
const getBreadcrumb = () => {
  const matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]
  if (first && first.path !== '/') {
    matched.unshift({ path: '/', meta: { title: '首页' } })
  }
  breadcrumb.value = matched
}
getBreadcrumb();

// 监听路由变化
watchEffect(() => {
  // 排除重定向路由
  if (!route.redirectedFrom) {
    getBreadcrumb()
  }
})
</script>

<style scoped></style>
