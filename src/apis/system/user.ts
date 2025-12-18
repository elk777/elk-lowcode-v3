/*
 * @Author: elk
 * @Date: 2025-12-17 15:41:50
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-17 15:43:05
 * @FilePath: /elk-lowcode-v3/src/apis/system/user.ts
 * @Description: 用户管理接口
 */

import request from '@/libs/utils/request'
import type { IResponse } from '@/interfaces/response'
import type { IUser } from '@/interfaces/system/user'

// 获取用户列表
export const getUserList = (params?: unknown): Promise<IResponse> => {
  return request({
    url: '/system/user/list',
    method: 'get',
    params,
  })
}
// 新增用户
export const addUser = (data: IUser): Promise<IResponse> => {
  return request({
    url: '/system/user/create',
    method: 'post',
    data,
  })
}
// 修改用户
export const updateUser = (data: IUser): Promise<IResponse> => {
  return request({
    url: '/system/user',
    method: 'put',
    data,
  })
}
// 删除用户
export const deleteUser = (data: IUser[]): Promise<IResponse> => {
  return request({
    url: `/system/user`,
    method: 'delete',
    data
  })
}