import React, { useState } from "react";
import GameBoard from "./GameBoard";

type Orientation = "horizontal" | "vertical";
type Ship = "battleship" | "cruiser"; // Add other ships as needed

interface ShipPlacementProps {
  onPlaceShip: (
    ship: Ship,
    orientation: Orientation,
    row: number,
    col: number
  ) => void;
}

const MAX_SHIPS = {
  battleship: 3,
  cruiser: 3,
  // Add other ships and their limits if needed
};

const ShipPlacement: React.FC<ShipPlacementProps> = ({ onPlaceShip }) => {
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const [selectedShip, setSelectedShip] = useState<Ship>("battleship");
  const [playerBoard, setPlayerBoard] = useState<(Ship | null)[][]>(
    Array(10)
      .fill(null)
      .map(() => Array(10).fill(null))
  );

  const [placedShips, setPlacedShips] = useState<{ [key in Ship]: number }>({
    battleship: 0,
    cruiser: 0,
    // Initialize other ships if needed
  });

  const canPlaceShip = (ship: Ship) => {
    return placedShips[ship] < MAX_SHIPS[ship];
  };

  const handleShipPlacement = (row: number, col: number) => {
    const shipSize = getShipSize(selectedShip);

    if (!canPlaceShip(selectedShip)) {
      alert("You have reached the maximum number of this type of ship.");
      return;
    }

    if (isValidPlacement(row, col, shipSize, orientation)) {
      updateBoard(row, col, shipSize, orientation);
      onPlaceShip(selectedShip, orientation, row, col);
      setPlacedShips((prev) => ({
        ...prev,
        [selectedShip]: prev[selectedShip] + 1,
      }));
    } else {
      alert("Invalid ship placement");
    }
  };

  const updateBoard = (
    row: number,
    col: number,
    shipSize: number,
    orientation: Orientation
  ) => {
    const newBoard = playerBoard.map((r) => r.slice()); // Create a copy of the board

    if (orientation === "horizontal") {
      for (let i = 0; i < shipSize; i++) {
        newBoard[row][col + i] = selectedShip;
      }
    } else {
      for (let i = 0; i < shipSize; i++) {
        newBoard[row + i][col] = selectedShip;
      }
    }

    setPlayerBoard(newBoard); // Update the state with the new board
  };

  const isValidPlacement = (
    row: number,
    col: number,
    shipSize: number,
    orientation: Orientation
  ) => {
    if (orientation === "horizontal") {
      if (col + shipSize > 10) return false; // Out of bounds check
      for (let i = 0; i < shipSize; i++) {
        if (playerBoard[row][col + i] !== null) return false; // Overlap check
      }
    } else {
      if (row + shipSize > 10) return false; // Out of bounds check
      for (let i = 0; i < shipSize; i++) {
        if (playerBoard[row + i][col] !== null) return false; // Overlap check
      }
    }
    return true;
  };

  const getShipSize = (ship: Ship) => {
    switch (ship) {
      case "battleship":
        return 4; // Example size for Battleship
      case "cruiser":
        return 3; // Example size for Cruiser
      default:
        return 0;
    }
  };

  return (
    <div className="ship-placement">
      <h2>Place Your Ships</h2>
      <div>
        <label>Orientation:</label>
        <select
          value={orientation}
          onChange={(e) => setOrientation(e.target.value as Orientation)}
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </div>
      <div>
        <label>Ship:</label>
        <select
          value={selectedShip}
          onChange={(e) => setSelectedShip(e.target.value as Ship)}
        >
          <option value="battleship">Battleship</option>
          <option value="cruiser">Cruiser</option>
          {/* Add more ship options here */}
        </select>
      </div>
      <GameBoard board={playerBoard} onCellClick={handleShipPlacement} />
    </div>
  );
};

export default ShipPlacement;
