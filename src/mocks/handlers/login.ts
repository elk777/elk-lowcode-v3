/*
 * @Description login-请求拦截器配置
 * @Autor: lyf
 * @Date: 2025-07-07 15:56:21
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-16 16:45:45
 * @FilePath: \v3-admin-lowcode\src\mocks\handlers\login.ts
 */
import { http } from 'msw'
import { getMockUrl, setResponse } from '../utils'
import { PermissionConstant } from '@/constants/permission.util.constant'
import { userDB } from '../mockData/index'

export const logins = [
  // 登录接口拦截
  http.post(getMockUrl('/login'), ({}) => {
    // 生成响应数据
    return setResponse(200, PermissionConstant.TOKEN, '登录成功')
  }),
  // 登出接口拦截
  http.post(getMockUrl('/logout'), ({}) => {
    // 返回响应数据
    return setResponse(200, null, '登出成功')
  }),
  // 获取用户信息接口拦截
  http.get(getMockUrl('/getUserInfo'), ({}) => {
    // 获取用户信息
    const userInfo = userDB.user.getAll()[0]
    return setResponse(200, userInfo, '获取用户信息成功')
  }),

  // 可以添加更多处理器...
]
