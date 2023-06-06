import {atom, selector, selectorFamily, useRecoilCallback} from "recoil";
import { getUserInfo, sleep } from "@smt/utils";

export const bearsState = atom({
  key: 'bears', // 唯一标识
  default: 0, // 默认值
});

export const loadingState = atom({
  key: 'loading', // 唯一标识
  default: false, // 默认值
});

export const listState = atom({
  key: "list",
  default: []
});

export const bearsChangeState = selector({
  key: 'bearsStrState',
  get: ({get}) => {
    const text = get(bearsState);
    return text;
  },
  set:({set, reset, get}, newValue) => {
    set(bearsState, newValue)
  }
});

export const userListQuery = () => {
  return useRecoilCallback(({ set, snapshot: { getPromise } }) => async (id) => {
    set(loadingState, true);
    await sleep(1000);
    const response = await getUserInfo({id});
    set(loadingState, false);
    set(listState, response.data);
  }, []);
};