/*
 * @Description: 路由守卫配置
 * @Autor: lyf
 * @Date: 2025-07-07 14:51:00
 * @LastEditors: elk
 * @LastEditTime: 2025-11-08 14:37:58
 * @FilePath: /elk-lowcode-v3/src/router/permission.ts
 */
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useRouterStore } from '@/stores/routers'
import { createDiscreteApi } from 'naive-ui'
const { loadingBar } = createDiscreteApi(['loadingBar'])
/* 
    路由权限的控制
    1.开启全局前置守卫
      + token存在
        + 路径来源是否为login：如果是直接放行
        + 路径来源不是login：
            + 角色列表是否为空 store.getters.roles.length === 0
                去获取getInfo 然后动态获取routers
            + 直接放行
      + token不存在
        + 是否在白名单：在白名单 直接通过进入
        + 不在白名单： 重定向到登录界面
*/

const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, form, next) => {
  loadingBar.start()
  // 进行token验证，跳转登录
  const token = useAuthStore().getToken(),
    roles = useAuthStore().roles
  // console.log("🚀 ~ roles:", roles)
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      loadingBar.finish()
    } else {
      if (roles.length === 0) {
        try {
          await useAuthStore().GetUserInfo()
          await useRouterStore().GenerateRoutes()
          next()
        } catch (err) {
          console.log('🚀 ~ err:', err)
          await useAuthStore().LoginOut()
          next('/login')
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      loadingBar.finish()
    }
  }
})

router.afterEach(() => {
  loadingBar.finish()
})
