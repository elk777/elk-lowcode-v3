/*
 * @Author: elk
 * @Date: 2025-12-09 15:39:07
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-09 15:44:39
 * @FilePath: /elk-lowcode-v3/src/mocks/mockData/system/role.ts
 * @Description: 角色模拟数据
 */
import { factory, primaryKey } from '@mswjs/data'

export const roleDB = factory({
  role: {
    roleId: primaryKey(String),
    roleName: String,
    roleKey: String,
    roleSort: Number,
    dataScope: String,
    menuIds: Array,
    remark: String,
    createBy: String,
    updateBy: String,
    updatedAt: Date,
    createdAt: Date,
  },
})

// 初始化角色数据
roleDB.role.create({
  roleId: '1',
  roleName: '管理员',
  roleKey: 'admin',
  roleSort: 1,
  dataScope: 'all',
  menuIds: [],
  createBy: 'admin',
  updateBy: 'admin',
  remark: '管理员角色',
  updatedAt: new Date(),
  createdAt: new Date(),
})
// 初始化普通用户角色数据
roleDB.role.create({
  roleId: '2',
  roleName: '普通用户',
  roleKey: 'user',
  roleSort: 2,
  dataScope: 'self',
  menuIds: [],
  createBy: 'admin',
  updateBy: 'admin',
  remark: '普通用户角色',
  updatedAt: new Date(),
  createdAt: new Date(),
})