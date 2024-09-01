import React, { useState, useEffect } from "react";
import "./App.css";
import MainMenu from "./components/MainMenu";
import GameBoard from "./components/GameBoard";
import ShipPlacement from "./components/ShipPlacement";
import PlayerList from "./components/PlayerList";
import socket from "./socket";
import { Phase, Cell } from "./types";

const App: React.FC = () => {
  const boxCount = 6;
  const [playerReady, setPlayerReady] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [, setSocketID] = useState<string>("");
  const [phase, setPhase] = useState<Phase>("menu");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [opponentReady, setOpponentReady] = useState<boolean>(false);
  const [playerBoard, setPlayerBoard] = useState<Cell[][]>(
    Array.from({ length: boxCount }, () => Array(boxCount).fill(null))
  );
  const [opponentBoard, setOpponentBoard] = useState<Cell[][]>(
    Array.from({ length: boxCount }, () => Array(boxCount).fill(null))
  );
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id ?? ""); // Set the socket ID to the state
    });

    socket.on("gameStart", () => setPhase("placement"));
    socket.on("updateBoard", (updatedBoard: Cell[][]) =>
      setOpponentBoard(updatedBoard)
    );
    socket.on("endGame", (winner: string) => alert(`${winner} wins!`));
    socket.on("playerReady", () => setOpponentReady(true));
    socket.on("startGame", () => setPhase("playing"));
    socket.on(
      "attackResult",
      ({
        row,
        col,
        result,
        target,
      }: {
        row: number;
        col: number;
        result: Cell;
        target: string; // "player" if the current player is attacking, "opponent" if defending
      }) => {
        if (target === "player") {
          // Update the opponent's board
          setOpponentBoard((prevBoard) => {
            const newBoard = prevBoard.map((r) => [...r]);
            newBoard[row][col] = result;
            return newBoard;
          });
        } else if (target === "opponent") {
          // Update the player's board (defending board)
          setPlayerBoard((prevBoard) => {
            const newBoard = prevBoard.map((r) => [...r]);
            newBoard[row][col] = result;
            return newBoard;
          });
        }
      }
    );

    return () => {
      socket.off("connect");
      socket.off("gameStart");
      socket.off("updateBoard");
      socket.off("endGame");
      socket.off("playerReady");
      socket.off("startGame");
      socket.off("attackResult");
    };
  }, []);

  const handlePlacementComplete = () => {
    setPlayerReady(() => true);
    if (!isReady || !opponentReady) {
      setIsReady(true);
      socket.emit("playerReady");
    }
  };

  const startGame = () => {
    setReady(() => true);
    socket.emit("startGame");
  };

  const joinGame = () => {
    setJoined(() => true);
    socket.emit("setName", playerName);
    socket.emit("joinGame", playerName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
    setJoined(() => false);
    setReady(() => false);
  };

  const placeShip = (
    ship: string,
    orientation: string,
    row: number,
    col: number,
    shipLength: number
  ) => {
    socket.emit("placeShip", { ship, orientation, row, col, shipLength });
  };

  const makeMove = (row: number, col: number) => {
    socket.emit("makeMove", { row, col });
  };

  return (
    <div className="app">
      {phase === "menu" && (
        <>
          <MainMenu
            onStartGame={startGame}
            onJoinGame={joinGame}
            joined={joined}
            ready={ready}
          />
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
          playerReady={playerReady}
        />
      )}
      {phase === "playing" && (
        <>
          <PlayerList />
          <div className="boards-container">
            <div className="board-container">
              <h2>Your Board</h2>
              <GameBoard
                board={playerBoard}
                onCellClick={() => {}}
                isOpponentBoard={false}
              />
            </div>
            <div className="board-container">
              <h2>Opponent's Board</h2>
              <GameBoard
                board={opponentBoard}
                onCellClick={makeMove}
                isOpponentBoard={true}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
