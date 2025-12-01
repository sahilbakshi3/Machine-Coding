import React, { useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";

const App = () => {
  const [selectedValue, setIsSelectedValue] = useState(null);

  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
  ];

  return (
    <div className="container">
      <h2>Dropdown Component</h2>
      <Dropdown
        label="Frontend Framworks"
        onChange={(option) => setIsSelectedValue(option)}
        options={options}
      />
    </div>
  );
};

export default App;
