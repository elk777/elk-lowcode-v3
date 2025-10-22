/*
 * @Description: 入口文件
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: lyf
 * @LastEditTime: 2025-10-22 16:34:08
 * @FilePath: \v3-admin-lowcode\src\main.ts
 */
// 重置样式
import './style/tailwind.css'

import { createApp } from 'vue'
import { setupPinia } from './stores'
import App from './App.vue'
import router from './router'

// 引入全局方法
import NaviMessagePlugin from '@/plugins/navi-message'

// 引入uno.css
import 'virtual:uno.css'

// Mock模式
const enableMocks =
  import.meta.env.VITE_NODE_ENV === 'development' && import.meta.env.VITE_MOCK_ENABLE === 'true'

if (enableMocks) {
  import('./mocks/browser')
    .then(({ startWorker }) => {
      startWorker()
    })
    .catch((error) => {
      console.error('【MSW】: 启动失败！', error)
    })
}
// 路径权限
import '@/router/permission'

const app = createApp(App)

setupPinia(app)
app.use(router)
app.use(NaviMessagePlugin)

app.mount('#app')
