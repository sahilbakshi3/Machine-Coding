import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [n, setN] = useState(3);
  const [grid, setGrid] = useState([]);
  const [max, setMax] = useState(0);

  useEffect(() => {
    setGrid(Array.from({ length: n }, () => Array(n).fill(null)));
    setMax(0);
  }, [n]);

  const handleClick = (i, j) => {
    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row]);

      if (newGrid[i][j] === null) {
        const newVal = max + 1;
        newGrid[i][j] = newVal;
        setMax(newVal);
      } else {
        newGrid[i][j] = max;
      }
      return newGrid;
    });
  };

  return (
    <div className="app">
      <h1>Dynamic Grid</h1>

      <input
        type="number"
        min="1"
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
      />

      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${n}, 60px)` }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="cell"
              onClick={() => handleClick(i, j)}
            >
              {cell}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default App;

/* -------------------------------------------------------------------
   DYNAMIC GRID WITH INCREMENTAL VALUES
   -------------------------------------------------------------------
   GOAL:
     - Create an n x n grid based on user input
     - Initially all cells are empty
     - Clicking cells updates values based on global max logic
     - UI updates instantly using React state

   -------------------------------------------------------------------
   STATE:
     n (state):
       - Size of grid (number input)
       - Example: 3 → creates 3x3 grid

     grid (state):
       - 2D array representing grid
       - Example:
           [
             [null, null, null],
             [null, null, null],
             [null, null, null]
           ]

     max (state):
       - Tracks maximum value currently in grid
       - Avoids recalculating max every click (optimization)

   -------------------------------------------------------------------
   INITIALIZATION LOGIC:

   useEffect (runs when n changes):
     - Create new empty grid
     - Reset max value

     setGrid(Array(n x n filled with null))
     setMax(0)

   -------------------------------------------------------------------
   CLICK HANDLER:

   handleClick(i, j):
     - Create a shallow copy of grid (immutability)

     IF cell is EMPTY (null):
       → Assign value = max + 1
       → Update max

       newVal = max + 1
       grid[i][j] = newVal
       setMax(newVal)

     ELSE (cell already has value):
       → Replace with current max

       grid[i][j] = max

     → Update grid state

   -------------------------------------------------------------------
   RENDER UI:

     Input field:
       - Takes number n
       - Updates grid size dynamically

     Grid container:
       - CSS grid with n columns

     Each cell:
       - Displays value or empty
       - Clickable div → triggers handleClick(i, j)

   -------------------------------------------------------------------
   FLOW SUMMARY:

     User enters n → grid initializes (n x n)

     User clicks EMPTY cell:
       → Fill with max + 1
       → max increases

     User clicks FILLED cell:
       → Replace with current max

     State updates → UI rerenders automatically

   -------------------------------------------------------------------
   PERFORMANCE CONSIDERATION:

     ✓ max stored separately → O(1) updates
     ✗ Avoid Math.max(...grid.flat()) → O(n²) per click

   -------------------------------------------------------------------
   PRO TIPS (IMPROVEMENTS):

     ✓ Highlight last clicked cell
     ✓ Animate value changes
     ✓ Disable clicks after full grid
     ✓ Add reset button
     ✓ Optimize rendering using React.memo for cells

------------------------------------------------------------------- */
