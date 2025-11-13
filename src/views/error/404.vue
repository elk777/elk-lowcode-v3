<!--
 * @Description: 404页面
 * @Autor: lyf
 * @Date: 2025-11-13 15:59:50
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-13 16:26:01
 * @FilePath: \v3-admin-lowcode\src\views\error\404.vue
-->

<template>
  <div class="flex justify-center items-center">
    <div class="flex items-center justify-center gap-8 p-4">
      <div class="text-center">
        <div class="text-120 font-bold text-blue-500">404</div>
        <div class="text-30 font-semibold mt-2 text-gray-700">页面未找到</div>
      </div>

      <div class="hidden md:block bg-gray-300"></div>

      <div class="flex flex-col justify-between items-start md:text-left">
        <h2 class="text-12 font-semibold">抱歉，您访问的页面不存在</h2>
        <p class="text-15">请检查您输入的网址是否正确，或点击下方按钮返回首页。</p>
        <n-button type="primary" @click="goHome" size="small"> 返回首页 </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>
