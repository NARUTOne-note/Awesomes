import * as React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import routers from './router.config';

export type Callback = (a: any) => void;

const routerList = routers.map((item, index) => {
  const ComponentPage = item.component;
  if (item.path) {
    if (item.children && item.children.length) {
      return <Route
        exact={item.exact}
        path={item.path}
        render={(props) => item.redirectUrl ? <Redirect to={item.redirectUrl} /> : <ComponentPage {...props} routers={item}/>}
        key={'page' + index + item.path}/>;
    }
    return <Route
      exact={item.exact}
      path={item.path}
      render={(props) => item.redirectUrl ? <Redirect to={item.redirectUrl} /> : <ComponentPage {...props}/>}
      key={'page' + index + item.path}/>;
  }
  return <Route component={() => <ComponentPage></ComponentPage>} key={'page' + index}/>;
});

const getConfirmation = (message: string, callback: Callback) => {
  const allowTransition = window.confirm(message);
  console.log(message);
  callback(allowTransition);
};

class RouterList extends React.Component{
  render () {
    return (
      <BrowserRouter basename="" getUserConfirmation={getConfirmation}>
        <div className="wrapper">
          <Switch key={Math.random()}>
            {routerList}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default RouterList;
