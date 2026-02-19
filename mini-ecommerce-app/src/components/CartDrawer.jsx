import React from "react";

export default function CartDrawer({ cart, close, updateQty, removeItem }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="drawer">
      <div className="drawer-content">
        <h2>Cart</h2>
        <button onClick={close}>Close</button>

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.title}</span>
            <div>
              <button onClick={() => updateQty(item.id, -1)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, 1)}>+</button>
            </div>
            <button onClick={() => removeItem(item.id)}>X</button>
          </div>
        ))}

        <h3>Total: ${total}</h3>
      </div>
    </div>
  );
}
