import React from 'react'
import { PieceType } from '../../types/enums'
import { Piece } from '../Piece'
import './index.css'

export interface IBoard {
  pieces: PieceType[]
  isGameOver?: boolean
  onClick?: (index: number) => void
}

export const Board: React.FC<IBoard> = ({ pieces, isGameOver, onClick }) => {
  const isGameOverProp = isGameOver!
  const list = pieces.map(
    (pt, i) => <Piece
      key={i}
      type={pt}
      onClick={() => {
        if (onClick && !isGameOverProp) {
          onClick(i)
        }
      }} />
  )
  return (
    <div className="board">
      {list}
    </div>
  )
}
Board.defaultProps = {
  isGameOver: false
}