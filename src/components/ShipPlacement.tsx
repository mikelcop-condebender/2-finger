// src/components/ShipPlacement.tsx
import React, { useState } from "react";
import { Ship, Position } from "../types";
import Board from "./Board";
import Instructions from "./Instructions";
import socket from "../socket";

interface ShipPlacementProps {
  playerId: string;
}

const ShipPlacement: React.FC<ShipPlacementProps> = ({ playerId }) => {
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [shipPositions, setShipPositions] = useState<Position[]>([]);

  const handleBoardClick = (row: number, col: number) => {
    if (selectedShip) {
      const newPositions = [...shipPositions, { row, col }];
      if (newPositions.length <= selectedShip.size) {
        setShipPositions(newPositions);
      }
    }
  };

  const placeShip = () => {
    if (selectedShip && shipPositions.length === selectedShip.size) {
      socket.emit("placeShip", {
        playerId,
        ship: { ...selectedShip, positions: shipPositions },
      });
      setShipPositions([]);
      setSelectedShip(null);
    } else {
      alert("Invalid ship placement.");
    }
  };

  return (
    <div>
      <Instructions />
      <h2>Place Your Ships</h2>
      <div>
        <button onClick={() => setSelectedShip({ size: 5, positions: [] })}>
          Place 5-cell Ship
        </button>
        <button onClick={() => setSelectedShip({ size: 4, positions: [] })}>
          Place 4-cell Ship
        </button>
      </div>
      <Board
        board={Array(10).fill(Array(10).fill(0))} // Example empty board
        onClick={handleBoardClick}
        shipPositions={shipPositions} // Pass shipPositions here
      />
      <button onClick={placeShip}>Confirm Placement</button>
    </div>
  );
};

export default ShipPlacement;
