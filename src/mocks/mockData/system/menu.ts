/*
 * @Author: elk
 * @Date: 2025-11-28 14:13:55
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-08 16:03:19
 * @FilePath: /elk-lowcode-v3/src/mocks/mockData/system/menu.ts
 * @Description: 菜单数据mock
 */

import { factory, primaryKey } from '@mswjs/data'

export const menuDB = factory({
    menu: {
        menuId: primaryKey(Number),
        parentId: Number,
        menuName: String,
        menuType: String,
        orderNum: Number,
        menuIcon: String,
        path: String,
        component: String,
        perms: String,
        query: String,
        remark: String,
        status: String,
        visible: String,
        elFlag: String,
        isCache: String,
        isFrame: String,
    }
})

menuDB.menu.create({
    menuId: 1,
    parentId: 0,
    menuName: '系统管理',
    menuType: 'M',
    orderNum: 1,
    menuIcon: 'system',
    path: 'system',
    component: '',
    perms: 'system',
    query: '',
    remark: '',
    status: '0',
    visible: '0',
    elFlag: '0',
    isCache: '0',
    isFrame: '1',
})
menuDB.menu.create({
    menuId: 100,
    parentId: 1,
    menuName: '菜单管理',
    menuType: 'C',
    orderNum: 1,
    menuIcon: 'menu',
    path: 'menu',
    component: '/system/menu/index',
    perms: 'system:menu:list',
    query: '',
    remark: '',
    status: '0',
    visible: '0',
    elFlag: '0',
    isCache: '0',
    isFrame: '1',
})
menuDB.menu.create({
    menuId: 101,
    parentId: 1,
    menuName: '角色管理',
    menuType: 'C',
    orderNum: 1,
    menuIcon: 'role',
    path: 'role',
    component: '/system/role/index',
    perms: 'system:role:list',
    query: '',
    remark: '',
    status: '0',
    visible: '0',
    elFlag: '0',
    isCache: '0',
    isFrame: '1',
})
menuDB.menu.create({
    menuId: 102,
    parentId: 1,
    menuName: '用户管理',
    menuType: 'C',
    orderNum: 1,
    menuIcon: 'user',
    path: 'user',
    component: '/system/user/index',
    perms: 'system:user:list',
    query: '',
    remark: '',
    status: '0',
    visible: '0',
    elFlag: '0',
    isCache: '0',
    isFrame: '1',
})
menuDB.menu.create({
    menuId: 103,
    parentId: 1,
    menuName: '部门管理',
    menuType: 'C',
    orderNum: 1,
    menuIcon: 'dept',
    path: 'dept',
    component: '/system/dept/index',
    perms: 'system:dept:list',
    query: '',
    remark: '',
    status: '0',
    visible: '0',
    elFlag: '0',
    isCache: '0',
    isFrame: '1',
})