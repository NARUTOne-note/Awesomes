import { createContainer } from './context';

export const useCount = () => {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const add = useFunction((x) => {
    setCount(count => count + x)
  });

  const minus = useFunction((x) =>{
    setCount(count => count - x)
  });

  const reset = useFunction((x) => {
    setCount(0);
    setList([]);
  });

  const fetchList = useFunction(async (id) =>{
    setLoading(true)
    await sleep(1000);
    try {
      const { data } = await getUserInfo({id});
      setList(data);
      setLoading(false);
      return data;
    } catch (e){
      setLoading(false);
    }
  })

  return {
    count,
    add,
    minus,
    reset,
    fetchList,
    loading,
    list
  }
}

export const CounterModel = createContainer(useCount);