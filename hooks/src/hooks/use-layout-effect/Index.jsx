import React, { useLayoutEffect, useRef, useState } from "react";

const LayoutEffectExample = () => {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div>
      <h1>useLayoutEffect Example</h1>
      <div
        ref={boxRef}
        style={{ background: "#ddd", padding: "20px", width: "50%" }}
      >
        Measure me!
      </div>
      <p>Box width: {width}px</p>
    </div>
  );
};

export default LayoutEffectExample;

/* ------------------------------------------------------------------
   LAYOUT EFFECT EXAMPLE (useLayoutEffect basics)
   ------------------------------------------------------------------

   GOAL:
   - Read DOM measurements BEFORE browser paints
   - Avoid visual flicker when reading layout info

   ------------------------------------------------------------------
   useLayoutEffect(() => effect, [deps]):
   - Signature is IDENTICAL to useEffect
   - Fires SYNCHRONOUSLY after DOM mutations
   - Fires BEFORE the browser paints

   ------------------------------------------------------------------
   TIMING:
   useEffect:
     render → paint → effect runs (user may see intermediate state)

   useLayoutEffect:
     render → effect runs → paint (DOM reads happen before paint)

   ------------------------------------------------------------------
   WHEN TO USE useLayoutEffect?
   - Reading DOM measurements (width, height, scroll position)
   - Mutating DOM before paint (tooltips, popovers positioning)
   - Animations that depend on element size

   USE useEffect for everything else.
   useLayoutEffect blocks painting → use sparingly.

   ------------------------------------------------------------------
*/
