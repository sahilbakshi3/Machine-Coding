import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [progress, setProgress] = useState(0);

  const resetProgres = () => {
    setProgress(0);
  };

  useEffect(() => {
    if (progress === 100) {
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => prev + 10);
    }, 500);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className="container">
      <h3>Progress Bar</h3>

      <div className="bar">
        <div className="fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress}%</p>

      <button onClick={resetProgres}>Reset</button>
    </div>
  );
};

export default App;

//////////////////// SIMPLE PROGRESS BAR CHEAT SHEET //////////////////////////

// Goal:
// Visual progress indicator that fills over time

// State:
// progress -> controls bar width (%)

// useEffect:
// - If progress < 100, start interval
// - In interval: progress increases by +10 every 500ms
// - Clear interval on unmount or when progress updates

// Reset:
// Clicking reset sets progress back to 0

// Rendering:
// - Wrapper bar (gray)
// - Inner bar (blue) grows using style width: `${progress}%`

// Why it’s good for interviews:
// Uses state + effect + dynamic UI update logic
// Shows controlled, state-driven animations
// Clean and easy to explain

///////////////////////////////////////////////////////////////////////////////
