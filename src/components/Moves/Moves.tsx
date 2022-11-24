import React, {FC} from "react";
import { MOVES_ALLOWED } from '../../settings';
import './Moves.css';

interface Props {
  movesMade: number;
  movesLeft: boolean;
}

export const Moves: FC<Props> = ({movesMade, movesLeft}) => {
  return (
    <div className={`moves ${movesLeft ? 'moves-left' : 'moves-made'}`}>
      <h1 className="moves__caption">
        {movesLeft ? 'Осталось' : 'Сделано'}
        <br/>
        {movesLeft ? 'попыток' : 'ходов'}
      </h1>
      <h1 className="moves__count">{movesLeft ? MOVES_ALLOWED - movesMade : movesMade}</h1>
    </div>
  )
}
