import React, { Component } from 'react';
import RenderRouter from '@/components/RenderRouter/';

class RAPI extends Component {
  render() {
    const {routers} = this.props;
    return (
      <div className="react-api">
        <RenderRouter routers={routers}></RenderRouter> 
      </div>
    );
  }
}

export default RAPI;