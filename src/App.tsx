// src/App.tsx
import React, { useState } from "react";
import JoinGame from "./components/JoinGame";
import ShipPlacement from "./components/ShipPlacement";

const App: React.FC = () => {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [joined, setJoined] = useState<boolean>(false);

  const handleJoin = (id: string) => {
    setPlayerId(id);
    setJoined(true);
  };

  return (
    <div>
      <h1>Battleship Game</h1>
      {!joined ? (
        <JoinGame onJoin={handleJoin} />
      ) : (
        playerId && <ShipPlacement playerId={playerId} />
      )}
    </div>
  );
};

export default App;
