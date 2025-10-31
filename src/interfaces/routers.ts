export interface IRouter {
  path: string
  name: string
  component: unknown
  redirect?: string
  meta: {
    title: string
    icon: string
    noCache?: boolean
  }
  children?: IRouter[]
}
