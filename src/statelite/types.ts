export type Key = symbol;
export type Listener = () => void;
export type Subscriber = (listener: Listener) => () => void;
export type Atom<T> = {
  key: Key;
  value: T;
  subscribe: Subscriber;
  getSnapshot: () => T;
  update: (getNextValue: (prev: T) => T) => void;
};
