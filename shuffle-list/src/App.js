import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([
    "Apple",
    "Mango",
    "Banana",
    "Grapes",
    "Orange",
    "Kiwi",
    "Dragon fruit",
  ]);

  const handleShuffle = () => {
    const copyItems = [...items];

    for (let i = copyItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyItems[i], copyItems[j]] = [copyItems[j], copyItems[i]];
    }

    setItems(copyItems);
  };

  return (
    <div>
      <h1>List of Items</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handleShuffle}>Shuffle Items</button>
    </div>
  );
};

export default App;
