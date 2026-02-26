import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const api = await fetch("https://dummyjson.com/products");
        const res = await api.json();
        
        setData(res.products);

        setLoading(false);

        // console.log(res);
      } catch (error) {
        console.error("Error, in list display", error);
      }
    };

    fetchApi();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Products Table</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </td>
                <td>{item.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
