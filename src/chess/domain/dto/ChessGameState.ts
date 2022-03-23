import { PieceModel } from '../interface/PieceModel';

export default interface ChessGameState {
  players: string[];
  roomId?: string;
  turn: number;
  board: PieceModel[][];
}
