/*
 * @Description: 用户数据mock
 * @Autor: lyf
 * @Date: 2025-07-07 16:09:50
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-04 16:42:44
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
  router: {
    id: primaryKey(String),
    name: String,
    path: String,
    component: String,
    redirect: String,
    meta: Object,
    children: Array,
    hidden: Boolean,
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

userDB.router.create({
  id: '2',
  name: 'system',
  path: '/',
  component: 'Layout',
  redirect: '',
  meta: {
    title: '系统管理',
    icon: 'system',
  },
  children: [
    {
      id: '2-1',
      name: 'menu',
      path: '/menu/index',
      meta: {
        title: '菜单管理',
        icon: 'menu',
        noCache: false,
        link: null,
      },
      component: 'menu/index',
    },
    {
      id: '2-2',
      name: 'role',
      path: '/role',
      meta: {
        title: '角色管理',
        icon: 'role',
        noCache: false,
        link: null,
      },
      component: 'role/index',
    },
  ],
})
