import React from 'react';
import Count from './Count';
import { CounterModel } from './models';

const App = () => {
  const {
    add,
    minus,
    reset,
    fetchList,
    list,
    loading
  } = CounterModel.useContainer();

  return (
    <div></div>
  );
};

export default App;