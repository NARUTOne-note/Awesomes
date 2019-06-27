import loadable from '@loadable/component'
import LoadPage from "@/components/LoadPage";
import navsList from '@/mock/nav';

const App = loadable(() => import('../pages/App'), {
  fallback: LoadPage
});
const Home = loadable(() => import('../pages/Home'), {
  fallback: LoadPage
});

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
      ...navsList
    ]
  }
]