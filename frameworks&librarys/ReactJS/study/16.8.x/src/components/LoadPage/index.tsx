import * as React from 'react';
import { Skeleton } from 'antd';

function LoadPage () {
  return (
    <div>
      <Skeleton avatar paragraph={{ rows: 3 }} active />
    </div>
  );
}

export default LoadPage;