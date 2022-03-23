import { Position2D } from '@common/interfaces/position2-d.interface';
import { PieceModel } from '../interface/PieceModel';

export default abstract class ChessPieceAbstract {
  private player: number;
  private name: string;
  private x: number;
  private y: number;
  /**
   * Construct a ChessPieceAbstract object
   * @param player :int. '1' for player 1 or '2' for player 2.
   * @param name :string. Name of the piece
   * @param x :int. position on the x axis
   * @param y :int. position on the y axis
   */
  protected constructor(player: number, name: string, x: number, y: number) {
    this.player = player;
    this.name = name;
    this.x = x;
    this.y = y;
  }

  getPlayer() {
    return this.player;
  }

  setPlayer(value: number) {
    this.player = value;
  }

  getX() {
    return this.x;
  }

  setX(value: number) {
    this.x = value;
  }

  getY() {
    return this.y;
  }

  setY(value: number) {
    this.y = value;
  }
  /**
   * Check if the piece CAN move to those coordinates
   * @param board :Array[Array[ChessPieceAbstract]]]
   * @param x :int. position on the x axis
   * @param y :int. position on the y axis
   * @return bool
   */
  abstract canMove(
    board: ChessPieceAbstract[][],
    x: number,
    y: number,
  ): boolean;
  /**
   * update its coordinates
   * @param x :int. position on the x axis
   * @param y :int. position on the y axis
   * @return array
   */
  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getName() {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  /**
   * Get a list of positions where it can move
   * @param board
   * @return [{x: 1, y: 1],...}
   */
  getPlaceWhereCanMove(board: ChessPieceAbstract[][]): Array<Position2D> {
    const whereCanMove = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (this.canMove(board, i, j)) {
          whereCanMove.push({
            i: i,
            j: j,
          });
        }
      }
    }
    return whereCanMove;
  }

  getData(board: ChessPieceAbstract[][]) {
    return {
      name: this.name,
      player: this.player,
      position: { i: this.x, j: this.y },
      placeCanMove: this.getPlaceWhereCanMove(board),
    };
  }
  getModel(): PieceModel {
    return {
      name: this.name,
      player: this.player,
      position: { i: this.x, j: this.y },
    };
  }
}
