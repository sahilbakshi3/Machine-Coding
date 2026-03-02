import React, { useMemo, useState } from "react";

const expensiveCalc = (num) => {
  console.log("Running expensive calculation...");
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += num;
  }
  return result;
};

const MemoExample = () => {
  const [number, setNumber] = useState(1);
  const [toggle, setToggle] = useState(false);

  const result = useMemo(() => expensiveCalc(number), [number]);

  return (
    <div>
      <h1>useMemo Example</h1>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <p>Result: {result}</p>
      <button onClick={() => setToggle((prev) => !prev)}>
        Toggle (won't re-run calc): {toggle ? "ON" : "OFF"}
      </button>
    </div>
  );
};

export default MemoExample;

/* ------------------------------------------------------------------
   MEMO EXAMPLE (useMemo basics)
   ------------------------------------------------------------------

   GOAL:
   - Cache result of expensive calculation
   - Only recompute when dependency (number) changes
   - Toggling unrelated state does NOT re-run the calc

   ------------------------------------------------------------------
   useMemo(() => computation, [deps]):
   - Runs computation on mount
   - Returns CACHED result on re-renders
   - Only recomputes when deps array values change

   ------------------------------------------------------------------
   WITHOUT useMemo:
   - expensiveCalc runs on EVERY render
   - Even when toggle changes (unrelated state)

   WITH useMemo:
   - expensiveCalc only runs when [number] changes

   ------------------------------------------------------------------
   WHEN TO USE useMemo?
   - Expensive computations (sorting, filtering large lists)
   - Derived data from props/state
   - Reference equality for objects/arrays passed as props

   DO NOT overuse:
   - Simple computations don't need memoization
   - useMemo itself has overhead

   ------------------------------------------------------------------
*/
