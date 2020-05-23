import React from 'react'
import { PieceType } from '../../types/enums'
import './index.css'
export interface IPiece {
  type: PieceType
  onClick?: () => void
}
export const Piece: React.FC<IPiece> = ({ type, onClick }) => {
  let piece;
  if (type === PieceType.black) { piece = <div className="piece-item black"></div> }
  else if (type === PieceType.red) { piece = <div className="piece-item red"></div> }
  else if (type === PieceType.none) { piece = <div className="piece-item none"></div> }
  return (
    <div className="piece"
      onClick={() => {
        if (type === PieceType.none && onClick) { onClick() }
      }}
    >
      {piece}
    </div>
  )
}