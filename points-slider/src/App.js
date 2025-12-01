import React, { useEffect, useState } from "react";
import "./App.css";

const TOTAL = 100;

const App = () => {
  const [a, setA] = useState(() => {
    const storedA = localStorage.getItem("sliderA");
    return storedA !== null ? Number(storedA) : 50;
  });

  const [b, setB] = useState(() => {
    const storedB = localStorage.getItem("sliderB");
    return storedB !== null ? Number(storedB) : 50;
  });

  const handleA = (e) => {
    const newA = Number(e.target.value);
    setA(newA);
    setB(TOTAL - newA);
  };

  const handleB = (e) => {
    const newB = Number(e.target.value);
    setB(newB);
    setA(TOTAL - newB);
  };

  // Save whenever values change
  useEffect(() => {
    localStorage.setItem("sliderA", String(a));
    localStorage.setItem("sliderB", String(b));
  }, [a, b]);

  return (
    <div className="container">
      <h2>Points allocation</h2>
      <p>Points must remain: {TOTAL}</p>

      <div className="row">
        <label>A : {a}</label>
        <input type="range" min="0" max={TOTAL} value={a} onChange={handleA} />
      </div>

      <div className="row">
        <label>B : {b}</label>
        <input type="range" min="0" max={TOTAL} value={b} onChange={handleB} />
      </div>
    </div>
  );
};

export default App;

//////////////////// REACT DUAL SLIDER LOGIC — CHEAT SHEET ////////////////////

// Goal:
// Two sliders that share a TOTAL points limit (100)
// Changing one slider automatically adjusts the other so their sum always = TOTAL

// Key Ideas:
// 1. Manage two states: a, b (values for each slider)
// 2. TOTAL = 100 (fixed sum)
// 3. When slider A changes: update A directly, then compute B = TOTAL - A
// 4. When slider B changes: update B directly, then compute A = TOTAL - B
// 5. Sliders are controlled components (state driven values)
// 6. Derived state: one value always depends on the other
// 7. Remaining points = TOTAL - (a + b), should always be 0 if logic is correct

// Functions:
// handleA: Parse slider input, update A, adjust B
// handleB: Parse slider input, update B, adjust A

// Interview Talking Point:
// This approach enforces valid state at all times,
// prevents overshooting the limit,
// and keeps user input tightly synchronized between two components.

///////////////////////////////////////////////////////////////////////////////
