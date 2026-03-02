import React, { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const ReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>useReducer Counter</h1>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
};

export default ReducerExample;

/* ------------------------------------------------------------------
   REDUCER EXAMPLE (useReducer basics)
   ------------------------------------------------------------------

   GOAL:
   - Manage counter with multiple actions
   - Use reducer pattern for predictable state updates

   ------------------------------------------------------------------
   STATE:
   state        → { count: 0 }
   dispatch     → function to send actions to reducer

   useReducer(reducer, initialState):
   - Takes a reducer function + initial state
   - Returns [state, dispatch]

   ------------------------------------------------------------------
   REDUCER FUNCTION:
   - Pure function: (state, action) => newState
   - Receives current state + action object
   - Returns NEW state based on action.type
   - Never mutates state directly

   ------------------------------------------------------------------
   ACTIONS:
   { type: "INCREMENT" } → count + 1
   { type: "DECREMENT" } → count - 1
   { type: "RESET" }     → back to initialState

   ------------------------------------------------------------------
   WHEN TO USE useReducer over useState?
   - Multiple related state values
   - Complex update logic
   - Next state depends on previous state
   - State transitions follow clear rules

   ------------------------------------------------------------------
*/
