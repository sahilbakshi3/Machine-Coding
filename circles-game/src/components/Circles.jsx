import React, { useState } from "react";

const COLORS = ["red", "blue", "green", "orange", "purple"];

export default function Circles() {
  const [circles, setCircles] = useState([]);
  const [redo, setRedo] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const newCircle = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    setCircles((prev) => [...prev, newCircle]);
    setRedo([]);
  };

  const undo = () => {
    if (!circles.length) return;

    const last = circles[circles.length - 1];
    setCircles((prev) => prev.slice(0, -1));
    setRedo((prev) => [...prev, last]);
  };

  const redoFn = () => {
    if (!redo.length) return;

    const last = redo[redo.length - 1];
    setRedo((prev) => prev.slice(0, -1));
    setCircles((prev) => [...prev, last]);
  };

  const reset = () => {
    setCircles([]);
    setRedo([]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <div style={{ marginBottom: 20 }}>
        <button onClick={undo} disabled={!circles.length}>
          Undo
        </button>
        <button onClick={redoFn} disabled={!redo.length}>
          Redo
        </button>
        <button onClick={reset} disabled={!circles.length}>
          Reset
        </button>
      </div>

      <div
        onClick={handleClick}
        style={{
          width: 600,
          height: 400,
          border: "2px solid #ccc",
          margin: "auto",
          position: "relative",
        }}
      >
        {circles.map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: c.y,
              left: c.x,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: c.color,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/*
========================================
CIRCLES GAME – LLD CHEATSHEET (REACT)
========================================

CORE IDEA
---------
- This is a classic Undo/Redo problem
- Use TWO stacks:
    1. history (circles on board)
    2. redoStack (undone circles)

----------------------------------------

1. STATE DESIGN
---------------
- history   : array of circles currently visible
- redoStack : array of circles removed via undo

Each circle object:
{
  id,
  x,
  y,
  color
}

----------------------------------------

2. DRAW CIRCLE (ON CLICK)
-------------------------
- Get click position (clientX, clientY)
- Create new circle
- Add to history
- CLEAR redoStack (important!)

WHY?
- New action invalidates redo history

----------------------------------------

3. UNDO (LIFO)
--------------
- Remove last circle from history
- Push it into redoStack

----------------------------------------

4. REDO
-------
- Remove last circle from redoStack
- Push it back into history

----------------------------------------

5. RESET
--------
- Clear BOTH history and redoStack

----------------------------------------

6. BUTTON STATES
----------------
- Undo disabled → history.length === 0
- Redo disabled → redoStack.length === 0
- Reset disabled → history.length === 0

----------------------------------------

7. ANIMATION (OPTIONAL BUT GOOD)
--------------------------------
- Use CSS:
    transition: transform 0.2s ease, opacity 0.2s
- Add scale effect on mount

----------------------------------------

8. CODE (MINIMAL + CLEAN)
--------------------------------
*/
