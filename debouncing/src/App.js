import React, { useEffect, useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      return;
    }
    console.log("Api call with", debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Debounce Search</h2>

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Typed : {query}</p>
      <p>Debounced : {debouncedQuery}</p>
    </div>
  );
};

export default App;

//////////////////// REACT DEBOUNCING LOGIC — CHEAT SHEET /////////////////////

// Goal:
// Prevent triggering expensive actions (like API calls) on every keystroke.
// Instead, wait until the user stops typing for 500ms, then trigger the action.

// State:
// query          -> updates instantly with every key press
// debouncedQuery -> updates only after delay, used for API calls

// useEffect #1:
// Runs every time `query` changes.
// - Start a timer (setTimeout) for 500ms
// - After 500ms of inactivity, set debouncedQuery = query
// - Cleanup: clearTimeout(timer) if user types again before 500ms
//
// This means debouncedQuery updates less often than query.

// useEffect #2:
// Runs every time debouncedQuery changes.
// - If debouncedQuery is not empty -> trigger API request here
// - This ensures API is called only when the user stops typing

// Rendering:
// - Input box updates `query` with each keystroke
// - "Typed:" shows real-time typing
// - "Debounced:" shows value after delay

// Interview talking points:
// - Demonstrates debouncing without external libraries
// - Shows proper cleanup in useEffect to avoid memory leaks
// - Reduces unnecessary API calls and improves performance
// - Two-stage state: immediate vs. delayed update

