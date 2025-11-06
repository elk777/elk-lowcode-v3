/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-10-28 16:23:42
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-04 16:56:11
 * @FilePath: \v3-admin-lowcode\src\stores\routers.ts
 */
import { defineStore } from 'pinia'
import { getRouters } from '@/apis/routers'
import router from '@/router'
import { staticRoutes } from '@/router'
import type { IRouter } from '@/interfaces/routers'
import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'
// 过滤动态路由，将路由字符串转为路由对象
const filterAsyncRoutes = (routes: IRouter[]) => {
  return routes.filter((route) => {
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
// 加载路由组件
const loadView = (view: unknown) => {
  // 使用 import 实现路由懒加载
  return () => import(`@/views/${view}.vue`)
}

export const useRouterStore = defineStore('router', {
  state: () => {
    return {
      routers: [] as IRouter[], // 路由表
      addRouters: [] as IRouter[], // 动态路由表
      sidebarRouter: [] as IRouter[], // 侧边栏路由表
    }
  },
  actions: {
    // 设置路由信息
    setRoutes(routes: IRouter[]) {
      this.routers = routes
      this.addRouters = filterAsyncRoutes(routes)
      this.addRouters.forEach((route: IRouter) => {
        const routeRecordRaw = route as RouteRecordRaw
        router.addRoute(routeRecordRaw)
      })
      this.sidebarRouter = [...staticRoutes, ...this.addRouters].filter(
        (route) => !route.hidden
      ) as IRouter[]
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
