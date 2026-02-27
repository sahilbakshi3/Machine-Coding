import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <p>
        Want to move to PlanetScale? Postgres migration assistance is now
        available.{" "}
        <a href="#" className="banner-cta">
          Get Started
        </a>
      </p>
    </div>
  );
};

export default Banner;
