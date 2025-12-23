import React, { useState } from "react";

const ChessBoard = () => {
  const initialBoard = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ];
  const [currentTurn, setCurrentTurn] = useState("white");
  const [board, setBoard] = useState(initialBoard);

  const [selectedSquare, setSelectedSquare] = useState(null);
  const [capturedPieces, setCapturedPieces] = useState({
    white: [],
    black: [],
  });

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

  const whitePieces = ["♙", "♖", "♘", "♗", "♕", "♔"];
  const blackPieces = ["♟", "♜", "♞", "♝", "♛", "♚"];

  const isWhitePiece = (piece) => whitePieces.includes(piece);
  const isBlackPiece = (piece) => blackPieces.includes(piece);

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedSquare(null);
    setCurrentTurn("white");
    setCapturedPieces({ white: [], black: [] });
  };

  const isSquareSelected = (row, col) => {
    return (
      selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col
    );
  };

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const selectedPiece = board[selectedRow][selectedCol];

      // Check if it's the correct player's turn
      const isWhiteTurn = currentTurn === "white";
      const isSelectedWhite = isWhitePiece(selectedPiece);

      if (
        (isWhiteTurn && !isSelectedWhite) ||
        (!isWhiteTurn && isSelectedWhite)
      ) {
        setSelectedSquare(null);
        return;
      }

      // If clicking on the same square, deselect
      if (selectedRow === row && selectedCol === col) {
        setSelectedSquare(null);
        return;
      }

      // If clicking on own piece, select that piece instead
      if (
        (isWhiteTurn && isWhitePiece(piece)) ||
        (!isWhiteTurn && isBlackPiece(piece))
      ) {
        setSelectedSquare([row, col]);
        return;
      }

      // Move the piece
      const newBoard = board.map((r) => [...r]);

      // Capture piece if present
      if (piece) {
        const capturedColor = isWhitePiece(piece) ? "white" : "black";
        setCapturedPieces((prev) => ({
          ...prev,
          [capturedColor]: [...prev[capturedColor], piece],
        }));
      }

      newBoard[row][col] = selectedPiece;
      newBoard[selectedRow][selectedCol] = "";

      setBoard(newBoard);
      setSelectedSquare(null);
      setCurrentTurn(currentTurn === "white" ? "black" : "white");
    } else {
      // Select a piece
      if (piece) {
        const isWhiteTurn = currentTurn === "white";
        if (
          (isWhiteTurn && isWhitePiece(piece)) ||
          (!isWhiteTurn && isBlackPiece(piece))
        ) {
          setSelectedSquare([row, col]);
        }
      }
    }
  };

  return (
    <div className="chess-container">
      <div className="game-info">
        <h1>Chess Board UI</h1>
        <div className="turn-indicator">
          <span className={`turn-dot ${currentTurn}`}></span>
          <span className="turn-text">
            {currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1)}'s Turn
          </span>
        </div>
        <button onClick={resetGame} className="reset-btn">
          Reset Game
        </button>
      </div>

      <div className="board-wrapper">
        {/* Captured Pieces - Black */}
        <div className="captured-pieces black">
          <h3>Captured (Black)</h3>
          <div className="pieces-list">
            {capturedPieces.black.map((piece, idx) => (
              <span key={idx} className="captured-piece">
                {piece}
              </span>
            ))}
          </div>
        </div>

        {/* Chess Board */}
        <div className="board-container">
          {/* Rank labels (left) */}
          <div className="rank-labels-left">
            {ranks.map((rank) => (
              <div key={rank} className="rank-label">
                {rank}
              </div>
            ))}
          </div>

          <div className="board-content">
            {/* File labels (top) */}
            <div className="file-labels-top">
              {files.map((file) => (
                <div key={file} className="file-label">
                  {file}
                </div>
              ))}
            </div>

            {/* Board */}
            <div className="chess-board">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                  {row.map((piece, colIndex) => {
                    const isLight = (rowIndex + colIndex) % 2 === 0;
                    const isSelected = isSquareSelected(rowIndex, colIndex);

                    return (
                      <div
                        key={colIndex}
                        className={`square ${isLight ? "light" : "dark"} ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                      >
                        {piece && <span className="piece">{piece}</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* File labels (bottom) */}
            <div className="file-labels-bottom">
              {files.map((file) => (
                <div key={file} className="file-label">
                  {file}
                </div>
              ))}
            </div>
          </div>

          {/* Rank labels (right) */}
          <div className="rank-labels-right">
            {ranks.map((rank) => (
              <div key={rank} className="rank-label">
                {rank}
              </div>
            ))}
          </div>
        </div>

        {/* Captured Pieces - White */}
        <div className="captured-pieces white">
          <h3>Captured (White)</h3>
          <div className="pieces-list">
            {capturedPieces.white.map((piece, idx) => (
              <span key={idx} className="captured-piece">
                {piece}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
