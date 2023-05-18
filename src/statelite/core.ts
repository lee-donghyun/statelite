import { Atom, Key, Listener } from "./types";

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
