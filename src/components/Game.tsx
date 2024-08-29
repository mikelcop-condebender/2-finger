// src/components/Game.tsx
import React, { useEffect, useState } from "react";
import socket from "../socket";
import { Ship } from "../types"; // Import your types

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
                cursor: "pointer", // Add cursor to indicate clickable cells
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const createEmptyBoard = (size: number): number[][] => {
  return Array.from({ length: size }, () => Array(size).fill(0));
};

interface GameProps {
  playerId: string;
}

const Game: React.FC<GameProps> = ({ playerId }) => {
  const [board, setBoard] = useState<number[][]>(createEmptyBoard(10));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("*****************************");
    // Set up socket event listeners
    socket.on("newboard", () => {
      console.log("newSSSSKSKSKSKSKSKSK");
    });
    socket.on("updateBoard", () => {
      console.log("UPDATE BOARD >>>>>>");
      //   setBoard(data[playerId] || createEmptyBoard(10));
    });

    socket.on("placementError", (message: string) => {
      console.log("UPDATE ERRRRRR");
      setError(message);
    });

    // Clean up on unmount
    return () => {
      //   socket.off("updateBoard");
      socket.off("placementError");
    };
  }, [playerId, board]);

  const handleCellClick = (row: number, col: number) => {
    // Send ship placement to server
    console.log("333333333333333333333333333333333333");
    socket.emit("placeShip", {
      playerId,
      ship: {
        size: 3, // Example size
        positions: [{ row, col }], // Example position
      },
    });
  };

  return (
    <div>
      <Board board={board} onClick={handleCellClick} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default Game;
