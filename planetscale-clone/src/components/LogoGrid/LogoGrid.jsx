import React from "react";
import "./LogoGrid.css";

const logos = [
  { name: "block", display: "⊞ block" },
  { name: "etsy", display: "Etsy", color: "#f56400" },
  { name: "intercom", display: "⬡ intercom" },
  { name: "cursor", display: "◈ CURSOR" },
  { name: "kick", display: "KICK", color: "#53fc18" },
  { name: "cash-app", display: "$ Cash App" },
  { name: "myfitnesspal", display: "MyFitnessPal", color: "#0077c8" },
  { name: "depot", display: "depot" },
  { name: "barstool", display: "Barstool Sports" },
  { name: "dub", display: "dub.co" },
];

const LogoGrid = () => {
  return (
    <section className="logo-section">
      <div className="logo-section-inner">
        <div className="logo-grid">
          {logos.map((logo) => (
            <div className="logo-cell" key={logo.name}>
              <span
                className="logo-text"
                style={logo.color ? { color: logo.color } : {}}
              >
                {logo.display}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoGrid;
