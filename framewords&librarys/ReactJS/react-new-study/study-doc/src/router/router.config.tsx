import * as React from 'react';
import navsList from '@/mock/nav';
import loadable from '@loadable/component'
import LoadPage from "@/components/LoadPage";
import {RouterProps} from '@/utils/TS/interface';

const App = loadable(() => import('../pages/App'), {
  fallback: <LoadPage/>
})

const Home = loadable(() => import('../pages/Home'), {
  fallback: <LoadPage/>
})

const NotFound = loadable(() => import('../pages/NotFound'), {
  fallback: <LoadPage/>
})


const routers: RouterProps<Object>[] = [
  {
    path: '/',
    title: 'React',
    component: App,
    children: [
      {
        component: Home,
        path: '/home',
        title: '首页',
      },
      {
        title: '404',
        component: NotFound,
        path: '/404'
      },
      ...navsList
    ]
  }
]

export default routers;
