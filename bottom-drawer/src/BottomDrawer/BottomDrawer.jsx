import React, { useState } from "react";

const BottomDrawer = () => {
  const menuItems = ["Dashboard", "Profile", "Messages", "Settings"];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="open-btn" onClick={() => setIsOpen(true)}>
        Open Menu
      </button>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      <div className={`bottom-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            X
          </button>
        </div>
        <ul className="drawer-menu">
          {menuItems.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default BottomDrawer;
