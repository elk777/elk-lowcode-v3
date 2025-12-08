/*
 * @Author: elk
 * @Date: 2025-11-28 15:53:55
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-03 15:48:16
 * @FilePath: /elk-lowcode-v3/src/apis/system/menu.ts
 * @Description: 菜单管理-API集合
 */

import request from '@/libs/utils/request'
import type { IResponse } from '@/interfaces/response'
import type { IForm } from '@/interfaces/system/menu'

/**
 * @description: 获取菜单列表
 * @param {*} Promise<IResponse>
 * @return {*}
 */
export const getMenuList = (): Promise<IResponse> => {
  return request({
    url: '/system/menu/list',
    method: 'get',
  })
}
/**
 * @description: 新增菜单
 * @param {*} Promise<IResponse>
 * @return {*}
 */
export const addMenu = (data: IForm): Promise<IResponse> => {
  return request({
    url: '/system/menu/add',
    method: 'post',
    data,
  })
}
/**
 * @description: 修改菜单
 * @param {*} Promise<IResponse>
 * @return {*}
 */
export const updateMenu = (data: IForm): Promise<IResponse> => {
  return request({
    url: '/system/menu/update',
    method: 'put',
    data,
  })
}
