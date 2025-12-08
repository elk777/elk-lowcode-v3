/*
 * @Description: app 整体配置
 * @Autor: lyf
 * @Date: 2025-07-10 14:50:33
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-05 14:55:09
 * @FilePath: /elk-lowcode-v3/src/stores/app.ts
 */
import { defineStore } from 'pinia'
// 定义State类型
interface AppState {
  collapsed: boolean
  fixedNavbar: boolean
  fixedTagsView: boolean
}
// 定义Actions类型
interface AppActions {
  toggleCollapse(collapsed: boolean): void
  toggleFixedNavbar(): void
  toggleFixedTagsView(): void
}

export const useAppStore = defineStore<'app', AppState, Record<string, never>, AppActions>('app',  {
  state: (): AppState => {
    return {
      collapsed: false, // 侧边栏是否折叠
      fixedNavbar: true, // 顶部工具栏是否固定
      fixedTagsView: true, // 页面标签栏是否固定
    }
  },
  actions: {
    toggleCollapse(collapsed: boolean): void {
      this.collapsed = collapsed
    },
    toggleFixedNavbar() {
      this.fixedNavbar = !this.fixedNavbar
    },
    toggleFixedTagsView() {
      this.fixedTagsView = !this.fixedTagsView
    },
  },
  // 持久化
  persist: true,
})
