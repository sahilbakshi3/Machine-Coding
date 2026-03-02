import React from "react";

const ProgessChart = ({ value }) => {
  return (
    <div style={{ width: "300px", background: "#eee" }}>
      <div
        style={{
          width: `${value}`,
          background: "green",
          color: "white",
          padding: "5px",
        }}
      >
        {value}%
      </div>
    </div>
  );
};

export default ProgessChart;
