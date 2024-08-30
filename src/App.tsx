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
  const [isReady, setIsReady] = useState<boolean>(false);
  const [opponentReady, setOpponentReady] = useState<boolean>(false);

  const [playerBoard, setPlayerBoard] = useState<Cell[][]>(
    Array.from({ length: 10 }, () => Array(10).fill(null))
  );
  const [opponentBoard, setOpponentBoard] = useState<Cell[][]>(
    Array.from({ length: 10 }, () => Array(10).fill(null))
  );
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    socket.on("gameStart", () => setPhase("placement"));
    socket.on("updateBoard", (updatedBoard: Cell[][]) =>
      setOpponentBoard(updatedBoard)
    );
    socket.on("endGame", (winner: string) => alert(`${winner} wins!`));
    socket.on("playerReady", () => setOpponentReady(true));
    socket.on("startGame", () => setPhase("playing"));
    socket.on("attackResult", ({ row, col, result }) => {
      console.log("ATTACK RESULT", { row, col, result });
      // Update the opponent's board with the attack result
      setOpponentBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[row][col] = result;
        return newBoard;
      });
    });

    return () => {
      socket.off("gameStart");
      socket.off("updateBoard");
      socket.off("endGame");
      socket.off("playerReady");
      socket.off("startGame");
      socket.off("attackResult");
    };
  }, []);

  const checkAndStartGame = () => {
    if (isReady && opponentReady) {
      socket.emit("startGame");
      setPhase("playing");
    }
  };

  const handlePlacementComplete = () => {
    if (!isReady) {
      setIsReady(true);
      socket.emit("playerReady");
    }
  };

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
    console.log("makeMOve", { row, col });
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
      {phase === "placement" && (
        <ShipPlacement
          onPlaceShip={placeShip}
          onComplete={handlePlacementComplete}
        />
      )}
      {phase === "playing" && (
        <>
          <PlayerList />
          <div className="boards-container">
            <div className="board-container">
              <h2>Your Board</h2>
              <GameBoard board={playerBoard} onCellClick={() => {}} />
            </div>
            <div className="board-container">
              <h2>Opponent's Board</h2>
              <GameBoard board={opponentBoard} onCellClick={makeMove} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
