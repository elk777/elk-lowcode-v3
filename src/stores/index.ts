/*
 * @Description: 创建 pinia 实例
 * @Autor: lyf
 * @Date: 2025-06-25 15:40:00
 * @LastEditors: lyf
 * @LastEditTime: 2025-06-25 16:13:02
 * @FilePath: \v3-admin-lowcode\src\stores\index.ts
 */
import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export function setupPinia(app: App<Element>) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}
