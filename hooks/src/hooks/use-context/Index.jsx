// hooks/src/hooks/use-context/Index.jsx
import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);

export const ContextExample = () => {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <GlobalContext.Provider value={{ isToggle, setIsToggle }}>
      <div>
        <h1>Parent Component</h1>
        <ChildToggle />
        <ChildDisplay />
      </div>
    </GlobalContext.Provider>
  );
};

const ChildToggle = () => {
  const { setIsToggle } = useContext(GlobalContext);
  return (
    <div>
      <button onClick={() => setIsToggle((prev) => !prev)}>Toggle State</button>
    </div>
  );
};

const ChildDisplay = () => {
  const { isToggle } = useContext(GlobalContext);
  return (
    <div>
      <p>Current State: {isToggle ? "ON" : "OFF"}</p>
    </div>
  );
};
