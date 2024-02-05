export const Menu = ({ startGame }) => {
  const handleClick = () => {
    startGame();
  };

  return (
    <>
      <div>
        <h2>Reglas del juego</h2>
        <p>
          El juego consiste en encontrar las parejas de cartas iguales. Al
          iniciar el juego, se mostrarán todas las cartas boca abajo y el
          jugador deberá ir volteando de a dos cartas. Si las cartas son iguales
          se mantendrán boca arriba, de lo contrario se volverán a voltear.
        </p>
        <p>
          El juego termina cuando se encuentran todas las parejas o cuando se
          termine el tiempo. El jugador puede reiniciar el juego en cualquier
          momento.
        </p>
      </div>
      <div>
        <h2>Controles</h2>
        <p>
          Para voltear una carta, haga clic sobre ella. Para reiniciar el juego,
          haga clic sobre el botón Reiniciar juego.
        </p>
      </div>
      <div>
        <h2>¡Buena suerte!</h2>
      </div>
      <div>
        <button onClick={handleClick}>Iniciar juego</button>
      </div>
    </>
  );
};
