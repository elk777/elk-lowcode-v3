/*
 * @Description: 入口文件
 * @Autor: lyf
 * @Date: 2025-06-18 16:55:43
 * @LastEditors: lyf
 * @LastEditTime: 2025-06-25 16:14:48
 * @FilePath: \v3-admin-lowcode\src\main.ts
 */
// 重置样式
import './style/tailwind.css'

import { createApp } from 'vue'
import { setupPinia } from './stores'
import App from './App.vue'
import router from './router'

const app = createApp(App)

setupPinia(app)
app.use(router)

app.mount('#app')
