import React from "react";

export default function ProductList({ products, addToCart }) {
  return (
    <div className="grid">
      {products.map((product) => (
        <div key={product.id} className="card">
          <img src={product.thumbnail} alt="" />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
