/*
 * @Author: elk
 * @Date: 2025-11-01 13:06:54
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-28 15:50:16
 * @FilePath: /elk-lowcode-v3/src/mocks/handlers/index.ts
 * @Description: 文件内容描述语
 */
import { users } from './user'
import { logins } from './login'
import { menus } from './system/menu'

export const handlers = [...users, ...logins, ...menus]
