/*
 * @Author: elk
 * @Date: 2025-12-09 15:29:39
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-11 14:31:02
 * @FilePath: /elk-lowcode-v3/src/interfaces/system/role.ts
 * @Description: 角色接口集合
 */
export interface IRole {
  roleId?: number
  roleName: string
  orderNum?: number
  roleKey?: string
  status?: string
  remark?: string
  delFlag?: boolean
  createBy?: string
  updateBy?: string
  updatedAt?: Date
  createdAt?: Date
  menuIds?: number[]
}
