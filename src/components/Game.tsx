// src/components/Games.tsx
import React, { useState } from "react";
import Board from "./Board";
import { Position } from "../types";
import ShipPlacement from "./ShipPlacement";

interface GameProps {
  playerId: string;
  joined: boolean;
}

const Games: React.FC<GameProps> = ({ playerId, joined }) => {
  // Example state setup
  const [board, setBoard] = useState<number[][]>(
    Array(10).fill(Array(10).fill(0))
  );
  const [shipPositions, setShipPositions] = useState<Position[]>([]);

  // Example click handler
  const handleBoardClick = (row: number, col: number) => {
    // Logic to handle board click
  };

  return (
    <div>
      <h1>Game Board</h1>
      {playerId ? (
        <ShipPlacement playerId={playerId} />
      ) : (
        <Board
          board={board}
          onClick={handleBoardClick}
          shipPositions={shipPositions} // Pass shipPositions here
        />
      )}
    </div>
  );
};

export default Games;
