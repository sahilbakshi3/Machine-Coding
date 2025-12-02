import React from "react";
import StarRating from "./components/StarRating";
import "./App.css";

const App = () => {
  return (
    <div>
      <StarRating starCount={10} />
    </div>
  );
};

export default App;
