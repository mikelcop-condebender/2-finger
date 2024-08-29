// src/components/Board.tsx
import React from "react";
import { Position } from "../types";
import Square from "./Square";

interface BoardProps {
  board: number[][];
  onClick: (row: number, col: number) => void;
  shipPositions: Position[]; // This prop is required
}

const Board: React.FC<BoardProps> = ({ board, onClick, shipPositions }) => {
  console.log({ board });
  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cell, colIndex) => {
            // Check if the cell contains a ship
            const isShip = shipPositions.some(
              (pos) => pos.row === rowIndex && pos.col === colIndex
            );
            return (
              <Square
                key={colIndex}
                value={isShip ? 1 : cell} // Display ship if present
                onClick={() => onClick(rowIndex, colIndex)}
                style={{ backgroundColor: isShip ? "grey" : "white" }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
