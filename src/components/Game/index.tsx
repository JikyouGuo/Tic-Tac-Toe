import React, { Component } from 'react'
import { PieceType, GameStatus } from '../../types/enums'
import { Board } from '../Board'
import { GameInfo } from '../GameInfo'

interface IState {
  gameStatus: GameStatus
  pieces: PieceType[],
  nextDrop: PieceType.black | PieceType.red
}

export class Game extends Component<{}, IState> {
  state: IState = {
    pieces: [],
    gameStatus: GameStatus.gaming,
    nextDrop: PieceType.red
  }
  componentDidMount() {
    this.init()
  }
  init() {
    const list = new Array(9)
    list.fill(PieceType.none)
    this.setState({
      pieces: list,
      gameStatus: GameStatus.gaming,
    })
  }
  handlePieceClick = (i: number) => {
    if (this.state.pieces[i] === PieceType.none) {
      const pieces = [...this.state.pieces];
      pieces[i] = this.state.nextDrop;
      const gameStatus = getGameStatus(pieces, i)
      this.setState(prevState => ({
        gameStatus,
        pieces,
        nextDrop: getNextDrop(prevState.nextDrop, gameStatus),
      }))
    }
  }

  render() {
    return (
      <>
        <Board
          pieces={this.state.pieces}
          isGameOver={this.state.gameStatus !== GameStatus.gaming}
          onClick={this.handlePieceClick}
        />
        <GameInfo
          gameStatus={this.state.gameStatus}
          turn={this.state.nextDrop}
          onClick={() => { this.init() }}
        />
      </>
    )
  }
}
function getGameStatus(pieces: PieceType[], i: number): GameStatus {
  const horiMin = Math.floor(i / 3) * 3;
  const vertiMin = i % 3;
  // win
  if (
    (pieces[horiMin] === pieces[horiMin + 1] && pieces[horiMin] === pieces[horiMin + 2]) // horizontal
    ||
    (pieces[vertiMin] === pieces[vertiMin + 3] && pieces[vertiMin] === pieces[vertiMin + 6]) // vertical
    ||
    (pieces[0] === pieces[4] && pieces[4] === pieces[8] && pieces[4] !== PieceType.none) // oblique
    ||
    (pieces[2] === pieces[4] && pieces[4] === pieces[6] && pieces[4] !== PieceType.none) // oblique
  ) {
    return pieces[i] === PieceType.black ? GameStatus.blackWin : GameStatus.redWin
  }
  // draw
  else if (!pieces.includes(PieceType.none)) {
    return GameStatus.draw
  }
  // gaming
  return GameStatus.gaming
}
function getNextDrop(prevNextDrop: PieceType, curGameStatus: GameStatus): PieceType.black | PieceType.red {
  if (curGameStatus === GameStatus.gaming) {
    return prevNextDrop === PieceType.black ? PieceType.red : PieceType.black
  } else {
    return prevNextDrop === PieceType.black ? PieceType.black : PieceType.red
  }
}