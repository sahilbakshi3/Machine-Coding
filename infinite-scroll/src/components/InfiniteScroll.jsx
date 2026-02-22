import React, { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`,
    );
    const data = await res.json();
    setItems((prev) => [...prev, ...data.products]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 100 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Infinite Scroll</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: 16,
            marginBottom: 10,
            border: "1px solid #ccc",
          }}
        >
          {item.title}
        </div>
      ))}

      {loading && <p>Loading...</p>}
    </div>
  );
}
