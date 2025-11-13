<!-- SvgIcon.vue -->
<template>
  <div v-if="svgContent" v-html="svgContent" />
  <n-icon v-else>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
    </svg>
  </n-icon>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSvgIcon } from '@/libs/utils/icons'

const props = defineProps<{
  name: string
  size?: number | string
}>()

const svgContent = computed(() => getSvgIcon(props.name))
</script>

<style scoped>
:deep(svg) {
  width: v-bind(size);
  height: v-bind(size);
}
</style>