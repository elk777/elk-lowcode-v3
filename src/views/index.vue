<!--
 * @Description: 首页内容
 * @Autor: lyf
 * @Date: 2025-06-19 14:14:06
 * @LastEditors: lyf
 * @LastEditTime: 2025-06-25 15:38:20
 * @FilePath: \v3-admin-lowcode\src\views\index.vue
-->
<template>
  <div class="app-con">
    <div class="w-22 h-22 border-4 bg-[#785947]">Index</div>
    <n-space>
      <n-button class="w-22 h-22">Default</n-button>
      <n-button type="tertiary"> Tertiary </n-button>
      <n-button type="primary"> Primary </n-button>
      <n-button type="info"> Info </n-button>
      <n-button type="success"> Success </n-button>
      <n-button type="warning"> Warning </n-button>
      <n-button type="error" @click="onIncrement"> Error </n-button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

// 解构取值 - 破坏了响应式，不推荐使用
const { count, doubleCount, increment } = counterStore

console.log('🚀 ~ count:', counterStore.count)
// counterStore.$reset()
// counterStore.count = 100
counterStore.$patch({
  count: 100,
})

// 直接取值 - 推荐使用
console.log('🚀 ~ count-100:', counterStore.count)
// console.log('🚀 ~ doubleCount:', counterStore.doubleCount)
// const onIncrement = () => {
//   counterStore.increment()
//   console.log('🚀 ~ count-increment:', counterStore.count)
//   console.log('🚀 ~ doubleCount-increment:', counterStore.doubleCount)
// }
</script>

<style scoped lang="scss"></style>