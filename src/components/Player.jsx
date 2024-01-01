import React, { useState } from "react";

export default function Player({ name, symbol, activePlayer, changeName }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = (symbol, updatedName) => {
    setIsEditing((prevState) => !prevState);
    if (isEditing) {
      changeName(symbol, updatedName);
    }
  };

  const [updatedName, setUpdatedName] = useState(name);

  const handleChange = (e) => {
    setUpdatedName(e.target.value);
  };

  let playerName = <span className="player-name">{updatedName}</span>;
  let btnCaption = "Edit";

  if (isEditing) {
    playerName = (
      <input type="text" required value={updatedName} onChange={handleChange} />
    );
    btnCaption = "Save";
  }

  return (
    <li className={symbol === activePlayer ? "active" : null}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button
        onClick={() => {
          handleClick(symbol, updatedName);
        }}
      >
        {btnCaption}
      </button>
    </li>
  );
}
