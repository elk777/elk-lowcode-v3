/*
 * @Description: app 整体配置
 * @Autor: lyf
 * @Date: 2025-07-10 14:50:33
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-24 16:51:18
 * @FilePath: /elk-lowcode-v3/src/stores/app.ts
 */
import { defineStore } from 'pinia'
// 定义State类型
interface AppState {
  collapsed: boolean
  fixedNavbar: boolean
  fixedTagsView: boolean
  isDarkMode: boolean
}
// 定义Actions类型
interface AppActions {
  toggleCollapse(collapsed: boolean): void
  toggleFixedNavbar(): void
  toggleFixedTagsView(): void
  toggleDarkMode(): void
}

export const useAppStore = defineStore<'app', AppState, Record<string, never>, AppActions>('app', {
  state: (): AppState => {
    return {
      collapsed: false, // 侧边栏是否折叠
      fixedNavbar: true, // 顶部工具栏是否固定
      fixedTagsView: true, // 页面标签栏是否固定
      isDarkMode: false, // 是否暗黑模式
    }
  },
  actions: {
    /**
     * @description: 切换侧边栏折叠状态
     * @return {*}
     */
    toggleCollapse(collapsed: boolean): void {
      this.collapsed = collapsed
    },
    /**
     * @description: 切换顶部工具栏固定状态
     * @return {*}
     */
    toggleFixedNavbar() {
      this.fixedNavbar = !this.fixedNavbar
    },

    /**
     * @description: 切换页面标签栏固定状态
     * @return {*}
     */
    toggleFixedTagsView() {
      this.fixedTagsView = !this.fixedTagsView
    },
    /**
     * @description: 切换暗黑模式
     * @return {*}
     */
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    }
  },
  // 持久化
  persist: true,
})
