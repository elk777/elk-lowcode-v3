/*
 * @Description 请求拦截器配置
 * @Autor: lyf
 * @Date: 2025-07-07 15:56:21
 * @LastEditors: lyf
 * @LastEditTime: 2025-10-28 16:14:08
 * @FilePath: \v3-admin-lowcode\src\mocks\handlers\user.ts
 */
import { http, HttpResponse } from 'msw'
import { userDB } from '../mockData/index'
import { getMockUrl } from '../utils'

export const users = [
  http.get(getMockUrl('/user'), ({}) => {
    // 生成响应数据
    const data = userDB.user.getAll()
    return HttpResponse.json(data)
  }),

  // 路由信息
  http.get(getMockUrl('/getRouters'), ({}) => {
    // 获取路由信息
    const data = userDB.router.getAll()
    return HttpResponse.json(data)
  }),

  // 可以添加更多处理器...
]
