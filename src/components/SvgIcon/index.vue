<!--
 * @Description: svg图标
 * @Autor: lyf
 * @Date: 2025-11-14 13:59:34
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-08 14:55:50
 * @FilePath: /elk-lowcode-v3/src/components/SvgIcon/index.vue
-->
<template>
  <n-icon :size="size">
    <svg aria-hidden="true">
      <use :xlink:href="svgContent" :fill="props.color" />
    </svg>
  </n-icon>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { computed } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 20,
  },
  color: {
    type: String,
    default: "currentColor",
  },
});

const svgContent = computed(() => `#icon-${props.name}`);
</script>

<style scoped></style>
