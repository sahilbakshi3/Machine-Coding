import React, { useRef, useState } from "react";

const RefExample = () => {
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const [value, setValue] = useState("");

  renderCount.current += 1;

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <h1>useRef Example</h1>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={handleFocus}>Focus Input</button>
      <p>Render count: {renderCount.current}</p>
    </div>
  );
};

export default RefExample;

/* ------------------------------------------------------------------
   REF EXAMPLE (useRef basics)
   ------------------------------------------------------------------

   GOAL:
   - Access DOM element directly (focus input)
   - Track render count WITHOUT causing re-renders

   ------------------------------------------------------------------
   useRef(initialValue):
   - Returns a mutable ref object: { current: initialValue }
   - .current persists across renders
   - Mutating .current does NOT trigger re-render

   ------------------------------------------------------------------
   TWO MAIN USE CASES:

   1. DOM ACCESS:
      const inputRef = useRef(null)
      <input ref={inputRef} />
      inputRef.current → the actual DOM node
      inputRef.current.focus() → call DOM methods

   2. PERSISTING VALUES:
      const renderCount = useRef(0)
      renderCount.current += 1
      → Tracks value across renders without re-rendering

   ------------------------------------------------------------------
   useRef vs useState:
   - useState → triggers re-render on change
   - useRef   → does NOT trigger re-render on change

   ------------------------------------------------------------------
*/
