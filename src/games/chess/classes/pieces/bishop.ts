import ChessPieceAbstract from '../chess-piece-abstract';

export default class Bishop extends ChessPieceAbstract {
  constructor(player: number, x: number, y: number) {
    super(player, 'bishop', x, y);
  }

  canMove(board: ChessPieceAbstract[][], x: number, y: number) {
    if (!(Math.abs(this.getX() - x) === Math.abs(this.getY() - y))) {
      return false;
    }
    if (
      board[x][y].getName() !== '' &&
      board[x][y].getPlayer() === this.getPlayer()
    ) {
      return false;
    }
    const directionX = x > this.getX() ? 1 : -1;
    const directionY = y > this.getY() ? 1 : -1;
    let i = this.getX() + directionX;
    let j = this.getY() + directionY;
    while (i !== x && j !== y) {
      if (board[i][j].getName() !== '') {
        return false;
      }
      i += directionX;
      j += directionY;
    }

    return true;
  }
}
