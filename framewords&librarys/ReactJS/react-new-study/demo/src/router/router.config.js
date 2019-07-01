import React from 'react';
import navsList from '@/mock/nav';
import loadable from '@loadable/component'
import LoadPage from "@/components/LoadPage";

const App = loadable(props => import('../pages/App'), {
  fallback: <LoadPage/>
})

const Home = loadable(props => import('../pages/Home'), {
  fallback: <LoadPage/>
})

const NotFound = loadable(props => import('../pages/NotFound'), {
  fallback: <LoadPage/>
})


export default [
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
        component: NotFound,
        path: '/404'
      },
      ...navsList
    ]
  }
]