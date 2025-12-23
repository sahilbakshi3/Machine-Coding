import React, { useState } from "react";
import usePasswordGenerator from "../hooks/usePasswordGenerator";
import PasswordStrengthIndicator from "./StrengthChecker";

const PasswordGenerator = () => {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckBoxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckBoxData = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckBoxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, generatePassword, errorMessage } = usePasswordGenerator();

  return (
    <div className="container">
      {/* Password Text and Copy */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      {/* Character Length */}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="27"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      {/* Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, i) => {
          return (
            <div key={i}>
              <input
                type="checkbox"
                checked={checkbox.state}
                onChange={() => handleCheckBoxData(i)}
              />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>
      {/* Strength */}

      <PasswordStrengthIndicator password={password} />

      {/* Error handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {/* Generate Button */}
      <button
        className="generateBtn"
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
