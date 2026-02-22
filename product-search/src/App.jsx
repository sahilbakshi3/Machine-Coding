import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      setFiltered(data.products);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const res = products.filter((p) =>
      p.title.toLowercase().includes(search.toLowerCase()),
    );
    setFiltered(res);
  }, [search, products]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Product Search</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 8,
          width: "300px",
          marginBottom: 20,
        }}
      />

      {filtered.map((item) => (
        <div
          key={item.id}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            marginBottom: 10,
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default App;
