<!--
 * @Description: 搜索面板组件
 * @Autor: elk
 * @Date: 2025-12-19 10:30:00
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-20 21:47:04
 * @FilePath: /elk-lowcode-v3/src/components/SearchPanel/index.vue
-->
<template>
  <div>
    <!-- 搜索框触发器 -->
    <div
      class="flex items-center px-3 py-2 bg-slate-100 border border-slate-200 rounded-full cursor-pointer group transition-all"
      @click="openSearchPanel"
    >
      <n-icon size="18" class="mx-5 text-gray-400 group-hover:text-gray-600 transition-colors">
        <SearchOutline />
      </n-icon>
      <span class="text-gray-400 group-hover:text-gray-600 transition-colors">搜索</span>
    </div>
    <!-- 搜索Modal -->
    <n-modal
      v-model:show="showSearchPanel"
      :show-icon="false"
      :closable="false"
      :mask-closable="true"
      :close-on-esc="true"
      preset="card"
      segmented
      :style="{ width: '600px' }"
      :on-after-leave="closeSearchPanel"
    >
      <!-- 搜索面板内容 -->
      <div class="w-100% mx-auto">
        <n-input
          v-model:value="searchKeyword"
          placeholder="请输入关键字搜索"
          round
          class="mb-4"
          @keydown="handleKeyDownEvent"
        >
          <template #prefix>
            <n-icon>
              <SearchOutline />
            </n-icon> </template
        ></n-input>
        <!-- 菜单列表 -->
        <n-scrollbar class="mt-5 h-150 max-h-300" ref="searchResultsRef">
          <div v-if="filteredRoutes.length > 0">
            <div
              v-for="(route, index) in filteredRoutes"
              :key="route.path"
              ref="resultItemsRef"
              class="flex my-5 items-center p-2 cursor-pointer rounded transition-all hover:bg-slate-100"
              :class="{ 'bg-slate-100': selectedIndex === index }"
              @click="goToRoute(route)"
              @mouseenter="selectedIndex = index"
            >
              <span class="">{{ route.meta?.title }}</span>
            </div>
          </div>
          <!-- 空状态 -->
          <div v-else class="flex flex-col items-center justify-center py-10 text-gray-500">
            <n-empty description="暂无匹配结果" />
          </div>
        </n-scrollbar>
      </div>
      <!-- 键盘操作提示 -->
      <template #footer>
        <div class="mt-2 text-gray-400 text-center">
          <span>↑↓ 切换选项</span>
          <span class="mx-10">|</span>
          <span>Enter 确定</span>
          <span class="mx-10">|</span>
          <span>ESC 关闭</span>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NIcon, NEmpty } from 'naive-ui'
import { SearchOutline } from '@/libs/utils/icons'
import type { IRouter } from '@/interfaces/routers'
import { useRouterStore } from '@/stores/routers'

const routerStore = useRouterStore()
const sidebarRouter = routerStore.sidebarRouter
const router = useRouter()
const route = useRoute()

// 搜索面板显示状态
const showSearchPanel = ref(false)
// 搜索关键字
const searchKeyword = ref('')
// 选中项索引
const selectedIndex = ref(-1)

// 获取所有路由信息，扁平化处理
const getAllRoutes = () => {
  const allRoutes: IRouter[] = []
  const flattenRoutes = (routes: IRouter[]) => {
    for (const route of routes) {
      if (route.meta && route.meta.title && !route.hidden) {
        allRoutes.push(route)
      }
      if (route.children && route.children.length > 0) {
        flattenRoutes(route.children)
      }
    }
  }

  // 合并静态路由和动态路由
  flattenRoutes(sidebarRouter)
  return allRoutes
}

// 所有可搜索的路由
const allRoutes = ref<IRouter[]>(getAllRoutes())
// 过滤后的路由
const filteredRoutes = computed(() => {
  if (!searchKeyword.value) return []
  const keyword = searchKeyword.value.toLowerCase()
  return allRoutes.value.filter((route) => {
    const title = route.meta?.title?.toString().toLowerCase() || ''
    const path = route.path.toLowerCase()
    return title.includes(keyword) || path.includes(keyword)
  })
})

// 监听过滤结果变化，重置选中索引
watch(filteredRoutes, () => {
  selectedIndex.value = -1
})

// 打开搜索面板
const openSearchPanel = () => {
  showSearchPanel.value = true
}

// 关闭搜索面板
const closeSearchPanel = () => {
  showSearchPanel.value = false
  searchKeyword.value = ''
  selectedIndex.value = -1
}

// 搜索结果容器引用
const searchResultsRef = ref<HTMLElement | null>(null)
const resultItemsRef = ref<HTMLElement[]>([])

// 键盘事件处理
const handleKeyDown = (direction: 'up' | 'down') => {
  if (filteredRoutes.value.length === 0) return

  if (direction === 'down') {
    selectedIndex.value = (selectedIndex.value + 1) % filteredRoutes.value.length
  } else {
    selectedIndex.value =
      (selectedIndex.value - 1 + filteredRoutes.value.length) % filteredRoutes.value.length
  }

  // 滚动到当前选中项
  nextTick(() => {
    const selectedItem = resultItemsRef.value[selectedIndex.value]
    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  })
}

// 回车键处理
const handleEnter = () => {
  if (selectedIndex.value >= 0 && filteredRoutes.value.length > 0) {
    goToRoute(filteredRoutes.value[selectedIndex.value])
  }
}

// 统一键盘事件处理
const handleKeyDownEvent = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      handleKeyDown('down')
      break
    case 'ArrowUp':
      e.preventDefault()
      handleKeyDown('up')
      break
    case 'Enter':
      e.preventDefault()
      handleEnter()
      break
    case 'Escape':
      e.preventDefault()
      closeSearchPanel()
      break
    default:
      break
  }
}

// 路由跳转
const goToRoute = (route: IRouter) => {
  // 如果是目录（有子菜单），跳转到第一个子菜单
  if (route.children && route.children.length > 0) {
    // 找到第一个非隐藏的子菜单
    const firstChild = route.children.find((child) => !child.hidden) || route.children[0]
    router.push(firstChild.path)
  } else {
    // 否则跳转到当前路由
    router.push(route.path)
  }
  closeSearchPanel()
}

// 组件挂载时初始化
onMounted(() => {
  // Modal组件会自动处理点击外部关闭的功能，无需额外的全局点击事件监听
})

// 处理路由变化，关闭搜索面板
watch(
  () => route.path,
  () => {
    closeSearchPanel()
  },
)
</script>

<style scoped>
/* 组件样式 */
</style>
