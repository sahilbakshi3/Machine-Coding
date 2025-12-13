import React from "react";
import "./App.css";
import SelectableGrid from "./components/SelectableGrid";

const App = () => {
  return (
    <div>
      <SelectableGrid rows={10} cols={10} />
    </div>
  );
};

export default App;
