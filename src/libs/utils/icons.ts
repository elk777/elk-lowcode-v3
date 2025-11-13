/*
 * @Description:  icons图标引入配置
 * @Autor: lyf
 * @Date: 2025-07-09 16:32:39
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-13 21:48:18
 * @FilePath: /elk-lowcode-v3/src/libs/utils/icons.ts
 */

import { ColorFilterSharp, SearchOutline, SunnyOutline, Moon, NotificationsOutline, SettingsOutline } from '@vicons/ionicons5'
import { DashboardOutlined, UserOutlined, LockOutlined } from '@vicons/antd'
import { FullScreenMaximize24Filled, FullScreenMinimize24Regular } from '@vicons/fluent'

export {
  ColorFilterSharp,
  FullScreenMaximize24Filled,
  FullScreenMinimize24Regular,
  SearchOutline,
  SunnyOutline,
  Moon,
  DashboardOutlined,
  UserOutlined,
  LockOutlined,
  NotificationsOutline,
  SettingsOutline
}

// utils/icons.ts
const svgModules = import.meta.glob('../assets/icons/svgs/*.svg', {
  eager: true, // 预加载所有图标
  query: '?raw' // 获取原始 SVG 内容
})

export const getSvgIcon = (name: string): string | undefined => {
  const modulePath = `../assets/icons/svgs/${name}.svg`
  const module = svgModules[modulePath] as { default: string } | undefined
  
  if (module) {
    return module.default
  }
  
  console.warn(`SVG icon "${name}" not found`)
  return undefined
}

// 可选：获取所有可用图标名称
export const getAvailableIcons = (): string[] => {
  return Object.keys(svgModules).map(filePath => 
    filePath.match(/\/([^/]+)\.svg$/)?.[1]
  ).filter(Boolean) as string[]
}
