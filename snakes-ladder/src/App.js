import React, { useState } from "react";
import "./App.css";

const BOARD_SIZE = 10;

const SNAKES_LADDERS = {
  4: 14, // ladder
  9: 31, // ladder
  17: 7, // snake
  20: 38, // ladder
  28: 84, // ladder
  40: 59, // ladder
  51: 67, // ladder
  54: 34, // snake
  62: 19, // snake
  63: 81, // ladder
  64: 60, // snake
  71: 91, // ladder
  87: 24, // snake
  93: 73, // snake
  95: 75, // snake
  99: 78, // snake
};

const App = () => {
  const [p1Pos, setP1Pos] = useState(1);
  const [p2Pos, setP2Pos] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState("P1");
  const [dice, setDice] = useState(null);
  const [message, setMessage] = useState("Player 1's turn");
  const [gameOver, setGameOver] = useState(false);

  const getCellNumber = (row, col) => {
    const base = row * BOARD_SIZE;
    if (row % 2 === 0) {
      return base + col + 1;
    } else {
      return base + (BOARD_SIZE - col);
    }
  };

  const getNewPostion = (position, roll) => {
    let next = position + roll;
    if (next > 100) {
      return position;
    }
    if (SNAKES_LADDERS[next]) {
      return SNAKES_LADDERS[next];
    }
    return next;
  };

  const handelReset = () => {
    setP1Pos(1);
    setP2Pos(1);
    setCurrentPlayer("P1");
    setDice(null);
    setMessage("Player 1 turn");
    setGameOver(false);
  };

  const handleRollDice = () => {
    if (gameOver) {
      return;
    }

    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);
    if (currentPlayer === "P1") {
      setP1Pos((prevPos) => {
        const newPos = getNewPostion(prevPos, roll);
        if (newPos === 100) {
          setMessage("Player 1 wins");
          setGameOver(true);
        } else {
          setMessage("Player 2 turn");
          setCurrentPlayer("P2");
        }
        return newPos;
      });
    } else {
      setP2Pos((prevPos) => {
        const newPos = getNewPostion(prevPos, roll);
        if (newPos === 100) {
          setMessage("Player 2 wins");
          setGameOver(true);
        } else {
          setMessage("Player 1 turn");
          setCurrentPlayer("P1");
        }
        return newPos;
      });
    }
  };

  const renderBoard = () => {
    const rows = [];

    for (let row = BOARD_SIZE - 1; row >= 0; row--) {
      const cells = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cellNum = getCellNumber(row, col);
        const isP1 = p1Pos === cellNum;
        const isP2 = p2Pos === cellNum;

        const hasSnakeOrLadder = SNAKES_LADDERS[cellNum] !== undefined;

        cells.push(
          <div
            className={`cell ${
              (row + col) % 2 === 0 ? "cell-light" : "cell-dark"
            }`}
            key={cellNum}
          >
            <div className="cell-number">{cellNum}</div>
            {hasSnakeOrLadder && (
              <div className="cell-mark">
                {SNAKES_LADDERS[cellNum] > cellNum ? "L" : "S"}
              </div>
            )}
            <div className="players">
              {isP1 && <span className="player p1">1</span>}
              {isP2 && <span className="player p2">2</span>}
            </div>
          </div>
        );
      }
      rows.push(
        <div key={row} className="row">
          {cells}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="app">
      <h2>Snake and Ladders</h2>
      <div className="board">{renderBoard()}</div>

      <div className="panel">
        <p>
          Current: <strong>{currentPlayer}</strong>
        </p>
        <p>
          Dice: <strong>{dice ?? "-"}</strong>
        </p>
        <p>{message}</p>

        <button onClick={handleRollDice} disabled={gameOver}>
          Roll Dice
        </button>
        <button onClick={handelReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;

//////////////////// SNAKE AND LADDER BOARD — CHEAT SHEET //////////////////////

// Goal:
// Two-player Snake and Ladder game.
// 10x10 grid (1–100), dice-based movement, snakes and ladders mapping.

// Data:
// BOARD_SIZE = 10
// SNAKES_LADDERS = { startSquare: endSquare, ... }
//   - ladder: end > start
//   - snake:  end < start

// State:
// p1Pos           -> current position of player 1 (1–100)
// p2Pos           -> current position of player 2 (1–100)
// currentPlayer   -> "P1" or "P2"
// dice            -> last dice roll (1–6) or null
// message         -> status text ("P1's turn", "P1 wins", etc.)
// gameOver        -> true when someone reaches 100

// Movement logic:
// getNewPosition(position, roll):
//   next = position + roll
//   if next > 100 -> stay at current (cannot move)
//   if SNAKES_LADDERS[next] exists -> return mapped square
//   else -> return next

// handleRollDice():
//   if gameOver -> do nothing
//   roll = random from 1 to 6
//   set dice state
//
//   if currentPlayer is P1:
//     newPos = getNewPosition(p1Pos, roll)
//     if newPos === 100:
//       P1 wins -> set message, set gameOver = true
//     else:
//       switch to P2
//
//   if currentPlayer is P2: (mirror logic)

// Reset:
// handleReset():
//   - p1Pos = 1
//   - p2Pos = 1
//   - currentPlayer = "P1"
//   - dice = null
//   - message = "Player 1's turn"
//   - gameOver = false

// Board rendering (10x10):
// getCellNumber(row, col):
//   row indexed from 0 at bottom
//   base = row * BOARD_SIZE
//   even row: left-to-right  -> base + col + 1
//   odd row: right-to-left   -> base + (BOARD_SIZE - col)
//
// renderBoard():
//   - Loop rows from top (9) down to bottom (0)
//   - For each cell, compute cellNum = getCellNumber(row, col)
//   - Mark:
//       - cell number
//       - snake/ladder indicator ("S" or "L") if in SNAKES_LADDERS
//       - player tokens if p1Pos or p2Pos equals cellNum

// Interview talking points:
// - Managing multiple related pieces of game state in React
// - Pure function for movement rules (getNewPosition)
// - Turn-based logic and win condition
// - Grid rendering via nested loops and computed cell numbers
// - Keeping UI fully driven by state (no manual DOM manipulation)

///////////////////////////////////////////////////////////////////////////////
