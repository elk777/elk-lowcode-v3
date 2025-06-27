import request from '@/libs/utils/request'
import type { ILoginParams } from '@/interfaces/login'
export const login = (data: ILoginParams) => {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export const loginOut = () => {
  return request({
    url: '/logout',
    method: 'post',
  })
}
