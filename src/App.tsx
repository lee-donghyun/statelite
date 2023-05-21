import { createAtom } from "./statelite/core";
import { useAtom, useSetAtom } from "./statelite/react";

export const App = () => {
  return (
    <div>
      <h1>vite</h1>
      <A />
      <B />
      <C />
      <D />
    </div>
  );
};

const countAtom = createAtom(0);
const countAtom2 = createAtom(0);

const A = () => {
  const count = useAtom(countAtom);

  return <div>useAtom value {count}</div>;
};

const B = () => {
  const setCount = useSetAtom(countAtom);

  return (
    <div>
      <button
        onClick={() => {
          setCount((p) => p + 1);
        }}
      >
        increment
      </button>
    </div>
  );
};

const C = () => {
  const count = useAtom(countAtom2);

  return <div>useAtom value {count}</div>;
};

const D = () => {
  const setCount = useSetAtom(countAtom2);

  return (
    <div>
      <button
        onClick={() => {
          setCount((p) => p + 1);
        }}
      >
        increment
      </button>
    </div>
  );
};
