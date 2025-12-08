<!--
 * @Author: elk
 * @Date: 2025-12-05 15:42:00
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-08 16:21:07
 * @FilePath: /elk-lowcode-v3/src/components/IconSelector/index.vue
 * @Description: 图标选择器
-->
<template>
  <div class="icon-selector">
    <n-popover placement="bottom" trigger="click" :show="open">
      <template #trigger>
        <n-input
          v-model:value="selectedIcon"
          placeholder="请选择图标"
          @focus="open = true"
          @blur="open = false"
        >
          <template #prefix>
            <SvgIcon class="mr-5" :name="iconSvg" />
          </template>
        </n-input>
      </template>
      <template #header>
        <h3>图标选择器</h3>
      </template>
      <template #default>
        <IconList @selectIcon="handleSelectIcon" class="h-250px" />
      </template>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import IconList from './IconList.vue'
const props = defineProps({
  icon: {
    type: String,
    default: 'default',
  },
})
const emit = defineEmits(['getIcon'])
let iconSvg = props.icon || ref('default')
const open = ref<boolean>(false)
let selectedIcon = props.icon || ref('')

/**
 * @description: 处理选择图标
 * @param {string} icon 图标名称
 * @return {*}
 */
const handleSelectIcon = (iconParams: string) => {
  if (typeof selectedIcon === 'string') {
    selectedIcon = iconParams
  } else {
    selectedIcon.value = iconParams
  }
  if (typeof iconSvg === 'string') {
    iconSvg = iconParams
  } else {
    iconSvg.value = iconParams
  }
  emit('getIcon', iconParams)
}
</script>

<style scoped></style>
