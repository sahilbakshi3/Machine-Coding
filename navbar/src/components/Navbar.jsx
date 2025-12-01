import React, { useState } from "react";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileOpen = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeAll = () => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="nav-logo">My site</div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>

          <div
            className="navbar-dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              type="button"
              className="nav-dropdown-trigger"
              onClick={toggleDropdown}
            >
              Services
              <span className="caret">{isDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {isDropdownOpen && (
              <div className="nav-dropdown-menu">
                <a href="#design">Design</a>
                <a href="#development">Development</a>
                <a href="#consulting">Consulting</a>
              </div>
            )}
          </div>
          <a href="#contact">Contact</a>
        </nav>
        <button className="nav-toggle" type="button" onClick={toggleMobileOpen}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>
      {isMobileOpen && (
        <nav className="nav-mobile" onClick={closeAll}>
          <a href="#home">Home</a>
          <a href="#about">About</a>

          <details className="mobile-dropdown">
            <summary>Services</summary>
            <div className="mobile-dropdown-menu">
              <a href="#design">Design</a>
              <a href="#development">Development</a>
              <a href="#consulting">Consulting</a>
            </div>
          </details>

          <a href="#contact">Contact</a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

//////////////////// REACT NAVBAR + DROPDOWN — CHEAT SHEET /////////////////////

// Goal:
// Responsive navbar with:
// - Desktop horizontal links
// - Dropdown menu under "Services"
// - Mobile hamburger menu with vertical links and dropdown

// State:
// isMobileOpen   -> controls whether the mobile menu is visible
// isDropdownOpen -> controls whether desktop dropdown is open

// Handlers:
// toggleMobileMenu:
//   - Toggles isMobileOpen true/false
//
// toggleDropdown:
//   - Toggles isDropdownOpen true/false (used on click)
//
// closeAll:
//   - Closes both mobile and dropdown menus (used on mobile click)

// Desktop behavior:
// - .nav-links shown when screen width > 640px
// - "Services" is a dropdown parent:
//     - Uses onMouseEnter / onMouseLeave to open/close on hover
//     - Also clickable (onClick) via toggleDropdown
// - Dropdown menu is conditionally rendered:
//     {isDropdownOpen && <div className="nav-dropdown-menu">...</div>}

// Mobile behavior:
// - .nav-links hidden via media query
// - Hamburger button (.nav-toggle) shown on small screens
// - Clicking hamburger toggles isMobileOpen
// - Mobile menu (.nav-mobile) rendered only when isMobileOpen is true
// - Uses <details> + <summary> for simple "Services" dropdown on mobile

// CSS layout:
// - Navbar fixed at top (position: fixed)
// - Desktop: flex row, items aligned center, space-between
// - Mobile: vertical menu expands below main bar when open
// - Media query @max-width 640px switches from desktop links to mobile menu

// Interview talking points:
// - Managing different UI states for desktop and mobile using React + CSS
// - Conditional rendering for dropdown + mobile menu
// - Separation of concerns: layout via CSS, logic via React state
// - Simple hover + click handling for a dropdown menu

///////////////////////////////////////////////////////////////////////////////
