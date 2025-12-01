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
