import React, {FC} from "react";
import "./Cards.css";
import {Card} from "../Card/Card";
import {CardsState} from "../../types";

interface Props {
  cards: CardsState;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Cards: FC<Props> = ({cards, onClick}) => {
  return (
    <ul className="cards">
      {cards.map((item, index) => {
        return <Card
          key={index}
          id={index}
          image={item.image}
          opened={item.opened}
          solved={item.solved}
          onClick={onClick}
        />;
      })}
    </ul>
  )
}