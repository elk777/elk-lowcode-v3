/*
 * @Description: 请求封装
 * @Autor: lyf
 * @Date: 2025-06-19 14:32:14
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-07 15:22:22
 * @FilePath: \v3-admin-lowcode\src\libs\utils\request.ts
 */
import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL + import.meta.env.VITE_BASE_API,
  timeout: import.meta.env.VITE_API_TIMEOUT,
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 请求前处理逻辑

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
