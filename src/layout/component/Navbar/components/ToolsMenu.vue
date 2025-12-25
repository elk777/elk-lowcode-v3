<!--
 * @Description: 顶部工具栏导航
 * @Autor: lyf
 * @Date: 2025-11-07 14:30:30
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-24 16:53:42
 * @FilePath: /elk-lowcode-v3/src/layout/component/Navbar/components/ToolsMenu.vue
-->
<template>
  <div class="flex items-center">
    <!-- 搜索框 -->
    <div class="w-100 mr-3">
      <SearchPanel />
    </div>
    <!-- 配置 -->
    <div class="mr-3">
      <n-button quaternary circle>
        <template #icon>
          <n-icon :size="20"><SettingsOutline /></n-icon>
        </template>
      </n-button>
    </div>
    <!-- 明亮/暗色切换 -->
    <div class="mr-3">
      <n-button quaternary circle @click="handleDarkMode">
        <template #icon>
          <n-icon :size="20">
            <SunnyOutline v-if="!appStore.isDarkMode" />
            <Moon v-else />
          </n-icon>
        </template>
      </n-button>
    </div>
    <!-- 全屏模式 -->
    <div class="mr-3">
      <n-button quaternary circle @click="handleFullscreen">
        <template #icon>
          <n-icon :size="20">
            <FullScreenMaximize24Filled v-if="!isFullscreen" />
            <FullScreenMinimize24Regular v-else />
          </n-icon>
        </template>
      </n-button>
    </div>
    <!-- 通知 -->
    <div class="mr-3">
      <n-button quaternary circle>
        <template #icon>
          <n-icon :size="20"><NotificationsOutline /></n-icon>
        </template>
      </n-button>
    </div>
    <!-- 头像信息 -->
    <div class="ml-5 mr-10 flex">
      <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <n-avatar
          bordered
          round
          size="medium"
          src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp"
        />
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { NIcon, NButton, NDropdown, NAvatar } from 'naive-ui'
import {
  SearchOutline,
  SunnyOutline,
  Moon,
  FullScreenMaximize24Filled,
  FullScreenMinimize24Regular,
  NotificationsOutline,
  SettingsOutline,
} from '@/libs/utils/icons'
import { useAuthStore } from '@/stores/auth'
import SearchPanel from '@/components/SearchPanel/index.vue'
import { useAppStore } from '@/stores/app'
const message = inject('$message')
const dialog = inject('$dialog')
const isFullscreen = ref(false)
const appStore = useAppStore()
const options = ref([
  {
    label: '个人中心',
    key: '1',
  },
  {
    label: '退出登录',
    key: '2',
  },
])
/**
 * @description: 处理选择事件
 * @param {*} key 选项键值
 * @return {*}
 */
const handleSelect = (key: string) => {
  if (key === '1') {
    console.log('个人中心')
  } else if (key === '2') {
    // 执行退出逻辑
    const authStore = useAuthStore()
    dialog.info({
      title: '提示',
      showIcon: false,
      content: '是否确定退出登录？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        await authStore.LoginOut()
        location.href = '/index'
        message.success('登出成功')
      },
    })
  }
}

/**
 * @description: 处理全屏切换事件
 * @return {*}
 */
const handleFullscreen = () => {
  // 处理全屏切换事件-需要检测ESC键退出全屏
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      isFullscreen.value = false
    }
  })
  if (document.fullscreenElement) {
    document.exitFullscreen()
    isFullscreen.value = false
  } else {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  }
}

/**
 * @description: 处理暗黑模式切换事件
 * @return {*}
 */
const handleDarkMode = () => {
  appStore.toggleDarkMode()
}
</script>

<style scoped></style>
