/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-13 21:23:14
 * @FilePath: /elk-lowcode-v3/vite.config.ts
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// 引入unocss插件
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    UnoCSS(),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
