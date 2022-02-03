import ChessPieceAbstract from '../chess-piece-abstract';

export default class Rook extends ChessPieceAbstract {
  constructor(player: number, x: number, y: number) {
    super(player, 'rook', x, y);
  }

  canMove(board: ChessPieceAbstract[][], x: number, y: number): boolean {
    if (this.getX() !== x && this.getY() !== y) {
      return false;
    }
    if (this.getX() === x && this.getY() !== y) {
      for (let i = 0; i < board[x].length; i++) {
        if (y > this.getY() && i > this.getY() && i < y) {
          if (!(board[x][i].getName() === '')) {
            return false;
          }
        }
        if (y < this.getY() && i > y && i < this.getY()) {
          if (!(board[x][i].getName() === '')) {
            return false;
          }
        }
      }
    } else if (this.getY() === y && this.getX() !== x) {
      for (let i = 0; i < board.length; i++) {
        if (x > this.getX() && i > this.getX() && i < x) {
          if (!(board[i][y].getName() === '')) {
            return false;
          }
        }
        if (x < this.getX() && i > x && i < this.getX()) {
          if (!(board[i][y].getName() === '')) {
            return false;
          }
        }
      }
    }
    if (
      !(board[x][y].getName() === '') &&
      board[x][y].getPlayer() === this.getPlayer()
    ) {
      return false;
    }
    return true;
  }
}
