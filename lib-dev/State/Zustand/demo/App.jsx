import React from 'react';
import shallow from 'zustand/shallow';
import useStore from './store';

const App = () => {
  // re-renders the component when either state.loading or state.list change;
  const { loading, list } = useStore(({ loading, list }) => ({ loading, list }), shallow);
  // Getting non-reactive fresh state
  const { reduce, increase, getData, reset } = useStore.getState();

  const handleFetchData = () => {
    getData();
  }

  console.log("loading or list change~", loading, list);

  return (
    <div>
      
    </div>
  );
};

export default App;