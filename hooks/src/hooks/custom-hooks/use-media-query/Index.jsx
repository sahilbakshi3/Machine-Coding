import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;

/* ------------------------------------------------------------------
   CUSTOM HOOK: useMediaQuery
   ------------------------------------------------------------------

   GOAL:
   - React to CSS media query changes in JS
   - Returns boolean that updates when query match changes

   ------------------------------------------------------------------
   USAGE:
   const isMobile = useMediaQuery("(max-width: 768px)")
   const isDark   = useMediaQuery("(prefers-color-scheme: dark)")

   ------------------------------------------------------------------
   HOW IT WORKS:
   - window.matchMedia(query) → MediaQueryList object
   - .matches → current true/false value
   - "change" event fires when match status flips
   - Lazy initializer avoids mismatch on first render

   ------------------------------------------------------------------
   COMMON QUERIES:
   "(max-width: 768px)"              → mobile
   "(prefers-color-scheme: dark)"    → dark mode
   "(orientation: landscape)"        → landscape
   "(min-resolution: 2dppx)"         → retina display

   ------------------------------------------------------------------
*/
