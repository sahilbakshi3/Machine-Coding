import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useWindowSize;

/* ------------------------------------------------------------------
   CUSTOM HOOK: useWindowSize
   ------------------------------------------------------------------

   GOAL:
   - Track browser window dimensions reactively
   - Re-render component whenever window is resized

   ------------------------------------------------------------------
   USAGE:
   const { width, height } = useWindowSize()

   ------------------------------------------------------------------
   HOW IT WORKS:
   - Initializes with current window dimensions
   - Attaches resize event listener on mount
   - Updates state on every resize event
   - Cleanup removes listener on unmount

   ------------------------------------------------------------------
   COMMON USE CASES:
   - Responsive logic in JS (show/hide components)
   - Canvas or SVG sizing
   - Conditional rendering based on breakpoints

   ------------------------------------------------------------------
*/
