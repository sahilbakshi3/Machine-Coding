import React, { useState } from "react";
import Board from "./Board";
import { checkWinner, initialState } from "../utils/ticTacToeUtils.js";

const TicTacToe = ({ size = 3 }) => {
  const [board, setBoard] = useState(initialState(size));
  // console.log(board);
  const [turnX, setTurnX] = useState(true);

  const winner = checkWinner(board, size);

  console.log(winner);

  const status = winner
    ? `winner is ${winner}`
    : turnX
    ? "player X turn"
    : "player Y turn";

  const handleClick = (rowIndex, colIndex) => {
    // console.log(`clicked ${rowIndex}, ${colIndex}`);
    if (board[rowIndex][colIndex] || winner) {
      return;
    }
    const deepCopyOfBoard = JSON.parse(JSON.stringify(board));
    deepCopyOfBoard[rowIndex][colIndex] = turnX ? "X" : "O";
    setBoard(deepCopyOfBoard);
    setTurnX(!turnX);
  };

  const handleReset = () => {
    setBoard(initialState(size));
  };

  return (
    <div className="container">
      <Board handleClick={handleClick} board={board} size={size} />
      <div className="status">{status}</div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
