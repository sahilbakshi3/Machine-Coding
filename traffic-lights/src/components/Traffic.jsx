import React, { useEffect, useState } from "react";
import Signal from "./Signal";

const Traffic = ({ lights = ["red", "yellow", "green"] }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevActive) => {
        return (prevActive + 1) % lights.length;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      {lights.map((color, index) => {
        return <Signal isActive={active === index} color={color} />;
      })}
    </>
  );
};

export default Traffic;
