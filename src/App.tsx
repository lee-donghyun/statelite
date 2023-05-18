import { createAtom, useAtom, useSetAtom } from "./statelite/core";

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
        increament
      </button>
    </div>
  );
};
