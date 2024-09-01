import React from "react";

type Cell = "hit" | "miss" | Ship | null;
type Ship = "battleship" | "cruiser" | "boat"; // Add other ships as needed

interface GameBoardProps {
  board: Cell[][];
  onCellClick: (row: number, col: number) => void;
  isOpponentBoard?: boolean; // Add this prop to differentiate boards
  yourTurn?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  isOpponentBoard = false,
  yourTurn,
}) => {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {
            const shipChar = {
              battleship: "🚢",
              cruiser: "🛥️",
              boat: "🚣‍♀️",
            };
            // Determine the cell class based on the cell type
            let cellClass = "";
            if (cell === "hit") {
              cellClass = isOpponentBoard ? "opponent-hit" : "hit"; // Use opponent-hit for the opponent's board
            } else if (cell === "miss") {
              cellClass = "miss";
            } else if (typeof cell === "string") {
              // Assume cell is a ship name if it's not null, hit, or miss
              cellClass = "ship";
            }

            return (
              <div
                style={{
                  cursor: cell || !yourTurn ? "not-allowed" : "crosshair",
                }}
                key={colIndex}
                className={`board-cell ${cellClass}`}
                onClick={() => {
                  return (
                    (!cell || !yourTurn) && onCellClick(rowIndex, colIndex)
                  );
                }} // Ensure this function is called
              >
                {/* Optional: Display first letter of the ship name if it's a ship */}
                {typeof cell === "string" &&
                cell !== "hit" &&
                cell !== "miss" ? (
                  <span>{shipChar[cell]}</span>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
