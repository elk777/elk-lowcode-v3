/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: elk 
 * @LastEditTime: 2025-12-05 16:43:15
 * @FilePath: /elk-lowcode-v3/vite.config.ts
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// 引入svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// 引入自动引入组件插件
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// 引入unocss插件
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    UnoCSS(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svgs')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    // 自动引入naive-ui组件
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
