/*
 * @Description login-请求拦截器配置
 * @Autor: lyf
 * @Date: 2025-07-07 15:56:21
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-08 14:51:20
 * @FilePath: \v3-admin-lowcode\src\mocks\handlers.ts
 */
import { http } from 'msw'
import { userDB } from '../mockData/index'
import { getMockUrl, setResponse } from '../utils'

export const users = [
  // 示例: GET 请求处理
  http.get(getMockUrl('/login'), ({ request }) => {
    console.log('🚀 ~ http.get ~ request:', request)
    // const url = new URL(request.url)
    // 获取查询参数
    // const page = url.searchParams.get('page') || '1'

    // 生成响应数据
    return setResponse(200, userDB.user.getAll(), '登录成功')
  }),

  // 可以添加更多处理器...
]
