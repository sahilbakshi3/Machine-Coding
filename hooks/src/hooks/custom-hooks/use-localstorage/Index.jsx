import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;

/* ------------------------------------------------------------------
   CUSTOM HOOK: useLocalStorage
   ------------------------------------------------------------------

   GOAL:
   - Sync state with localStorage
   - API mirrors useState exactly: [value, setter]

   ------------------------------------------------------------------
   USAGE:
   const [name, setName] = useLocalStorage("name", "Guest")

   ------------------------------------------------------------------
   LAZY INITIALIZER:
   useState(() => { ... })
   - Reads from localStorage ONCE on mount
   - Falls back to initialValue if key doesn't exist
   - Wrapped in try/catch (localStorage can be unavailable)

   ------------------------------------------------------------------
   SETTER:
   - Accepts value OR updater function (same as useState)
   - Updates both React state AND localStorage atomically

   ------------------------------------------------------------------
*/
