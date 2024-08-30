import React from "react";

type Cell = "hit" | "miss" | Ship | null;
type Ship = "battleship" | "cruiser"; // Add other ships as needed

interface OpponentBoardProps {
  board: Cell[][];
  onCellClick: (row: number, col: number) => void;
}

const OpponentBoard: React.FC<OpponentBoardProps> = ({
  board,
  onCellClick,
}) => {
  return (
    <div className="opponent-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`board-cell ${cell ? cell : ""}`}
              onClick={() => onCellClick(rowIndex, colIndex)} // Handle cell clicks
            >
              {cell === "hit" ? "X" : cell === "miss" ? "O" : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OpponentBoard;
