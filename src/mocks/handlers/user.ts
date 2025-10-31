/*
 * @Description 请求拦截器配置
 * @Autor: lyf
 * @Date: 2025-07-07 15:56:21
 * @LastEditors: lyf
 * @LastEditTime: 2025-10-29 16:39:19
 * @FilePath: \v3-admin-lowcode\src\mocks\handlers\user.ts
 */
import { http } from 'msw'
import { userDB } from '../mockData/index'
import { getMockUrl, setResponse } from '../utils'

export const users = [
  http.get(getMockUrl('/user'), ({}) => {
    // 生成响应数据
    const data = userDB.user.getAll()
    return setResponse(200, data, '获取用户信息成功')
  }),

  // 路由信息
  http.get(getMockUrl('/getRouters'), ({}) => {
    // 获取路由信息
    const data = userDB.router.getAll()
    return setResponse(200, data, '获取路由信息成功')
  }),

  // 可以添加更多处理器...
]
