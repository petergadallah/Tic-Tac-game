import React from "react";

export default function Log({ gameTurns }) {
  return (
    <ol id="log">
      {gameTurns.map((item, itemIndex) => (
        <li key={itemIndex}>
          Player {item.activePlayer} played square {item.rowIndex + 1} ,
          {item.colIndex + 1}
        </li>
      ))}
    </ol>
  );
}
