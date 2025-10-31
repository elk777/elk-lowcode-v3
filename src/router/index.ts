/*
 * @Description: 路由配置
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: lyf
 * @LastEditTime: 2025-10-29 17:25:16
 * @FilePath: \v3-admin-lowcode\src\router\index.ts
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import type { IRouter } from '@/interfaces/routers'
const { VITE_ROUTER_MODE } = import.meta.env
import Layout from '@/layout/index.vue'
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
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'dashboard',
    },
    redirect: '/workbench',
    children: [
      {
        path: '/workbench',
        name: 'workbench',
        component: () => import('@/views/workbench.vue'),
        meta: {
          title: '分析页',
          icon: 'home',
        },
      },
      {
        path: '/workbench',
        name: 'workbench',
        component: () => import('@/views/workbench.vue'),
        meta: {
          title: '分析页',
          icon: 'home',
        },
      },
    ],
  },
]

const router = createRouter({
  history:
    VITE_ROUTER_MODE === 'hash'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
})

export default router
