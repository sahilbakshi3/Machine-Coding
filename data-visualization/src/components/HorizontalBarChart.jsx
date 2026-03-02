import React from "react";
import { Bar } from "react-chartjs-2";

const HorizontalBarChart = () => {
  const data = {
    labels: ["A", "B", "C"],
    datasets: [
      {
        label: "Scores",
        data: [80, 60, 90],
        backgroundColor: "orange",
      },
    ],
  };

  const options = {
    indexAxis: "y",
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
