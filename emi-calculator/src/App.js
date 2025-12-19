import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [principal, setPrincipal] = useState(0);
  const [years, setYears] = useState(0);
  const [interest, setInterest] = useState(0);

  const [emi, setEMI] = useState(0);

  const handleChange = (e) => {
    const id = e.target.id;
    const val = Number(e.target.value) || 0;

    if (id === "principal") {
      setPrincipal(val);
    } else if (id === "interest") {
      setInterest(val);
    } else {
      setYears(val);
    }

    // console.log(e.target.id, e.target.value);
  };

  const calculateEMI = () => {
    let r = interest;
    if (principal && r && years) {
      r = r / 12 / 100;
      const calcPow = Math.pow(1 + r, years * 12);
      const amount = principal * ((r * calcPow) / (calcPow - 1));

      setEMI(Math.round(amount));
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [principal, years, interest]);

  return (
    <div className="App">
      <div className="container">
        <div className="inputs">
          <p>Principal</p>
          <input onChange={handleChange} type="text" id="principal" />

          <p>Interest rate</p>
          <input onChange={handleChange} type="text" id="interest" />

          <p>Length of Loan</p>
          <input onChange={handleChange} type="text" id="years" />
        </div>

        <div className="output">Your EMI would be {emi}</div>
      </div>
    </div>
  );
};

export default App;

// ======================================================
// EMI CALCULATOR – LOGIC STEPS (CHEAT SHEET)
// ======================================================

// STEP 1: Initialize state
// - principal → loan amount entered by user
// - interest  → annual interest rate (percentage)
// - years     → loan duration in years
// - emi       → calculated monthly EMI

// STEP 2: Handle input changes
// - Read input identifier (name / id)
// - Convert input value from string → number
// - Update corresponding state based on input field

// STEP 3: Validate inputs
// - EMI should be calculated only if:
//   principal > 0
//   interest > 0
//   years > 0
// - Prevent calculation when values are missing or invalid

// STEP 4: Convert annual interest to monthly rate
// - Formula: monthlyRate = interest / 12 / 100

// STEP 5: Calculate EMI using standard formula
// EMI = P × [ r × (1 + r)^n ] / [ (1 + r)^n − 1 ]
//
// Where:
// P = principal
// r = monthly interest rate
// n = total months (years × 12)

// STEP 6: Store calculated EMI in state
// - setEMI(amount)
// - Triggers re-render to show updated EMI

// STEP 7: Recalculate EMI automatically
// - useEffect watches principal, interest, years
// - Re-runs EMI calculation whenever any input changes

// STEP 8: Display EMI
// - Render EMI value dynamically in UI

// ======================================================
