import { useEffect, useState } from "react";
import { Board } from "./board";
import { Header } from "./Header";

export const Game = ({ gameRestart }) => {
  const [gameStatus, setGameStatus] = useState("starting");
  const [gameMode, setGameMode] = useState("easy"); // ["easy", "hard"
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);

  // Temporizador para el tiempo de juego 60 segundos

  useEffect(() => {
    if (gameStatus === "playing") {
      const timer = setTimeout(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time, gameStatus]);

  useEffect(() => {
    if (gameMode === "easy") {
      if (time === 60) {
        setGameStatus("finished");
      }
    }
    if (gameMode === "hard") {
      if (time === 30) {
        setGameStatus("finished");
      }
    }
  }, [time, gameMode]);

  useEffect(() => {
    const win = points === 12;
    if (win) {
      setGameStatus("winner");
    }
  }, [points]);

  const handleRestart = () => {
    gameRestart();
  };

  const handlePoints = () => {
    if (points < 12) {
      setPoints(points + 1);
      if (gameMode === "hard") {
        if (time > 5) {
          setTime(time - 5);
        } else {
          setTime(0);
        }
      }
    }
  };

  const handleStartEasy = () => {
    setGameMode("easy");
    setGameStatus("playing");
  };

  const handleStartHard = () => {
    setGameMode("hard");
    setGameStatus("playing");
  };

  console.log(gameStatus);

  if (gameStatus === "starting") {
    return (
      <div>
        <h2>Selecciona la dificultad</h2>
        <button onClick={handleStartEasy}>Fácil</button>
        <button onClick={handleStartHard}>Difícil</button>
      </div>
    );
  }
  if (gameStatus === "winner") {
    return (
      <div>
        <h1>Ganaste!</h1>
        <button onClick={handleRestart}>Reiniciar Juego</button>
      </div>
    );
  }

  if (gameStatus === "finished") {
    return (
      <div>
        <h1>Perdiste!</h1>
        <button onClick={handleRestart}>Reiniciar Juego</button>
      </div>
    );
  }

  if (gameStatus === "playing") {
    return (
      <>
        <Header
          gameRestart={handleRestart}
          points={points}
          time={time}
          gameMode={gameMode}
        />
        {gameMode === "easy" ? <h2>Modo fácil</h2> : <h2>Modo difícil</h2>}
        <Board setPoints={handlePoints} />
      </>
    );
  }
};
