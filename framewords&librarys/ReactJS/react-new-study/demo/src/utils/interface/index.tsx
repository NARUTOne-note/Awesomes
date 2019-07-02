/**
 * TS interface common
 */

export interface RouterProps<T> {
  title: string,
  subTitle?: string,
  path: string,
  icon?: string,
  exact?: boolean,
  redirectUrl?: string,
  component: any,
  children?: RouterProps<T>[]
}

export interface RenderRouterPropsRouters<T> {
  children: RouterProps<T>[],
  isNeedShow: boolean,
  path: string
}

export interface RenderRouterProps<T>{
  routers: RenderRouterPropsRouters<T>
}