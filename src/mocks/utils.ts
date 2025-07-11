/*
 * @Description: mock工具类
 * @Autor: lyf
 * @Date: 2025-07-11 11:00:20
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-11 11:09:22
 * @FilePath: \v3-admin-lowcode\src\mocks\utils.ts
 */
import { HttpResponse } from 'msw'

// 获取mock的basePath
export const getBasePath = () => {
  return import.meta.env.VITE_MOCK_ENABLE
    ? import.meta.env.VITE_MOCK_BASE_API
    : import.meta.env.VITE_BASE_API
}

// 获取mock地址和base
export const getMockUrl = (url: string) => {
  return getBasePath() + url
}

// 返回数据格式
export const setResponse = (code: number, data: unknown, msg: string) => {
  const info = { code, data, msg }
  return HttpResponse.json(info, { status: 200 })
}
