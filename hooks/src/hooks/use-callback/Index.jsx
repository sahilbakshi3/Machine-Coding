import React, { useCallback, useState, memo } from "react";

const Button = memo(({ onClick, label }) => {
  console.log(`Rendering: ${label}`);
  return <button onClick={onClick}>{label}</button>;
});

const CallbackExample = () => {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return (
    <div>
      <h1>useCallback Example</h1>
      <p>Count: {count}</p>
      <p>Toggle: {toggle ? "ON" : "OFF"}</p>
      <Button onClick={handleIncrement} label="Increment" />
      <Button onClick={handleToggle} label="Toggle" />
    </div>
  );
};

export default CallbackExample;

/* ------------------------------------------------------------------
   CALLBACK EXAMPLE (useCallback basics)
   ------------------------------------------------------------------

   GOAL:
   - Prevent child re-renders caused by new function references
   - Memoize callback functions passed as props

   ------------------------------------------------------------------
   useCallback(() => fn, [deps]):
   - Returns a MEMOIZED version of the function
   - Same function reference across renders (unless deps change)
   - Works hand-in-hand with React.memo

   ------------------------------------------------------------------
   WITHOUT useCallback:
   - handleIncrement = new function reference on every render
   - memo(Button) sees new prop → re-renders anyway

   WITH useCallback + memo:
   - handleIncrement reference is STABLE ([] deps = never changes)
   - memo(Button) sees same prop → skips re-render 

   ------------------------------------------------------------------
   useCallback vs useMemo:
   - useMemo    → caches a COMPUTED VALUE
   - useCallback → caches a FUNCTION

   useMemo(() => fn, deps) === useCallback(fn, deps)

   ------------------------------------------------------------------
   WHEN TO USE useCallback?
   - Functions passed as props to memoized children
   - Functions used inside useEffect dependencies
   - Event handlers in performance-sensitive lists

   ------------------------------------------------------------------
*/
