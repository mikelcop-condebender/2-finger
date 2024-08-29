import React from "react";

interface ShipProps {
  size: number;
  positions: { row: number; col: number }[];
}

const Ship: React.FC<ShipProps> = ({ size, positions }) => (
  <div>
    {positions.map((pos, index) => (
      <div
        key={index}
        style={{ position: "absolute", top: pos.row * 30, left: pos.col * 30 }}
      >
        <span>Ship</span>
      </div>
    ))}
  </div>
);

export default Ship;
