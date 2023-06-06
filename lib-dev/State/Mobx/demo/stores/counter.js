import { makeAutoObservable, runInAction } from "mobx";

class CounterStore {
  constructor() {
    makeAutoObservable(this, {},{ autoBind: true });
  }

  // properties becomes observables
  name = 'counter';
  bears = 0;
  list = [];
  loading = false;
  // `getter` becomes computed (derive) property,

  get result() {
    return `Result: ${this.bears}`
  };
  // `setter` becomes mobx actions
  // which is the updater of the stor
  set increase(num) {
    this.bears += num;
  };
  set reduce(num) {
    this.bears -= num;
  };

  setLoading(loading){
    this.loading = loading;
  };

  reset() {
    this.bears = 0;
    this.loading = false;
    this.list = [];
  };

  // async updating is happens within a normal async function
  async updateUserList() {
    await sleep(1000)
    this.loading = true;
    const { data } = await getUserInfo();
    // if you want to update the store, wrap it with the runInAction()
    try {
      runInAction(() => {
        if (data.length > 0 ){
          // @ts-ignore
          this.list = data;
        }
      });
    } catch (e){
      console.error(e);
    }
  };

  // if you dislike runInAction(), just write a generator function
  // underneath, it will be wrapped with a flow() from 'mobx';
  // just remember do this when calling from the user land,
  // `const res = await flowResult(store.updateFromRemoteFlowVersion())`
  *updateDataList() {
    this.loading = true;
    yield sleep(1000)
    try {
      const { data } = yield getUserInfo();
      this.list = data;
      this.loading = false;
    } catch (e){
      this.loading = false;
      console.error(e);
    }
  };
}

export default CounterStore;