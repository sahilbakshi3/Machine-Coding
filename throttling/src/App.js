import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const lastRun = useRef(Date.now());

  const handleScroll = () => {
    const now = Date.now();
    if (now - lastRun.current >= 500) {
      setCount((prev) => prev + 1);
      lastRun.current = now;
      console.log("Throttled scroll event");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ height: "150vh", padding: 20 }}>
      <h2>Throttling Example</h2>
      <p>Scroll down to increase count</p>
      <h3>Throttled count : {count}</h3>
    </div>
  );
};

export default App;

//////////////////// REACT THROTTLING — CHEAT SHEET ///////////////////////////

// Goal:
// Avoid calling a function too frequently (ex: scroll, resize events)
// Run the function at MOST once per X milliseconds (500ms here)

// State:
// count -> increments only when throttled scroll handler fires

// useRef:
// lastRun -> stores timestamp of last allowed call
// no re-render needed, so ref is ideal for storing timing

// Core logic:
// now = Date.now()
// if (now - lastRun.current >= 500):
//    - update count
//    - lastRun.current = now
//
// Otherwise ignore event

// useEffect:
// - Adds scroll listener once on mount
// - Removes listener on unmount (cleanup)

// Interview talking points:
// Debounce vs Throttle
// - Debounce: Wait until user stops triggering events
// - Throttle: Allow action ONLY every X ms (limit frequency)
// Useful for:
// - Scroll listeners
// - Resize events
// - Continuous inputs like drag or infinite scroll

///////////////////////////////////////////////////////////////////////////////
