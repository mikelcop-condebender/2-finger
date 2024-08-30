import React, { useState, useEffect } from "react";
import "./App.css";
import MainMenu from "./components/MainMenu";
import GameBoard from "./components/GameBoard";
import ShipPlacement from "./components/ShipPlacement";
import PlayerList from "./components/PlayerList";
import socket from "./socket";

type Cell = "hit" | "miss" | null;
type Phase = "menu" | "placement" | "playing";

const App: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("menu");
  const [playerBoard, setPlayerBoard] = useState<Cell[][]>(
    Array(10).fill(Array(10).fill(null))
  );
  const [opponentBoard, setOpponentBoard] = useState<Cell[][]>(
    Array(10).fill(Array(10).fill(null))
  );
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    socket.on("gameStart", () => setPhase("placement"));
    socket.on("updateBoard", (updatedBoard: Cell[][]) =>
      setOpponentBoard(updatedBoard)
    );
    socket.on("endGame", (winner: string) => alert(`${winner} wins!`));

    return () => {
      socket.off("gameStart");
      socket.off("updateBoard");
      socket.off("endGame");
    };
  }, []);

  const startGame = () => {
    console.log("START NEW GAME");
    socket.emit("startGame");
  };

  const joinGame = () => {
    console.log("JOIN GAME and SET NAME", playerName);
    socket.emit("setName", playerName);
    socket.emit("joinGame");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const placeShip = (
    ship: string,
    orientation: string,
    row: number,
    col: number
  ) => {
    socket.emit("placeShip", { ship, orientation, row, col });
  };

  const makeMove = (row: number, col: number) => {
    socket.emit("makeMove", { row, col });
  };

  return (
    <div className="app">
      {phase === "menu" && (
        <>
          <MainMenu onStartGame={startGame} onJoinGame={joinGame} />
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={handleNameChange}
            />
          </div>
        </>
      )}
      {phase === "placement" && <ShipPlacement onPlaceShip={placeShip} />}
      {phase === "playing" && (
        <>
          <PlayerList />
          <GameBoard board={playerBoard} onCellClick={() => {}} />
          <GameBoard board={opponentBoard} onCellClick={makeMove} />
        </>
      )}
    </div>
  );
};

export default App;
