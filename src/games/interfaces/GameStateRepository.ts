import ChessGameState from '@games/chess/interfaces/ChessGameState';

export default interface GameStateRepository {
  updateGameStateObject(stateObj: ChessGameState);
  createGameStateObject(stateObj: ChessGameState);
  findGameStateObject(room: string);
  deleteGameState(room: string);
}
