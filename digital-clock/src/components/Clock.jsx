import React, { useState } from "react";

const Clock = () => {
  const [time, setTime] = useState();

  const updateTime = () => {
    const currTime = new Date().toLocaleTimeString();
    setTime(currTime);
  };

  setInterval(() => {
    updateTime();
  }, 1000);

  return (
    <div className="container">
      <h1 className="text">Digital Clock</h1>
      <h1>{time}</h1>
    </div>
  );
};

export default Clock;

/*
====================================================
DIGITAL CLOCK COMPONENT — LOGIC CHEATSHEET
====================================================

STATE
-----
1. time
   - Stores the current time as a STRING.
   - Format comes from Date().toLocaleTimeString().
   - Initially undefined until first update.


TIME UPDATE LOGIC
-----------------
updateTime():
- Creates a new Date object.
- Converts current system time to a readable string.
- Updates `time` state using setTime().
- Triggers re-render to show updated time.


INTERVAL LOGIC (❌ CURRENT PROBLEM HERE)
---------------------------------------
setInterval(() => {
  updateTime();
}, 1000);

WHAT ACTUALLY HAPPENS:
- This setInterval runs EVERY TIME the component re-renders.
- Each render creates a NEW interval.
- Intervals stack up infinitely.
- Result:
  - Performance issues
  - Memory leak
  - Time updates faster and faster like it’s on crack


WHY THIS IS WRONG
-----------------
React function components re-run on every state update.
Calling setInterval directly in the component body is a rookie mistake.


CORRECT WAY (MENTAL MODEL)
-------------------------
- setInterval should run ONLY ONCE when component mounts.
- Interval should be CLEANED UP when component unmounts.
- This requires useEffect.


CORRECT IMPLEMENTATION (REFERENCE)
----------------------------------
useEffect(() => {
  const interval = setInterval(updateTime, 1000);

  return () => clearInterval(interval);
}, []);

This ensures:
- Single interval
- No memory leaks
- Predictable updates


RENDER FLOW
-----------
1. Component mounts
2. Interval starts ticking every 1 second
3. updateTime updates state
4. Component re-renders
5. Updated time displayed


SUMMARY (BURN THIS INTO YOUR BRAIN)
----------------------------------
- NEVER call setInterval directly in component body
- ALWAYS use useEffect for side effects
- ALWAYS clean up intervals
- State update → re-render → repeat safely

====================================================
*/
