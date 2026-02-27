import React from "react";
import "./LogoBar.css";

const LogoBar = () => {
  const companies = [
    "Stripe",
    "Airbnb",
    "Spotify",
    "Shopify",
    "Uber",
    "Netflix",
    "Figma",
    "Vercel",
  ];

  return (
    <section className="logobar">
      <div className="logobar-inner">
        <p className="logobar-label">
          Trusted by the world's leading organizations
        </p>
        <div className="logobar-track-wrap">
          <div className="logobar-track">
            {[...companies, ...companies].map((name, i) => (
              <div key={i} className="logobar-item">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
