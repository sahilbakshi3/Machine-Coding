import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["React", "Vue", "Angular"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#61dafb", "#42b883", "#dd1b16"],
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
