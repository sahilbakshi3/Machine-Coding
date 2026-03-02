import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        {[...Array(50)].map((_, i) => (
          <p key={i}>Scroll content {i + 1}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
