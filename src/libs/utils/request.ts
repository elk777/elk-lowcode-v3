/*
 * @Description: 请求封装
 * @Autor: lyf
 * @Date: 2025-06-19 14:32:14
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-28 15:56:05
 * @FilePath: /elk-lowcode-v3/src/libs/utils/request.ts
 */
import axios from 'axios'
import { getBasePath } from '@/mocks/utils'
import { useAuthStore } from '@/stores/auth'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL + getBasePath(),
  timeout: import.meta.env.VITE_API_TIMEOUT,
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 请求前处理逻辑
    const { token } = useAuthStore()
    config.headers.Authorization = 'Bearer ' + token
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
