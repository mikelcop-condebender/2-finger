import React from "react";

interface MainMenuProps {
  onStartGame: () => void;
  onJoinGame: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onJoinGame }) => {
  return (
    <div className="main-menu">
      <h1>Battleship Game</h1>
      <button onClick={onStartGame}>Start New Game</button>
      <button onClick={onJoinGame}>Join Game</button>
    </div>
  );
};

export default MainMenu;
