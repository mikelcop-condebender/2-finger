// src/components/Square.tsx
import React from "react";

interface SquareProps {
  value: number;
  onClick: () => void;
  style?: React.CSSProperties;
}

const Square: React.FC<SquareProps> = ({ value, onClick, style }) => (
  <button
    onClick={onClick}
    style={{ ...style, width: 30, height: 30, margin: 2 }}
  >
    {value === 1 ? "S" : ""}
  </button>
);

export default Square;
