import { atom } from "recoil";

const currentPageState = atom<number>({
  key: "currentPageState",
  default: 0,
});

export { currentPageState };
