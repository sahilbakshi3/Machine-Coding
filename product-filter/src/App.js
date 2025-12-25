import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const filters = [
    "mens-watches",
    "womens-bags",
    "sports-accessories",
    "sunglasses",
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const api = await fetch("https://dummyjson.com/products?limit=500");
      const res = await api.json();

      setData(res.products);
      setFilteredData(res.products);
    };

    fetchApi();
  }, []);

  const handleFilterClick = (e) => {
    const category = e.target.id;

    setActiveFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredData(data);
    } else {
      const temp = data.filter((item) => activeFilters.includes(item.category));
      setFilteredData(temp);
    }
  }, [activeFilters, data]);

  return (
    <div className="App">
      <div className="filters">
        {filters.map((item, idx) => (
          <button
            key={idx}
            id={item}
            onClick={handleFilterClick}
            className={activeFilters.includes(item) ? "selected" : ""}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="products-list">
        {filteredData.map((item, idx) => (
          <div className="item" key={idx}>
            <p>{item.title}</p>
            <p className="category">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

/*
====================================================
PRODUCT FILTERING APP — LOGIC CHEATSHEET
====================================================

STATE MANAGEMENT
----------------
1. data
   - Stores the full list of products fetched from the API.
   - This is the SOURCE OF TRUTH.
   - Never mutate this directly.

2. filteredData
   - Stores the products AFTER applying filters.
   - This is what we render on the UI.
   - Initially same as data.

3. activeFilters
   - Array of selected category strings.
   - Supports multi-select filtering.
   - Example: ["mens-watches", "sunglasses"]


FILTER DEFINITIONS
------------------
filters array contains category values that EXACTLY match
the API response categories.
No mapping, no guessing, no bullshit.


DATA FETCHING (useEffect #1)
----------------------------
- Runs ONCE on component mount (empty dependency array).
- Fetches products from DummyJSON API.
- Extracts res.products (array).
- Sets:
    data         -> full products list
    filteredData -> initially same as data


FILTER TOGGLE HANDLER
---------------------
handleFilterClick:
- Reads category from button id.
- If category already exists in activeFilters:
    → REMOVE it (toggle off)
- Else:
    → ADD it (toggle on)
- Uses functional setState to avoid stale state bugs.


FILTERING LOGIC (useEffect #2)
------------------------------
Triggered whenever:
- activeFilters changes
- OR data changes (initial fetch)

Logic:
1. If no active filters:
   → show all products (filteredData = data)

2. If filters exist:
   → filter data array
   → keep items whose item.category exists in activeFilters
   → update filteredData


RENDERING FLOW
--------------
1. Render filter buttons
   - Button id = category value
   - Button style changes if active

2. Render product list
   - Loop over filteredData
   - Display product title and category


IMPORTANT NOTES (READ THIS OR SUFFER LATER)
-------------------------------------------
- data is NEVER filtered directly.
- filteredData is DERIVED state.
- Filter values MUST match API categories exactly.
- Multiple filters work using OR logic (includes).

====================================================
*/
