import React from "react";
import data from "./data.json";
import FileExplorer from "./components/FileExplorer";
import "./App.css";

const App = () => {
  return (
    <div>
      <FileExplorer folderData={data} />
    </div>
  );
};

export default App;
