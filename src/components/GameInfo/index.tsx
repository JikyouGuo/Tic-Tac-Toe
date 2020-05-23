import React from 'react'
import './index.css'
import { GameStatus, PieceType } from '../../types/enums';

interface IProps {
  gameStatus: GameStatus;
  turn: PieceType;
  onClick: () => void;
}

export const GameInfo: React.FC<IProps> = ({ gameStatus, turn, onClick }) => {
  let status;
  if (gameStatus === GameStatus.gaming) {
    if (turn === PieceType.black) {
      status = '黑方落子'
    }
    else {
      status = '红方落子'
    }
  }
  else if (gameStatus === GameStatus.draw) { status = '平局' }
  else if (gameStatus === GameStatus.blackWin) { status = '黑方胜' }
  else if (gameStatus === GameStatus.redWin) { status = '红方胜' }
  const content = <div
    className={'message' +
      (gameStatus !== GameStatus.gaming ? ' isOver' : '') +
      (turn === PieceType.black ? ' black' : ' red')}
  >{status}</div>;
  return (
    <div className="info">
      {content}
      <button onClick={onClick}>restart</button>
    </div>
  )
}
