// src/components/JoinGame.tsx
import React, { useEffect, useState } from "react";
import socket from "../socket";

interface JoinGameProps {
  onJoin: (playerId: string) => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ onJoin }) => {
  const [playerId, setPlayerId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up socket event listeners

    // Listen for confirmation from the server
    socket.on("playerJoined", () => {
      onJoin(playerId);
    });

    socket.on("placementError", (message: string) => {
      setError(message);
    });

    // Clean up on unmount
    return () => {
      socket.off("playerJoined");
      socket.off("placementError");
    };
  }, [playerId, onJoin]);

  const handleJoinGame = () => {
    if (!playerId) {
      setError("Player ID is required.");
      return;
    }

    socket.emit("joinGame", playerId);
  };

  return (
    <div>
      <h2>Join Game</h2>
      <input
        type="text"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        placeholder="Enter Player ID"
      />
      <button onClick={handleJoinGame}>Join Game</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default JoinGame;
