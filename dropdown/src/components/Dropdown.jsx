import React, { useState } from "react";

const Dropdown = ({ label = "Select Option", options = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onchange && onchange(option);
  };

  return (
    <div className="dropdown">
      {label && <span className="dropdown-label">{label}</span>}

      <button
        type="button"
        className="dropdown-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selected ? selected.label : "Choose..."}</span>
        <span className="dropdown-arrow">{isOpen ? "🔼" : "🔽"}</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.label}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

//////////////////// REACT DROPDOWN COMPONENT — CHEAT SHEET ////////////////////

// Goal:
// Create a reusable dropdown component that manages its own open/close state,
// displays a list of options, and notifies parent about selected value.

// Key Concepts:
// 1. Local state:
//    - isOpen: toggles dropdown visibility
//    - selected: stores chosen option
// 2. Event handling:
//    - Clicking button toggles menu open/close
//    - Clicking an item sets selected and closes menu
// 3. Props:
//    - label: optional text to describe dropdown
//    - options: array of selectable items [{ value, label }]
//    - onChange: callback to parent when selection updates
// 4. Controlled UI behavior:
//    - Selected item shown on trigger button
//    - Keyboard focus and basic accessibility can be enhanced later

// Functions:
// - handleSelect(option):
//     Update selected state
//     Close menu
//     Call parent callback with selected value

// Interview Talking Points:
// Reusable component design
// Clear separation of parent and child state responsibilities
// Conditional rendering for dropdown menu
// State-driven UI flow (React controlled behavior)
// Expandable for keyboard nav, typeahead, outside click handling

///////////////////////////////////////////////////////////////////////////////
