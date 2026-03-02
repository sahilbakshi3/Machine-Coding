import { useEffect, useState } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import Filter from "./components/Filter";

export default function App() {
  const [range, setRange] = useState("5"); // number of items
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`https://dummyjson.com/products?limit=${range}`)
      .then((res) => res.json())
      .then((res) => {
        const products = res.products;

        setData({
          labels: products.map((p) => p.title.slice(0, 6)),
          bar: products.map((p) => p.price),
          line: products.map((p) => p.rating),
          pie: [
            products.filter((p) => p.rating >= 4).length,
            products.filter((p) => p.rating >= 3 && p.rating < 4).length,
            products.filter((p) => p.rating < 3).length,
          ],
        });

        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [range]);

  return (
    <div className="dashboard">
      <h2>Dashlytics</h2>

      <Filter range={range} setRange={setRange} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && !loading && (
        <div className="charts">
          <BarChart labels={data.labels} data={data.bar} />
          <LineChart labels={data.labels} data={data.line} />
          <PieChart data={data.pie} />
        </div>
      )}
    </div>
  );
}
