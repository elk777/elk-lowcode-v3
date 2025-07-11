/*
 * @Description: 用户数据mock
 * @Autor: lyf
 * @Date: 2025-07-07 16:09:50
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-07 16:45:43
 * @FilePath: \v3-admin-lowcode\src\mocks\mockData\user.ts
 */

import { factory, primaryKey } from '@mswjs/data'

export const userDB = factory({
  user: {
    id: primaryKey(String),
    email: String,
    password: String,
    nickName: String,
    accountType: String,
    role: String,
    updatedAt: String,
    createdAt: String,
    avatar: String,
  },
})

// ===================================== 填充一些默认数据 =====================================
userDB.user.create({
  id: '1bofj153qd3188su7qb00u5n6oh',
  email: 'admin@qq.com',
  password: '123456',
  nickName: 'kkf2Pg',
  accountType: '01',
  role: '01',
  updatedAt: '2024-07-28 22:04:04',
  createdAt: '2024-07-28 22:04:04',
  avatar: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=kkf2Pg&size=64',
})

userDB.user.create({
  id: '1n3o6n1qh7d2uywa45y8100xweg0w',
  email: 'test@qq.com',
  password: '123456',
  nickName: 'kklpCj',
  accountType: '01',
  role: '01',
  updatedAt: '2024-07-21 13:28:33',
  createdAt: '2024-07-21 13:28:33',
  avatar: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=kklpCj&size=64',
})
