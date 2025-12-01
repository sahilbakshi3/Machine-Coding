import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <main className="content">
        <h1>Main Content</h1>
        <p>Scroll to resize the container</p>
      </main>
    </div>
  );
};

export default App;
