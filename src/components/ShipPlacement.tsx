import React, { useState } from "react";
import GameBoard from "./GameBoard";

type Orientation = "horizontal" | "vertical";
type Ship = "battleship" | "cruiser" | "boat"; // Add other ships as needed

const MAX_SHIPS = {
  battleship: 1,
  cruiser: 1,
  boat: 1,
  // Add other ships and their limits if needed
};

const SHIP_SIZE = {
  battleship: 4,
  cruiser: 3,
  boat: 1,
  // Add other ships and their limits if needed
};

const boxCount = 6;

const ShipPlacement: React.FC<{
  onPlaceShip: (
    ship: string,
    orientation: string,
    row: number,
    col: number,
    shipLength: number
  ) => void;
  onComplete: () => void;
  playerReady: boolean;
}> = ({ onPlaceShip, onComplete, playerReady }) => {
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const [selectedShip, setSelectedShip] = useState<Ship>("battleship");
  const [playerBoard, setPlayerBoard] = useState<(Ship | null)[][]>(
    Array(boxCount)
      .fill(null)
      .map(() => Array(boxCount).fill(null))
  );

  const [placedShips, setPlacedShips] = useState<{ [key in Ship]: number }>({
    battleship: 0,
    cruiser: 0,
    boat: 0,
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
      const shipLength = SHIP_SIZE[selectedShip];
      updateBoard(row, col, shipSize, orientation);
      onPlaceShip(selectedShip, orientation, row, col, shipLength);
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
      if (col + shipSize > boxCount) return false; // Out of bounds check
      for (let i = 0; i < shipSize; i++) {
        if (playerBoard[row][col + i] !== null) return false; // Overlap check
      }
    } else {
      if (row + shipSize > boxCount) return false; // Out of bounds check
      for (let i = 0; i < shipSize; i++) {
        if (playerBoard[row + i][col] !== null) return false; // Overlap check
      }
    }
    return true;
  };

  const getShipSize = (ship: Ship) => {
    return SHIP_SIZE[ship];
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
          <option value="boat">Boat</option>
          {/* Add more ship options here */}
        </select>
        <button disabled={playerReady} onClick={onComplete}>
          Finish Placement
        </button>
      </div>

      <GameBoard
        board={playerBoard}
        onCellClick={handleShipPlacement}
        yourTurn={true}
      />
    </div>
  );
};

export default ShipPlacement;
