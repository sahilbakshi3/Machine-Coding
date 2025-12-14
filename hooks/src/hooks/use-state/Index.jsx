import React, { useState } from "react";

const StateExpample = () => {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleCount}>Increase Count</button>
    </div>
  );
};

export default StateExpample;

/* ------------------------------------------------------------------
   STATE EXPAMPLE (useState basics)
   ------------------------------------------------------------------

   GOAL:
   - Maintain a counter
   - Increase count when button is clicked

   ------------------------------------------------------------------
   STATE:
   count        → stores current count value
   setCount     → function to update count

   useState(0):
   - Initializes count with 0
   - Returns [state, updater]

   ------------------------------------------------------------------
   HANDLE FUNCTION (handleCount):
   - Triggered on button click
   - Uses functional update:
       setCount(prev => prev + 1)

   WHY functional update?
   - Ensures latest state is used
   - Avoids stale state issues when updates are batched

   ------------------------------------------------------------------
   RENDER:
   <p>Count: {count}</p>
   - Displays current state value

   <button onClick={handleCount}>
   - Calls handleCount on click
   - Updates state → causes re-render

   ------------------------------------------------------------------
   IMPORTANT NOTES:
   - setCount is asynchronous
   - State update triggers re-render
   - Never mutate state directly (count++ ❌)

   ------------------------------------------------------------------
*/
