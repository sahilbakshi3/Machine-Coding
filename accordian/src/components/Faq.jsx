import React, { useState } from "react";
import Accordian from "./Accordian";
import data from "../data.json";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div>
      <h1>FAQ's</h1>
      {data.faqs.map((obj, index) => {
        return (
          <Accordian
            key={index}
            qna={obj}
            isOpen={activeIndex === index}
            onToggle={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
          />
        );
      })}
    </div>
  );
};

export default Faq;

/* -------------------------------------------------------------------
   SINGLE-OPEN ACCORDION
   -------------------------------------------------------------------
   GOAL:
     Clicking one accordion item opens only that item.
     Any previously open item gets closed automatically.

   -------------------------------------------------------------------
   PARENT STATE (Faq.jsx):
     activeIndex → stores index of currently open accordion
       • null      → no accordion open
       • 0,1,2,... → index of open item

   -------------------------------------------------------------------
   LOGIC in Faq.jsx:
     {activeIndex === index}
       → checks if this item is open

     onToggle:
       If clicked item is already active → close it (set activeIndex = null)
       Else → open clicked item (set activeIndex = index)

     This ensures only ONE item can be open at a time.

   PARENT → CHILD PROPS:
     isOpen   → Boolean for display logic in child
     onToggle → Function to switch open accordion

   -------------------------------------------------------------------
   CHILD COMPONENT (Accordian.jsx):
     Renders:
       • question header
       • +/- icon based on isOpen
       • answer ONLY if isOpen === true

     Clicking icon triggers onToggle from parent
       → updates activeIndex
       → re-renders UI with new active item

   -------------------------------------------------------------------
   FLOW SUMMARY:
     User clicks accordion item →
     onToggle runs in parent →
     activeIndex updates →
     All Accordions re-check isOpen prop →
     Only matching index displays content →
     Previous open item collapses

   -------------------------------------------------------------------
   KEY IDEA:
     Lift show/hide state to parent so only one child can be active.

------------------------------------------------------------------- */
