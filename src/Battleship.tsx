import React, { useState, useEffect } from "react";
import MainMenu from "./components/MainMenu";
import GameBoard from "./components/GameBoard";
import ShipPlacement from "./components/ShipPlacement";
import PlayerList from "./components/PlayerList";
import socket from "./socket";
import { Phase, Cell } from "./types";
import PlayAgainModal from "./components/PlayAgainModal";

interface Player {
  id: string;
  name: string;
  point: number;
}

const Battleship: React.FC = () => {
  const boxCount = 6;
  const [isModalVisible, setModalVisible] = useState(false);
  const [gameState, setGameState] = useState({
    board: initializeBoard(),
    ships: {},
    points: 0,
  });
  const [winnerId, setWinnerId] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [turn, setTurn] = useState<boolean>(false);
  const [playerReady, setPlayerReady] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [socketId, setSocketID] = useState<string>("");
  const [phase, setPhase] = useState<Phase>("menu");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [opponentReady, setOpponentReady] = useState<boolean>(false);
  const [playerBoard, setPlayerBoard] = useState<Cell[][]>(
    Array.from({ length: boxCount }, () => Array(boxCount).fill(null))
  );
  const [opponentBoard, setOpponentBoard] = useState<Cell[][]>(
    Array.from({ length: boxCount }, () => Array(boxCount).fill(null))
  );
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(() => socket.id ?? ""); // Set the socket ID to the state
    });

    socket.on("updatePlayers", (updatedPlayers: Player[]) => {
      setPlayers(() => updatedPlayers);
    });

    socket.on("gameStart", () => setPhase("placement"));
    socket.on("updateBoard", (updatedBoard: Cell[][]) =>
      setOpponentBoard(updatedBoard)
    );
    socket.on("endGame", (winnerId: any) => setWinnerId(() => winnerId));
    socket.on("playerReady", () => setOpponentReady(true));
    socket.on("startGame", () => setPhase("playing"));
    socket.on(
      "attackResult",
      ({
        row,
        col,
        result,
        target,
      }: {
        row: number;
        col: number;
        result: Cell;
        target: string; // "player" if the current player is attacking, "opponent" if defending
      }) => {
        if (target === "player") {
          // Update the opponent's board
          setOpponentBoard((prevBoard) => {
            const newBoard = prevBoard.map((r) => [...r]);
            newBoard[row][col] = result;
            return newBoard;
          });
        } else if (target === "opponent") {
          // Update the player's board (defending board)
          setPlayerBoard((prevBoard) => {
            const newBoard = prevBoard.map((r) => [...r]);
            newBoard[row][col] = result;
            return newBoard;
          });
        }
      }
    );

    socket.on("yourTurn", (yourTurn) =>
      setTurn(() => {
        return yourTurn.isYourTurn;
      })
    );

    socket.on(
      "attackResult",
      ({ row, col, result, target, socketId, opponentId, points }) => {
        // Update the game UI based on the result (hit or miss)
        // Update points display
        // updatePointsDisplay(socketId, points);
      }
    );

    socket.on("askPlayAgain", ({ message }) => {
      setModalVisible(true);
    });

    // Listen for the game restart event from the server
    socket.on("gameRestarted", ({ message }) => {
      // console.log({ winnerId, socketId });
      // alert(message); // Notify the user that the game is restarting

      // Reset all game-related state to initial values
      setGameState({
        board: initializeBoard(),
        ships: {},
        points: 0,
      });

      setPlayerBoard(initializeBoard()); // Reset player board
      setOpponentBoard(initializeBoard()); // Reset opponent board
      setPhase("placement"); // Set to ship placement phase or whichever is the initial phase
      setPlayers(() => []); // Clear players list
      setTurn(winnerId === socketId); // Reset turn state
      setWinnerId(""); // Clear winnerId
      setPlayerReady(false); // Reset readiness states
      setIsReady(false);
      setOpponentReady(false);

      // Close any modals that might still be open
      setModalVisible(false);
    });

    return () => {
      socket.off("connect");
      socket.off("gameStart");
      socket.off("updateBoard");
      socket.off("endGame");
      socket.off("playerReady");
      socket.off("startGame");
      socket.off("attackResult");
      socket.off("yourTurn");
      socket.off("askPlayAgain");
      socket.off("gameRestarted");
    };
  }, [winnerId, socketId, players, playerReady, isReady]);

  // Helper function to initialize a blank board
  function initializeBoard() {
    const boxCount = 6; // assuming a 6x6 board
    return Array.from({ length: boxCount }, () => Array(boxCount).fill(null));
  }

  const handlePlayAgain = () => {
    socket.emit("playAgain");
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const getOpponentId = () => {
    const playerIdToFind = socketId;

    return players.find((player) => player.id !== playerIdToFind);
  };

  const handlePlacementComplete = () => {
    // setPlayerReady(() => true);
    if (!isReady || !opponentReady) {
      setIsReady(true);
      socket.emit("playerReady");
    }
  };

  const startGame = () => {
    setReady(() => true);
    socket.emit("startGame");
  };

  const joinGame = () => {
    setJoined(() => true);
    socket.emit("setName", playerName);
    socket.emit("joinGame", playerName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
    setJoined(() => false);
    setReady(() => false);
  };

  const placeShip = (
    ship: string,
    orientation: string,
    row: number,
    col: number,
    shipLength: number
  ) => {
    socket.emit("placeShip", { ship, orientation, row, col, shipLength });
  };

  const makeMove = (row: number, col: number) => {
    socket.emit("makeMove", { row, col });
  };

  return (
    <div className="app capitalize">
      <div>
        {phase === "menu" && (
          <div>
            <MainMenu
              onStartGame={startGame}
              onJoinGame={joinGame}
              joined={joined}
              ready={ready}
            />
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={handleNameChange}
              />
            </div>
          </div>
        )}
        {phase === "placement" && (
          <ShipPlacement
            onPlaceShip={placeShip}
            onComplete={handlePlacementComplete}
            playerReady={playerReady}
          />
        )}
        {phase === "playing" && (
          <div>
            <PlayerList
              players={players}
              yourTurn={turn}
              isWinner={winnerId}
              socketId={socketId}
            />
            <div className="xbox">
              <div className="xrow">
                <div className="xcell">
                  <h2>Your Board</h2>
                  <GameBoard
                    board={playerBoard}
                    onCellClick={() => {}}
                    isOpponentBoard={false}
                  />
                </div>
                <div className="xcell lowercase capitalize">
                  <h2>{getOpponentId()?.name} Board</h2>
                  <GameBoard
                    board={opponentBoard}
                    onCellClick={makeMove}
                    isOpponentBoard={true}
                    yourTurn={turn}
                  />
                </div>
              </div>
            </div>
            <PlayAgainModal
              isVisible={isModalVisible}
              onConfirm={handlePlayAgain}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Battleship;
