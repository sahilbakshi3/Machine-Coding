import { useState } from "react";
import "./Tabs.css";

export default function Tabs({ tabsData }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs__container">
        {tabsData.map((item, index) => {
          return (
            <button
              className={`${currentItemIndex === index ? "active" : ""}`}
              onClick={() => setCurrentItemIndex(index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="tabs__content">{tabsData[currentItemIndex].content}</div>
    </div>
  );
}

/* -------------------------------------------------------------------
   TABS COMPONENT
   -------------------------------------------------------------------

   1. STATE
      - currentItemIndex → tracks which tab is selected
        (default = 0, so first tab is active)

   2. TABS HEADER (BUTTONS)
      - Loop through tabsData using .map()
      - For each item:
            • Render a <button>
            • On click → update currentItemIndex
            • Apply "active" class if index === currentItemIndex

   3. ACTIVE TAB STYLING
      - "active" class removes bottom border
      - Makes active tab visually connected to content area

   4. TAB CONTENT
      - <div className="tabs__content">
            Shows content of the selected tab:
            tabsData[currentItemIndex].content

   5. KEY IDEA
      - UI switches based on single piece of state (currentItemIndex)
      - Clicking a tab updates state → triggers re-render → new content shown

   6. DATA STRUCTURE EXPECTED
      tabsData = [
        { label: "Tab1", content: <Component or text> },
        { label: "Tab2", content: <Component or text> },
        ...
      ]

   7. FLOW SUMMARY
      • User clicks tab
      • setCurrentItemIndex(index)
      • State changes
      • React re-renders
      • Active tab + corresponding content appear

------------------------------------------------------------------- */
