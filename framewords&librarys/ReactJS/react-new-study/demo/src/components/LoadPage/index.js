import React, { Component } from 'react';
import { Skeleton } from 'antd';

class LoadPage extends Component {
  render() {
    return (
      <div>
        <Skeleton avatar paragraph={{ rows: 3 }} active />
      </div>
    );
  }
}

export default LoadPage;