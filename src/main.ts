/*
 * @Description: 入口文件
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: elk
 * @LastEditTime: 2025-11-01 13:36:54
 * @FilePath: /elk-lowcode-v3/src/main.ts
 */
// 重置样式
import './style/reset.css'

import { createApp } from 'vue'
import { setupPinia } from './stores'
import App from './App.vue'
import router from './router'

// 引入全局方法
import NaviMessagePlugin from '@/plugins/navi-message'

// 引入uno.css
import 'virtual:uno.css'
// 路径权限
import '@/router/permission'

// 引入svg图标
import 'virtual:svg-icons-register'

// Mock模式
const enableMocks =
  import.meta.env.VITE_NODE_ENV === 'development' && import.meta.env.VITE_MOCK_ENABLE === 'true'

async function bootstrap() {
  // 开启Mock模式,并且保证是开发环境且必须等mock服务启动完成才挂载应用
  if (enableMocks) {
    const { startWorker } = await import('./mocks/browser')
    await startWorker()
  }

  const app = createApp(App)
  setupPinia(app)
  app.use(router)
  app.use(NaviMessagePlugin)
  app.mount('#app')
}
bootstrap()
