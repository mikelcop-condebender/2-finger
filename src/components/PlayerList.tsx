import React, { useState, useEffect } from "react";

interface GameBoardProps {
  yourTurn: boolean;
  players: any;
  isWinner: string;
  socketId: string;
}

const PlayerList: React.FC<GameBoardProps> = ({
  yourTurn,
  players,
  isWinner,
  socketId,
}) => {
  const [isWin, setIsWin] = useState<boolean>(false);

  console.log({ players });

  useEffect(() => {
    setIsWin(() => {
      if (isWinner === socketId) {
        return true;
      } else {
        return false;
      }
    });
  }, [isWinner, socketId, players]);

  return (
    <div className="player-list">
      {isWinner ? (
        isWin ? (
          <h2>You win!</h2>
        ) : (
          <h2>You loose!</h2>
        )
      ) : (
        <h2>{yourTurn ? "Your Turn" : "Wait for your turn"}</h2>
      )}

      <ul>
        {players.map((player: any) => (
          <li key={player.id}>
            {player.name} : {player.points}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
