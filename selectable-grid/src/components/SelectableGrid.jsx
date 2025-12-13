import React, { useEffect, useState } from "react";

const SelectableGrid = ({ rows = 10, cols = 10 }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState([]);

  // const handleMouseUp = () => {
  //   setIsMouseDown(false);
  // };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsMouseDown(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true);
    setSelectedBoxes([boxNumber]);
  };

  const handleMouseEnter = (boxNumber) => {
    if (isMouseDown) {
      const startBox = selectedBoxes[0];
      const endBox = boxNumber;

      const startRow = Math.floor((startBox - 1) / cols);
      const startCol = (startBox - 1) % cols;
      const endRow = Math.floor((endBox - 1) / cols);
      const endCol = (endBox - 1) % cols;

      const minRow = Math.min(startRow, endRow);
      const maxRow = Math.max(startRow, endRow);
      const minCol = Math.min(startCol, endCol);
      const maxCol = Math.max(startCol, endCol);

      const selected = [];

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          selected.push(row * cols + col + 1);
        }
      }
      setSelectedBoxes(selected);
    }
  };

  return (
    <div className="grid" style={{ "--rows": rows, "--cols": cols }}>
      {[...Array(rows * cols).keys()].map((i) => (
        <div
          key={i}
          className={`box ${selectedBoxes.includes(i + 1) ? "selected" : ""}`}
          onMouseDown={() => handleMouseDown(i + 1)}
          onMouseEnter={() => handleMouseEnter(i + 1)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default SelectableGrid;

/* ============================================================================
   SELECTABLE GRID – LOGIC CHEAT SHEET
   ============================================================================

   GOAL
   ----
   Allow click + drag mouse selection on a grid.
   User clicks a cell → drags → all cells inside the rectangle get selected.

   ----------------------------------------------------------------------------
   PROPS
   ----------------------------------------------------------------------------
   rows (default: 10)  → number of rows in the grid
   cols (default: 10)  → number of columns in the grid

   ----------------------------------------------------------------------------
   STATE
   ----------------------------------------------------------------------------
   isMouseDown : boolean
     - true  → mouse button is currently pressed
     - false → mouse button released
     - used to control drag-selection behavior

   selectedBoxes : number[]
     - stores box numbers that are currently selected
     - first element = starting box of the drag
     - rest = dynamically calculated selection area

   ----------------------------------------------------------------------------
   GLOBAL MOUSEUP HANDLING
   ----------------------------------------------------------------------------
   WHY?
   - If user releases mouse OUTSIDE the grid,
     onMouseUp on grid will NOT fire.
   - That would leave isMouseDown stuck as true → broken behavior.

   SOLUTION:
   - Add a window-level "mouseup" listener using useEffect
   - Always reset isMouseDown when mouse is released anywhere

   ----------------------------------------------------------------------------
   EVENT FLOW
   ----------------------------------------------------------------------------

   1. onMouseDown(boxNumber)
      ----------------------
      - User clicks a box
      - Set isMouseDown = true
      - Store the clicked box as the STARTING POINT
        selectedBoxes = [boxNumber]

   2. onMouseEnter(boxNumber)
      -----------------------
      - Fires when mouse moves over another box
      - Runs ONLY if isMouseDown === true (dragging)
      - Treat this box as the END POINT

      LOGIC:
      - Convert start & end box numbers into (row, col)
      - Find minRow, maxRow, minCol, maxCol
      - Loop through that rectangle
      - Convert (row, col) back to box number
      - Update selectedBoxes with all boxes in rectangle

   3. mouseup (global)
      ----------------
      - Stops selection
      - Sets isMouseDown = false
      - Prevents further drag updates

   ----------------------------------------------------------------------------
   GRID MATH (IMPORTANT)
   ----------------------------------------------------------------------------

   Convert boxNumber → row, col:
     row = Math.floor((boxNumber - 1) / cols)
     col = (boxNumber - 1) % cols

   Convert row, col → boxNumber:
     boxNumber = row * cols + col + 1

   ----------------------------------------------------------------------------
   WHY <= IN LOOPS (CRITICAL FIX)
   ----------------------------------------------------------------------------
   for (row = minRow; row <= maxRow)
   for (col = minCol; col <= maxCol)

   Using < would EXCLUDE the last row/column.
   That bug caused "grid not selecting" earlier.

   ----------------------------------------------------------------------------
   RENDERING LOGIC
   ----------------------------------------------------------------------------
   - Render rows * cols boxes
   - Each box:
       • onMouseDown → start selection
       • onMouseEnter → extend selection
       • highlighted if included in selectedBoxes

   ----------------------------------------------------------------------------
   KEY TAKEAWAYS
   ----------------------------------------------------------------------------
   - Selection = rectangle between start & end cell
   - Global mouseup prevents stuck drag state
   - Grid selection is pure math, not React magic
   - Off-by-one errors WILL break UX silently

============================================================================ */
