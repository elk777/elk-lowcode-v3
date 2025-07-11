/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-07-08 15:14:24
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-11 11:15:35
 * @FilePath: \v3-admin-lowcode\src\mocks\handlers\user.ts
 */
/*
 * @Description 请求拦截器配置
 * @Autor: lyf
 * @Date: 2025-07-07 15:56:21
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-08 14:51:20
 * @FilePath: \v3-admin-lowcode\src\mocks\handlers.ts
 */
import { http, HttpResponse } from 'msw'
import { userDB } from '../mockData/index'
import { getMockUrl } from '../utils'

export const users = [
  // 示例: GET 请求处理
  http.get(getMockUrl('/user'), ({ request }) => {
    // const url = new URL(request.url)
    // 获取查询参数
    // const page = url.searchParams.get('page') || '1'

    // 生成响应数据
    const data = userDB.user.getAll()

    return HttpResponse.json(data)
  }),

  // 可以添加更多处理器...
]
