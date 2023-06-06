import React, {createContext} from "react";
import CounterStore from "./counter";

export const RootStoreContext = createContext(null);

const stores = {
  counterStore: new CounterStore()
};

const RootStore = ({ children }) => {
  return <RootStoreContext.Provider value={stores}>{children}</RootStoreContext.Provider>;
};

export default RootStore;