import { createAtom } from "./statelite/core";
import { useAtom, useSetAtom } from "./statelite/react";

export const App = () => {
  return (
    <div>
      <h1>vite</h1>
      <A />
      <B />
    </div>
  );
};

const countAtom = createAtom(0);
const cleanup = countAtom.subscribe(() => console.log(countAtom.getSnapshot()));

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
