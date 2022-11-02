import { atom } from "recoil";

const weekSelectState = atom<boolean[]>({
  key: "weekSelectState",
  default: [],
});

export { weekSelectState };
