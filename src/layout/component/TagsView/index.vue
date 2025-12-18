<!--
 * @Description: 标签导航栏
 * @Autor: lyf
 * @Date: 2025-11-11 14:47:31
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-18 16:52:11
 * @FilePath: /elk-lowcode-v3/src/layout/component/TagsView/index.vue
-->
<template>
  <div class="h-50">
    <!-- 标签栏 -->
    <n-tabs
      v-model:value="activeName"
      size="small"
      type="card"
      closable
      @close="removeTab"
      @update-value="updateTab"
    >
      <n-tab-pane
        v-for="item in tagsViewStore.visitedViews"
        :key="item.path"
        :name="item.path"
        :closable="tabClosable(item)"
      >
        <template #tab>
          <div @contextmenu="(e) => handleContextMenu(e, item.path)">
            {{ item.meta.title }}
          </div>
        </template>
      </n-tab-pane>
    </n-tabs>
    <!-- 右键菜单 -->
    <n-popover
      v-model:show="showContextMenu"
      :show-arrow="false"
      placement="bottom-start"
      trigger="click"
      :x="menuPosition.x"
      :y="menuPosition.y"
      style="padding: 2px; width: 120px"
    >
      <!-- <div class="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-md"> -->
      <div
        class="flex justify-center p-10 px-5 flex items-center cursor-pointer text-14 transition-all hover:bg-[rgba(0,0,0,0.05)]"
        @click="refreshCurrent"
      >
        <NIcon class="mr-2" :size="16">
          <Reload />
        </NIcon>
        <span class="ml-2">刷新当前</span>
      </div>
      <div
        class="flex justify-center p-10 px-5 flex items-center cursor-pointer text-14 transition-all hover:bg-[rgba(0,0,0,0.05)]"
        @click="closeCurrent"
      >
        <NIcon class="mr-2" :size="16">
          <Close />
        </NIcon>
        <span class="ml-2">关闭当前</span>
      </div>
      <div
        class="flex justify-center p-10 px-5 flex items-center cursor-pointer text-14 transition-all hover:bg-[rgba(0,0,0,0.05)]"
        @click="closeOther"
      >
        <NIcon class="mr-2" :size="16">
          <MinusOutlined />
        </NIcon>
        <span class="ml-2">关闭其他</span>
      </div>
      <!-- <div
        class="p-10 flex items-center cursor-pointer text-14 transition-all hover:bg-[rgba(0,0,0,0.05)]"
        @click="closeRight"
      >
        <NIcon class="mr-2" :size="16" />
        <CloseCircle />
        <span class="ml-2">关闭右侧</span>
      </div>
      <div
        class="p-10 flex items-center cursor-pointer text-14 transition-all hover:bg-[rgba(0,0,0,0.05)]"
        @click="closeLeft"
      >
        <NIcon class="mr-2" :size="16" />
        <CloseCircle />
        <span class="ml-2">关闭左侧</span>
      </div> -->
      <div
        class="flex justify-center p-10 px-5 flex items-center cursor-pointer text-14 transition-all hover:bg-[rgba(0,0,0,0.05)]"
        @click="closeAll"
      >
        <NIcon class="mr-2" :size="16">
          <ArrowSwap24Regular />
        </NIcon>
        <span class="ml-2">关闭所有</span>
      </div>
      <!-- </div> -->
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { useTagsViewStore } from '@/stores/tagsview'
import { NIcon } from 'naive-ui'
import { Reload, Close } from '@vicons/ionicons5'
import { MinusOutlined } from '@vicons/antd'
import { ArrowSwap24Regular } from '@vicons/fluent'
const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()
const defaultPath = route.path
const activeName = ref(defaultPath)

// 右键菜单相关
const showContextMenu = ref(false)
const menuPosition = ref({ x: 0, y: 0 })
const currentPath = ref(activeName.value)

const addTags = () => {
  const { path } = route
  if (path) {
    tagsViewStore.addView(route)
  }
}
addTags()

/**
 * @description: 标签页导航删除图标显隐
 * @param {*} computed
 * @return {*}
 * @author: lyf
 */
const tabClosable = computed(() => {
  return (route: RouteLocationNormalizedLoadedGeneric) => {
    if (route.meta.affix || tagsViewStore.visitedViews.length <= 1) {
      return false
    }
    return true
  }
})
watch(
  () => route.path,
  (path) => {
    activeName.value = path
    addTags()
  },
)

const updateTab = (path: string) => {
  //  路由跳转
  router.push(path)
}
const removeTab = (path: string) => {
  if (path) {
    tagsViewStore.delView(path)
  }
}

// 右键菜单事件处理
const handleContextMenu = (e: MouseEvent, path: string) => {
  e.preventDefault()
  e.stopPropagation()

  // 设置当前点击的标签路径
  currentPath.value = path

  // 设置菜单位置
  menuPosition.value = {
    x: e.clientX,
    y: e.clientY,
  }

  showContextMenu.value = true
}

// 刷新当前标签
const refreshCurrent = () => {
  showContextMenu.value = false
  // 通过重新导航到当前路径实现刷新
  router.replace({
    path: currentPath.value,
    query: {
      ...route.query,
      t: Date.now(), // 添加时间戳确保刷新
    },
  })
}

// 关闭当前标签
const closeCurrent = () => {
  tagsViewStore.delView(currentPath.value)
  showContextMenu.value = false
}

// 关闭其他标签
const closeOther = () => {
  tagsViewStore.delOtherViews(currentPath.value)
  showContextMenu.value = false
}

// 关闭右侧标签
// const closeRight = () => {
//   tagsViewStore.delRightViews(currentPath.value)
//   showContextMenu.value = false
// }

// 关闭左侧标签
// const closeLeft = () => {
//   tagsViewStore.delLeftViews(currentPath.value)
//   showContextMenu.value = false
// }

// 关闭所有标签
const closeAll = () => {
  tagsViewStore.delAllViews()
  showContextMenu.value = false
}

// 点击页面其他地方关闭菜单
window.addEventListener('click', () => {
  showContextMenu.value = false
})
</script>
