import React, { useEffect, useState } from "react";
import socket from "../socket";
import { Ship } from "../types";

interface BoardProps {
  board: number[][];
  onClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onClick }) => {
  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              onClick={() => onClick(rowIndex, colIndex)}
              style={{
                width: 30,
                height: 30,
                backgroundColor: cell === 1 ? "black" : "white",
                border: "1px solid gray",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const Game: React.FC = () => {
  const [playerBoard, setPlayerBoard] = useState<number[][]>(
    createEmptyBoard(10)
  );
  const [enemyBoard, setEnemyBoard] = useState<number[][]>(
    createEmptyBoard(10)
  );
  const [error, setError] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string>("");
  const [opponentName, setOpponentName] = useState<string>("");
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    // Event listener for when the game is ready
    socket.on(
      "gameReady",
      ({ player1Id, player2Id, player1Name, player2Name, boards }) => {
        if (playerId === player1Id) {
          setPlayerName(player1Name);
          setOpponentName(player2Name);
          setPlayerBoard(
            boards[player1Id]?.playerBoard || createEmptyBoard(10)
          );
          setEnemyBoard(boards[player1Id]?.enemyBoard || createEmptyBoard(10));
        } else if (playerId === player2Id) {
          setPlayerName(player2Name);
          setOpponentName(player1Name);
          setPlayerBoard(
            boards[player2Id]?.playerBoard || createEmptyBoard(10)
          );
          setEnemyBoard(boards[player2Id]?.enemyBoard || createEmptyBoard(10));
        }
      }
    );

    socket.on(
      "updateBoard",
      (data: {
        [playerId: string]: { playerBoard: number[][]; enemyBoard: number[][] };
      }) => {
        if (playerId) {
          setPlayerBoard(data[playerId]?.playerBoard || createEmptyBoard(10));
          setEnemyBoard(data[playerId]?.enemyBoard || createEmptyBoard(10));
        }
      }
    );

    socket.on("placementError", (message: string) => {
      setError(message);
    });

    // Clean up on unmount
    return () => {
      socket.off("gameReady");
      socket.off("updateBoard");
      socket.off("placementError");
    };
  }, [playerId]);

  const handleCellClick = (row: number, col: number) => {
    // Ensure playerId is set before sending the request
    if (playerId) {
      socket.emit("placeShip", {
        playerId,
        ship: {
          size: 3, // Example size
          positions: [{ row, col }], // Example positions
        },
        isPlayerShip: true, // Set to true for player board, false for enemy board
      });
    }
  };

  return (
    <div>
      <h2>{playerName}'s Board</h2>
      <Board board={playerBoard} onClick={handleCellClick} />
      <h2>{opponentName}'s Board</h2>
      <Board board={enemyBoard} onClick={handleCellClick} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

const createEmptyBoard = (size: number): number[][] => {
  return Array.from({ length: size }, () => Array(size).fill(0));
};

export default Game;
