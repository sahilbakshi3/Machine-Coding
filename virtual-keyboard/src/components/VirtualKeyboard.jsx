import React, { useState } from "react";
import "./VirtualKeyboard.css";

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];

const VirtualKeyboard = () => {
  const [value, setValue] = useState("");
  const [activeKey, setActiveKey] = useState("");

  const handleClick = (key) => {
    setValue(value + key);
    setActiveKey(key);

    setTimeout(() => {
      setActiveKey("");
    }, 150);
  };

  return (
    <div className="keyboard-container">
      <input
        className="keyboard-input"
        placeholder="Type using keyboard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="keyboard">
        {keys.map((key) => (
          <button
            key={key}
            className={`key ${activeKey === key ? "active" : ""}`}
            onClick={() => handleClick(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
