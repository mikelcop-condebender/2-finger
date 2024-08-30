import React from "react";

interface BoardProps {
  board: number[][];
  onClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onClick }) => (
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

export default Board;
