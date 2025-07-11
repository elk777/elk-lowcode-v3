/*
 * @Description: 路由守卫配置
 * @Autor: lyf
 * @Date: 2025-07-07 14:51:00
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-07 14:57:18
 * @FilePath: \v3-admin-lowcode\src\router\permission.ts
 */
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

router.beforeEach((to, form, next) => {
  // 进行token验证，跳转登录
  const token = useAuthStore().getToken()
  console.log('🚀 ~ router.beforeEach ~ token:', token)
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
