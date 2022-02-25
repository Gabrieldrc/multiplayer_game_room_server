import ChessPieceAbstract from '@games/chess/classes/chess-piece-abstract';

export default class King extends ChessPieceAbstract {
  constructor(player: number, x: number, y: number) {
    super(player, 'king', x, y);
  }

  canMove(board: ChessPieceAbstract[][], x: number, y: number) {
    if (
      Math.abs(this.getX() - x) <= 1 &&
      Math.abs(this.getY() - y) <= 1 &&
      (board[x][y].getName() === '' ||
        (board[x][y].getName() !== '' &&
          board[x][y].getPlayer() !== this.getPlayer())) &&
      !this.canBeEat(board, x, y)
    ) {
      return true;
    }

    return false;
  }

  canBeEat(board: ChessPieceAbstract[][], x: number, y: number) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (
          board[i][j].getName() !== '' &&
          board[i][j].getPlayer() !== this.getPlayer()
        ) {
          if (board[i][j].canMove(board, x, y)) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
