export interface IRouter {
  path: string
  name: string
  component: () => Promise<typeof import('*.vue')>
  meta: {
    title: string
    icon: string
    noCache?: boolean
  }
  children?: IRouter[]
}
