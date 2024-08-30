import React, { useState, useEffect } from "react";
import socket from "../socket";

interface Player {
  id: string;
  name: string;
}

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    console.log("IS THIS CALLED");
    socket.on("updatePlayers", (updatedPlayers: Player[]) => {
      console.log("UPDATE PLAYERS", updatedPlayers);
      setPlayers(updatedPlayers);
    });

    return () => {
      socket.off("updatePlayers");
    };
  }, []);

  return (
    <div className="player-list">
      <h2>Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
