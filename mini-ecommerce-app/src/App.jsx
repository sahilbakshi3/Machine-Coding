import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=50")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <header>
        <h1>Mini Store</h1>
        <button onClick={() => setCartOpen(true)}>Cart ({cart.length})</button>
      </header>

      <ProductList products={products} addToCart={addToCart} />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          close={() => setCartOpen(false)}
          updateQty={updateQty}
          removeItem={removeItem}
        />
      )}
    </div>
  );
}
