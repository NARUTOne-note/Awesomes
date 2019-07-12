import * as React from 'react';
import loadable from '@loadable/component'
import LoadPage from "@/components/LoadPage";
import {RouterProps} from '@/utils/TS/interface';

const API = loadable(() => import('../pages/API'), {
  fallback: <LoadPage/>
})

const Memo = loadable(() => import('../pages/API/Memo'), {
  fallback: <LoadPage/>
})

const PureDemo = loadable(() => import('../pages/API/PureComponent'), {
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
  }
]

export default navsList;