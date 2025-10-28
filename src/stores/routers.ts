import { defineStore } from 'pinia'
import { getRouters } from '@/apis/routers'

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
    setRoutes(routes: any) {
      this.routers = routes
      this.addRouters = routes
      this.sidebarRouter = routes
    },
    // 获取路由信息
    async GenerateRoutes() {
      try {
        const routes = await getRouters()
        this.setRoutes(routes.data)
        return routes
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
})
