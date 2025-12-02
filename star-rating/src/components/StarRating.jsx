import React, { useState } from "react";

const StarRating = ({ starCount = 5 }) => {
  const [starValue, setStarValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="container">
      {new Array(starCount).fill(0).map((value, index) => {
        return (
          <span
            key={index}
            className={
              (hoverValue === 0 && index < starValue) || index < hoverValue
                ? "gold"
                : ""
            }
            onClick={() => setStarValue(index + 1)}
            onMouseEnter={() => setHoverValue(index + 1)}
            onMouseLeave={() => setHoverValue(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;

//////////////////// REACT STAR RATING COMPONENT — CHEAT SHEET //////////////////

// Goal:
// A star rating UI where user can:
// - Hover stars to preview rating
// - Click a star to set final rating
// - Stars change color dynamically based on state

// Props:
// starCount -> total number of stars (default = 5)

// State:
// starValue  -> selected rating (1 to starCount)
// hoverValue -> temporary rating while hovering
//
// Display logic:
// If a star index is less than either:
// - starValue (clicked value)
// - hoverValue (hovered value)
// Then give it "gold" style
// Otherwise default style

// Events:
// onClick(index + 1):
//   setStarValue to selected rating
//
// onMouseEnter(index + 1):
//   setHoverValue for preview highlight
//
// onMouseLeave():
//   reset hoverValue back to 0 for final selected view

// Rendering:
// - Create an array of starCount length
// - Map and render each star as a <span>
// - Use ★ HTML symbol
// - Add conditional class for gold highlight

// Interview talking points:
// - Demonstrates controlled UI updates with state
// - Hover state vs. permanent state distinction
// - Reusable component using props
// - No external libraries required

///////////////////////////////////////////////////////////////////////////////
