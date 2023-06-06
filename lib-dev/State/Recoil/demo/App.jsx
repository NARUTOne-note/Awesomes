import React from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";
import {
  bearsChangeState,
  loadingState,
  userListQuery,
  listState,
  userInitQueryState
} from './store';

const App = () => {
  const setText = useSetRecoilState(bearsChangeState);
  const [list, setList] = useRecoilState(listState);
  const loading = useRecoilValue(loadingState);
  const userListFetch = userListQuery();

  const fetchData = () => {
    userListFetch(1);
  };

  return (
    <div>
      
    </div>
  );
};

export default App;