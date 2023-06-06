import { atom } from "jotai";
import { getUserInfo, sleep } from "@smt/utils";

export const listAtom = atom([]);
export const bearsAtom = atom(0);
export const bearsRenderAtom = atom((get) => `Result：${get(bearsAtom)}`);
export const loadingAtom = atom(false);

export const fetchListAtom = atom(
  (get) => get(listAtom),
  async (_get, set, params) => {
    set(loadingAtom, true);
    await sleep(1000);
    try {
      const response = await getUserInfo(params)
      set(listAtom, response.data);
    }catch (e){
      console.error(e);
    }finally {
      set(loadingAtom, false);
    }
  }
)