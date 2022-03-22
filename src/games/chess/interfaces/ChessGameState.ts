import { PieceModel } from './PieceModel';

export default interface ChessGameState {
  players: string[];
  roomId?: string;
  turn: number;
  board: PieceModel[][];
}
