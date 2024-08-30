import React, { useEffect, useState } from "react";
import socket from "../socket";

interface JoinGameProps {
  onJoin: (playerId: string, name: string) => void;
}

const JoinGame: React.FC<JoinGameProps> = ({ onJoin }) => {
  const [playerId, setPlayerId] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on("playerJoined", ({ name }: { name: string }) => {
      onJoin(playerId, playerName);
    });

    socket.on("joinError", (message: string) => {
      setError(message);
    });

    socket.on("placementError", (message: string) => {
      setError(message);
    });

    // Clean up on unmount
    return () => {
      socket.off("playerJoined");
      socket.off("joinError");
      socket.off("placementError");
    };
  }, [playerId, playerName, onJoin]);

  const handleJoinGame = () => {
    if (!playerId || !playerName) {
      setError("Player ID and Name are required.");
      return;
    }

    socket.emit("joinGame", { playerId, name: playerName });
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
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter Your Name"
      />
      <button onClick={handleJoinGame}>Join Game</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default JoinGame;
