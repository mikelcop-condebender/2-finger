import React from "react";

type Cell = "hit" | "miss" | Ship | null;
type Ship = "battleship" | "cruiser"; // Add other ships as needed

interface GameBoardProps {
  board: Cell[][];
  onCellClick: (row: number, col: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick }) => {
  console.log("GameBoard props - board:", board);

  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="board-cell"
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell && <span>{cell.charAt(0).toUpperCase()}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
