import { useEffect, useRef } from "react";

const usePrevious = (value) => {
  const ref = useRef(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;

/* ------------------------------------------------------------------
   CUSTOM HOOK: usePrevious
   ------------------------------------------------------------------

   GOAL:
   - Track the previous value of any state or prop
   - Useful for comparing old vs new values

   ------------------------------------------------------------------
   USAGE:
   const [count, setCount] = useState(0)
   const prevCount = usePrevious(count)
   // "You went from {prevCount} to {count}"

   ------------------------------------------------------------------
   HOW IT WORKS:
   1. ref.current starts as undefined
   2. Component renders → returns CURRENT ref.current (previous value)
   3. useEffect fires AFTER render → stores latest value in ref
   4. On next render, ref.current holds the value from last render

   ------------------------------------------------------------------
   KEY INSIGHT:
   - useEffect runs AFTER render
   - So ref.current during render = value from PREVIOUS render
   - Changing ref.current does NOT cause re-render

   ------------------------------------------------------------------
*/
