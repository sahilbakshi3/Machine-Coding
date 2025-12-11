import React, { useState } from "react";

const VirtualizedList = ({ list, height, itemHeight, width }) => {
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)]);

  const visibleList = list.slice(indices[0], indices[1] + 1);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;

    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);

    setIndices([newStartIndex, newEndIndex]);
  };

  return (
    <div
      onScroll={handleScroll}
      className="container"
      style={{ height, width, backgroundColor: "grey", overflow: "auto" }}
    >
      <div style={{ height: list.length * itemHeight, position: "relative" }}>
        {visibleList.map((item, index) => {
          return (
            <div
              key={index}
              className="item"
              style={{
                height: itemHeight,
                background: "coral",
                borderTop: "5px solid grey",
                position: "absolute",
                top: (indices[0] + index) * itemHeight,
                width: "100%",
                textAlign: "center",
              }}
            >
              {"Item" + item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedList;
