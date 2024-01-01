import React, { useState } from "react";

export default function GameBoard({ onSelectSquare, gameBoard }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button
                  disabled={col}
                  onClick={() => {
                    onSelectSquare(rowIndex, colIndex);
                  }}
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
