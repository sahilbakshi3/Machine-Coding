import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef();
  const inputRef = useRef();

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase()),
  );

  const clearAll = () => {
    setSelected([]);
  };

  const removeSelected = (option) => {
    setSelected((prev) => prev.filter((o) => o.id !== option.id));
  };

  const handleOption = (option) => {
    const isAlreadyChecked = selected.some((o) => o.id === option.id);

    if (isAlreadyChecked) {
      setSelected((prev) => prev.filter((o) => o.id !== option.id));
    } else {
      setSelected((prev) => [...prev, option]);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="container">
      <div className="title">Multi Select Dropdown</div>
      <div className="wrapper" ref={dropdownRef}>
        <div className="trigger" onClick={() => setIsOpen(true)}>
          <div className="selected-container">
            {selected.length > 0 ? (
              selected.map((item) => (
                <span key={item.id} className="tag">
                  {item.label}
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelected(item);
                    }}
                  >
                    X
                  </button>
                </span>
              ))
            ) : (
              <span className="placeholder">Select Options...</span>
            )}
          </div>
          <div className="actions">
            {selected.length > 0 && (
              <button className="clear-btn" onClick={clearAll}>
                Clear All
              </button>
            )}
            <span className="arrow">{isOpen ? "🔼" : "🔽"}</span>
          </div>
        </div>

        {isOpen && (
          <div className="dropdown">
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="options-list">
              {filteredOptions.map((option) => (
                <div
                  className="option"
                  key={option.id}
                  onClick={() => handleOption(option)}
                >
                  <input
                    type="checkbox"
                    checked={selected.some((o) => o.id === option.id)}
                    onChange={() => {}}
                  />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

/* -------------------------------------------------------------------
   MULTI SELECT DROPDOWN WITH SEARCH & TAGS
   -------------------------------------------------------------------
   GOAL:
     Build a searchable multi-select dropdown that allows:
       • Opening/closing dropdown
       • Selecting multiple options
       • Removing individual selections (tags)
       • Clearing all selections
       • Closing dropdown when clicking outside
       • Auto-focusing search input when opened

   -------------------------------------------------------------------
   STATE:
     isOpen   → controls dropdown visibility (true/false)
     selected → array of selected option objects
     query    → search input value

     Selected object shape:
        {
          id: unique identifier
          label: display text
        }

   -------------------------------------------------------------------
   REFS:
     dropdownRef → reference to full component container
                   used to detect outside clicks
     inputRef    → reference to search input
                   used to auto-focus when dropdown opens

   -------------------------------------------------------------------
   SEARCH / FILTER LOGIC:
     filteredOptions:
       1. Convert option label to lowercase
       2. Convert query to lowercase
       3. Return options whose label includes the query
       → Enables real-time search while typing

   -------------------------------------------------------------------
   CLEAR ALL SELECTIONS:
     clearAll():
       setSelected([])
       → empties the selected array
       → removes all tags
       → unchecks all checkboxes

   -------------------------------------------------------------------
   REMOVE SINGLE SELECTED TAG:
     removeSelected(option):
       1. Filter selected array
       2. Keep items whose id ≠ clicked item id
       3. Update state with new filtered array
       → Removes only the clicked tag

   -------------------------------------------------------------------
   SELECT / UNSELECT OPTION (TOGGLE):
     handleOption(option):
       1. Check if option already exists in selected array
          using some()

       2. If already selected:
            remove it using filter()

       3. Else:
            add it using spread operator

       → Provides checkbox-like toggle behaviour

   -------------------------------------------------------------------
   AUTO FOCUS INPUT WHEN DROPDOWN OPENS:
     useEffect([isOpen]):
       If dropdown becomes open:
         focus the search input using inputRef

   -------------------------------------------------------------------
   CLOSE DROPDOWN WHEN CLICKING OUTSIDE:
     useEffect([]):
       1. Add global document click listener
       2. If clicked element is NOT inside dropdownRef:
            setIsOpen(false)

       Cleanup:
         remove event listener on unmount

   -------------------------------------------------------------------
   TAG REMOVE BUTTON EVENT FIX:
     remove button inside trigger uses:
       e.stopPropagation()

     Why?
       Prevents click from bubbling to trigger
       Otherwise clicking "X" would reopen dropdown

   -------------------------------------------------------------------
   RENDER FLOW:

     TRIGGER AREA:
       If selected items exist:
         render tags
         each tag has remove button (X)

       Else:
         show placeholder text

       Actions:
         • Clear All button (if items exist)
         • Arrow icon (up/down)

     DROPDOWN CONTENT (only when isOpen):
       1. Search input
       2. Filtered options list
       3. Each option:
            checkbox checked state derived from selected array
            clicking toggles selection

   -------------------------------------------------------------------
   FULL USER FLOW:
     Click trigger → open dropdown → focus search
     Type search → filter options live
     Click option → toggle select/unselect
     Selected items appear as tags
     Click X → remove single tag
     Click Clear All → remove everything
     Click outside → dropdown closes

   -------------------------------------------------------------------
   POSSIBLE IMPROVEMENTS:
     ✓ Keyboard navigation (arrow keys / enter)
     ✓ Select All / Deselect All
     ✓ Virtualized list for large datasets
     ✓ Debounced search for API driven options
     ✓ Accessibility (ARIA roles)
------------------------------------------------------------------- */
