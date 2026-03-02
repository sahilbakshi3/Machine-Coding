export default function Filter({ range, setRange }) {
  return (
    <div className="filter">
      <button
        className={range === "5" ? "active" : ""}
        onClick={() => setRange("5")}
      >
        Top 5
      </button>

      <button
        className={range === "10" ? "active" : ""}
        onClick={() => setRange("10")}
      >
        Top 10
      </button>

      <button
        className={range === "20" ? "active" : ""}
        onClick={() => setRange("20")}
      >
        Top 20
      </button>
    </div>
  );
}
