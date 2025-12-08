/*
 * @Author: elk
 * @Date: 2025-12-04 15:06:27
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-08 15:46:05
 * @FilePath: /elk-lowcode-v3/src/libs/utils/common.ts
 * @Description: 公共工具函数
 */
import type { IForm } from '@/interfaces/system/menu'
interface IFormWithChildren extends IForm {
  children?: IFormWithChildren[]
}
/**
 * @description: 菜单-转换为树结构
 * @return {*} 树结构的菜单列表
 */
export const menuToTree = (list: IForm[]): IFormWithChildren[] => {
  const tree: IFormWithChildren[] = []
  const map: Record<string, IFormWithChildren> = {}
  list.forEach((item) => {
    map[item.menuId as string] = item
  })
  list.forEach((item) => {
    if (item.parentId === 0) {
      tree.push(item)
    } else {
      const parent = map[item.parentId as string]
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(item)
      }
    }
  })
  return tree
}

/**
 * @description: 图标-获取@/assets/icons/svg 目录下的所有svg图标
 * @return {*}
 */
export const getSvgIcons = () => {
    const icons = import.meta.glob('@/assets/icons/svgs/*.svg', { eager: true })
    console.log("🚀 ~ getSvgIcons ~ icons:", icons)
  const iconNames = Object.keys(icons).map((key) => {
    return key.split('/').pop()?.replace('.svg', '') || ''
  })
  return iconNames
}
