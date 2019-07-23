import * as React from 'react';
import loadable from '@loadable/component'
import LoadPage from "@/components/LoadPage";
import {RouterProps} from '@/utils/TS/interface';

/**
 * API
 */
const API = loadable(() => import('../pages/API'), {
  fallback: <LoadPage/>
})
const Memo = loadable(() => import('../pages/API/Memo'), {
  fallback: <LoadPage/>
})
const PureDemo = loadable(() => import('../pages/API/PureComponent'), {
  fallback: <LoadPage/>
})

/**
 * Hook
 */
const Hook = loadable(() => import('../pages/Hook'), {
  fallback: <LoadPage/>
})
const HookOverview = loadable(() => import('../pages/Hook/Overview'), {
  fallback: <LoadPage/>
})
const HookState = loadable(() => import('../pages/Hook/StateHook'), {
  fallback: <LoadPage/>
})
const HookEffect = loadable(() => import('../pages/Hook/EffectHook'), {
  fallback: <LoadPage/>
})
const HookRule = loadable(() => import('../pages/Hook/HookRule'), {
  fallback: <LoadPage/>
})
const HookCustom = loadable(() => import('../pages/Hook/CustomHook'), {
  fallback: <LoadPage/>
})

const navsList: RouterProps<Object>[] = [
  {
    title: 'React API',
    subTitle: '顶层API',
    path: '/api',
    component: API,
    icon: 'deployment-unit',
    children: [
      {
        title: 'memo',
        subTitle: '状态记忆',
        path: '/api/memo',
        component: Memo
      },
      {
        title: 'PureComponent',
        subTitle: '浅层比较',
        path: '/api/PureComponent',
        component: PureDemo
      },
    ]
  },
  {
    title: 'React Hook',
    subTitle: '新特性',
    path: '/hook',
    component: Hook,
    icon: 'diff',
    children: [
      {
        title: 'Hook',
        subTitle: '概览',
        path: '/hook/overview',
        component: HookOverview
      },
      {
        title: 'State Hook',
        subTitle: '状态',
        path: '/hook/state',
        component: HookState
      },
      {
        title: 'Effect Hook',
        subTitle: '副作用',
        path: '/hook/effect',
        component: HookEffect
      },
      {
        title: 'Hook Rule',
        subTitle: '规则',
        path: '/hook/rule',
        component: HookRule
      },
      {
        title: 'Hook',
        subTitle: '自定义',
        path: '/hook/custom',
        component: HookCustom
      }
    ]
  }
]

export default navsList;