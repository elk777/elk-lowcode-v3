/*
 * @Description: 权限模块 - token
 * @Autor: lyf
 * @Date: 2025-06-25 16:15:00
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-08 14:41:00
 * @FilePath: /elk-lowcode-v3/src/stores/auth.ts
 */

import { defineStore } from 'pinia'
import { login, loginOut, getUserInfo } from '@/apis/login'
import type { ILoginParams, IUserInfo } from '@/interfaces/login'
import type { IResponse } from '@/interfaces/response'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '', // 用户登录凭证
    userInfo: {}, // 用户基本信息
    name: '', // 用户名称
    avatar: '', // 用户头像地址
    roles: [], // 用户所属角色列表
    permissions: [], // 用户权限列表
  }),
  actions: {
    // 设置token
    setToken(token: string) {
      this.token = token
    },
    // 获取token
    getToken() {
      return this.token
    },
    // 重置token
    resetToken() {
      this.token = ''
    },
    // 重置用户信息
    resetUserInfo() {
      this.userInfo = {}
      this.name = ''
      this.avatar = ''
      this.roles = []
      this.permissions = []
    },
    // 设置用户信息
    setUserInfo(userInfo: IUserInfo) {
      this.name = userInfo.name
      this.avatar = userInfo.avatar
      this.roles = userInfo.roles
      this.permissions = userInfo.permissions
    },
    // 登录处理
    async Login(data: ILoginParams): Promise<IResponse> {
      try {
        const res = await login(data)
        this.setToken(res.data as string)
        return res
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 登出处理
    async LoginOut() {
      try {
        const res = await loginOut()
        this.resetToken()
        this.resetUserInfo()
        return res
      } catch (error) {
        Promise.reject(error)
      }
    },
    // 获取用户信息
    async GetUserInfo() {
      try {
        const userInfo = await getUserInfo()
        this.setUserInfo(userInfo.data)
        return userInfo
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
  // 持久化
  persist: true,
})
