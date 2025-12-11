/*
 * @Author: elk
 * @Date: 2025-12-09 15:17:19
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-11 17:01:32
 * @FilePath: /elk-lowcode-v3/src/apis/system/role.ts
 * @Description: 角色接口
 */
import request from '@/libs/utils/request'
import type { IResponse } from '@/interfaces/response'
import type { IRole } from '@/interfaces/system/role'

// 获取角色列表
export const getRoleList = (params?: unknown): Promise<IResponse> => {
  return request({
    url: '/system/role/list',
    method: 'get',
    params,
  })
}
// 新增角色
export const addRole = (data: IRole): Promise<IResponse> => {
  return request({
    url: '/system/role/create',
    method: 'post',
    data,
  })
}
// 修改角色
export const updateRole = (data: IRole): Promise<IResponse> => {
  return request({
    url: '/system/role',
    method: 'put',
    data,
  })
}
// 删除角色
export const deleteRole = (roleId: number): Promise<IResponse> => {
  return request({
    url: `/system/role/${roleId}`,
    method: 'delete',
  })
}