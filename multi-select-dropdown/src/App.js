import React from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";

const OPTIONS = [
  { id: 1, label: "JavaScript", value: "javascript" },
  { id: 2, label: "Python", value: "python" },
  { id: 3, label: "Java", value: "java" },
  { id: 4, label: "C++", value: "cpp" },
  { id: 5, label: "Ruby", value: "ruby" },
  { id: 6, label: "Go", value: "go" },
  { id: 7, label: "Rust", value: "rust" },
  { id: 8, label: "TypeScript", value: "typescript" },
  { id: 9, label: "Swift", value: "swift" },
  { id: 10, label: "Kotlin", value: "kotlin" },
];

const App = () => {
  return (
    <div>
      <Dropdown options={OPTIONS} />
    </div>
  );
};

export default App;
