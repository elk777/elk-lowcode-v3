/*
 * @Description: unocss配置文件
 * @Autor: lyf
 * @Date: 2025-10-22 16:37:28
 * @LastEditors: lyf
 * @LastEditTime: 2025-10-22 17:13:55
 * @FilePath: \v3-admin-lowcode\uno.config.ts
 */
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  rules: [
    // 静态规则
    ['bg-red', { backgroundColor: 'red' }],
    ['m-10', { margin: '10px' }],
    // 动态规则
    [
      /^mx-(\d+)$/,
      (match) => ({ 'margin-left': `${match[1]}px`, 'margin-right': `${match[1]}px` }),
    ],
  ],
})
