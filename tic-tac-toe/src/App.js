import React from "react";
import "./App.css";
import TicTacToe from "./components/TicTacToe.jsx";

const App = () => {
  return (
    <div>
      <TicTacToe size={3} />
    </div>
  );
};

export default App;

/* -------------------------------------------------------------------
   TIC-TAC-TOE GAME LOGIC (N × N SUPPORT)
   -------------------------------------------------------------------

   STATE:
     board         → 2D array size × size (null | "X" | "O")
     turnX         → boolean (true: X turn, false: O turn)
     winner        → null | "X" | "O"

   INITIAL BOARD:
     function initialState(size):
       return Array.from({ length: size }, () => Array(size).fill(null))

   -------------------------------------------------------------------
   HANDLE CLICK (User Move):
     1. Ignore click if:
        - Cell already filled
        - Winner already exists

     2. Update the cell with current symbol
        symbol = turnX ? "X" : "O"

     3. Toggle turn:
        turnX = !turnX
   -------------------------------------------------------------------

   CHECK WINNER(board, size)
     Must check 4 things:

     1) All rows:
        For each row:
          If all values in row match the first & not null → WIN

     2) All columns:
        Same logic but by column index

     3) Main diagonal (top-left → bottom-right):
        board[i][i] all equal

     4) Anti diagonal (top-right → bottom-left):
        board[i][size - 1 - i] all equal

     If any above match → return symbol ("X" or "O")
     Else return null

   -------------------------------------------------------------------

   GAME STATUS TEXT:
     if winner:
        "winner is X"
     else:
        "player X turn" / "player O turn"

   -------------------------------------------------------------------

   RESET:
     board = initialState(size)
     turnX = true

   -------------------------------------------------------------------
   TL;DR You click → board updates → check win → switch turn
   If a winner is found → stop accepting input
   -------------------------------------------------------------------
*/
