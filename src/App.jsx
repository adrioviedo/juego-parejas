import { useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import { Game } from "./components/Game";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const gameRestart = () => {
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <>
      <div className="App">
        <div>
          <h1>Juego de memorizar parejas</h1>
        </div>
        {gameStarted ? (
          <Game gameRestart={gameRestart} />
        ) : (
          <Menu startGame={startGame} />
        )}
      </div>
    </>
  );
}

export default App;
