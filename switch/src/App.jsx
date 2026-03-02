import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="toggle-container">
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={() => setIsOn(!isOn)} />
        <span className="slider"></span>
      </label>
      <p>{isOn ? "ON" : "OFF"}</p>
    </div>
  );
};

export default App;
