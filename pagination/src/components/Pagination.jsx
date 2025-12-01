import { useEffect, useState } from "react";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
    // console.log(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((item) => {
            return (
              <span className="products__single" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀️
          </span>
          {[...Array(products.length / 10)].map((_, index) => {
            return (
              <span
                key={index}
                className={page === index + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(index + 1)}
              >
                {index + 1}
              </span>
            );
          })}
          <span
            className={
              page < products.length / 10 ? "" : "pagination__disabled"
            }
            onClick={() => selectPageHandler(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
};

export default Pagination;

/* -------------------------------------------------------------------
   PAGINATION COMPONENT (REACT)
   -------------------------------------------------------------------
   GOAL:
     - Display product list page-wise (10 items per page)
     - Navigation controls: Prev | Numbered pages | Next
     - Disable clicks on invalid page actions
     - Fetch products only once (on mount)

   -------------------------------------------------------------------
   STATE:
     products → full product list from API (100 items)
     page     → current page index (starts at 1)

   -------------------------------------------------------------------
   ITEMS PER PAGE:
     limit = 10
     totalPages = products.length / 10

   -------------------------------------------------------------------
   PAGE CHANGE HANDLER:
     selectPageHandler(selectedPage):
       Conditions to update:
         ✓ selectedPage >= 1
         ✓ selectedPage <= totalPages
         ✓ selectedPage !== page (avoid unnecessary re-render)
       If valid:
         setPage(selectedPage)

   -------------------------------------------------------------------
   DATA FETCHING:
     fetchProducts() → async API call
       GET https://dummyjson.com/products?limit=100
       If success:
         setProducts(data.products)

     useEffect(() => {
       fetchProducts();
     }, []);
     - Empty deps => runs once on component mount

   -------------------------------------------------------------------
   DISPLAYING CURRENT PAGE:
     Render only items of selected page:
       products.slice(startIdx, endIdx)
       startIdx = page * 10 - 10
       endIdx   = page * 10
     Example:
       page=1 → slice(0,10)
       page=2 → slice(10,20)

   -------------------------------------------------------------------
   PAGINATION CONTROLS:
     Prev Button:
       onClick → selectPageHandler(page - 1)
       Disable style when page === 1

     Page Numbers:
       [...Array(totalPages)].map((_, index) => index+1)
       Highlight selected page:
         className = (page === index+1)
         onClick → go to that page

     Next Button:
       onClick → selectPageHandler(page + 1)
       Disable style when page === totalPages

   -------------------------------------------------------------------
   CONDITIONAL RENDERING:
     Render UI only after products fetched:
       {products.length > 0 && (...)}

   -------------------------------------------------------------------
   FLOW SUMMARY:
     Component mounts → fetch data once
     Set full products in state
     Current page shows exactly 10 products
     Clicking page number/Prev/Next updates `page`
     UI re-renders slice of 10 items

   -------------------------------------------------------------------
   IMPROVEMENTS (INTERVIEW EXPECTED):
     ✓ Highlight disabled button with aria-disabled
     ✓ Handle loading + error UI
     ✓ Scroll to top on page change
     ✓ Extract Pagination controls to separate component
     ✓ Support dynamic items per page
     ✓ Replace hardcoded 10 with variable (pageSize)

------------------------------------------------------------------- */
