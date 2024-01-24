import { useState } from "react";
import { Card } from "./Card";
import { PAREJAS } from "../constants";
import { useEffect } from "react";

const doubleCards = [...PAREJAS, ...PAREJAS];

const initialCards = doubleCards.map((pareja) => ({
  img: pareja,
  flipped: false,
  matched: false,
}));

const shuffleCards = (cards) => {
  return cards.sort(() => Math.random() - 0.5);
};

export const Board = () => {
  const [cards, setCards] = useState();
  const [flippedCards, setFlippedCards] = useState([]);
  const [win, setWin] = useState(false);
  const [timeOut, setTimeOut] = useState(false);

  useEffect(() => {
    setCards(shuffleCards(initialCards));
  }, []);

  const flipCard = (index) => {
    const newCards = [...cards];
    setFlippedCards([...flippedCards, { img: newCards[index].img, index }]);
    if (flippedCards.length === 2) {
      return;
    }
    newCards[index].flipped = true;
    setCards(newCards);
  };

  const checkWin = () => {
    const win = cards.every((pareja) => pareja.matched);
    if (win) {
      setWin(true);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      if (flippedCards[0].img === flippedCards[1].img) {
        const newCards = [...cards];
        newCards[flippedCards[0].index].matched = true;
        newCards[flippedCards[1].index].matched = true;
        setCards(newCards);
        checkWin();
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[flippedCards[0].index].flipped = false;
          newCards[flippedCards[1].index].flipped = false;
          setCards(newCards);
        }, 2000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  console.log(cards);

  return (
    <div className="board">
      {win && <h1>¡Ganaste!</h1>}
      {!win & !timeOut &&
        cards?.map((pareja, index) =>
          pareja.flipped ? (
            <Card key={index} flipCard={flipCard}>
              {`${pareja.img}, ${pareja.matched}`}
            </Card>
          ) : (
            <Card key={index} flipCard={flipCard} index={index}>
              {pareja.img}
            </Card>
          )
        )}
    </div>
  );
};
