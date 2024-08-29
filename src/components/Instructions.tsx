// src/components/Instructions.tsx
import React from "react";

const Instructions: React.FC = () => (
  <div
    style={{ padding: "10px", border: "1px solid #ddd", marginBottom: "20px" }}
  >
    <h3>How to Place Ships</h3>
    <ul>
      <li>Select a ship from the ship selection panel.</li>
      <li>Click on the cells of the board where you want to place the ship.</li>
      <li>
        Ensure the ship fits within the board boundaries and does not overlap
        with other ships.
      </li>
      <li>
        Click the "Confirm Placement" button to finalize the ship's position.
      </li>
    </ul>
  </div>
);

export default Instructions;
