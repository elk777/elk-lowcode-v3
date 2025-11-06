/*
 * @Description: app 整体配置
 * @Autor: lyf
 * @Date: 2025-07-10 14:50:33
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-06 14:30:27
 * @FilePath: \v3-admin-lowcode\src\stores\app.ts
 */
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      collapsed: false, // 侧边栏是否折叠
    }
  },
  actions: {
    toggleCollapse(collapsed: boolean) {
      this.collapsed = collapsed
    },
  },
  // 持久化
  persist: true,
})
