import React from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import DoughnutChart from "./components/DoughnutChart";
import HorizontalBarChart from "./components/HorizontalBarChart";
import ProgessChart from "./components/ProgessChart";
import HeatMap from "./components/HeatMap";

const App = () => {
  return (
    <div>
      <h2>Chart Example</h2>
      {/* <BarChart /> */}
      {/* <LineChart /> */}
      {/* <PieChart /> */}
      {/* <DoughnutChart /> */}
      {/* <HorizontalBarChart /> */}
      {/* <ProgessChart value={20}/> */}
      <HeatMap />
    </div>
  );
};

export default App;
