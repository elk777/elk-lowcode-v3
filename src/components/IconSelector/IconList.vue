<!--
 * @Author: elk
 * @Date: 2025-12-08 15:01:08
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-08 15:55:14
 * @FilePath: /elk-lowcode-v3/src/components/IconSelector/IconList.vue
 * @Description: 图标列表
-->
<template>
  <div class="w-100%">
    <n-scrollbar>
      <n-grid>
        <n-grid-item
          class="w-35 h-35 flex items-center justify-center m-20 border border-solid border-color-#dcdfe6 rounded-5 cursor-pointer icon-item"
          span="4"
          v-for="icon in icons"
          :key="icon"
          @click="handleSelectIcon(icon)"
        >
          <SvgIcon :name="icon" />
        </n-grid-item>
      </n-grid>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
// 获取指定目录下的所有svg图标
import { getSvgIcons } from '@/libs/utils/common'
const icons = getSvgIcons()
const emit = defineEmits(['selectIcon'])
/**
 * @description: 处理选择图标
 * @param {string} icon 图标名称
 * @return {*}
 */
const handleSelectIcon = (icon: string) => {
  // 触发选择图标事件
  emit('selectIcon', icon)
}

</script>

<style scoped>
.icon-item:hover {
  /* 拿主题色 */
  /* color: var(--n-primary); */
  border-color: red;
}
</style>
