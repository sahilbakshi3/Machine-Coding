import React, { useEffect, useState } from "react";

const currencyOptions = ["USD", "EUR", "GBP", "CNY"];
const URL = "https://api.frontendeval.com/fake/crypto";

const Crypto = () => {
  const [amount, setAmount] = useState(0);

  const [convertedAmt, setConvertedAmt] = useState(0);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [conversionRate, setConversionRate] = useState(0);
  const [prevConvertedAmt, setPrevConvertedAmt] = useState(0);

  useEffect(() => {
    const apiFetch = async () => {
      try {
        const res = await fetch(`${URL}/${currency}`);
        const data = await res.json();
        // console.log(data);

        setConversionRate(data.value);
      } catch (err) {
        console.log("Error is", err);
      }
    };
    apiFetch();

    const timer = setInterval(apiFetch, 5000);

    return () => clearInterval(timer);
  }, [currency]);

  useEffect(() => {
    setPrevConvertedAmt(convertedAmt);
    setConvertedAmt(amount * conversionRate);
  }, [amount, conversionRate]);

  const priceChange = convertedAmt - prevConvertedAmt;

  return (
    <div>
      <label htmlFor="amountToConvert">
        Amount to Convert
        <input
          type="number"
          id="amountToConvert"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label htmlFor="currency">
        Select Currency
        <select id="currency" onChange={(e) => setCurrency(e.target.value)}>
          {currencyOptions.map((value, index) => {
            return (
              <option value={value} key={index}>
                {value}
              </option>
            );
          })}
        </select>
      </label>
      <p>WUC Crypto Equivalent: {convertedAmt.toFixed(2)}</p>
      <p style={{ color: priceChange > 0 ? "green" : "red" }}>
        Change : {priceChange > 0 ? "🔼" : "🔽"} {priceChange.toFixed(2)}{" "}
      </p>
    </div>
  );
};

export default Crypto;
