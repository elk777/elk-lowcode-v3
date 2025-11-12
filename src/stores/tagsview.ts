/*
 * @Description: 导航标签栏记录
 * @Autor: lyf
 * @Date: 2025-11-11 15:30:52
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-12 15:44:43
 * @FilePath: \v3-admin-lowcode\src\stores\tagsview.ts
 */

import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import router from '@/router'

export const useTagsViewStore = defineStore('tagsView', {
  state: () => {
    return {
      visitedViews: [] as RouteLocationNormalizedLoadedGeneric[], // 已访问的页面
      cachedViews: [], // 缓存的页面
    }
  },
  actions: {
    addView(view: RouteLocationNormalizedLoadedGeneric) {
      // 防止添加重复的页面
      if (this.visitedViews.some((v) => v.path === view.path)) return
      this.visitedViews.push(Object.assign({}, view))
    },
    delView(path: string) {
      // 获取下标位置，然后通过splice方法删除
      const index = this.visitedViews.findIndex((v) => v.path === path)
      const isDelCurrentTab = Object.is(path, this.visitedViews[index].path)
      this.visitedViews.splice(index, 1)
      // 如果删除的标签是正在选中的标签，则跳转到第一个标签
      if (isDelCurrentTab) {
        router.push(this.visitedViews[Math.max(0, this.visitedViews.length - 1)])
      }
    },
  },
  // 持久化
  persist: false,
})
