/*
 * @Description: app 整体配置
 * @Autor: lyf
 * @Date: 2025-07-10 14:50:33
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-10 14:53:08
 * @FilePath: \v3-admin-lowcode\src\stores\app.ts
 */
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      collapse: true, // 侧边栏是否折叠
    }
  },
  actions: {
    toggleCollapse() {
      this.collapse = !this.collapse
    },
  },
  //   持久化
  //   persist: true,
})
