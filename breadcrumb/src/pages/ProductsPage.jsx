import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
      });
  }, []);

  return (
    <div>
      <h1>Products Page</h1>
      <div className="product-grid">
        {products?.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <h3>${product.price}</h3>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/products">
        <button style={{ width: "100%", padding: 10 }}>
          View all Products
        </button>
      </Link>
    </div>
  );
};

export default ProductsPage;
