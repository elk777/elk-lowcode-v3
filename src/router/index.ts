/*
 * @Description: 路由配置
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: lyf
 * @LastEditTime: 2025-10-28 16:46:13
 * @FilePath: \v3-admin-lowcode\src\router\index.ts
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

import type { IRouter } from '@/interfaces/routers'

const { VITE_ROUTER_MODE } = import.meta.env

// 静态路由 - 非权限路由
const staticRoutes: IRouter[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      icon: 'login',
    },
  },
]

// 动态路由 - 权限路由
const authRoutes: IRouter[] = []

const router = createRouter({
  history:
    VITE_ROUTER_MODE === 'hash'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes.concat(authRoutes),
})

export default router
