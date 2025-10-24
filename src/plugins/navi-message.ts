import { createDiscreteApi } from 'naive-ui' // 关键：引入离散API工具
import type { App } from 'vue'

const { message } = createDiscreteApi(['message'])

export default {
  install(app: App) {
    // 注册为全局属性 - vue2中
    // app.config.globalProperties.$message = useMessage

    // vue3的 provide/inject
    app.provide('$message', message)
  },
}
