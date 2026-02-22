import React, { useEffect, useState } from "react";
import "./LightBox.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(null);

  // fetch data
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const images = products.map((p) => p.thumbnail);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="app">
      <h2>Products</h2>

      <div className="grid">
        {images.map((img, i) => (
          <img key={i} src={img} onClick={() => setIndex(i)} />
        ))}
      </div>

      {index !== null && (
        <div className="overlay" onClick={() => setIndex(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIndex(null)}>X</button>
            <button onClick={prev}>Prev</button>
            <img src={images[index]} />
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

/*
========================================
LIGHTBOX COMPONENT – LOGIC CHEATSHEET
========================================

1. STATE VARIABLES
------------------
- products : stores API response (array of product objects)
- index    : stores currently selected image index
             - null → lightbox CLOSED
             - number → lightbox OPEN at that index

2. DATA FETCHING (useEffect)
----------------------------
- Runs once on component mount ([] dependency)
- Fetches product data from API
- Converts response to JSON
- Stores data.products in state

Flow:
  fetch → res.json() → setProducts()

3. DERIVED DATA (IMAGES ARRAY)
------------------------------
- images = products.map(p => p.thumbnail)
- Extracts only thumbnail URLs from product objects
- Simplifies rendering and navigation logic

4. OPEN LIGHTBOX
----------------
- Clicking any image:
    setIndex(i)

- This:
  → sets current image index
  → triggers modal to render

5. CONDITIONAL RENDERING
------------------------
- {index !== null && (...)}

Meaning:
- If index is NOT null → show overlay + modal
- If null → nothing rendered

6. CLOSE LIGHTBOX
-----------------
Two ways:

a) Click on overlay:
   setIndex(null)

b) Click "X" button:
   setIndex(null)

→ resets state → modal disappears

7. EVENT PROPAGATION CONTROL
----------------------------
- overlay has onClick → closes modal
- modal has:
    onClick={(e) => e.stopPropagation()}

Why?
- Prevents click inside modal from bubbling to overlay
- Otherwise clicking image/buttons would close modal

8. NEXT IMAGE LOGIC
-------------------
setIndex(prev => (prev + 1) % images.length)

Explanation:
- Move forward: prev + 1
- % ensures circular navigation

Example:
  last index = 4, length = 5
  (4 + 1) % 5 = 0 → loops to first image

9. PREVIOUS IMAGE LOGIC
-----------------------
setIndex(prev => (prev - 1 + images.length) % images.length)

Explanation:
- Move backward: prev - 1
- Add images.length to avoid negative index

Example:
  prev = 0
  (0 - 1 + 5) % 5 = 4 → last image

10. IMAGE DISPLAY
-----------------
- <img src={images[index]} />

- Uses current index to show selected image
- Updates dynamically when next/prev is clicked

11. GRID RENDERING
------------------
- images.map((img, i) => ...)

- Displays all thumbnails
- Each image:
    - has unique key
    - opens lightbox on click

12. KEY CONCEPTS USED
---------------------
- useState (state management)
- useEffect (API call)
- Derived state (images array)
- Conditional rendering
- Event bubbling & stopPropagation
- Circular navigation using modulo (%)

========================================
*/
