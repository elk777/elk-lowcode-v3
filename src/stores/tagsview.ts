/*
 * @Description: 导航标签栏记录
 * @Autor: lyf
 * @Date: 2025-11-11 15:30:52
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-18 16:48:22
 * @FilePath: /elk-lowcode-v3/src/stores/tagsview.ts
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
    /**
     * @description: 添加标签
     * @param {RouteLocationNormalizedLoadedGeneric} view
     * @return {*}
     */    
    addView(view: RouteLocationNormalizedLoadedGeneric) {
      // 防止添加重复的页面
      if (this.visitedViews.some((v) => v.path === view.path)) return
      this.visitedViews.push(Object.assign({}, view))
    },
    /**
     * @description: 删除指定标签
     * @param {string} path
     * @return {*}
     */    
    delView(path: string) {
      // 如果当前标签是固定标签，无法进行删除
      if (this.visitedViews.some((v) => v.path === path && v.meta.affix)) return
      // 获取下标位置，然后通过splice方法删除
      const index = this.visitedViews.findIndex((v) => v.path === path)
      const isDelCurrentTab = Object.is(path, this.visitedViews[index].path)
      this.visitedViews.splice(index, 1)
      // 如果删除的标签是正在选中的标签，则跳转到第一个标签
      if (isDelCurrentTab) {
        router.push(this.visitedViews[Math.max(0, this.visitedViews.length - 1)])
      }
    },
    /**
     * @description: 删除当前标签以外的所有标签
     * @param {string} path
     * @return {*}
     */    
    delOtherViews(path: string) {
      // 关闭当前标签以外的所有标签
      const index = this.visitedViews.findIndex((v) => v.path === path)
      // 过滤出当前标签和固定标签
      this.visitedViews = this.visitedViews.filter((v, i) => {
        return v.meta.affix || i === index
      })
    },
    /**
     * @description: 删除当前标签右侧的所有标签
     * @param {string} path
     * @return {*}
     */    
    delRightViews(path: string) {
      // 关闭当前标签右侧的所有标签
      const index = this.visitedViews.findIndex((v) => v.path === path)
      if (index < this.visitedViews.length - 1) {
        this.visitedViews.splice(index + 1)
      }
    },
    /**
     * @description: 删除当前标签左侧的所有标签
     * @param {string} path
     * @return {*}
     */    
    delLeftViews(path: string) {
      // 关闭当前标签左侧的所有标签
      const index = this.visitedViews.findIndex((v) => v.path === path)
      if (index > 0) {
        // 过滤出固定标签和当前及右侧标签
        this.visitedViews = this.visitedViews.filter((v, i) => {
          return v.meta.affix || i >= index
        })
      }
    },
    /**
     * @description: 删除所有标签，只保留固定标签
     * @return {*}
     */    
    delAllViews() {
      // 关闭所有标签，只保留固定标签
      this.visitedViews = this.visitedViews.filter((v) => v.meta.affix)
      // 如果当前路由不在保留的标签中，跳转到第一个保留的标签
      const currentPath = router.currentRoute.value.path
      const hasCurrentPath = this.visitedViews.some((v) => v.path === currentPath)
      if (!hasCurrentPath && this.visitedViews.length > 0) {
        router.push(this.visitedViews[0])
      }
    },
  },
  // 持久化
  persist: false,
})
