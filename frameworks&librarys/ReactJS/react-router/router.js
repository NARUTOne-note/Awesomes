/**
 *react-router的几种配置方式
 * createDate: 2017/07/25
 * author: NARUTOne
 */

/**
 *标签的方式 
 */

import { IndexRoute } from 'react-router'
import App from './app'

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Home').default)
        })
      }} />
      <Route path="about" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/About').default)
        })
      }} />
      <Route path="inbox" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Inbox').default)
        })
      }} >
        <Route path="messages/:id"getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Messages').default)
        })
      }} />
      </Route>
    </Route>
  </Router>
), document.body)

/**
 *对象配置方式 
 * 
 * react-router提供了两个hook，onLeave在所有将离开的路由触发，从最下层的子路由到最外层的父路由，
 * onEnter在进入路由触发，从最外层的父路由到最下层的自路由。
 */

const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    childRoutes: [
      { path: 'about', component: About },
      { path: 'inbox',
        component: Inbox,
        childRoutes: [
          { path: '/messages/:id', component: Message },
          { path: 'messages/:id',
            onEnter: function (nextState, replaceState) {
              //do something
            }
          }
        ]
      }
    ]
  }
]

React.render(<Router routes={routeConfig} />, document.body)

/**
 *按需加载的路由配置
 * 
 * Route 可以定义 getChildRoutes，getIndexRoute 和 getComponents 这几个函数，他们都是异步执行的，并且只有在需要的时候才会调用。
 * 这种方式需要配合webpack中有实现代码拆分功能的工具来用，其实就是把路由拆分成小代码块，然后按需加载。
 */

const CourseRoute = {
  path: 'course/:courseId',

  getChildRoutes(location, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./routes/Announcements'),
        require('./routes/Assignments'),
        require('./routes/Grades'),
      ])
    })
  },

  getIndexRoute(location, callback) {
    require.ensure([], function (require) {
      callback(null, require('./components/Index'))
    })
  },

  getComponents(location, callback) {
    require.ensure([], function (require) {
      callback(null, require('./components/Course'))
    })
  }
}