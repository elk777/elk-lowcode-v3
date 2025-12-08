/*
 * @Author: elk
 * @Date: 2025-12-03 15:47:29
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-05 15:27:49
 * @FilePath: /elk-lowcode-v3/src/interfaces/system/menu.ts
 * @Description: 菜单管理-接口集合
 */

// 菜单管理-新增/修改表单数据
export interface IForm {
  menuId?: string | null | undefined
  parentId?: number | string
  menuType?: string
  menuIcon?: string
  menuName?: string
  orderNum?: number
  path?: string
  component?: string
  perms?: string
  isFrame?: string | number
  isCache?: string
  visible?: string
  status?: string
}