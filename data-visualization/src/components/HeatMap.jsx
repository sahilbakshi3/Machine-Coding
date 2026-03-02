import React from "react";

const HeatMap = () => {
  const data = [10, 20, 5, 30, 15, 25];

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {data.map((val, i) => (
        <div
          key={i}
          style={{
            width: "30px",
            height: "30px",
            background: `rgba(0, 128, 0, ${val / 30})`,
          }}
        />
      ))}
    </div>
  );
};

export default HeatMap;
