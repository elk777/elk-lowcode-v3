/*
 * @Description 菜单管理-请求拦截器配置
 * @Autor: lyf
 * @Date: 2025-07-07 15:56:21
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-28 16:21:16
 * @FilePath: /elk-lowcode-v3/src/mocks/handlers/system/menu.ts
 */
import { http } from 'msw'
import { getMockUrl, setResponse } from '@/mocks/utils'
import { menuDB } from '@/mocks/mockData/index'

export const menus = [
  // 获取菜单信息接口拦截
  http.get(getMockUrl('/system/menu/list'), ({ request }) => {
    // token存在headers中的authorization字段
    const token = request.headers.get('Authorization')
    const menuData = menuDB.menu.getAll()
    if (!token) {
      return setResponse(401, {}, '未授权，无法访问！')
    }
    return setResponse(200, menuData, '获取用户信息成功')
  }),

  // 可以添加更多处理器...
]
