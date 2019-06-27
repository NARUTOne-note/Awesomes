import loadable from '@loadable/component'
import LoadPage from "@/components/LoadPage";

const API = loadable(() => import('../pages/API'), {
  fallback: LoadPage
});

const APIMemo = loadable(() => import('../pages/API/Memo'), {
  fallback: LoadPage
});

export default [
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
        component: APIMemo
      }
    ]
  }
]