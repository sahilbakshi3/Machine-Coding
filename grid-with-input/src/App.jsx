import React, { useState } from "react";

const App = () => {
  const [size, setSize] = useState(3);

  const handleChange = (e) => {
    const value = Math.max(1, Number(e.target.value));

    setSize(value);
  };

  return (
    <div>
      <h2>Dynamic Grid</h2>
      <input
        type="number"
        value={size}
        min="1"
        onChange={handleChange}
        style={{ marginBottom: "20px", padding: "5px" }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 60px)`,
          gap: "5px",
        }}
      >
        {Array.from({ length: size * size }).map((_, index) => (
          <div
            key={index}
            style={{
              height: "60px",
              width: "60px",
              backgroundColor: "#3498db",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
