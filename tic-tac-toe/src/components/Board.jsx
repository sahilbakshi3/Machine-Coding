import React from "react";

const Board = ({ size, board, handleClick }) => {
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${size}, 50px)` }}
    >
      {board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              className="cell"
            >
              {cell}
            </div>
          );
        });
      })}
    </div>
  );
};

export default Board;
