import React, { useRef, useState } from "react";

const InteractiveShape = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(false))
  );
  const queue = useRef([]);
  const isClearing = useRef(false);

  const handleOnClick = (rowIdx, colIdx) => {
    if (isClearing.current) return;

    setGrid((prev) => {
      const updated = prev.map((row) => [...row]);
      updated[rowIdx][colIdx] = true;
      return updated;
    });

    queue.current.push([rowIdx, colIdx]);

    if (queue.current.length === 9) {
      triggerClearAnimation();
    }
  };

  const triggerClearAnimation = () => {
    isClearing.current = true;

    queue.current.forEach(([rowIdx, colIdx], idx) => {
      setTimeout(() => {
        setGrid((prev) => {
          const updated = prev.map((r) => [...r]);
          updated[rowIdx][colIdx] = false;
          return updated;
        });

        if (idx === queue.current.length - 1) {
          isClearing.current = false;
        }
      }, (idx + 1) * 1000);
    });

    queue.current = [];
  };

  return (
    <div className="container">
      {grid.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <div
            key={`${rowIdx}-${colIdx}`}
            className={`cell ${cell ? "active" : ""}`}
            onClick={() => handleOnClick(rowIdx, colIdx)}
          ></div>
        ))
      )}
    </div>
  );
};

export default InteractiveShape;

/* -------------------------------------------------------------------
                             INTERACTIVE SHAPE

GOAL:
Create a 3×3 clickable grid:
- Clicking a cell activates it (turns ON)
- Store the click order in a queue
- When all 9 cells are ON → start auto-clearing animation
- During animation: disable further clicks

STATE + REFS:
grid (useState)
- 3×3 boolean matrix
- true → active cell
- false → inactive cell
- React state → UI updates

 queue (useRef)
   - Stores clicked cells in order: [[row, col], ...]
   - Does not trigger re-render → local side-effect control

 isClearing (useRef)
   - Boolean flag to block clicks during clearing animation


HANDLE CLICK (handleOnClick):
1. If clearing animation active → ignore click
2. Update grid to activate clicked cell
3. Push cell position to queue
4. If queue reaches 9 cells → trigger clearing animation

CLEAR ANIMATION (triggerClearAnimation):
- Set isClearing → true (lock board)
- For each stored cell in queue:
Use setTimeout → turn OFF one by one
Delay = (idx + 1) seconds per cell
- When last cell turned OFF:
isClearing → false (unlock board)
- Clear queue immediately after scheduling timeouts

RENDER:
- Display grid as 9 clickable <div> cells
- Cell styling depends on boolean state:
true → add "active" class
false → default cell class
- Each cell has onClick(rowIdx, colIdx)

FLOW SUMMARY:
Click → activate → track in queue
If all filled → auto-clear in sequence
During clear → clicks blocked
After clear → re-enable interaction

PERFORMANCE + COMPLEXITY:
- Fixed grid → constant time & space O(1)
- Efficient shallow copy updates → safe React patterns
- No dependency traps / infinite loops

FUTURE UPGRADES (if asked in interview):
✓ Configurable grid size (NxN)
✓ Better animations (CSS transitions)
✓ Reset / restart button
✓ Score or timer mechanic
✓ Touch-friendly mobile UX designs

------------------------------------------------------------------- */
