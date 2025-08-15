import { useMessage } from 'naive-ui'

export default {
  install(app) {
    // 注册为全局属性
    app.config.globalProperties.$message = useMessage()
  },
}
