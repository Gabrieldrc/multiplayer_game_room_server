import ChessPieceAbstract from '../chess-piece-abstract';

export default class Queen extends ChessPieceAbstract {
  constructor(player: number, x: number, y: number) {
    super(player, 'queen', x, y);
  }

  canMove(board: ChessPieceAbstract[][], x: number, y: number) {
    if (this.getX() === x || this.getY() === y) {
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
    if (this.getX() !== x && this.getY() !== y) {
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

    return false;
  }
}
