/*
 * @Description: 路由接口
 * @Autor: lyf
 * @Date: 2025-07-11 10:31:50
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-11 10:43:59
 * @FilePath: \v3-admin-lowcode\src\apis\routers.ts
 */

import { request } from '@/libs/utils/request'

export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get',
  })
}
