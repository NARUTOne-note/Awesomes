import * as React from 'react';
import RenderRouter from '@/components/RenderRouter/';
import {RenderRouterProps} from '@/utils/interface';

class RAPI<T> extends React.Component<RenderRouterProps<T>, {}> {
  render() {
    const { routers } = this.props;
    return (
      <div className="react-api">
        <RenderRouter routers={routers}></RenderRouter> 
      </div>
    );
  }
}

export default RAPI;