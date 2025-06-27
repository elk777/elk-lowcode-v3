/*
 * @Description: 权限模块 - token
 * @Autor: lyf
 * @Date: 2025-06-25 16:15:00
 * @LastEditors: lyf
 * @LastEditTime: 2025-06-25 16:32:30
 * @FilePath: \v3-admin-lowcode\src\stores\auth.ts
 */

import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    getToken() {
      return this.token
    },
    resetToken() {
      this.token = ''
    },
  },
  // 持久化
  persist: true,
})
