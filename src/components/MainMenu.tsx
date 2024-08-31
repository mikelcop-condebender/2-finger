import React, { useEffect } from "react";
import socket from "../socket";

interface MainMenuProps {
  onStartGame: () => void;
  onJoinGame: () => void;
  joined: boolean;
  ready: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onJoinGame,
  joined,
  ready,
}) => {
  useEffect(() => {
    socket.on("joinGame", (val) => {});

    return () => {
      socket.off("joinGame");
    };
  }, []);

  return (
    <div className="main-menu">
      <h1>Battleship Game</h1>
      {joined && (
        <button disabled={ready} onClick={onStartGame}>
          {ready ? "Waiting" : "Ready"}
        </button>
      )}
      <button disabled={ready} onClick={onJoinGame}>
        Join Game
      </button>
    </div>
  );
};

export default MainMenu;
