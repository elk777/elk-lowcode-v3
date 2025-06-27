/*
 * @Description: 路由配置
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: lyf
 * @LastEditTime: 2025-06-25 17:23:21
 * @FilePath: \v3-admin-lowcode\src\router\index.ts
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import index from '@/views/index.vue'
// import login from '@/views/login.vue'

const { VITE_ROUTER_MODE } = import.meta.env

const router = createRouter({
  history:
    VITE_ROUTER_MODE === 'hash'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      name: 'index',
      component: index,
      meta: {
        title: '首页',
        icon: 'home',
      },
    },
  ],
})

export default router
