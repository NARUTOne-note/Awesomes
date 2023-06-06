import { defineStore } from 'pinia';
import { getUserInfo, sleep } from "@smt/utils";

export const useCountStore = defineStore({
  id: "count",
  state: () => ({
    loading: false,
    list: [],
    bears: 0,
  }),
  getters: {
    getBears() {
      return `Result:${this.bears}`;
    }
  },

  actions: {
    increase() {
      this.bears+=1;
    },
    reduce() {
      this.bears-=1;
    },
    reset() {
      this.list = [];
      this.bears = 0
    },
    async updateList(id) {
      this.loading = true;
      await sleep(1000);
      const response = await getUserInfo({id});
      if (response.code === 0){
        this.list = response.data;
        this.loading = false;
      }
      return response;
    }
  },
});