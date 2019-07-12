import * as React from 'react';
import {Card} from 'antd';
import './index.scss';

export interface DemoProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
}

class Demo extends React.Component<DemoProps, {}> {
  render() {
    const {title, extra, children} = this.props;
    return (
      <Card title={<div className="clear-float">
        <div className="left demo-header-circles">
          <span className="red"></span>
          <span className="yellow"></span>
          <span className="green"></span>
        </div>
        {title}
      </div>} extra={extra} hoverable>
        {children}
      </Card>
    );
  }
}

export default Demo;