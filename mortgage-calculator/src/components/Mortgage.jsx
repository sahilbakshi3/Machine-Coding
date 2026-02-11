import React, { useState } from "react";

const Mortgage = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calcMortgage = (p, rate, years) => {
    const r = rate / 100 / 12;
    const n = years * 12;

    return (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  };

  const handleCalculate = () => {
    const payment = calcMortgage(
      Number(principal),
      Number(rate),
      Number(years),
    );

    setResult(Math.round(payment).toLocaleString());
  };

  return (
    <div className="container">
      <h2>Principal loan amount</h2>
      <input
        className="input"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
      />

      <h2>Interest rate</h2>
      <div className="row">
        <input
          className="input"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <span className="suffix">%</span>
      </div>

      <h2>Length of loan</h2>
      <div className="row">
        <input
          className="input"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />
        <span className="suffix">Years</span>
      </div>

      <button className="btn" onClick={handleCalculate}>
        Calculate
      </button>

      {result && (
        <p className="result">
          Your Monthly mortagage payment will be ${result}
        </p>
      )}
    </div>
  );
};

export default Mortgage;
