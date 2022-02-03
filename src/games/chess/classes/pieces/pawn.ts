import ChessPieceAbstract from '../chess-piece-abstract';

export default class Pawn extends ChessPieceAbstract {
  /**
   * Construct a Pawn object
   * @param player :int. '1' for player 1 or '2' for player 2.
   * @param x :int. position on the x axis
   * @param y :int. position on the y axis
   */
  constructor(player: number, x: number, y: number) {
    super(player, 'pawn', x, y);
  }

  canMove(board: ChessPieceAbstract[][], x: number, y: number) {
    if (this.getY() === y && board[x][y].getName() === '') {
      if (this.getX() - x === 1 && this.getPlayer() === 1) {
        return true;
      }
      if (this.getX() - x === -1 && this.getPlayer() === 2) {
        return true;
      }
    } else if (
      Math.abs(this.getX() - x) === 1 &&
      Math.abs(this.getY() - y) === 1 &&
      board[x][y].getPlayer() !== this.getPlayer() &&
      board[x][y].getName() !== ''
    ) {
      if (this.getX() - x === 1 && this.getPlayer() === 1) {
        return true;
      }
      if (this.getX() - x === -1 && this.getPlayer() === 2) {
        return true;
      }
    }
    return false;
  }
}
