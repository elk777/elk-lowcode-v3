/*
 * @Description: 导航标签栏记录
 * @Autor: lyf
 * @Date: 2025-11-11 15:30:52
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-11 16:33:38
 * @FilePath: \v3-admin-lowcode\src\stores\tagsview.ts
 */

import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'

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
      this.visitedViews = this.visitedViews.filter((v) => {
        return v.path !== path
      })
    },
  },
  // 持久化
  persist: false,
})
