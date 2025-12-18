/*
 * @Description 请求拦截器配置
 * @Autor: lyf
 * @Date: 2025-07-07 15:56:21
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-17 16:17:39
 * @FilePath: /elk-lowcode-v3/src/mocks/handlers/user.ts
 */
import { http } from 'msw'
import { userDB } from '../mockData/index'
import { getMockUrl, setResponse } from '../utils'

export const users = [
  http.get(getMockUrl('/system/user/list'), ({}) => {
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
