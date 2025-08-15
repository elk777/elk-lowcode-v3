export interface ILoginParams {
  username: string
  password: string
  code?: string
}

export interface IUserInfo {
  name: string
  avatar: string
  roles: never[]
  permissions: never[]
}
