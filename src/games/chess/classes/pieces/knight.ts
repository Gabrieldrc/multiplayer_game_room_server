import ChessPieceAbstract from '@games/chess/classes/chess-piece-abstract';

export default class Knight extends ChessPieceAbstract {
  constructor(player: number, x: number, y: number) {
    super(player, 'knight', x, y);
  }

  canMove(board: ChessPieceAbstract[][], x: number, y: number) {
    // if (Math.abs(this.getX() - x) === 1 && Math.abs(this.getY() - y) === 2) {
    //     return true
    // }
    if (
      (Math.abs(this.getX() - x) === 2 && Math.abs(this.getY() - y) === 1) ||
      (Math.abs(this.getX() - x) === 1 && Math.abs(this.getY() - y) === 2)
    ) {
      if (
        board[x][y].getName() === '' ||
        (board[x][y].getName() !== '' &&
          board[x][y].getPlayer() !== this.getPlayer())
      ) {
        return true;
      }
    }

    return false;
  }
}
