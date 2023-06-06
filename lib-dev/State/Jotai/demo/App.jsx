import React from 'react';
import { useAtom, useSetAtom, useAtomValue} from "jotai";
import {bearsAtom, loadingAtom, fetchListAtom, listAtom} from './store';

const App = () => {
  const setText = useSetAtom(bearsAtom);
  const [list, fetchList] = useAtom(fetchListAtom);
  const setList = useSetAtom(listAtom);
  const loading = useAtomValue(loadingAtom);
  
  return (
    <div>
      
    </div>
  );
};

export default App;