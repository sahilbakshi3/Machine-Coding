import React, { useEffect, useState } from "react";

const generateGrid = () => {
  const arr = Array.from({ length: 18 }, (_, index) => index + 1);
  const grid = [...arr, ...arr].sort(() => Math.random() - 0.5);

  const cards = grid.map((item, index) => {
    return { id: index, number: item, isFlipped: false };
  });
  // console.log(cards);

  return cards;
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateGrid());

  const [isLock, setIsLock] = useState(false);
  const [flippedCard, setFlippedCard] = useState([]);

  const handleClick = (index) => {
    if (cards[index].isFlipped || isLock) {
      return;
    }

    const copyCards = [...cards];
    copyCards[index].isFlipped = true;
    setCards(copyCards);
    setFlippedCard([...flippedCard, index]);
  };

  useEffect(() => {
    if (flippedCard.length === 2) {
      setIsLock(true);
      setTimeout(() => {
        if (cards[flippedCard[0]].number !== cards[flippedCard[1]].number) {
          setCards((prevCards) => {
            const copyCards = [...prevCards];
            copyCards[flippedCard[0]].isFlipped = false;
            copyCards[flippedCard[1]].isFlipped = false;

            return copyCards;
          });
        }
        setIsLock(false);
        setFlippedCard([]);
      }, 3000);
    }
  }, [flippedCard]);

  return (
    <div className="container">
      {cards.map(({ id, number, isFlipped }) => {
        return (
          <button className="cards" onClick={() => handleClick(id)} key={id}>
            {isFlipped ? number : "?"}
          </button>
        );
      })}
    </div>
  );
};

export default MemoryGame;

/* -------------------------------------------------------------------
   MEMORY GAME
   -------------------------------------------------------------------
   GOAL:
     Simple flip-to-match memory game with 18 pairs (36 cards)
     - Click to flip 2 cards
     - If match → stay flipped
     - If not → flip back after delay

   -------------------------------------------------------------------
   DATA GENERATION (generateGrid):
     1. Create array [1..18]
     2. Duplicate it → total 36 items
     3. Shuffle using sort(Math.random() - 0.5)
     4. Map → card objects:
          {
            id: index,
            number: item,      // card value
            isFlipped: false   // hidden initially
          }

   -------------------------------------------------------------------
   STATE:
     cards         → full card list (with flip states)
     isLock        → disables clicks while 2 cards are being checked
     flippedCard   → stores ids of the last 2 flipped cards

   -------------------------------------------------------------------
   HANDLE CLICK:
     conditions:
       - Ignore if card already flipped
       - Ignore if isLock is true (during evaluation)

     process:
       - Set clicked card's isFlipped = true
       - Add its index to flippedCard array

   -------------------------------------------------------------------
   MATCH CHECK (useEffect on flippedCard change):
     When exactly 2 cards are flipped:
       1. Lock board (setIsLock(true))
       2. After 3 seconds:
            - If mismatch → flip both back
            - If match → keep them flipped
            - Reset flippedCard to empty
            - Unlock board (setIsLock(false))

   -------------------------------------------------------------------
   RENDER:
     Loop through cards → 36 <button> elements
     - Show number if flipped, otherwise "?"
     - onClick triggers handleClick(id)

   -------------------------------------------------------------------
   FLOW SUMMARY:
     Click card → flips + tracked
     When 2 cards flipped → lock → check match
     mismatch → flip back
     match → leave visible
     unlock → continue playing

   -------------------------------------------------------------------
   POTENTIAL IMPROVEMENTS:
     ✓ Disable clicking same card twice
     ✓ Track score or moves
     ✓ Win detection when all cards flipped

------------------------------------------------------------------- */
