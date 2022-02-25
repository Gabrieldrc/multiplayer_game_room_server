import { ChessGameState } from '@games/chess/schemas/chess-game-state.schema';

export default interface GameStateRepository {
  setGameState(stateObj: ChessGameState);
  findGameState(room: string);
  deleteGameState(room: string);
}
