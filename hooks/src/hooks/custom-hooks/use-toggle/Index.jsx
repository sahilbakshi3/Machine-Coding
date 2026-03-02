import { useState } from "react";

const useToggle = (initialValue = false) => {
  const [isOn, setIsOn] = useState(initialValue);

  const toggle = () => setIsOn((prev) => !prev);
  const setOn = () => setIsOn(true);
  const setOff = () => setIsOn(false);

  return { isOn, toggle, setOn, setOff };
};

export default useToggle;

/* ------------------------------------------------------------------
   CUSTOM HOOK: useToggle
   ------------------------------------------------------------------

   GOAL:
   - Reusable boolean toggle logic
   - Exposes toggle, setOn, setOff helpers

   ------------------------------------------------------------------
   USAGE:
   const { isOn, toggle, setOn, setOff } = useToggle(false)

   ------------------------------------------------------------------
   RETURNS:
   isOn    → current boolean value
   toggle  → flip current value
   setOn   → force true
   setOff  → force false

   ------------------------------------------------------------------
   RULES OF CUSTOM HOOKS:
   - Must start with "use"
   - Can call other hooks inside
   - Encapsulates reusable stateful logic
   - Each call gets its own isolated state

   ------------------------------------------------------------------
*/
