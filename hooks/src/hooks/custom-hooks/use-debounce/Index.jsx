import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

/* ------------------------------------------------------------------
   CUSTOM HOOK: useDebounce
   ------------------------------------------------------------------

   GOAL:
   - Delay updating a value until user stops typing
   - Prevent excessive API calls or expensive operations

   ------------------------------------------------------------------
   USAGE:
   const debouncedSearch = useDebounce(searchTerm, 500)

   useEffect(() => {
     if (debouncedSearch) fetchResults(debouncedSearch)
   }, [debouncedSearch])

   ------------------------------------------------------------------
   HOW IT WORKS:
   1. value changes → starts a setTimeout
   2. value changes again before delay → clears old timer (cleanup)
   3. value stays stable for `delay` ms → updates debouncedValue

   ------------------------------------------------------------------
   CLEANUP:
   return () => clearTimeout(timer)
   - Runs before next effect OR on unmount
   - Resets the timer on every keystroke
   - Only the LAST value after the pause makes it through

   ------------------------------------------------------------------
   COMMON DELAY VALUES:
   - Search inputs    → 300–500ms
   - Auto-save        → 1000–2000ms
   - Window resize    → 200ms

   ------------------------------------------------------------------
*/
