/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-10-28 16:23:42
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-01 13:17:35
 * @FilePath: /elk-lowcode-v3/src/stores/routers.ts
 */
import { defineStore } from 'pinia'
import { getRouters } from '@/apis/routers'
import router from '@/router'
import type { IRouter } from '@/interfaces/routers'
import Layout from '@/layout/index.vue'

const { VITE_NODE_ENV } = import.meta.env
// 过滤动态路由，将路由字符串转为路由对象
const filterAsyncRoutes = (routes: IRouter[]) => {
  return routes.filter((route) => {
    console.log("🚀 ~ filterAsyncRoutes ~ route:", route)
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children) {
      route.children = filterAsyncRoutes(route.children)
    }
    return true
  })
}
const loadView = (view: unknown) => {
  console.log('🚀 ~ loadView ~ view:', view)
  // if (VITE_NODE_ENV === 'development') {
  //   return (resolve: string) => require([`@/views/${view}`], resolve)
  // } else {
  // 使用 import 实现生产环境的路由懒加载
  return () => import(`@/views/${view}.vue`)
  // }
}
export const useRouterStore = defineStore('router', {
  state: () => {
    return {
      routers: [], // 路由表
      addRouters: [], // 动态路由表
      sidebarRouter: [], // 侧边栏路由表
    }
  },
  actions: {
    // 设置路由信息
    setRoutes(routes: IRouter[]) {
      this.routers = routes
      this.addRouters = filterAsyncRoutes(routes)
      this.sidebarRouter = routes
      console.log('🚀 ~ this.addRouters:', this.addRouters)
      // console.log('🚀 ~ routes:', routes)
      this.addRouters.forEach((route: any) => {
        router.addRoute(route)
        console.log('🚀 ~ router:', router.getRoutes())
      })
    },
    // 获取路由信息
    async GenerateRoutes() {
      try {
        const { data: routes } = await getRouters()
        this.setRoutes(routes)
        return routes
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
  // 持久化
  persist: true,
})
