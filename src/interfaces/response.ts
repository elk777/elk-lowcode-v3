/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-07-15 17:16:52
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-15 17:23:39
 * @FilePath: \v3-admin-lowcode\src\interfaces\response.ts
 */
export interface IResponse {
  code: number
  data: object | string
  msg: string
}
