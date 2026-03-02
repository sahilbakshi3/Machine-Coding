import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function LineChart({ labels, data }) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Rating",
            data,
            borderColor: "#2196F3",
          },
        ],
      }}
    />
  );
}
