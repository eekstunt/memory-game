import React, { FC } from "react";
import './Card.css'
import karpov_logo from '../../images/karpov_logo.svg';

interface Props {
  id: number;
  image: string | null;
  opened: boolean;
  solved: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Card: FC<Props> = ({id, image, opened, solved, onClick}) => {
  return (
    <li
      className={`card listing ${opened || solved ? 'card__opened-or-solved' : 'card__closed'}`}
      data-id={id}
      onClick={onClick}
    >
      {!solved ? <img
        key={id}
        alt=""
        className="card__logo"
        src={opened ? image : karpov_logo}
      ></img> : ''}

    </li>
  );
}