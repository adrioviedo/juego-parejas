export const Header = ({ gameRestart, points, time, gameMode }) => {
  const handleRestart = () => {
    gameRestart();
  };

  let maxTime = 0;

  if (gameMode === "easy") {
    maxTime = 60;
  } else {
    maxTime = 30;
  }

  return (
    <div className="header">
      <article>
        <strong>Tiempo: </strong>
        <span>
          {time}/{maxTime}
        </span>
      </article>

      <button onClick={handleRestart}>Reiniciar Juego</button>

      <article>
        <strong>Aciertos: </strong>
        <span>{points}/12</span>
      </article>
    </div>
  );
};
