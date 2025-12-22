import React, { useEffect, useRef, useState } from "react";

const STATUS = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

const TypeAhead = () => {
  const [query, setQuery] = useState("");

  const [result, setResult] = useState([]);

  const [status, setStatus] = useState(STATUS.LOADING);

  const cache = useRef({});

  useEffect(() => {
    const abortController = new AbortController();

    const { signal } = abortController;

    const fetchData = async () => {
      try {
        setStatus(STATUS.LOADING);
        if (cache.current[query]) {
          console.log("Retrived data from cache");
          setResult(cache.current[query]);
          setStatus(STATUS.SUCCESS);
          return;
        }
        console.log("Api call");
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=10`,
          { signal }
        );
        const data = await res.json();
        setStatus(STATUS.SUCCESS);
        cache.current[query] = data.products;
        setResult(data.products);
      } catch (error) {
        console.log(error);
        if (error.name !== "AbortError") {
          setStatus(STATUS.ERROR);
        }
      }
    };
    const timerId = setTimeout(fetchData, 1000);
    return () => {
      clearTimeout(timerId);
      abortController.abort();
    };
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {status === STATUS.LOADING && <p>Loading...</p>}
      {status === STATUS.ERROR && <p>Error Occured</p>}
      {status === STATUS.SUCCESS && (
        <ul>
          {result.map((item) => {
            return <li key={item.id}>{item.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default TypeAhead;

/*
========================================
TYPEAHEAD COMPONENT – LOGIC CHEATSHEET
========================================

1. STATUS OBJECT
----------------
- Acts like an enum for UI states
- Prevents magic strings scattered across code
- Possible states:
  - LOADING → API call in progress
  - SUCCESS → Data fetched successfully
  - ERROR   → API failed (excluding abort)

2. STATE VARIABLES
------------------
- query  : Stores user input from the text box
- result : Stores array of products to display
- status : Controls conditional rendering (loading/error/success)

3. CACHE (useRef)
-----------------
- cache.current is a plain JS object
- Stores API responses keyed by query string
- Persists across renders without causing re-renders
- Purpose: avoid repeated API calls for same query

4. useEffect (Runs on query change)
-----------------------------------
Triggered every time `query` changes

Inside useEffect:

4.1 AbortController
-------------------
- Created to cancel ongoing fetch requests
- Prevents:
  - Race conditions
  - State updates after component unmount
- signal is passed to fetch()

4.2 fetchData Function
----------------------
Wrapped in try/catch for error handling

Step-by-step:

a) setStatus(LOADING)
   - Shows loading indicator before fetching

b) Cache Check
   - If cache.current[query] exists:
     - Use cached data
     - Skip API call
     - Set SUCCESS state
     - Exit early

c) API Call
   - Fetch products based on query
   - signal allows request cancellation

d) Success Handling
   - Store products in cache
   - Update result state
   - Set status to SUCCESS

e) Error Handling
   - Ignore AbortError (expected behavior)
   - Set ERROR state for real failures

4.3 Debounce using setTimeout
-----------------------------
- API call delayed by 1000ms
- Prevents firing request on every keystroke
- Improves performance and UX

4.4 Cleanup Function
--------------------
Runs when:
- query changes
- component unmounts

Cleanup actions:
- clearTimeout → cancels pending debounce
- abortController.abort() → cancels in-flight fetch

5. RENDER LOGIC
---------------
- Input field updates `query`
- Conditional rendering based on `status`:
  - LOADING → show "Loading..."
  - ERROR   → show error message
  - SUCCESS → render list using result.map()

6. KEY CONCEPTS USED
-------------------
- Debouncing (setTimeout)
- Caching (useRef)
- Request cancellation (AbortController)
- Controlled input
- Conditional UI rendering
- Race-condition prevention

========================================

*/
