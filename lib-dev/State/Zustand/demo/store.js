import create from 'zustand'
import {getUserInfo, sleep} from "@smt/utils";

export const useStore = create((set, get) => ({
  bears: 0,
  list: [],
  loading: false,
  increase: () => set(state => ({ bears: state.bears + 1 })),
  reduce: () => set(state => ({ bears: state.bears - 1 })),
  reset: () => set({ bears: 0, list: [] }),
  setLoading: (val) => set({ loading: val }),
  getData: async () => {
    // Read from state in actions
    try {
      get().setLoading(true);
      await sleep(1000);
      const { data } = await getUserInfo();
      set({ list: data, loading: false }) // Object.assing({}, state, nextState)
    } catch (e) {
      console.error(e);
      get().setLoading(false);
    }
  }
}));