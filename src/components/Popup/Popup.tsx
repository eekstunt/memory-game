import React, {FC} from "react";
import "./Popup.css";

interface Props {
  win: boolean;
  movesMade: number;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Popup: FC<Props> = ({ win, movesMade, onClick }) => {
  return (
    <div className="popup">
      <h1 className="popup__text">
        {win ? 'Ура, вы выиграли!' : 'Увы, вы проиграли'}
        <br/>
        {win ? `Это заняло ${movesMade} ходов` : 'У вас кончились ходы'}
      </h1>
      <button className="popup-button" onClick={onClick}>
        <h1 className="popup-button__text">Сыграть еще</h1>
      </button>
    </div>
  )
}
