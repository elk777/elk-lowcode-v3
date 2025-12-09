/*
 * @Author: elk
 * @Date: 2025-12-09 15:33:43
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-09 15:43:59
 * @FilePath: /elk-lowcode-v3/src/mocks/handlers/system/role.ts
 * @Description: 角色接口模拟数据
 */
import { http } from 'msw'
import { getMockUrl, setResponse } from '@/mocks/utils'
import { roleDB } from '@/mocks/mockData/system/role'

export const roles = [
  // 获取角色列表
  http.get(getMockUrl('/system/role/list'), ({ request }) => {
    // token存在headers中的authorization字段
    const token = request.headers.get('Authorization')
    if (!token) {
      return setResponse(401, {}, '未授权，无法访问！')
    }
    const roleData = roleDB.role.getAll()
    return setResponse(200, roleData, '获取角色列表成功')
  }),
]
