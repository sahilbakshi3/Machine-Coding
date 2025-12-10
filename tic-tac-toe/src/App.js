import React from "react";
import "./App.css";
import TicTacToe from "./components/TicTacToe.jsx";

const App = () => {
  return (
    <div>
      <TicTacToe size={3} />
    </div>
  );
};

export default App;
