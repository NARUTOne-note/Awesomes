import React from 'react';
import loadable from '@loadable/component'
import LoadPage from "@/components/LoadPage";

const AsyncPage = loadable(props => import(`${props.page}`), {
  fallback: LoadPage
})

function LoadableComponent(props) {
  const {page, ...others} = props;
  console.log(page);
  return (
    <div>
      {page && <AsyncPage {...others} page={page} />}
    </div>
  )
}

export default LoadableComponent;