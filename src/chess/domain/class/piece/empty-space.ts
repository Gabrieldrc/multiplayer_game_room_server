import ChessPieceAbstract from '../chess-piece-abstract';

export default class EmptySpaceChess extends ChessPieceAbstract {
  constructor() {
    super(0, '', -1, -1);
  }

  move(x: number, y: number) {}

  canMove(board: ChessPieceAbstract[][], x: number, y: number) {
    return false;
  }
}
