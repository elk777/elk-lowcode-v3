/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-07-08 14:54:24
 * @LastEditors: lyf
 * @LastEditTime: 2025-07-08 14:55:10
 * @FilePath: \v3-admin-lowcode\src\mocks\mockData\auth.ts
 */

import { factory } from '@mswjs/data'

export const authDB = factory({
  auth: {
    token: String,
  },
})

authDB.auth.create({
  token: 'elk-admin-token',
})
