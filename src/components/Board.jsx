import { useState } from "react";
import { Card } from "./Card";
import { PAREJAS } from "../constants";
import { useEffect } from "react";
import ReactCardFlip from "react-card-flip";

const doubleCards = [...PAREJAS, ...PAREJAS];

const initializeCards = (cards) =>
  cards.map((pareja) => ({
    img: pareja,
    flipped: false,
    matched: false,
  }));

const shuffleCards = (cards) => {
  return cards.sort(() => Math.random() - 0.5);
};

export const Board = ({ setPoints }) => {
  const [cards, setCards] = useState();
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    const initialCards = initializeCards(doubleCards);
    const cards = shuffleCards(initialCards);
    setCards(cards);
  }, []);

  // const checkMatch = (cardsFlipped) => {
  //   if (cardsFlipped.length === 2) {
  //     const [card1, card2] = cardsFlipped;
  //     if (card1.img === card2.img) {
  //       const newCards = [...cards];
  //       newCards[card1.index].matched = true;
  //       newCards[card2.index].matched = true;
  //       setCards(newCards);
  //       setPoints();
  //       setFlippedCards([]);
  //     } else {
  //       setTimeout(() => {
  //         const newCards = [...cards];
  //         newCards[card1.index].flipped = false;
  //         newCards[card2.index].flipped = false;
  //         setCards(newCards);
  //         setFlippedCards([]);
  //       }, 1000);
  //     }
  //   }
  // };

  const flipCard = (index) => {
    if (index !== null) {
      if (flippedCards.length < 2) {
        const newCards = [...cards];
        const cardsFlipped = [
          ...flippedCards,
          { img: newCards[index].img, index },
        ];
        setFlippedCards(cardsFlipped);
        newCards[index].flipped = true;
        setCards(newCards);
      }
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      if (flippedCards[0].img === flippedCards[1].img) {
        const newCards = [...cards];
        newCards[flippedCards[0].index].matched = true;
        newCards[flippedCards[1].index].matched = true;
        setCards(newCards);
        setPoints();
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[flippedCards[0].index].flipped = false;
          newCards[flippedCards[1].index].flipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  return (
    <div>
      <div className="board">
        {cards?.map((pareja, index) => (
          <ReactCardFlip
            isFlipped={pareja.flipped}
            flipDirection="horizontal"
            key={index}
          >
            <Card flipCard={flipCard} index={index} />
            <Card flipCard={flipCard} index={index}>
              {pareja.img}
            </Card>
          </ReactCardFlip>
        ))}
      </div>
    </div>
  );
};
