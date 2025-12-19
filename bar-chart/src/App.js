import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [freq, setFreq] = useState(null);
  const [yAxis, setYAxis] = useState([]);

  const fetchData = async () => {
    try {
      const url =
        "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new";

      const res = await fetch(url);
      const text = await res.text();

      const numbers = text.split("\n").filter(Boolean);

      const map = {};
      numbers.forEach((num) => {
        map[num] = (map[num] || 0) + 1;
      });

      setFreq(map);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!freq) return;

    const maxFreq = Math.max(...Object.values(freq));
    const roundedMax = Math.ceil(maxFreq / 10) * 10;

    const axis = [];
    for (let i = roundedMax; i >= 0; i -= 10) {
      axis.push(i);
    }

    setYAxis(axis);
  }, [freq]);

  if (!freq) return <div className="App">Loading…</div>;

  const maxFreq = Math.max(...Object.values(freq));

  return (
    <div className="App">
      <div className="container">
        <div className="box">
          {/* Y Axis */}
          <div className="box-y-axis">
            {yAxis.map((val, index) => (
              <span key={index}>{val}</span>
            ))}
          </div>

          {/* Bars */}
          {Object.entries(freq).map(([key, value]) => (
            <div key={key} className="box-x-axis">
              <div
                className="graph"
                style={{ height: `${(value / maxFreq) * 100}%` }}
              />
              <div className="index">{key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

// ======================================================
// HISTOGRAM BAR CHART – LOGIC STEPS (CHEAT SHEET)
// ======================================================

// STEP 1: Initialize state
// - freq  → stores frequency of each number from API
// - yAxis → stores Y-axis scale values (0, 10, 20, ...)

// STEP 2: Fetch numeric data from API
// - API returns plain text numbers (one per line)
// - Convert text → array using split("\n")
// - Remove empty values using filter(Boolean)

// STEP 3: Build frequency map
// - Loop through numbers
// - If number exists in map → increment count
// - Else → initialize count as 1
// - Result: { "1": 24, "2": 17, "3": 30, ... }

// STEP 4: Store frequency map in state
// - setFreq(map)
// - Triggers re-render and dependent effects

// STEP 5: Calculate maximum frequency
// - Extract values from freq object
// - Use Math.max to find highest count
// - Used for bar height normalization

// STEP 6: Generate Y-axis scale
// - Round max frequency to nearest multiple of 10
// - Create descending array from max → 0
// - Example: [30, 20, 10, 0]

// STEP 7: Render Y-axis
// - Map over yAxis array
// - Display scale values vertically (top → bottom)

// STEP 8: Render bars (X-axis values)
// - Loop over freq entries
// - Each entry represents one bar

// STEP 9: Normalize bar height
// - Convert raw count into percentage
// - Formula: (value / maxFreq) * 100
// - Ensures tallest bar reaches full chart height

// STEP 10: CSS dependency (critical)
// - Bars use percentage height
// - Parent container must have fixed height
// - Without it → bars render with height = 0

// ======================================================
