import "./App.css";
import { useState } from "react";

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="App">
      <button
        className={`toggle-btn ${toggle ? "toggled" : ""}`}
        onClick={() => setToggle(!toggle)}
      >
        <div className="thumb"></div>
      </button>
    </div>
  );
}

export default App;
