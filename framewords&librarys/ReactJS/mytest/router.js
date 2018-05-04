/**
 * 前端路由配置
 */

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import process from 'nprogress'
import auth from 'public/auth'
import App from './functions/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from 'public/reducers'

// 用户登录验证
function requireAuth(nextState, replace) {
  const path = nextState.location.pathname
  const loginPath = '/login'
  if (!auth.isLoginIn()) {
    path !== loginPath && replace({
      pathname: '/login',
      state: {
        referrer: path
      }
    })
  }
}
let store = createStore(todoApp)

export default render((
   <Provider store={store}>
    <Router
      history={browserHistory}
      onUpdate={() => {
        process.done()
        window.scrollTo(0, 0)
      }}
    >
      <Route
        path="/"
        onEnter={(...args) => {
          requireAuth(...args)
          process.start()
        }}
        onChange={() => process.start()}
        component={App}
       >
        <IndexRedirect to="/overview/todos" />
        <Route path="overview">
          <Route path="todos" getComponent={(location, cb) => {
            require.ensure([], require => {
              cb(null, require('./functions/Overview/Todos').default)
            })
          }} />
        </Route>
        <Route path="reduxtest" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./functions/ReduxTest').default)
          })
        }} />
        <Route path="login" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./functions/Login').default)
          })
        }} />
        <Route path="*" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./functions/NotFound').default)
          })
        }}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))
