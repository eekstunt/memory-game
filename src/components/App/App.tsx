import React from "react";
import '../../common.css';
import './App.css';
import { Cards } from "../Cards/Cards";
import { Moves } from "../Moves/Moves";
import { Popup} from "../Popup/Popup";
import { MOVES_ALLOWED, cardsConfig } from "../../settings";
import { CardsState } from "../../types";
import { deepCopyArray} from "../../utils";

function closeIncorrectCards(cardsToModify: CardsState, image1: string, image2: string): CardsState {
  const modifiedCards = deepCopyArray(cardsToModify);

  for (let i = 0; i < modifiedCards.length; i++) {
    if (modifiedCards[i].image === image1 || modifiedCards[i].image === image2) {
      modifiedCards[i].opened = false;
    }
  }

  return modifiedCards;
}

function solveCards(cardsToSolve: CardsState, image: string): CardsState {
  const modifiedCards = deepCopyArray(cardsToSolve);

  for (let i = 0; i < modifiedCards.length; i++) {
    if (modifiedCards[i].image === image) {
      modifiedCards[i].opened = false;
      modifiedCards[i].solved = true;
    }
  }

  return modifiedCards;
}

function refreshCardsState(): CardsState {
  const doubledCards = deepCopyArray(cardsConfig).concat(cardsConfig);
  const cardsState: CardsState = []
  doubledCards.forEach((image) => cardsState.push({image: image, opened: false, solved: false}))
  return cardsState.sort(() => 0.5 - Math.random());
}


export const App = () => {
  const [movesMade, setMovesMade] = React.useState(0);
  const [cards, setCards] = React.useState<CardsState>(refreshCardsState())

  React.useEffect(() => {
    const openedCards = cards.filter(obj => obj.opened);

    if (openedCards.length === 2) {
      setTimeout(
        () => setMovesMade(movesMade + 1),
        500,
      );
      if (openedCards[0].image !== openedCards[1].image) {
        setTimeout(
          () => setCards(closeIncorrectCards(cards, openedCards[0].image, openedCards[1].image)),
          500,
        );
      } else {
        setTimeout(
          () => setCards(solveCards(cards, openedCards[0].image)),
          500,
        );
      }
    }
  });

  const onPlayAgain = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMovesMade(0);
    setCards(refreshCardsState());
  }

  const onCardClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;
    if (!id) {
      return;
    }
    const cardId = parseInt(id);

    if (MOVES_ALLOWED - movesMade === 0) {
      return;
    }

    const openedCards = cards.filter(obj => obj.opened);

    if (
      openedCards.length === 1
      && openedCards[0].image === cards[cardId].image
      && openedCards[0].opened === cards[cardId].opened
      && openedCards[0].solved === cards[cardId].solved
    ) { return; }

    if (openedCards.length === 2) { return; }

    const modifiedCards = deepCopyArray(cards);
    modifiedCards[cardId].opened =  !modifiedCards[cardId].opened;
    setCards(modifiedCards);
  }

  return (
    <React.Fragment>
      <main className="grid">
        <div className="title">Memory</div>
        <Moves movesMade={movesMade} movesLeft={false} />
        <Moves movesMade={movesMade} movesLeft={true} />

        <Cards cards={cards} onClick={onCardClick}/>

        {MOVES_ALLOWED - movesMade === 0 ? <Popup win={false} movesMade={movesMade} onClick={onPlayAgain} /> : ''}
        {
          cards.filter(obj => obj.solved).length === cards.length ?
          <Popup win={true} movesMade={movesMade} onClick={onPlayAgain} /> : ''
        }

      </main>
    </React.Fragment>
  )
}
