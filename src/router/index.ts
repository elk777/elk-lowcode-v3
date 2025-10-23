/*
 * @Description: 路由配置
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: lyf
 * @LastEditTime: 2025-10-23 17:13:37
 * @FilePath: \v3-admin-lowcode\src\router\index.ts
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

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
      path: '',
      redirect: '/workbench',
      component: Layout,
      children: [
        {
          path: '/workbench',
          name: 'workbench',
          component: () => import('@/views/workbench.vue'),
          meta: {
            title: '首页',
            icon: 'home',
            keepAlive: true,
          },
        },
      ],
    },
  ],
})

export default router
