/*
 * @Author: elk
 * @Date: 2025-11-01 13:06:54
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-01 13:16:56
 * @FilePath: /elk-lowcode-v3/src/interfaces/routers.ts
 * @Description: 路由接口
 */
export interface IRouter {
  path: string
  name: string
  component: unknown
  redirect?: string
  meta: {
    title: string
    icon: string
    noCache?: boolean
  }
  children?: IRouter[]
}
