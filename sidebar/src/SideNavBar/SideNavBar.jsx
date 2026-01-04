import React, { useState } from "react";
import "./SideNavBar.css";

const SideNavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    "Dashboard",
    "Admin Profile",
    "Messages",
    "Analytics",
    "File Manager",
    "Orders",
    "Saved Items",
    "Settings",
  ];

  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <h2>Whisky</h2>
            </div>
          )}
          <button
            className={
              isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
            }
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
          {menuItems.map((text) => (
            <a
              key={text}
              href="#"
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
            >
              {isExpanded && <p>{text}</p>}
            </a>
          ))}
        </div>
      </div>
      <div className="nav-footer">
        {isExpanded && (
          <div className="nav-details">
            <p className="nav-footer-user-name">Bla Bla</p>
            <p className="nav-footer-user-position">Store Admin</p>
          </div>
        )}
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default SideNavBar;
