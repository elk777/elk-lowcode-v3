/*
 * @Author: elk
 * @Date: 2025-12-09 15:39:07
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-17 13:49:39
 * @FilePath: /elk-lowcode-v3/src/mocks/mockData/system/role.ts
 * @Description: 角色模拟数据
 */
import { factory, primaryKey } from '@mswjs/data'

export const roleDB = factory({
  role: {
    roleId: primaryKey(String),
    roleName: String,
    orderNum: Number,
    roleKey: String,
    status: String,
    menuIds: Array,
    remark: String,
    delFlag: String,
    createBy: String,
    updateBy: String,
    updatedAt: String,
    createdAt: String,
  },
})

// 初始化角色数据
roleDB.role.create({
  roleId: '1',
  roleName: '管理员',
  roleKey: 'admin',
  orderNum: 0,
  menuIds: [],
  createBy: 'admin',
  updateBy: 'admin',
  remark: '管理员角色',
  status: '1',
  delFlag: '0',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
})
// 初始化普通用户角色数据
roleDB.role.create({
  roleId: '2',
  roleName: '普通用户',
  roleKey: 'user',
  orderNum: 1,
  menuIds: [],
  createBy: 'admin',
  updateBy: 'admin',
  remark: '普通用户角色',
  status: '1',
  delFlag: '0',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
})