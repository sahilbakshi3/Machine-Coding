import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";

ChartJS.register(ArcElement);

export default function PieChart({ data }) {
  return (
    <Pie
      data={{
        labels: ["High (4+)", "Medium (3-4)", "Low (<3)"],
        datasets: [
          {
            data,
            backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
          },
        ],
      }}
    />
  );
}
