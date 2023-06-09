# statelite

Lightweight state-management solution. Based on subscriber listener pattern.

### Vanilla

```ts
import { createAtom } from "statelite/core";

const countAtom = createAtom(0);
const cleanup = countAtom.subscribe(() => console.log(countAtom.getSnapshot()));
```

### React.js

```tsx
import { useAtom, useSetAtom } from "statelite/react";

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
```
