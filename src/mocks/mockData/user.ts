/*
 * @Description: 用户数据mock
 * @Autor: lyf
 * @Date: 2025-07-07 16:09:50
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-16 16:43:24
 * @FilePath: \v3-admin-lowcode\src\mocks\mockData\user.ts
 */

import { factory, primaryKey } from '@mswjs/data'

export const userDB = factory({
  user: {
    userId: primaryKey(String),
    deptId: String,
    userName: String,
    nickName: String,
    email: String,
    sex: String,
    phone: String,
    status: String,
    remark: String,
    password: String,
    delFlag: String,
    createBy: String,
    updateBy: String,
    updatedAt: Date,
    createdAt: Date,
    avatar: String,
  },
})

// ===================================== 填充一些默认数据 =====================================
userDB.user.create({
  userId: '1bofj153qd3188su7qb00u5n6oh',
  deptId: 'admin@qq.com',
  userName: 'admin',
  nickName: '系统管理员',
  email: '123@qq.com',
  phone: '',
  sex: '0',
  avatar: '',
  status: '1',
  remark: '',
  password: '123456',
  delFlag: '0',
  createBy: '',
  createdAt: '2024-07-21 13:28:33',
  updateBy: '',
  updatedAt: '',
})

userDB.user.create({
  userId: '3cofj153qd3234su7qb00u5n6re',
  deptId: 'admin@qq.com',
  userName: 'test',
  nickName: '测试人员',
  email: '456@qq.com',
  phone: '',
  sex: '1',
  avatar: '',
  status: '1',
  remark: '',
  password: '123456',
  delFlag: '0',
  createBy: '',
  createdAt: '2024-07-21 13:28:33',
  updateBy: '',
  updatedAt: '',
})
