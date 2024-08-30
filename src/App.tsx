// src/App.tsx
import React, { useState } from "react";
import JoinGame from "./components/JoinGame";
import ShipPljoinedacement from "./components/ShipPlacement";
import Game from "./components/Game";

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
        playerId && <Game playerId={playerId} joined={joined} />
      )}
    </div>
  );
};

export default App;
