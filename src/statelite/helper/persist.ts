import { createAtom } from "../core";

type Try<T> = (f: () => T) => {
  _catch: (f: () => T) => T;
};
const try_ = <T>(f: Parameters<Try<T>>[0]): ReturnType<Try<T>> => {
  try {
    const value = f();
    return { _catch: () => value };
  } catch {
    return { _catch: (f) => f() };
  }
};

export const createPersistedAtom = <T>(key: string, defaultValue: T) => {
  const json = localStorage.getItem(key);
  const value: T =
    json === null
      ? defaultValue
      : try_(() => JSON.parse(json))._catch(() => defaultValue);

  const atom = createAtom(value);
  atom.subscribe(() =>
    localStorage.setItem(key, JSON.stringify(atom.getSnapshot()))
  );

  return atom;
};
