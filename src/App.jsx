import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./Winning_Combinations";
import GameOver from "./components/GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let winner;

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [playersNames, setPlayersName] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const handleSelectSquare = (rowIndex, colIndex) => {
    setActivePlayer((prevState) => (prevState === "X" ? "O" : "X"));
    setGameTurns((prevState) => {
      const updatedArray = [...prevState];
      return [{ activePlayer, rowIndex, colIndex }, ...updatedArray];
    });
    const copiedGameBoard = [...gameBoard.map((i) => [...i])];
    copiedGameBoard[rowIndex][colIndex] = activePlayer;

    setGameBoard(copiedGameBoard);
  };
  if (gameBoard.length) {
    for (const winningCase of WINNING_COMBINATIONS) {
      let firstSquare = gameBoard[winningCase[0].row][winningCase[0].column];
      let secondSquare = gameBoard[winningCase[1].row][winningCase[1].column];
      let thirdSquare = gameBoard[winningCase[2].row][winningCase[2].column];
      if (
        firstSquare &&
        firstSquare === secondSquare &&
        firstSquare === thirdSquare
      ) {
        winner = firstSquare;
      }
    }
  }
  let isDraw = gameTurns.length === 9 && !winner;
  const handleRestart = () => {
    setGameBoard(initialGameBoard);
    setActivePlayer("X");
    setGameTurns([]);

    winner = null;
    isDraw = false;
  };
  const changeName = (symbol, updatedNamed) => {
    setPlayersName((prevState) => {
      return { ...prevState, [symbol]: updatedNamed };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            activePlayer={activePlayer}
            changeName={changeName}
          />
          <Player
            name="Player 2"
            symbol="O"
            activePlayer={activePlayer}
            changeName={changeName}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver onRestart={handleRestart} winner={playersNames[winner]} />
        )}
        <GameBoard
          gameBoard={gameBoard}
          activePlayer={activePlayer}
          onSelectSquare={handleSelectSquare}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
