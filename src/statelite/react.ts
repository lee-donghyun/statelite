import { useSyncExternalStore } from "react";
import { Atom } from "./types";

export const useAtom = <T>(atom: Atom<T>) => {
  return useSyncExternalStore(atom.subscribe, atom.getSnapshot);
};

export const useSetAtom = <T>(atom: Atom<T>) => {
  return atom.update;
};
