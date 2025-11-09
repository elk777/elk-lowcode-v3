/*
 * @Author: elk
 * @Date: 2025-11-01 13:06:54
 * @LastEditors: elk 
 * @LastEditTime: 2025-11-08 19:18:12
 * @FilePath: /elk-lowcode-v3/src/plugins/navi-message.ts
 * @Description: 导航栏消息插件
 */
import { createDiscreteApi } from 'naive-ui' // 关键：引入离散API工具
import type { App } from 'vue'

const { message } = createDiscreteApi(['message'])
const { dialog } = createDiscreteApi(['dialog'])

export default {
  install(app: App) {
    // 注册为全局属性 - vue2中
    // app.config.globalProperties.$message = useMessage

    // vue3的 provide/inject
    app.provide('$message', message)
    app.provide('$dialog', dialog)
  },
}
