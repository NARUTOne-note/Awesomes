import React from "react";
import { observer } from "mobx-react-lite";
import useStores from '../hooks/useStores';

const App = () => {
  const { counterStore } = useStores();
  const { list, loading, updateDataList, reset } = counterStore;
  console.log("list~loading", list, loading);
  return (
    <div></div>
  );
};

export default observer(App);