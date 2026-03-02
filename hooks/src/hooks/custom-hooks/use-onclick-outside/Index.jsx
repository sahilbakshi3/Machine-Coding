import { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;

/* ------------------------------------------------------------------
   CUSTOM HOOK: useOnClickOutside
   ------------------------------------------------------------------

   GOAL:
   - Detect clicks outside a referenced element
   - Close modals, dropdowns, tooltips on outside click

   ------------------------------------------------------------------
   USAGE:
   const ref = useRef(null)
   useOnClickOutside(ref, () => setIsOpen(false))
   <div ref={ref}>Dropdown content</div>

   ------------------------------------------------------------------
   HOW IT WORKS:
   - Listens for mousedown + touchstart on document
   - Checks if click target is INSIDE ref.current
   - ref.current.contains(event.target) → true = inside, skip
   - If outside → calls handler()

   ------------------------------------------------------------------
   SUPPORTS:
   - Mouse clicks (mousedown)
   - Touch devices (touchstart)
   - Cleanup on unmount

   ------------------------------------------------------------------
*/
