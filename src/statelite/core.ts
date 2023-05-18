import { useSyncExternalStore } from "react";

type Key = string;
type Listener = () => void;
type Subscriber = (listender: Listener) => () => void;

type Atom<T> = {
  key: Key;
  value: T;
  subscribe: Subscriber;
  getSnapshot: () => T;
  update: (getNextValue: (prev: T) => T) => void;
};

const STORE: Record<string, unknown> = {};
const LISTENERS: Record<string, Listener[]> = {};

const createSubscribe = (key: Key) => (listener: Listener) => {
  LISTENERS[key].push(listener);
  return () => {
    LISTENERS[key].splice(LISTENERS[key].indexOf(listener), 1);
  };
};

const createUpdate =
  <T>(key: Key) =>
  (getNextValue: (prev: T) => T) => {
    STORE[key] = getNextValue(STORE[key] as T);
    LISTENERS[key].forEach((l) => l());
  };

export const createAtom = <T>(initialValue: T): Atom<T> => {
  const key = "" + Date.now() + Math.random();
  STORE[key] = initialValue;
  LISTENERS[key] = [];
  return {
    key,
    value: null as T,
    getSnapshot: () => STORE[key] as T,
    subscribe: createSubscribe(key),
    update: createUpdate(key),
  };
};

export const useAtom = <T>(atom: Atom<T>) => {
  return useSyncExternalStore(atom.subscribe, atom.getSnapshot);
};

export const useSetAtom = <T>(atom: Atom<T>) => {
  return atom.update;
};
