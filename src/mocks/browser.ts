/*
 * @Description: 浏览器mock配置
 * @Autor: lyf
 * @Date: 2025-07-07 15:52:46
 * @LastEditors: lyf
 * @LastEditTime: 2025-11-06 11:05:12
 * @FilePath: \v3-admin-lowcode\src\mocks\browser.ts
 */
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers/index'

// 创建 worker 实例
const worker = setupWorker(...handlers)

// 导出启动函数
export async function startWorker() {
  await worker.start({
    onUnhandledRequest: 'bypass',
  })
  console.log('[MSW] Mock Service Worker 已启动')
  return worker
}

// 导出 worker 实例
export { worker }
