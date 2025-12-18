/*
 * @Description: 用户数据mock
 * @Autor: lyf
 * @Date: 2025-07-07 16:09:50
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-17 16:21:37
 * @FilePath: /elk-lowcode-v3/src/mocks/mockData/user.ts
 */

import { factory, primaryKey } from '@mswjs/data'

export const userDB = factory({
  user: {
    userId: primaryKey(String),
    deptId: String,
    deptIds: Array,
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
    roles: Array,
    depts: Array,
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
  phone: '13800000000',
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
  roles: ['admin']
})

userDB.user.create({
  userId: '3cofj153qd3234su7qb00u5n6re',
  deptId: 'admin@qq.com',
  userName: 'test',
  nickName: '测试人员',
  email: '456@qq.com',
  phone: '22132456789',
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
      path: '/system/menu/index',
      meta: {
        title: '菜单管理',
        icon: 'menu',
        noCache: false,
        link: null,
      },
      component: 'system/menu/index',
    },
    {
      id: '2-2',
      name: 'role',
      path: '/system/role/index',
      meta: {
        title: '角色管理',
        icon: 'role',
        noCache: false,
        link: null,
      },
      component: 'system/role/index',
    },
    {
      id: '2-3',
      name: 'user',
      path: '/system/user/index',
      meta: {
        title: '用户管理',
        icon: 'user',
        noCache: false,
        link: null,
      },
      component: 'system/user/index',
    },
  ],
})
userDB.router.create({
  id: '3',
  name: 'lowCode',
  path: '/',
  component: 'Layout',
  redirect: '',
  meta: {
    title: '低代码管理',
    icon: 'lowCode',
  },
  children: [
    {
      id: '3-1',
      name: 'metaManage',
      path: '/lowCode/metaManage/index',
      meta: {
        title: '元数据管理',
        icon: 'meta',
        noCache: false,
        link: null,
      },
      component: 'lowCode/metaManage/index',
    },
    {
      id: '3-2',
      name: 'listManage',
      path: '/lowCode/listManage/index',
      meta: {
        title: '列表管理',
        icon: 'list',
        noCache: false,
        link: null,
      },
      component: 'lowCode/listManage/index',
    },
    {
      id: '3-3',
      name: 'formManage',
      path: '/lowCode/formManage/index',
      meta: {
        title: '表单管理',
        icon: 'form',
        noCache: false,
        link: null,
      },
      component: 'lowCode/formManage/index',
    },
    {
      id: '3-4',
      name: 'affairManage',
      path: '/lowCode/affairManage/index',
      meta: {
        title: '事务管理',
        icon: 'affair',
        noCache: false,
        link: null,
      },
      component: 'lowCode/affairManage/index',
    },
  ],
})
