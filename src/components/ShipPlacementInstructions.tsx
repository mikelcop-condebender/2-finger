// src/components/ShipPlacementInstructions.tsx
import React from "react";

const ShipPlacementInstructions: React.FC = () => (
  <div>
    <h3>Instructions for Ship Placement:</h3>
    <ul>
      <li>Click on the cells to place your ship.</li>
      <li>Ensure the ship is placed either horizontally or vertically.</li>
      <li>Ships cannot overlap with other ships.</li>
      <li>Once placed, the ship cannot be moved.</li>
    </ul>
  </div>
);

export default ShipPlacementInstructions;
