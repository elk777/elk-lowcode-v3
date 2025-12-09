/*
 * @Author: elk
 * @Date: 2025-12-09 15:17:19
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-09 15:37:05
 * @FilePath: /elk-lowcode-v3/src/apis/system/role.ts
 * @Description: 角色接口
 */
import request from '@/libs/utils/request'
import type { IResponse } from '@/interfaces/response'

// 获取角色列表
export const getRoleList = (params?: unknown): Promise<IResponse> => {
  return request({
    url: '/system/role/list',
    method: 'get',
    params,
  })
}