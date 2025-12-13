import React, { useState } from "react";

const SeatBooking = () => {
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [booked, setBooked] = useState([]);

  const seatCategory = {
    Regular: { row: ["A", "B"], price: 150, color: "rgb(233, 233, 233)" },
    Premium: { row: ["C", "D", "E"], price: 200, color: "lightSkyblue" },
    VIP: { row: ["F", "G", "H"], price: 300, color: "gold" },
  };

  const cinemaSeats = Array.from({ length: 12 });

  const selectSeat = (seatId) => {
    // console.log(seatId);
    if (selectedSeat.includes(seatId)) {
      let filteredData = selectedSeat.filter((curr, index) => {
        return curr !== seatId;
      });
      setSelectedSeat(filteredData);
      return;
    }
    setSelectedSeat((prev) => [...prev, seatId]);
  };

  const totalPrice = selectedSeat.reduce((sum, seatId) => {
    const rowChar = seatId[0];
    const categoryObj = Object.values(seatCategory).find((curr) =>
      curr.row.includes(rowChar)
    );

    return sum + (categoryObj ? categoryObj.price : 0);
  }, 0);

  //   console.log(selectedSeat);

  const bookSeat = () => {
    if (selectedSeat.length === 0) {
      alert("First Select the seats");
      return;
    }
    setBooked((prev) => [...prev, ...selectedSeat]);
    setSelectedSeat([]);
  };

  return (
    <div>
      <div className="container">
        <div className="screen"></div>
        <div style={{ textAlign: "center" }}>Screen</div>
        <div>
          {Object.entries(seatCategory).map(
            ([category, { row, price, color }]) => {
              return row.map((row, index) => {
                return (
                  <div className="seats" key={index}>
                    <span>{row}</span>
                    <div className="btn-parent">
                      {cinemaSeats.map((_, index) => {
                        const seat = index + 1;
                        const seatId = row + (index + 1);
                        const isSelected = selectedSeat.includes(seatId);
                        const isBooked = booked.includes(seatId);
                        return (
                          <button
                            key={index}
                            disabled={isBooked}
                            onClick={() => selectSeat(seatId)}
                            style={{
                              backgroundColor: isBooked
                                ? "red"
                                : isSelected
                                ? "darkgray"
                                : color,
                            }}
                          >
                            {seat}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            }
          )}
          {/* Category with Price || legends */}
          <div className="price-indicator">
            {Object.entries(seatCategory).map((curr) => {
              const category = curr[0];
              return (
                <div
                  key={category}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4em",
                  }}
                >
                  <div
                    className="price-color"
                    style={{ backgroundColor: curr[1].color }}
                  />
                  <div>{`${category} (${curr[1].price})`}</div>
                </div>
              );
            })}

            {/* Booked legend */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.4em" }}
            >
              <div className="price-color" style={{ backgroundColor: "red" }} />
              <div>Booked</div>
            </div>
          </div>
          {/* Seat Information */}
          <div>
            {selectedSeat.length > 0 ? (
              <div className="seat-details">
                <div>Selected Seats: {selectedSeat.join(", ")}</div>
                <div>Number of Seats: {selectedSeat.length}</div>
                <div>Total Price: {totalPrice}</div>
              </div>
            ) : (
              "No Seat Selected"
            )}
          </div>
          <div className="book-btn">
            <button className="book-seat" onClick={bookSeat}>
              Book Seat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;

/* =====================================================================
   SEAT BOOKING COMPONENT — LOGIC CHEAT SHEET
   =====================================================================

   GOAL:
   - Render a cinema-style seat layout (like BookMyShow)
   - Allow seat selection
   - Calculate total price based on seat category
   - Book selected seats and lock them (disable further clicks)

   ---------------------------------------------------------------------
   STATE MANAGEMENT
   ---------------------------------------------------------------------

   selectedSeat : string[]
   - Stores currently selected seat IDs (e.g. ["A1", "C5"])
   - Used for:
       • highlighting selected seats
       • calculating total price
       • booking seats

   booked : string[]
   - Stores permanently booked seat IDs
   - Used to:
       • disable seats
       • show booked seats in red

   ---------------------------------------------------------------------
   SEAT CATEGORY CONFIG
   ---------------------------------------------------------------------

   seatCategory object defines:
   - rows belonging to each category
   - price per seat
   - display color

   Example:
     Regular → rows A, B → ₹150
     Premium → rows C, D, E → ₹200
     VIP     → rows F, G, H → ₹300

   This config drives:
   - seat colors
   - price calculation
   - legend rendering

   ---------------------------------------------------------------------
   SEAT GENERATION
   ---------------------------------------------------------------------

   cinemaSeats = Array.from({ length: 12 })

   - Creates 12 seats per row
   - Seat ID is generated as: Row + SeatNumber
     Example: A1, A2, ..., H12

   ---------------------------------------------------------------------
   SEAT SELECTION LOGIC
   ---------------------------------------------------------------------

   selectSeat(seatId):

   1. If seat is already selected:
        → remove it from selectedSeat (toggle behavior)

   2. If seat is not selected:
        → add it to selectedSeat

   This enables:
   - multiple seat selection
   - click again to unselect

   ---------------------------------------------------------------------
   TOTAL PRICE CALCULATION
   ---------------------------------------------------------------------

   totalPrice is derived using reduce():

   Steps:
   1. Loop through each selected seatId
   2. Extract row character (seatId[0])
        Example: "C5" → "C"
   3. Find which category owns that row
   4. Add the category price to the accumulator

   Important:
   - Only price is added, NOT the whole object
   - This avoids [object Object] bugs

   ---------------------------------------------------------------------
   BOOKING LOGIC
   ---------------------------------------------------------------------

   bookSeat():

   1. If no seat is selected:
        → show alert and exit

   2. Otherwise:
        → move selectedSeat into booked
        → clear selectedSeat

   Result:
   - Booked seats turn red
   - Booked seats are disabled
   - User starts fresh for next booking

   ---------------------------------------------------------------------
   RENDERING FLOW
   ---------------------------------------------------------------------

   1. Loop over seatCategory
   2. For each category → loop over its rows
   3. For each row → render 12 seat buttons

   Button state:
   - If seat is booked → red + disabled
   - Else if selected → dark gray
   - Else → category color

   ---------------------------------------------------------------------
   LEGENDS & UI INFO
   ---------------------------------------------------------------------

   Legends:
   - Rendered dynamically from seatCategory
   - Shows color + price per category
   - Separate "Booked" legend in red

   Seat Info Panel:
   - Selected seat list
   - Total seat count
   - Total price

   ---------------------------------------------------------------------
   KEY TAKEAWAYS
   ---------------------------------------------------------------------

   ✔ Configuration-driven UI (seatCategory)
   ✔ Derived state for totalPrice
   ✔ Pure functions for selection & booking
   ✔ No direct DOM manipulation
   ✔ Scalable for real-world booking systems

   ===================================================================== */
