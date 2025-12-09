/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-07-15 17:16:52
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-09 15:22:59
 * @FilePath: /elk-lowcode-v3/src/interfaces/response.ts
 */
export interface IResponse {
  code: number
  data: object | string | []
  msg: string
  total?: number
}
