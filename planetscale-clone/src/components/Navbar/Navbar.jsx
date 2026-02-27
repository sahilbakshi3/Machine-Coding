import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="#fff" strokeWidth="1.5" />
            <path
              d="M8 16 Q16 6 24 16 Q16 26 8 16Z"
              fill="#fff"
              opacity="0.9"
            />
            <circle cx="16" cy="16" r="3" fill="#fff" />
          </svg>
        </a>

        <div className="navbar-links">
          <a href="#" className="nav-link has-dropdown">
            Platform <span className="dropdown-arrow">▾</span>
          </a>
          <span className="nav-sep">|</span>
          <a href="#" className="nav-link has-dropdown">
            Resources <span className="dropdown-arrow">▾</span>
          </a>
          <span className="nav-sep">|</span>
          <a href="#" className="nav-link">
            Documentation
          </a>
          <span className="nav-sep">|</span>
          <a href="#" className="nav-link">
            Pricing
          </a>
          <span className="nav-sep">|</span>
          <a href="#" className="nav-link">
            Contact
          </a>
        </div>

        <div className="navbar-actions">
          <a href="#" className="nav-link">
            Log in
          </a>
          <span className="nav-sep">|</span>
          <a href="#" className="nav-link">
            Get started
          </a>
          <span className="nav-sep">|</span>
          <a href="#" className="btn-orange">
            Get in touch
          </a>
        </div>

        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <a href="#">Platform</a>
          <a href="#">Resources</a>
          <a href="#">Documentation</a>
          <a href="#">Pricing</a>
          <a href="#">Log In</a>
          <a href="#">Get Started</a>
          <a href="#" className="btn-orange mobile-cta">
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
