/*
 * @Description: 请求封装
 * @Autor: lyf
 * @Date: 2025-06-19 14:32:14
 * @LastEditors: lyf
 * @LastEditTime: 2025-06-25 16:49:42
 * @FilePath: \v3-admin-lowcode\src\libs\utils\request.ts
 */
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 请求前处理逻辑
    // 验证 token
    const token = useAuthStore().getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      // 跳转登录
      router.push('/login')
    }

    return config
  },
  function (error) {
    // 请求错误处理逻辑
    return Promise.reject(error)
  },
)

// 请求响应器
request.interceptors.response.use(
  function (response) {
    // 响应成功处理逻辑
    return response.data
  },
  function (error) {
    // 响应错误处理逻辑
    return Promise.reject(error)
  },
)
export default request
