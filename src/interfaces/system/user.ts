/*
 * @Author: elk
 * @Date: 2025-12-17 15:42:22
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-18 14:49:09
 * @FilePath: /elk-lowcode-v3/src/interfaces/system/user.ts
 * @Description: 用户管理接口
 */
export interface IUser {
  userId?: number | null
  userName: string | null
  nickName: string | null
  password?: string | null
  phone?: string | null
  email?: string | null
  avatar?: string | null
  sex?: string | null
  status?: string | null
  remark?: string | null
  delFlag?: boolean | null
  createBy?: string | null
  updateBy?: string | null
  updatedAt?: Date | null
  createdAt?: Date | null
  roleIds?: number | number[] | null
  roles?: unknown[] | null
}
