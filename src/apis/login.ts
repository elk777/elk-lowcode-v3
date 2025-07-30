import request from '@/libs/utils/request'
import type { ILoginParams } from '@/interfaces/login'
import type { IResponse } from '@/interfaces/response'
export const login = (data: ILoginParams): Promise<IResponse> => {
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

export const getUserInfo = () => {
  return request({
    url: '/getUserInfo',
    method: 'get',
  })
}
